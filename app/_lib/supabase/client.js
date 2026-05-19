"use client";

import { createClient } from "@supabase/supabase-js";

let cached = null;

/**
 * Browser-side Supabase client using the public anon key.
 * Subject to Row Level Security policies — only sees what RLS lets it see.
 * Currently unused; reserved for future client-side reads (e.g. live gallery).
 */
export function supabaseBrowser() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase browser client is misconfigured. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }

  cached = createClient(url, key);
  return cached;
}
