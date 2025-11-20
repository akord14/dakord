"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

export default function ApproveButtons({ postId }: { postId: string }) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: "approved" | "refused") {
    try {
      setLoading(true);
      const supabase = getSupabaseAnon();

      const { error } = await supabase
        .from("posts")
        .update({ status })
        .eq("id", postId);

      if (error) {
        alert("Gabim gjatë ndryshimit të statusit.");
        console.error(error);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Gabim i papritur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateStatus("approved")}
        disabled={loading}
        className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
      >
        Prano
      </button>

      <button
        onClick={() => updateStatus("refused")}
        disabled={loading}
        className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
      >
        Refuzo
      </button>
    </div>
  );
}
