import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactActions from "./ContactActions";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string | null;
  contact: string;
  status: string;
  created_at: string;
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

async function getPost(id: string): Promise<Post | null> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Gabim duke lexuar postin:", error);
    return null;
  }

  return data as Post;
}

function formatType(type: Post["type"]) {
  if (type === "seeking") return "Kërkoj punë";
  if (type === "offering") return "Ofroj punë";
  return "";
}

function extractPhone(contact: string): string | null {
  // nxjerr vetëm shifrat + plus
  const match = contact.match(/(\+?\d[\d\s]+)/);
  if (!match) return null;
  return match[1].replace(/\s+/g, "");
}

export default async function PostDetailPage({ params }: any) {
  const id = params?.id as string;
  const post = await getPost(id);


  if (!post || post.status === "refused") {
    notFound();
  }

  const phone = extractPhone(post.contact || "") || null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "32px 16px 56px",
        }}
      >
        {/* Breadcrumb + back */}
        <div
          style={{
            marginBottom: 16,
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#6b7280",
              }}
            >
              ← Kthehu te faqja kryesore
            </Link>
          </div>

          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            {new Date(post.created_at).toLocaleDateString("sq-AL")}
          </div>
        </div>

        {/* Karta kryesore */}
        <article
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 24px 50px rgba(15,23,42,0.12)",
            border: "1px solid #e5e7eb",
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
            gap: 24,
          }}
        >
          {/* Info kryesore */}
          <div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background:
                    post.type === "seeking" ? "#ecfeff" : "#eef2ff",
                  color: post.type === "seeking" ? "#0891b2" : "#4f46e5",
                  border:
                    post.type === "seeking"
                      ? "1px solid #a5f3fc"
                      : "1px solid #c7d2fe",
                }}
              >
                {formatType(post.type)}
              </span>

              {post.status === "approved" && (
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "#dcfce7",
                    color: "#166534",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  Miratuar
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: 24,
                marginBottom: 6,
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                marginBottom: 18,
              }}
            >
              {post.description || "Ky postim nuk ka përshkrim të detajuar."}
            </p>

            <div
              style={{
                marginTop: 16,
                fontSize: 13,
                color: "#6b7280",
                whiteSpace: "pre-line",
              }}
            >
              <strong>Kontakt: </strong>
              {post.contact}
            </div>
          </div>

          {/* Paneli i djathtë: kontakt + butona */}
          <aside
            style={{
              background: "#0f172a",
              color: "white",
              borderRadius: 20,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Kontakto
              </h2>
              <p
                style={{
                  fontSize: 13,
                  opacity: 0.8,
                  marginBottom: 10,
                }}
              >
                Përdor një nga butonat më poshtë për të kontaktuar shpejt
                personin ose biznesin.
              </p>

              <div
                style={{
                  fontSize: 13,
                  background: "rgba(15,23,42,0.75)",
                  borderRadius: 12,
                  padding: 10,
                  border: "1px solid rgba(148,163,184,0.4)",
                  marginBottom: 8,
                }}
              >
                {post.contact || "Nuk ka kontakt të specifikuar."}
              </div>
            </div>

            <ContactActions phone={phone} contactText={post.contact || ""} />
          </aside>
        </article>
      </div>
    </main>
  );
}
