"use client";
import { useState } from "react";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function ModerationPage() {
  const [adminPass, setAdminPass] = useState("");
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!adminPass) {
      alert("Vendos fjalëkalimin e adminit.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/moderation", {
        headers: { "x-admin-pass": adminPass },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gabim ngarkimi");
      setItems(data.items || []);
    } catch (e: any) {
      alert(e.message || "Gabim");
    } finally {
      setLoading(false);
    }
  }

  async function act(id: string, action: "approve" | "reject") {
    try {
      const res = await fetch("/api/moderation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pass": adminPass,
        },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gabim veprimi");
      setItems(prev => prev.filter(p => p.id !== id));
    } catch (e: any) {
      alert(e.message || "Gabim");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Moderimi i postimeve</h1>

      <div className="flex gap-2 items-center">
        <input
          type="password"
          className="border rounded p-2 w-72"
          placeholder="Fjalëkalimi i adminit"
          value={adminPass}
          onChange={e => setAdminPass(e.target.value)}
        />
        <button
          onClick={load}
          className="px-3 py-2 rounded bg-black text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Duke ngarkuar..." : "Ngarko pending"}
        </button>
      </div>

      {!loading && items.length === 0 && (
        <p className="text-sm opacity-70">
          S’ka asgjë në pending (ose fut fjalëkalimin dhe kliko “Ngarko”).
        </p>
      )}

      <div className="space-y-4">
        {items.map(p => (
          <div key={p.id} className="border rounded p-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-medium">{p.title}</h2>
              <span className="text-xs uppercase">{p.type}</span>
            </div>
            <p className="text-xs opacity-60 mb-2">
              {new Date(p.created_at).toLocaleString()}
            </p>
            <p className="whitespace-pre-wrap mb-2">{p.description}</p>
            <p className="text-sm mb-3">Kontakt: {p.contact}</p>
            <div className="flex gap-2">
              <button
                onClick={() => act(p.id, "approve")}
                className="px-3 py-1 rounded bg-green-600 text-white"
              >
                Aprovo
              </button>
              <button
                onClick={() => act(p.id, "reject")}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Refuzo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
