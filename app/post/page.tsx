import { supabaseServer } from "@/lib/supabaseServer";
const PROF_TO_IMG = {
  // Shoferë
  "Shofer furgoni": "/images/professions/driver.svg",
  "Shofer kamioni": "/images/professions/driver.svg",
  "Shofer taksie": "/images/professions/driver.svg",
  "Shofer personal": "/images/professions/driver.svg",
  "Korrier / Delivery": "/images/professions/driver.svg",

  // Elektrik & instalime
  "Elektricist": "/images/professions/electrician.svg",
  "Instalues kamerash sigurie": "/images/professions/electrician.svg",
  "Teknik alarmi": "/images/professions/electrician.svg",
  "Montim kondicionerësh": "/images/professions/electrician.svg",
  "Instalues interneti / rrjeti": "/images/professions/electrician.svg",
  "Teknik mirëmbajtjeje": "/images/professions/electrician.svg",

  // Call center & operator
  "Operator Call Center": "/images/professions/operator.svg",

  // Default për çdo profesion tjetër
  Tjetër: "/images/professions/other.svg",
};

type Post = {
  id: string;
  title: string;
  description: string | null;
  contact: string | null;
  payment: string | null;
  payment_currency: "EUR" | "USD" | "ALL" | null;
  profession: string | null;
  image: string | null;
  type: "seeking" | "offering";
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export const revalidate = 0; // pa cache gjatë zhvillimit

export default async function PostsPage() {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,title,description,contact,payment,payment_currency,profession,image,type,status,created_at"
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        Gabim gjatë leximit të postimeve: {error.message}
      </div>
    );
  }

  const posts = (data ?? []) as Post[];

  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-600">
        Nuk ka ende postime të aprovuara. ✨
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Postimet</h1>

      {/* Grid responsive 1 → 2 → 3 kolona */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => {
         
        const desc = (p.description ?? "").trim();
        const short =
         desc.length > 140 ? desc.slice(0, 140).trimEnd() + "..." : desc;

         const professionKey = p.profession ?? "Tjetër";
         const imageSrc =
  PROF_TO_IMG[professionKey] || "/images/professions/other.svg";

  return (
    <article
      key={p.id}
      className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
    >

          return (
            <article
              key={p.id}
              className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Ilustrimi sipër */}
              
<div className="relative w-full aspect-[16/9] bg-gray-50">
  <img
    src={imageSrc}
    alt={p.profession ?? "Ikonë profesion"}
    className="absolute inset-0 w-full h-full object-contain p-6"
    loading="lazy"
  />
</div>


              <div className="p-4 space-y-2">
                {/* Titulli + badge tipi */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold leading-snug">{p.title}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      p.type === "offering"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {p.type === "offering" ? "Ofroj" : "Kërkoj"}
                  </span>
                </div>

                {/* Pagesa */}
                {p.payment ? (
                  <div className="text-sm">
                    <span className="inline-block px-2 py-1 rounded-md bg-gray-100">
                      💶 {p.payment} {p.payment_currency ?? ""}
                    </span>
                  </div>
                ) : null}

                {/* Përshkrim i shkurtuar */}
                {short ? (
                  <p className="text-sm text-gray-600">{short}</p>
                ) : null}

                {/* Kontakt */}
                
{p.contact ? (
  <div className="mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-sm">
    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
      Kontakt
    </p>
    <p className="mt-1 text-sm font-semibold text-gray-900">
      {p.contact}
    </p>
  </div>
) : null}

                  

                <div className="pt-2">
                  <a
                    href={`/post/${p.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Shiko më shumë →
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
