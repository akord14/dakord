"use client";

import Link from "next/link";
import { useState } from "react";

export default function OfertaPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setOk(false);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const phone = String(fd.get("phone") || "").trim();
    if (!phone) {
      setError("Numri WhatsApp është i detyrueshëm.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_text: fd.get("service_text"),
          details: fd.get("details"),
          city: fd.get("city"),
          budget_min: fd.get("budget_min"),
          budget_max: fd.get("budget_max"),
          timeline: fd.get("timeline"),
          phone,
          hp: fd.get("hp"), // honeypot
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Ndodhi një gabim. Provo përsëri.");
        return;
      }

      setOk(true);
      form.reset();
    } catch {
      setError("Ndodhi një gabim. Provo përsëri.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Merr Ofertën
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Plotëso sa të duash. Vetëm numri i WhatsApp është i detyrueshëm.
        </p>

        {ok && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Kërkesa u dërgua me sukses. Do të të kontaktojmë sa më shpejt.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {/* Honeypot (anti-spam) */}
          <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="text-sm font-semibold text-slate-900">
              Çfarë shërbimi do? (opsionale)
            </label>
            <input
              name="service_text"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-300"
              placeholder="p.sh. Dua të montoj një kondicioner"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900">
              Përshkrim (opsionale)
            </label>
            <textarea
              name="details"
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-300"
              placeholder="p.sh. Kondicioner 12.000 BTU, muri beton, dua instalim + tubacione..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900">
              Qyteti / Zona (opsionale)
            </label>
            <input
              name="city"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-300"
              placeholder="p.sh. Tiranë, Astir"
            />
          </div>

        <div className="grid grid-cols-2 gap-3">
  <div>
    <label className="text-sm font-semibold text-slate-900">
      Buxheti min (EUR)
    </label>
    <div className="relative mt-2">
      <input
        name="budget_min"
        inputMode="numeric"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 text-sm outline-none focus:border-slate-300"
        placeholder="Min"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
        €
      </span>
    </div>
  </div>

  <div>
    <label className="text-sm font-semibold text-slate-900">
      Buxheti max (EUR)
    </label>
    <div className="relative mt-2">
      <input
        name="budget_max"
        inputMode="numeric"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 text-sm outline-none focus:border-slate-300"
        placeholder="Max"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
        €
      </span>
    </div>
  </div>
</div>

          <div>
            <label className="text-sm font-semibold text-slate-900">
              Afati (opsionale)
            </label>
            <input
              name="timeline"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-300"
              placeholder="p.sh. Sot / Brenda javës / Pa nxitim"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900">
              Numri WhatsApp (i detyrueshëm)
            </label>
            <input
              name="phone"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-300"
              placeholder="p.sh. +355 69 123 4567"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Duke dërguar..." : "Dërgo kërkesën"}
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Kthehu
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
