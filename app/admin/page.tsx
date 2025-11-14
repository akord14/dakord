"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === correctPassword) {
      router.push("/admin/moderation");
    } else {
      alert("Password i gabuar");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Admin Moderation — Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12 }}>
        <input
          type="password"
          placeholder="Fut password-in"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Hyr
        </button>
      </form>
    </div>
  );
}
