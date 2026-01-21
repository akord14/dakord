import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const phone = String(body.phone ?? "").trim();
    if (!phone) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    // Honeypot anti-spam (nëse plotësohet nga bot-i)
    const hp = String(body.hp ?? "").trim();
    if (hp) return NextResponse.json({ ok: true }, { status: 200 });

    const supabase = getServiceSupabase();

    const payload = {
      service_text: body.service_text ? String(body.service_text).trim() : null,
      details: body.details ? String(body.details).trim() : null,
      city: body.city ? String(body.city).trim() : null,
      budget_min: body.budget_min ? String(body.budget_min).trim() : null,
      budget_max: body.budget_max ? String(body.budget_max).trim() : null,
      timeline: body.timeline ? String(body.timeline).trim() : null,
      phone,
      status: "new",
    };

    const { error } = await supabase.from("offer_requests").insert(payload);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
