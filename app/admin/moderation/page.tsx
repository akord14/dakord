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

// Lexim me anon key
function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(url!, key!);
}

// Update me service role key (admin)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return createClient(url!, serviceKey!);
}

// Merr postet pending
async function getPendingPosts(): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (data ?? []) as Post[];
}

// SERVER ACTION - PA EXPORT ❗
async function updatePostStatus(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const action = formData.get("action") as string;

  const newStatus = action === "approve" ? "approved" : "refused";

  const supabase = getSupabaseAdmin();

  await supabase
    .from("posts")
    .update({ status: newStatus })
    .eq("id", id);

  revalidatePath("/admin/moderation");
  redirect("/admin/moderation");
}

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
