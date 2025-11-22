export default async function PostsPage({ searchParams }: { searchParams: any }) {
  const params = searchParams ?? {};

  const typeParam =
    typeof params.type === "string"
      ? params.type
      : Array.isArray(params.type)
      ? params.type[0]
      : undefined;

  const workTimeParam =
    typeof params.work_time === "string"
      ? params.work_time
      : Array.isArray(params.work_time)
      ? params.work_time[0]
      : undefined;

  const posts = await getPosts({
    type: typeParam,
    work_time: workTimeParam,
  });

  const activeType =
    typeParam === "seeking" || typeParam === "offering"
      ? typeParam
      : undefined;

  const activeWorkTime =
    workTimeParam === "full_time" || workTimeParam === "part_time"
      ? workTimeParam
      : undefined;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* pjesa e layout-it vazhdon këtu siç e kishe */}
      </div>
    </main>
  );
}
