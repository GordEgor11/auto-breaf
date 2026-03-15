"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LeadFormState = {
  property_type: "apartment" | "house";
  district: string;
  budget_min: string;
  budget_max: string;
  timeline: string;
  mortgage: boolean;
  name: string;
  phone: string;
  email: string;
};

const initialState: LeadFormState = {
  property_type: "apartment",
  district: "",
  budget_min: "",
  budget_max: "",
  timeline: "",
  mortgage: false,
  name: "",
  phone: "",
  email: "",
};

export default function BriefPage() {
  const [form, setForm] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const hasTrackedView = useRef(false);

  function updateField<K extends keyof LeadFormState>(
    key: K,
    value: LeadFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const budgetPresets = useMemo(
    () => [
      { label: "до 5 млн", min: "", max: "5000000" },
      { label: "5–10 млн", min: "5000000", max: "10000000" },
      { label: "10–15 млн", min: "10000000", max: "15000000" },
      { label: "15+ млн", min: "15000000", max: "" },
      { label: "Ипотека", min: "", max: "" },
    ],
    []
  );

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
    const rest = normalized.startsWith("7")
      ? normalized.slice(1)
      : normalized;

    if (!rest) return "";
    const part1 = rest.slice(0, 3);
    const part2 = rest.slice(3, 6);
    const part3 = rest.slice(6, 8);
    const part4 = rest.slice(8, 10);

    let formatted = `+7 ${part1}`;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += `-${part3}`;
    if (part4) formatted += `-${part4}`;
    return formatted.trim();
  }

  function normalizePhone(value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("7")) return `+${digits}`;
    if (digits.startsWith("8")) return `+7${digits.slice(1)}`;
    if (digits.length === 10) return `+7${digits}`;
    return `+${digits}`;
  }

  useEffect(() => {
    const raw = localStorage.getItem("brief_draft_v1");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<LeadFormState>;
      setForm((prev) => ({ ...prev, ...parsed }));
    } catch {
      localStorage.removeItem("brief_draft_v1");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("brief_draft_v1", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    void fetch("/api/lead-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: "form_view" }),
    });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);
    setLeadId(null);

    try {
      void fetch("/api/lead-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_type: "form_submit" }),
      });

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: normalizePhone(form.phone),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Не удалось отправить заявку.");
      }

      setStatus("success");
      setLeadId(String(data.lead_id));
      setMessage("Заявка отправлена. Мы скоро свяжемся с вами.");
      setForm(initialState);
      localStorage.removeItem("brief_draft_v1");
      void fetch("/api/lead-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_type: "form_success" }),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Что-то пошло не так.";
      setStatus("error");
      setMessage(errorMessage || "Что-то пошло не так. Проверьте данные.");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Бриф заявки</h1>
          <p className="text-sm text-zinc-600">
            Заполните короткую форму, и агент получит уведомление в течение минуты.
          </p>
        </header>

        {status === "success" && leadId ? (
          <section className="flex flex-col gap-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Заявка принята
            </div>
            <h2 className="text-2xl font-semibold">Спасибо, мы получили ваш бриф.</h2>
            <p className="text-sm text-emerald-700">
              Номер заявки: <span className="font-semibold">{leadId}</span>
            </p>
            <p className="text-sm text-emerald-700">
              Агент свяжется с вами в ближайшее время. Если нужно, оставьте форму
              повторно с уточнениями.
            </p>
            <button
              className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
              type="button"
              onClick={() => {
                setStatus("idle");
                setLeadId(null);
                setMessage(null);
              }}
            >
              Оставить еще одну заявку
            </button>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs text-zinc-500">
              Поля с * обязательны. Остальные можно оставить пустыми. Мы используем
              данные только для связи по заявке.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Тип объекта *
                <select
                  className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                  value={form.property_type}
                  onChange={(event) =>
                    updateField(
                      "property_type",
                      event.target.value as LeadFormState["property_type"]
                    )
                  }
                >
                  <option value="apartment">Квартира</option>
                  <option value="house">Дом</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Район
                <input
                  className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                  type="text"
                  value={form.district}
                  onChange={(event) =>
                    updateField("district", event.target.value)
                  }
                  placeholder="Например, Центральный"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Бюджет от, ₽
                <input
                  className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                  type="number"
                  min="0"
                  value={form.budget_min}
                  onChange={(event) =>
                    updateField("budget_min", event.target.value)
                  }
                  placeholder="2 500 000"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Бюджет до, ₽
                <input
                  className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                  type="number"
                  min="0"
                  value={form.budget_max}
                  onChange={(event) =>
                    updateField("budget_max", event.target.value)
                  }
                  placeholder="5 000 000"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
              {budgetPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className="rounded-full border border-zinc-300 px-3 py-1 font-semibold text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-800"
                  onClick={() => {
                    if (preset.label === "Ипотека") {
                      updateField("mortgage", true);
                      return;
                    }
                    updateField("budget_min", preset.min);
                    updateField("budget_max", preset.max);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Сроки покупки
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="text"
                value={form.timeline}
                onChange={(event) =>
                  updateField("timeline", event.target.value)
                }
                placeholder="В течение 1-2 месяцев"
              />
            </label>

            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                className="h-4 w-4 rounded border border-zinc-300"
                type="checkbox"
                checked={form.mortgage}
                onChange={(event) =>
                  updateField("mortgage", event.target.checked)
                }
              />
              Ипотека нужна
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Имя *
                <input
                  className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Мария"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Телефон *
                <input
                  className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", formatPhone(event.target.value))
                  }
                  placeholder="+7 999 123-45-67"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Email (опционально)
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="client@example.com"
              />
            </label>

            <button
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Отправка..." : "Отправить бриф"}
            </button>

            {message ? (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  status === "error"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {message}
              </div>
            ) : null}
          </form>
        )}

        <a
          className="text-sm font-semibold text-zinc-900 underline underline-offset-4"
          href="/"
        >
          Назад на лендинг
        </a>
      </main>
    </div>
  );
}
