"use client";

import { useState } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ADMIN_PASSWORD) {
      setError("Mungon NEXT_PUBLIC_ADMIN_PASSWORD në konfigurim.");
      return;
    }

    if (password === ADMIN_PASSWORD) {
      setOk(true);
      setError("");
    } else {
      setError("Fjalëkalimi është i gabuar.");
    }
  };

  if (ok) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h1 className="text-xl font-semibold">Paneli i adminit</h1>
          <p className="text-sm text-gray-600">
            Fjalëkalimi u verifikua. Vazhdo te moderimi i postimeve.
          </p>

          <Link
            href="/admin/moderation"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Hape panelin e moderimit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold">Hyrje për admin</h1>
        <p className="text-sm text-gray-600">
          Vendos fjalëkalimin e adminit për të hyrë në panelin e moderimit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Fjalëkalimi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Hyr
          </button>
        </form>
      </div>
    </div>
  );
}
