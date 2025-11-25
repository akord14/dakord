import { createClient } from "@supabase/supabase-js";

export default async function PostPage({ params }: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { id, slug } = params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    return <div className="p-6">Postimi nuk u gjet.</div>;
  }

  // Redirect në slugun zyrtar nëse dikush fut slug të gabuar
  if (post.slug && post.slug !== slug) {
    return (
      <meta 
        httpEquiv="refresh" 
        content={`0; url=/post/${post.id}/${post.slug}`} 
      />
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="rounded mb-4"
        />
      )}

      <p className="mb-4 whitespace-pre-line">{post.description}</p>

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Qyteti:</strong> {post.city}</p>
        <p><strong>Profesioni:</strong> {post.profession}</p>
        <p><strong>Orari:</strong> {post.work_time}</p>
        <p><strong>Mosha:</strong> {post.age}</p>
        <p><strong>Pagesa:</strong> {post.payment_amount} {post.payment_currency}</p>
        <p><strong>Kontakti:</strong> {post.contact}</p>
      </div>
    </div>
  );
}
