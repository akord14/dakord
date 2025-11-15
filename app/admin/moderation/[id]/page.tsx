import { updatePostStatus } from "../actions";

export default function ModerationDetailTestPage({ params }: any) {
  const { id } = params;

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">ADMIN MODERATION TEST PAGE</h1>

      <p className="text-gray-700">
        ID e postit: <span className="font-mono">{id}</span>
      </p>

      <section className="flex gap-4 pt-4">
        <form action={updatePostStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value="approved" />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Mirato postimin
          </button>
        </form>

        <form action={updatePostStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value="refused" />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Refuzo postimin
          </button>
        </form>
      </section>
    </main>
  );
}
