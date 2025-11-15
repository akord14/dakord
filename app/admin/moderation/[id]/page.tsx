import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { updatePostStatus } from "../actions";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: string;
  created_at: string;
};

export default async function ModerationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("id", id)
    .single<Post>();

  if (error || !data) {
    console.error("Gabim gjatë marrjes së postimit:", error);
    return (
      <main className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">Posti nuk u gjet</h1>
        <p className="text-gray-600">
          Ky post nuk ekziston më ose është fshirë.
        </p>
      </main>
    );
  }

  const post = data;

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500">
          ID: {post.id} • Status:{" "}
          <span className="font-semibold">{post.status}</span>
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Përshkrimi</h2>
        <p className="whitespace-pre-line text-gray-800">
          {post.description}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Kontakti</h2>
        <p className="text-gray-800">{post.contact}</p>
      </section>

      <section className="flex gap-4 pt-6">
        {/* Mirato */}
        <form action={updatePostStatus}>
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="status" value="approved" />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700"
          >
            Mirato postimin
          </button>
        </form>

        {/* Refuzo */}
        <form action={updatePostStatus}>
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="status" value="refused" />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-600 text-white text-sm font-medium hover:bg-red-700"
          >
            Refuzo postimin
          </button>
        </form>
      </section>
    </main>
  );
}
