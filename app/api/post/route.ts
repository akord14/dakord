import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const city = form.get("city") as string;
    const profession = form.get("profession") as string;
    const age = form.get("age") as string;
    const work_time = form.get("work_time") as string;
    const payment = form.get("payment") as string;
    const payment_currency = form.get("payment_currency") as string;
    const contact = form.get("contact") as string;
    const type = form.get("type") as string;

    const file = form.get("image") as File | null;

    const supabase = getSupabase();
    let image_url: string | null = null;

    // ---------------------------------------------------
    // 1️⃣ Nese ka file → ngarko ne Supabase Storage
    // ---------------------------------------------------
    if (file && file.size > 0) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `post-${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        return NextResponse.json(
          { error: "Gabim gjatë ngarkimit të fotos." },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      image_url = data.publicUrl;
    }

    // ---------------------------------------------------
    // 2️⃣ Nese NUK ka foto → perdor ikonë profesioni
    // ---------------------------------------------------
    if (!image_url) {
      image_url = `/images/professions/${profession.toLowerCase()}.svg`;
    }

    // ---------------------------------------------------
    // 3️⃣ Ruaj POST-in në tabelë
    // ---------------------------------------------------
    const { error: insertError } = await supabase.from("posts").insert({
      title,
      description,
      city,
      profession,
      age,
      work_time,
      payment,
      payment_currency,
      contact,
      type,
      status: "pending",
      image: image_url, // FIX i madh
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
      { error: "Gabim i papritur në server." },
      { status: 500 }
    );
  }
}
