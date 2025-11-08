import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-8 text-center space-y-6">
      <h1 className="text-3xl font-bold">Mirësevini në Dakord.al 👋</h1>
      <p className="text-gray-600">Zgjidh një veprim më poshtë:</p>

      <div className="flex justify-center gap-4">
        <Link href="/post" className="underline text-blue-600">
          Shiko postimet
        </Link>
        <Link href="/post/new" className="underline text-green-600">
          Krijo postim
        </Link>
      </div>
    </main>
  );
}
