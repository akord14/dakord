// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Mungon SUPABASE_URL ose SUPABASE_SERVICE_ROLE_KEY");
}

// Ky klient përdoret VETËM në server (admin, server actions, etj.)
export const supabaseAdmin = createClient(url, serviceRoleKey);
