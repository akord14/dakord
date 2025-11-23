import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const contact = formData.get("contact") as string;
    const age = formData.get("age") ? Number(formData.get("age")) : null;
    const work_time = formData.get("work_time") as string | null;
    const city = formData.get("city") as string;

    const file = formData.get("file") as File | null;

    // Supabase
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(url, anon);

    let image_url = null;

    // ------------------------------------------------------
    // Upload Foto në Supabase Storage (nëse ekziston)
    // ------------------------------------------------------
    if (file) {
      const ext = file.name.split(".").pop();
      const fileName = `post-${Date.now()}.${ext}`;

      // upload
      const { data, error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) {
        console.error(uploadError);
        return NextResponse.json(
          { error: "Gabim gjatë ngarkimit të fotos." },
          { status: 500 }
        );
      }

      // marrim URL publike
      const { data: publicUrlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      image_url = publicUrlData.publicUrl;
    }

    // ------------------------------------------------------
    // Futja në tabelën posts
    // ------------------------------------------------------
    const { error: insertError } = await supabase.from("posts").insert([
      {
        type,
        title,
        description,
        contact,
        status: "pending",
        age,
        work_time,
        city,
        image_url,
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
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Gabim në server. Provo përsëri." },
      { status: 500 }
    );
  }
}
