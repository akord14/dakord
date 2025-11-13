import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Post = {
  id: string | number;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: string;
  created_at: string;
};

// Lexim me anon key (për të marrë listën e posteve)
function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

// Update me SERVICE ROLE KEY (admin)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Mungon SUPABASE_SERVICE_ROLE_KEY ose URL e Supabase");
  }

  return createClient(url, serviceKey);
}

// Merr postet pending
async function getPendingPosts(): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Gabim gjatë ngarkimit të posteve pending:", error);
    return [];
  }

  return (data ?? []) as Post[];
}

// SERVER ACTION për butonat Aprovo / Refuzo
export async function updatePostStatus(formData: FormData) {
  "use server";

  const id = formData.get("id");
  const action = formData.get("action");

  console.log("➡️ updatePostStatus called with:", { id, action });

  if (!id || typeof id !== "string" || !action || typeof action !== "string") {
    console.error("❌ ID ose action mungon ose nuk është string:", { id, action });
    return;
  }

  // Në DB ke UUID string, kështu që idValue është string
  const idValue: string = id;
  const newStatus = action === "approve" ? "approved" : "refused";

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("posts")
    .update({ status: newStatus } as any)
    .eq("id", idValue as any)
    .select();

  console.log("✅ Supabase update result:", { data, error });

  if (error) {
    console.error("❌ Gabim gjatë përditësimit të statusit:", error);
  }

  // rifresko faqen dhe bëj reload
  revalidatePath("/admin/moderation");
  redirect("/admin/moderation");
}

// KOMPONENTI KRYESOR I FAQES
export default async function ModerationPage() {
  const posts = await getPendingPosts();

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Moderimi i postimeve</h1>

      {posts.length === 0 ? (
        <p>S&apos;ka asgjë në pending.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {posts.map((post) => (
            <section
              key={post.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 16,
                background: "#ffffff",
                boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  opacity: 0.7,
                  marginBottom: 4,
                }}
              >
                {post.type === "seeking" ? "Kërkon punë" : "Ofron punë"} ·{" "}
                {new Date(post.created_at).toLocaleString("sq-AL")}
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 8 }}>{post.title}</h2>

              <p style={{ marginBottom: 8 }}>{post.description}</p>

              <p style={{ fontWeight: 500, marginBottom: 12 }}>
                Kontakt: {post.contact}
              </p>

              {/* Dy forma të ndara që dërgojnë action-in si hidden field */}
              <div style={{ display: "flex", gap: 8 }}>
                <form action={updatePostStatus}>
                  <input type="hidden" name="id" value={String(post.id)} />
                  <input type="hidden" name="action" value="approve" />
                  <button
                    type="submit"
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✅ Aprovo
                  </button>
                </form>

                <form action={updatePostStatus}>
                  <input type="hidden" name="id" value={String(post.id)} />
                  <input type="hidden" name="action" value="refuse" />
                  <button
                    type="submit"
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Refuzo
                  </button>
                </form>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
