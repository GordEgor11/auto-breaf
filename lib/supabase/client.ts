import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          company: string | null;
          phone: string | null;
          telegram_chat_id: string | null;
          telegram_bot_token: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          agent_id: string;
          property_type: string;
          district: string | null;
          budget_min: number | null;
          budget_max: number | null;
          timeline: string | null;
          mortgage: boolean;
          name: string;
          phone: string;
          email: string | null;
          status: string;
        };
      };
      lead_events: {
        Row: {
          id: string;
          created_at: string;
          agent_id: string;
          event_type: string;
          source: string | null;
        };
      };
      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          note: string;
          created_at: string;
        };
      };
    };
  };
};

// Cookie storage for Supabase auth
const cookieStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${key}=`))
      ?.split('=')[1];
    return value || null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    document.cookie = `${key}=${value}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    document.cookie = `${key}=; path=/; max-age=0`;
  },
};

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: cookieStorage,
    },
  });
}
