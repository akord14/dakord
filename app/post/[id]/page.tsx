// app/post/[id]/page.tsx
import React from "react";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        TEST POST PAGE
      </h1>
      <p style={{ fontSize: "16px" }}>Ky është detaji i postit me ID:</p>
      <p
        style={{
          marginTop: "8px",
          padding: "8px 12px",
          borderRadius: "999px",
          background: "white",
          color: "#0f172a",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        {params.id}
      </p>
    </div>
  );
}
