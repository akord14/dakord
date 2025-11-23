import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon SUPABASE_URL ose ANON_KEY");
  }

  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAnon();
    const data = await req.json();

    const {
      type,
      title,
      description,
      contact,
      payment,
      payment_currency,
      profession,
      age,
      work_time,
      city,
      status,
    } = data;

    const { error: insertError } = await supabase
      .from("posts")
      .insert([
        {
          type,
          title,
          description,
          contact,
          payment,
          payment_currency,
          profession,
          age,
          work_time,
          city,
          status: "pending",
          image: null, // Foto ende s’ka
        },
      ]);

    if (insertError) {
      console.error(insertError);
      return NextResponse.json(
        { error: "Gabim gjatë ruajtjes së postimit." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gabim i papritur në server." },
      { status: 500 }
    );
  }
}
