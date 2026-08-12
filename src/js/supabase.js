import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  "https://vkooufqxtkqwyytocztz.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);