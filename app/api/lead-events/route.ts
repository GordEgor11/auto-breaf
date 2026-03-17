import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

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

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("lead_events").insert({
      agent_id: user.id,
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
