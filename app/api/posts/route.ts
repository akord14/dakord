import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const contact = formData.get("contact") as string;
    const payment = formData.get("payment") as string;
    const payment_currency = formData.get("payment_currency") as string;
    const profession = formData.get("profession") as string;
    const age = formData.get("age") as string;
    const work_time = formData.get("work_time") as string;
    const city = formData.get("city") as string;

    let imageUrl: string | null = null;
    const file = formData.get("image") as File | null;

    const supabase = getSupabase();

    if (file) {
      const ext = file.name.split(".").pop()!;
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        return NextResponse.json(
          { error: "Fotoja nuk u ngarkua." },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const { error: insertError } = await supabase.from("posts").insert({
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
      image: imageUrl,
      status: "pending",
    });

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
      { error: "Gabim i paparitur në server." },
      { status: 500 }
    );
  }
}
