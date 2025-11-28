import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // ADMIN KEY

  if (!url || !key) {
    throw new Error("Supabase URL ose ADMIN KEY mungon.");
  }

  return createClient(url, key);
}

// -----------------------------
// FUNKSIONI PËR SLUG
// -----------------------------
function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ëç\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = getSupabaseAdmin();

    // Gjenerojmë slug automatikisht nga titulli
    const slug = createSlug(body.title);

    const { error } = await supabase.from("posts").insert([
      {
        type: body.type,
        title: body.title,
        description: body.description,
        contact: body.contact,
        status: "pending",

        // Fusha të tjera
        age: body.age || null,
        work_time: body.work_time || null,
        city: body.city || null,
        image: body.image || null,
        profession: body.profession || null,

        // Fusha e rregulluar
      
        // SLUG I RI
        slug: slug,
      },
    ]);

    if (error) {
  console.log("❌ SUPABASE ERROR:");
  console.log(JSON.stringify(error, null, 2));

  return NextResponse.json(
    { error: error.message || error },
    { status: 500 }
  );
}


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
