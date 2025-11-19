// app/post/[id]/page.tsx

export default function PostPage({ params }: { params: { id: string } }) {
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
      <p style={{ fontSize: "16px" }}>
        Ky është detaji i postit me ID:
      </p>
      <p
        style={{
          marginTop: "8px",
          padding: "8px 12px",
          borde
