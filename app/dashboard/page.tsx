import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import LeadActions from "./LeadActions";
import CopyLinkButton from "./CopyLinkButton";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;
const statusLabels: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  closed: "Закрыта",
};

type SearchParams = {
  page?: string;
  status?: string;
  period?: string;
  budget_min?: string;
  budget_max?: string;
  q?: string;
};

function parseNumber(value?: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function updateStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !["new", "in_progress", "closed"].includes(status)) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .eq("agent_id", user.id);

  revalidatePath("/dashboard");
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const resolvedParams = await Promise.resolve(searchParams);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, company, email")
    .eq("id", user.id)
    .single();

  const page = Math.max(1, Number(resolvedParams?.page ?? "1"));
  const budgetMin = parseNumber(resolvedParams?.budget_min);
  const budgetMax = parseNumber(resolvedParams?.budget_max);
  const queryText = (resolvedParams?.q ?? "").trim();
  const status =
    resolvedParams?.status &&
    ["new", "in_progress", "closed"].includes(resolvedParams.status)
      ? resolvedParams.status
      : "";
  const period =
    resolvedParams?.period && ["7", "30", "90"].includes(resolvedParams.period)
      ? Number(resolvedParams.period)
      : null;

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .eq("agent_id", user.id)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (period) {
    const since = new Date();
    since.setDate(since.getDate() - period);
    query = query.gte("created_at", since.toISOString());
  }

  if (budgetMin !== null) {
    query = query.gte("budget_min", budgetMin);
  }

  if (budgetMax !== null) {
    query = query.lte("budget_max", budgetMax);
  }
  if (queryText) {
    const escaped = queryText.replace(/[%_]/g, "\\$&");
    query = query.or(
      `name.ilike.%${escaped}%,phone.ilike.%${escaped}%,email.ilike.%${escaped}%`
    );
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data: leads, error, count } = await query.range(from, to);
  const { data: allLeads } = await supabase
    .from("leads")
    .select("status, created_at")
    .eq("agent_id", user.id);

  let conversionSubmit = 0;
  let conversionSuccess = 0;
  let conversionRate: number | null = null;

  try {
    let eventsQuery = supabase
      .from("lead_events")
      .select("event_type, created_at")
      .eq("agent_id", user.id)
      .in("event_type", ["form_submit", "form_success"]);

    if (period) {
      const since = new Date();
      since.setDate(since.getDate() - period);
      eventsQuery = eventsQuery.gte("created_at", since.toISOString());
    }

    const { data: events } = await eventsQuery;
    for (const event of events ?? []) {
      if (event.event_type === "form_submit") conversionSubmit += 1;
      if (event.event_type === "form_success") conversionSuccess += 1;
    }
    if (conversionSubmit > 0) {
      conversionRate = Math.round((conversionSuccess / conversionSubmit) * 100);
    }
  } catch {
    conversionRate = null;
  }

  const summary = (allLeads ?? []).reduce(
    (acc, lead) => {
      acc.total += 1;
      if (lead.status === "new") acc.new += 1;
      if (lead.status === "in_progress") acc.inProgress += 1;
      if (lead.status === "closed") acc.closed += 1;
      return acc;
    },
    { total: 0, new: 0, inProgress: 0, closed: 0 }
  );

  const totalPages = count ? Math.max(1, Math.ceil(count / PAGE_SIZE)) : 1;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Кабинет агента</h1>
            <p className="text-sm text-zinc-600">
              {profile?.name || profile?.email}
            </p>
            <p className="text-sm text-zinc-600">
              Всего заявок: {count ?? 0}. Обновите статус прямо из таблицы.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <a
                className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                href="/dashboard/settings/telegram"
              >
                <svg className="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.88-2.11 5.88-2.53 2.78-1.17 3.35-1.37 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                </svg>
                Telegram
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-105"
                href={`/brief/${user.id}`}
                target="_blank"
                rel="noreferrer"
              >
                📋 Бриф
              </a>
              <CopyLinkButton agentId={user.id} />
              <form action="/api/auth/logout" method="POST">
                <button
                  className="inline-flex h-10 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-4 text-sm font-semibold text-red-400 backdrop-blur-sm transition hover:bg-red-500/20 hover:text-red-300"
                  type="submit"
                >
                  Выйти
                </button>
              </form>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-zinc-400">Всего</div>
            <div className="mt-2 text-2xl font-semibold">{summary.total}</div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-zinc-400">Новые</div>
            <div className="mt-2 text-2xl font-semibold text-emerald-700">
              {summary.new}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-zinc-400">В работе</div>
            <div className="mt-2 text-2xl font-semibold text-amber-700">
              {summary.inProgress}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-zinc-400">Закрытые</div>
            <div className="mt-2 text-2xl font-semibold text-zinc-600">
              {summary.closed}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-zinc-400">
              Конверсия формы
            </div>
            <div className="mt-2 text-2xl font-semibold text-zinc-800">
              {conversionRate !== null ? `${conversionRate}%` : "—"}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              {conversionRate !== null
                ? `${conversionSuccess} / ${conversionSubmit}`
                : "нет данных"}
            </div>
          </div>
        </section>

        <form
          method="get"
          action="/dashboard"
          className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-6"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Статус
            <select
              name="status"
              defaultValue={status}
              className="h-10 rounded-xl border border-zinc-300 px-3 text-sm"
            >
              <option value="">Все</option>
              <option value="new">Новые</option>
              <option value="in_progress">В работе</option>
              <option value="closed">Закрытые</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Период
            <select
              name="period"
              defaultValue={period?.toString() ?? ""}
              className="h-10 rounded-xl border border-zinc-300 px-3 text-sm"
            >
              <option value="">Весь период</option>
              <option value="7">7 дней</option>
              <option value="30">30 дней</option>
              <option value="90">90 дней</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Бюджет от, ₽
            <input
              name="budget_min"
              defaultValue={budgetMin ?? ""}
              className="h-10 rounded-xl border border-zinc-300 px-3 text-sm"
              type="number"
              min="0"
              placeholder="2 500 000"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Бюджет до, ₽
            <input
              name="budget_max"
              defaultValue={budgetMax ?? ""}
              className="h-10 rounded-xl border border-zinc-300 px-3 text-sm"
              type="number"
              min="0"
              placeholder="6 000 000"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Поиск
            <input
              name="q"
              defaultValue={queryText}
              className="h-10 rounded-xl border border-zinc-300 px-3 text-sm"
              type="text"
              placeholder="Имя, телефон, email"
            />
          </label>
          <div className="flex items-end">
            <button
              className="inline-flex h-10 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white"
              type="submit"
            >
              Применить
            </button>
          </div>
        </form>

        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 border-b border-zinc-200 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <div>Клиент</div>
            <div>Объект</div>
            <div>Бюджет</div>
            <div>Сроки</div>
            <div>Статус</div>
            <div>Дата</div>
          </div>

          {error ? (
            <div className="px-6 py-6 text-sm text-rose-600">
              Не удалось загрузить заявки.
            </div>
          ) : leads && leads.length > 0 ? (
            <ul className="divide-y divide-zinc-100">
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-sm"
                >
                  <div>
                    <div className="font-semibold">{lead.name}</div>
                    <div className="text-xs text-zinc-500">{lead.phone}</div>
                    {lead.email ? (
                      <div className="text-xs text-zinc-500">{lead.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <div className="font-medium">
                      {lead.property_type === "house" ? "Дом" : "Квартира"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {lead.district || "—"}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {lead.budget_min ? `${lead.budget_min.toLocaleString()} ₽` : "—"}{" "}
                    —{" "}
                    {lead.budget_max ? `${lead.budget_max.toLocaleString()} ₽` : "—"}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {lead.timeline || "—"}
                  </div>
                  <div className="flex flex-col gap-2">
                    <form action={updateStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="h-8 rounded-lg border border-zinc-300 px-2 text-xs"
                      >
                        <option value="new">Новая</option>
                        <option value="in_progress">В работе</option>
                        <option value="closed">Закрыта</option>
                      </select>
                      <button
                        className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold"
                        type="submit"
                      >
                        OK
                      </button>
                    </form>
                    <span
                      className={`inline-flex w-fit rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        lead.status === "new"
                          ? "bg-emerald-50 text-emerald-700"
                          : lead.status === "in_progress"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {statusLabels[lead.status] ?? lead.status}
                    </span>
                    <a
                      className="text-xs font-semibold text-zinc-600 underline underline-offset-4"
                      href={`/api/leads/${lead.id}/pdf`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      PDF-бриф
                    </a>
                    <LeadActions phone={lead.phone} />
                  </div>
                  <div className="text-xs text-zinc-500">
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleDateString("ru-RU")
                      : "—"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-8 text-sm text-zinc-500">
              Заявок пока нет. Поделитесь ссылкой на бриф, чтобы получить первые
              заявки: <span className="font-mono">/brief</span>
            </div>
          )}
        </section>

        <div className="flex items-center justify-between text-sm text-zinc-600">
          <div>
            Страница {page} из {totalPages}
          </div>
          <div className="flex gap-2">
            <a
              className={`rounded-full border px-4 py-2 ${
                page <= 1 ? "pointer-events-none opacity-40" : "border-zinc-300"
              }`}
              href={`/dashboard?page=${Math.max(1, page - 1)}&status=${status}&period=${
                period ?? ""
              }&budget_min=${budgetMin ?? ""}&budget_max=${budgetMax ?? ""}&q=${encodeURIComponent(
                queryText
              )}`}
            >
              Назад
            </a>
            <a
              className={`rounded-full border px-4 py-2 ${
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "border-zinc-300"
              }`}
              href={`/dashboard?page=${Math.min(totalPages, page + 1)}&status=${status}&period=${
                period ?? ""
              }&budget_min=${budgetMin ?? ""}&budget_max=${budgetMax ?? ""}&q=${encodeURIComponent(
                queryText
              )}`}
            >
              Далее
            </a>
          </div>
          <a
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold"
            href="/api/leads/export"
          >
            Экспорт CSV
          </a>
        </div>
      </main>
    </div>
  );
}
