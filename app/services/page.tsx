import Link from "next/link";

export default function ServicesIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Shërbimet</h1>
      <p className="mt-2 text-slate-600">Zgjidh një shërbim nga homepage.</p>
      <Link className="mt-6 inline-block text-blue-700 underline" href="/">
        ← Kthehu në Home
      </Link>
    </main>
  );
}
