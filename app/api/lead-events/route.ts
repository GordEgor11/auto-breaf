import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const eventSchema = z.object({
  event_type: z.enum(["form_view", "form_submit", "form_success"]),
  source: z.string().max(120).optional(),
  agent_id: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = eventSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Используем agent_id из запроса (для публичных форм) или из сессии
    const agentId = parsed.data.agent_id || user?.id;

    if (!agentId) {
      return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("lead_events").insert({
      agent_id: agentId,
      event_type: parsed.data.event_type,
      source: parsed.data.source ?? null,
    });

    if (error) {
      return Response.json({ ok: false }, { status: 200 });
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ ok: false }, { status: 200 });
  }
}
