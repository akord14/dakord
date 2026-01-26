"use client";

import { useState } from "react";
import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Kërko</h1>
            <p className="mt-1 text-sm text-slate-600">
              Shkruaj një fjalë kyçe (p.sh. “kamera”, “alarm”, “web”).
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            ← Home
          </Link>
        </div>

        {/* Search input */}
        <div className="mt-6 flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kërko…"
            className="w-full rounded-xl bg-transparent px-3 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            className="shrink-0 rounded-xl bg-[#1f5b8f] px-4 py-3 text-sm font-extrabold text-white"
          >
            Kërko
          </button>
        </div>

        {/* Services (filtered) */}
        <div className="mt-8">
          <ServicesGrid query={query} />
        </div>
      </div>
    </main>
  );
}
