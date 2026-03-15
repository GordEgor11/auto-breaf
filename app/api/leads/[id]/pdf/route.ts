import { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

function formatCurrency(value: number | null) {
  if (value === null || value === undefined) return "—";
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildHtml(lead: any) {
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>Бриф заявки</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #111827; margin: 0; padding: 32px; }
    h1 { font-size: 24px; margin: 0 0 16px; }
    .meta { font-size: 12px; color: #6b7280; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 6px; }
    .value { font-size: 14px; font-weight: 600; }
    .footer { margin-top: 32px; font-size: 11px; color: #6b7280; }
  </style>
</head>
<body>
  <h1>Бриф заявки на просмотр</h1>
  <div class="meta">ID: ${lead.id} · ${formatDate(lead.created_at)}</div>

  <div class="grid">
    <div class="card">
      <div class="label">Клиент</div>
      <div class="value">${lead.name}</div>
      <div>${lead.phone}</div>
      <div>${lead.email ?? "—"}</div>
    </div>
    <div class="card">
      <div class="label">Объект</div>
      <div class="value">${lead.property_type === "house" ? "Дом" : "Квартира"}</div>
      <div>${lead.district ?? "—"}</div>
    </div>
    <div class="card">
      <div class="label">Бюджет</div>
      <div class="value">${formatCurrency(lead.budget_min)} — ${formatCurrency(lead.budget_max)}</div>
    </div>
    <div class="card">
      <div class="label">Сроки</div>
      <div class="value">${lead.timeline ?? "—"}</div>
    </div>
    <div class="card">
      <div class="label">Ипотека</div>
      <div class="value">${lead.mortgage ? "Да" : "Нет"}</div>
    </div>
    <div class="card">
      <div class="label">Статус</div>
      <div class="value">${lead.status}</div>
    </div>
  </div>

  <div class="footer">Сформировано автоматически</div>
</body>
</html>`;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const pathname = new URL(request.url).pathname;
  const fallbackId = pathname.split("/").slice(-2, -1)[0];
  const leadId = id ?? fallbackId;

  if (!leadId) {
    return new Response("ID заявки не указан", { status: 400 });
  }

  const agentId = process.env.DEFAULT_AGENT_ID;
  if (!agentId) {
    return new Response("DEFAULT_AGENT_ID не настроен", { status: 500 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .eq("agent_id", agentId)
    .single();

  if (error || !lead) {
    const fallback = await supabase
      .from("leads")
      .select("id, agent_id")
      .eq("id", leadId)
      .single();

    if (fallback.data) {
      return new Response(
        `Заявка принадлежит другому агенту. lead.agent_id=${fallback.data.agent_id}, env.DEFAULT_AGENT_ID=${agentId}`,
        { status: 403 }
      );
    }

    const message = error?.message
      ? `Заявка не найдена. Ошибка: ${error.message}`
      : "Заявка не найдена";
    return new Response(message, { status: 404 });
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
  });
  const page = await browser.newPage();
  await page.setContent(buildHtml(lead), { waitUntil: "load" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return new Response(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=lead-${lead.id}.pdf`,
    },
  });
}
