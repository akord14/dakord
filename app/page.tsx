import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ProfessionIcon from "../components/ProfessionIcon";


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
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}

async function getLatestPosts(): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data) {
    console.error("Gabim duke lexuar postimet:", error);
    return [];
  }

  return data as Post[];
}

function formatType(type: Post["type"]) {
  if (type === "seeking") return "Kërkoj punë";
  if (type === "offering") return "Ofroj punë";
  return "";
}

export default async function HomePage() {
  const latestPosts = await getLatestPosts();

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
      {/* Container kryesor */}
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "24px 16px 80px",
        }}
      >
        {/* Header i thjeshtë */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                }}
              />
              <span style={{ fontSize: 20, fontWeight: 700 }}>Akord.al</span>
            </div>
          </Link>

          <Link
            href="/post/new"
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid #0ea5e9",
              fontSize: 14,
              textDecoration: "none",
              color: "#0f172a",
            }}
          >
            Krijo postim
          </Link>
        </header>

        {/* HERO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.5fr)",
            gap: 24,
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 32,
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Gjej njerëzit e duhur për punë.
              <br />
              Ose gjej punën që të përshtatet.
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "#4b5563",
                marginBottom: 24,
              }}
            >
              Akord.al lidh persona dhe biznese që kërkojnë ose ofrojnë punë,
              me fokus te thjeshtësia, qartësia dhe respekti për kohën tënde.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link
                href="/post/new"
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 40%, #0f172a 100%)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 14px 28px rgba(15, 23, 42, 0.25)",
                }}
              >
                KRIJO POSTIMIN TËND
              </Link>

              <div style={{ display: "flex", gap: 8 }}>
                <Link
                  href="/post?type=seeking"
                  style={{
                    padding: "9px 16px",
                    borderRadius: 999,
                    border: "1px solid #d1d5db",
                    background: "#ffffff",
                    fontSize: 14,
                    textDecoration: "none",
                    color: "#111827",
                  }}
                >
                  KËRKOJ PUNË
                </Link>
                <Link
                  href="/post?type=offering"
                  style={{
                    padding: "9px 16px",
                    borderRadius: 999,
                    border: "1px solid #d1d5db",
                    background: "#ffffff",
                    fontSize: 14,
                    textDecoration: "none",
                    color: "#111827",
                  }}
                >
                  OFROJ PUNË
                </Link>
              </div>
            </div>
          </div>

          {/* Kuti anësore me info të shpejtë */}
          <div
            style={{
              background: "#0f172a",
              color: "white",
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.45)",
            }}
          >
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 12 }}>
              Përdor Akord.al për:
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 14,
                display: "grid",
                gap: 8,
              }}
            >
              <li>• Punë të dyta dhe punë me kohë të pjesshme</li>
              <li>• Punë të shpejta në lagjen tënde</li>
              <li>• Punëtorë për biznesin tënd lokal</li>
            </ul>

            <div
              style={{
                marginTop: 18,
                fontSize: 12,
                opacity: 0.7,
                borderTop: "1px solid rgba(148, 163, 184, 0.3)",
                paddingTop: 10,
              }}
            >
              Çdo postim miratohet nga admini përpara se të shfaqet publikisht.
            </div>
          </div>
        </section>

        {/* Seksioni KËRKO */}
        <section
          style={{
            marginBottom: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ fontSize: 18, margin: 0 }}>Postimet e fundit</h2>

          <Link
            href="/post"
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid #0ea5e9",
              fontSize: 14,
              textDecoration: "none",
              color: "#0f172a",
              background: "#e0f2fe",
            }}
          >
            KËRKO
          </Link>
        </section>

        {/* Lista e postimeve të fundit */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {latestPosts.length === 0 && (
            <p style={{ fontSize: 14, color: "#6b7280" }}>
              Nuk ka ende postime të aprovuara. Bëhu i pari që krijon një
              postim.
            </p>
          )}

          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 14,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.06)",
                  height: "100%",
                }}
              >
                {/* Rreshti me ikonën + përmbajtjen */}
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <ProfessionIcon
                    text={`${post.title} ${
                      post.description ?? ""
                    } ${post.profession ?? ""}`}
                  />

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background:
                            post.type === "seeking" ? "#ecfeff" : "#eef2ff",
                          color:
                            post.type === "seeking" ? "#0891b2" : "#4f46e5",
                          border:
                            post.type === "seeking"
                              ? "1px solid #a5f3fc"
                              : "1px solid #c7d2fe",
                        }}
                      >
                        {formatType(post.type)}
                      </span>

                      {post.city && (
                        <span
                          style={{
                            fontSize: 11,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: "#f3f4f6",
                            color: "#4b5563",
                          }}
                        >
                          {post.city}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        margin: 0,
                        marginTop: 4,
                      }}
                    >
                      {post.title}
                    </h3>

                    {post.profession && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                        }}
                      >
                        {post.profession}
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        margin: "4px 0 8px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.description || "Nuk ka përshkrim të detajuar."}
                    </p>

                    <div
                      style={{
                        marginTop: "auto",
                        fontSize: 11,
                        color: "#9ca3af",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span>
                        {new Date(post.created_at).toLocaleDateString("sq-AL")}
                      </span>
                      <span>Shiko detajet →</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </div>

      {/* Butoni WhatsApp Suport */}
      <a
        href="https://wa.me/355695111179"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          width: 52,
          height: 52,
          borderRadius: 999,
          background: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 18px 40px rgba(22, 163, 74, 0.6)",
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontSize: 26,
            color: "white",
          }}
        >
          🟢
        </span>
      </a>
    </main>
  );
}
