import { NextResponse } from "next/server";
import { supabaseServer } from "../../_lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { ok: false, env, error: "Missing env vars — copy .env.local.example to .env.local and fill in Supabase creds." },
      { status: 500 }
    );
  }

  try {
    const supabase = supabaseServer();
    const checks = {};

    for (const table of ["bookings", "gallery_items", "reviews", "consultations"]) {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      if (error) {
        checks[table] = { ok: false, error: error.message };
      } else if (count === null) {
        // supabase-js swallows PGRST205 (table missing) on HEAD requests —
        // a non-null count means the table really exists.
        checks[table] = { ok: false, error: "Table not found (apply the migration first)" };
      } else {
        checks[table] = { ok: true, rows: count };
      }
    }

    const allOk = Object.values(checks).every((c) => c.ok);
    return NextResponse.json(
      { ok: allOk, env, tables: checks },
      { status: allOk ? 200 : 500 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, env, error: e.message },
      { status: 500 }
    );
  }
}
