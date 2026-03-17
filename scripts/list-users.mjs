import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");

const env = {};
envContent.split("\n").forEach(line => {
  const [key, ...valueParts] = line.split("=");
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join("=").trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function listUsers() {
  console.log("=== Registered Users ===\n");
  
  // Get all users from auth
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }
  
  console.log(`Total users: ${users.length}\n`);
  
  for (const user of users) {
    console.log(`👤 ${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Created: ${new Date(user.created_at).toLocaleString('ru-RU')}`);
    console.log(`   Last sign in: ${user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ru-RU') : 'Never'}`);
    console.log();
  }
  
  // Get profiles
  console.log("=== User Profiles ===\n");
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, email, name, company, phone, created_at");
  
  if (profilesError) {
    console.error("❌ Profiles error:", profilesError.message);
    return;
  }
  
  for (const profile of profiles) {
    console.log(`📋 ${profile.email}`);
    if (profile.name) console.log(`   Name: ${profile.name}`);
    if (profile.company) console.log(`   Company: ${profile.company}`);
    if (profile.phone) console.log(`   Phone: ${profile.phone}`);
    console.log();
  }
}

listUsers();
