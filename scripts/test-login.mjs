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
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testLogin() {
  console.log("=== Testing Login ===\n");
  
  const email = "kegorkod@gmail.com";
  
  // Ask for password
  const password = process.env.TEST_PASSWORD || "test123";
  
  console.log("Email:", email);
  console.log("Password:", password);
  console.log();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error("❌ Login failed:", error.message);
    return;
  }
  
  console.log("✅ Login successful!");
  console.log("User ID:", data.user.id);
  console.log("Email:", data.user.email);
  console.log("Has session:", !!data.session);
  console.log("Access token:", data.session?.access_token?.substring(0, 20) + "...");
  console.log();
  
  // Test getting user profile
  console.log("=== Testing Profile Query ===");
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, name, company")
    .eq("id", data.user.id)
    .single();
  
  if (profileError) {
    console.error("❌ Profile query failed:", profileError.message);
  } else {
    console.log("✅ Profile found:");
    console.log("  Name:", profile.name || "none");
    console.log("  Email:", profile.email);
    console.log("  Company:", profile.company || "none");
  }
}

testLogin();
