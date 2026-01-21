"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginClient() {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sp = useSearchParams();
  const router = useRouter();
  const next = sp.get("next") || "/admin";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.error || "Password gabim");
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setErr("Ndodhi një gabim. Provo përsëri.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <h1 className="text-2xl font-extrabold text-slate-900">Admin Login</h1>
      <p className="mt-2 text-sm text-slate-600">
        Shkruaj password-in për të hyrë në panel.
      </p>

      {err && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {err}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-300"
          placeholder="Password"
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#1f5b8f] px-4 py-3 text-sm font-extrabold text-white hover:opacity-95 disabled:opacity-60"
          type="submit"
        >
          {loading ? "Duke hyrë..." : "Hyr"}
        </button>
      </form>
    </div>
  );
}
