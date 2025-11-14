import { createClient } from "@supabase/supabase-js";
import ApproveButtons from "./approve-buttons";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: string;
  created_at: string;
};

async function getPendingPosts(): Promise<Post[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error(error);
    return [];
  }

  return data;
}

export default async function ModerationPage() {
  const posts = await getPendingPosts();

  return (
    <div style={{ padding: 20 }}>
      <h1>Poste në moderim</h1>

      {posts.length === 0 && <p>Nuk ka postime për aprovuar.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: 20,
            padding: 10,
            border: "1px solid #ccc",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>
            <b>Kontakt:</b> {post.contact}
          </p>
          <ApproveButtons id={post.id} />
        </div>
      ))}
    </div>
  );
}
