"use client";

import { useTransition } from "react";
import { approvePost, rejectPost } from "./actions";

export default function ApproveButtons({ id }: { id: string }) {
  const [pending, start] = useTransition();

  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={() => start(() => approvePost(id))}
        disabled={pending}
        style={{ marginRight: 10, background: "green", color: "white", padding: "6px 12px", borderRadius: 4 }}
      >
        Aprovo
      </button>

      <button
        onClick={() => start(() => rejectPost(id))}
        disabled={pending}
        style={{ background: "red", color: "white", padding: "6px 12px", borderRadius: 4 }}
      >
        Refuzo
      </button>
    </div>
  );
}
