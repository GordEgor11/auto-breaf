import { NextRequest } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return value;
  if (digits.startsWith("7")) return `+${digits}`;
  if (digits.startsWith("8")) return `+7${digits.slice(1)}`;
  if (digits.length === 10) return `+7${digits}`;
  return `+${digits}`;
}

async function sendTelegramNotification(message: string, chatId?: string) {
  // Используем общий токен бота из env
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
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
          parse_mode: "HTML",
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

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Если пользователь не авторизован, используем agent_id из запроса (для публичных форм)
    const agentId = user?.id || json.agent_id;

    if (!agentId) {
      return Response.json(
        { error: "Требуется авторизация или agent_id" },
        { status: 401 }
      );
    }

    const payload = {
      agent_id: agentId,
      property_type: parsed.data.property_type,
      district: parsed.data.district || null,
      budget_min: parsed.data.budget_min,
      budget_max: parsed.data.budget_max,
      timeline: parsed.data.timeline || null,
      mortgage: parsed.data.mortgage,
      name: parsed.data.name,
      phone: normalizePhone(parsed.data.phone),
      email: parsed.data.email || null,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: "Не удалось сохранить заявку", details: error.message },
        { status: 500 }
      );
    }

    // Получаем профиль агента для отправки уведомления
    const { data: agentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("telegram_chat_id, email")
      .eq("id", agentId)
      .single();

    if (profileError) {
      console.warn("Profile not found or telegram_chat_id column missing:", profileError.message);
    }

    const summary = [
      "🔔 <b>Новая заявка</b>",
      "",
      `<b>Имя:</b> ${payload.name}`,
      `<b>Телефон:</b> ${payload.phone}`,
      payload.email ? `<b>Email:</b> ${payload.email}` : null,
      "",
      `<b>Тип:</b> ${payload.property_type === "house" ? "🏠 Дом" : "🏢 Квартира"}`,
      payload.district ? `<b>Район:</b> ${payload.district}` : null,
      payload.budget_min || payload.budget_max
        ? `<b>Бюджет:</b> ${payload.budget_min ?? "—"} - ${payload.budget_max ?? "—"} ₽`
        : null,
      payload.timeline ? `<b>Сроки:</b> ${payload.timeline}` : null,
      `<b>Ипотека:</b> ${payload.mortgage ? "✅ Да" : "❌ Нет"}`,
      "",
      `ID: ${data.id}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Отправляем уведомление в Telegram агенту (если есть chat_id)
    let notification: { ok: boolean; skipped?: boolean } = { ok: false, skipped: true };
    if (agentProfile?.telegram_chat_id) {
      notification = await sendTelegramNotification(summary, agentProfile.telegram_chat_id);
    } else {
      console.log("Telegram notification skipped: no chat_id");
    }

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
