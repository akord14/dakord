import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = getSupabaseAnon();

    const { error: insertError } = await supabase.from("posts").insert([
      {
        type: body.type,
        title: body.title,
        description: body.description,
        contact: body.contact,
        status: "pending",
        age: body.age,
        work_time: body.work_time,
        city: body.city,
        image: body.image ?? null,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      return NextResponse.json(
        { error: "Gabim gjatë ruajtjes së postimit." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gabim i papritur në server." },
      { status: 500 }
    );
  }
}
