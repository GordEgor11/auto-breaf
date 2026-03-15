import { createSupabaseAdminClient } from "@/lib/supabase/server";

function csvEscape(value: string | number | boolean | null) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const agentId = process.env.DEFAULT_AGENT_ID;
  if (!agentId) {
    return new Response("DEFAULT_AGENT_ID не настроен", { status: 500 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response("Не удалось сформировать CSV", { status: 500 });
  }

  const header = [
    "id",
    "created_at",
    "agent_id",
    "property_type",
    "district",
    "budget_min",
    "budget_max",
    "timeline",
    "mortgage",
    "name",
    "phone",
    "email",
    "status",
  ];

  const rows = [header.join(",")];

  for (const lead of leads ?? []) {
    rows.push(
      [
        lead.id,
        lead.created_at,
        lead.agent_id,
        lead.property_type,
        lead.district,
        lead.budget_min,
        lead.budget_max,
        lead.timeline,
        lead.mortgage,
        lead.name,
        lead.phone,
        lead.email,
        lead.status,
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  const csv = rows.join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  });
}
