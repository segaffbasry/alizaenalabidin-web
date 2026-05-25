import { Suspense } from "react";
import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Daftar | Ali Zaenal Abidin",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center px-4 py-24">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
