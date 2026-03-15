import { z } from "zod";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

const eventSchema = z.object({
  event_type: z.enum(["form_view", "form_submit", "form_success"]),
  source: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = eventSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const agentId = process.env.DEFAULT_AGENT_ID;
    if (!agentId) {
      return Response.json({ ok: false, error: "DEFAULT_AGENT_ID missing" }, { status: 500 });
    }

    const supabase = createSupabaseAdminClient();
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
