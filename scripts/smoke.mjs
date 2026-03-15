import fs from "node:fs";
import path from "node:path";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const [key, ...rest] = line.split("=");
    if (!key) continue;
    const value = rest.join("=");
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function request(url, options) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  let body = null;
  if (contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  return { response, body };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

loadEnv();

const baseUrl = process.env.SMOKE_BASE_URL || "http://localhost:3001";

const leadPayload = {
  property_type: "apartment",
  district: "Тестовый",
  budget_min: "1000000",
  budget_max: "2500000",
  timeline: "В течение месяца",
  mortgage: false,
  name: "Тест",
  phone: "+79999999999",
  email: "test@example.com",
};

console.log(`\nSmoke test against ${baseUrl}`);

try {
  const { response: createRes, body: createBody } = await request(
    `${baseUrl}/api/leads`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    }
  );

  assert(createRes.status === 201, `POST /api/leads expected 201, got ${createRes.status}`);
  assert(createBody?.lead_id, "POST /api/leads did not return lead_id");
  console.log("✓ POST /api/leads");

  const leadId = createBody.lead_id;
  const { response: pdfRes } = await request(`${baseUrl}/api/leads/${leadId}/pdf`);
  assert(pdfRes.status === 200, `GET /api/leads/:id/pdf expected 200, got ${pdfRes.status}`);
  const pdfType = pdfRes.headers.get("content-type") || "";
  assert(
    pdfType.includes("application/pdf"),
    `GET /api/leads/:id/pdf expected application/pdf, got ${pdfType}`
  );
  console.log("✓ GET /api/leads/:id/pdf");

  const { response: badRes } = await request(`${baseUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert(badRes.status === 400, `POST /api/leads (bad) expected 400, got ${badRes.status}`);
  console.log("✓ POST /api/leads (validation)\n");
} catch (error) {
  console.error("Smoke test failed:\n", error.message || error);
  process.exit(1);
}
