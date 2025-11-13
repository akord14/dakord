import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";

  const password = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD nuk është vendosur në environment!");
    redirect("/admin?error=server");
  }

  if (password === adminPassword) {
    // Nëse password është i saktë, shko te paneli i moderimit
    redirect("/admin/moderation");
  } else {
    // Nëse është gabim, kthehu te /admin me error
    redirect("/admin?error=1");
  }
}

// VËREJTJE: këtu nuk vendosim tip strict, përdorim `any` që të mos na pengojë TS në build
export default function AdminLoginPage({ searchParams }: any) {
  const rawError = searchParams?.error;
  const error = Array.isArray(rawError) ? rawError[0] : rawError;

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 400,
        margin: "60px auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Admin Login</h1>

      <form action={login} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="password"
          name="password"
          placeholder="Vendos password-in e adminit"
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Hyr
        </button>
      </form>

      {error === "1" && (
        <p style={{ color: "red", marginTop: 12 }}>Password i gabuar.</p>
      )}
      {error === "server" && (
        <p style={{ color: "red", marginTop: 12 }}>
          Mungon variabla ADMIN_PASSWORD në Vercel.
        </p>
      )}
    </div>
  );
}
