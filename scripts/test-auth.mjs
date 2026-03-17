import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

// Load .env.local manually
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing Supabase connection...");
console.log("URL:", supabaseUrl);
console.log("Key prefix:", supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + "..." : "MISSING");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log("\n--- Testing Auth ---");
  
  // Test 1: Sign up
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = "test123456";
  
  console.log("Attempting sign up with:", testEmail);
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });
  
  if (signUpError) {
    console.error("❌ Sign up error:", signUpError.message);
  } else {
    console.log("✅ Sign up successful:", signUpData.user?.email);
  }
  
  // Test 2: Sign in
  console.log("\nAttempting sign in...");
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });
  
  if (signInError) {
    console.error("❌ Sign in error:", signInError.message);
  } else {
    console.log("✅ Sign in successful:", signInData.user?.email);
    console.log("Session:", signInData.session ? "Has session" : "No session");
  }
  
  // Test 3: Get user
  console.log("\nGetting current user...");
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("❌ Get user error:", userError.message);
  } else if (user) {
    console.log("✅ Current user:", user.email);
  }
  
  // Test 4: Check profiles table
  console.log("\n--- Testing Database ---");
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, email, name")
    .limit(1);
  
  if (profilesError) {
    console.error("❌ Profiles query error:", profilesError.message);
  } else {
    console.log("✅ Profiles query successful:", profiles?.length, "rows");
  }
  
  // Test 5: Check leads table
  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("id, name, status")
    .limit(1);
  
  if (leadsError) {
    console.error("❌ Leads query error:", leadsError.message);
  } else {
    console.log("✅ Leads query successful:", leads?.length, "rows");
  }
  
  // Test 6: Google OAuth check
  console.log("\n--- Testing OAuth ---");
  console.log("ℹ️ Google OAuth requires browser redirect - cannot test via CLI");
  console.log("Check Supabase Dashboard: Authentication → Providers → Google");
}

testAuth().catch(console.error);
