import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://vkooufqxtkqwyytocztz.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);