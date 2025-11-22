import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string | null;
  contact: string;
  status: string;
  created_at: string;
  city?: string | null;
  profession?: string | null;
  age?: number | null;
  work_time?: "full_time" | "part_time" | null;
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

export default function NewPostPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold">Krijo postim të ri</h1>

      <p className="mt-4 text-slate-600">
        Kjo faqe është për krijimin e postimeve. (Mund të shtojmë form më vonë.)
      </p>

      <Link
        href="/post"
        className="inline-block mt-6 px-4 py-2 bg-sky-600 text-white rounded-lg"
      >
        ← Kthehu te postimet
      </Link>
    </main>
  );
}
