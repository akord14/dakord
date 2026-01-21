import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <Suspense fallback={null}>
        <LoginClient />
      </Suspense>
    </main>
  );
}
