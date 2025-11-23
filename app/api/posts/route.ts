import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("posts").insert([
      {
        type: body.type,
        title: body.title,
        description: body.description,
        contact: body.contact,
        status: "pending",
        payment: body.payment,
        payment_currency: body.payment_currency,
        profession: body.profession,
        age: body.age,
        work_time: body.work_time,
      },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Gabim gjatë ruajtjes së postimit." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gabim në server." },
      { status: 500 }
    );
  }
}
