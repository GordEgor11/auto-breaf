import { NextRequest } from "next/server";
import { z } from "zod";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

async function sendTelegramNotification(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, skipped: true };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          disable_web_page_preview: true,
        }),
      }
    );

    if (!response.ok) {
      return { ok: false };
    }

    const data = (await response.json()) as { ok?: boolean };
    return { ok: Boolean(data.ok) };
  } catch {
    return { ok: false };
  }
}

const leadSchema = z
  .object({
    property_type: z.enum(["apartment", "house"]),
    district: z.string().max(120).optional().default(""),
    budget_min: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? Number(value) : null))
      .refine(
        (value) => value === null || (!Number.isNaN(value) && value >= 0),
        "budget_min must be a non-negative number"
      ),
    budget_max: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? Number(value) : null))
      .refine(
        (value) => value === null || (!Number.isNaN(value) && value >= 0),
        "budget_max must be a non-negative number"
      ),
    timeline: z.string().max(120).optional().default(""),
    mortgage: z.boolean().default(false),
    name: z.string().min(2).max(120),
    phone: z.string().min(6).max(30),
    email: z.string().email().optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      data.budget_min === null ||
      data.budget_max === null ||
      data.budget_min <= data.budget_max,
    "budget_min must be less than or equal to budget_max"
  );

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = leadSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { error: "Неверные данные формы", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const agentId = process.env.DEFAULT_AGENT_ID;
    if (!agentId) {
      return Response.json(
        { error: "DEFAULT_AGENT_ID не настроен" },
        { status: 500 }
      );
    }

    const supabase = createSupabaseAdminClient();
    const payload = {
      agent_id: agentId,
      property_type: parsed.data.property_type,
      district: parsed.data.district || null,
      budget_min: parsed.data.budget_min,
      budget_max: parsed.data.budget_max,
      timeline: parsed.data.timeline || null,
      mortgage: parsed.data.mortgage,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return Response.json(
        { error: "Не удалось сохранить заявку" },
        { status: 500 }
      );
    }

    const summary = [
      "Новая заявка",
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : null,
      `Тип: ${payload.property_type === "house" ? "Дом" : "Квартира"}`,
      payload.district ? `Район: ${payload.district}` : null,
      payload.budget_min || payload.budget_max
        ? `Бюджет: ${payload.budget_min ?? "—"} - ${payload.budget_max ?? "—"}`
        : null,
      payload.timeline ? `Сроки: ${payload.timeline}` : null,
      `Ипотека: ${payload.mortgage ? "Да" : "Нет"}`,
      `ID: ${data.id}`,
    ]
      .filter(Boolean)
      .join("\n");

    const notification = await sendTelegramNotification(summary);

    return Response.json(
      { lead_id: data.id, telegram: notification.ok ?? false },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: "Не удалось обработать запрос" },
      { status: 500 }
    );
  }
}
