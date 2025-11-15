import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="max-w-3xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Paneli i adminit</h1>
      <p className="text-gray-600">
        Përdor këtë panel për të moderuar postimet në Akord.al.
      </p>
      <Link
        href="/admin/moderation"
        className="inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
      >
        Shko te postet në moderim
      </Link>
    </main>
  );
}
