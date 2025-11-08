import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-8 text-center space-y-6">
      <h1 className="text-3xl font-bold">Mirësevini në Dakord.al</h1>
      <div className="flex justify-center gap-4">
        <Link href="/post" className="underline">Shiko postimet</Link>
        <Link href="/post/new" className="underline">Krijo postim</Link>
      </div>
    </main>
  );
}
