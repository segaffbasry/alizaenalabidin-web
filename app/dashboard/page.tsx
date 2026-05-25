import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export const metadata = {
  title: "Dashboard | Ali Zaenal Abidin",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?callbackUrl=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role, plan, plan_expires_at, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  return (
    <main className="min-h-screen bg-[var(--color-primary)] pt-20 pb-16">
      <DashboardShell
        user={{
          id: user.id,
          name: profile.name,
          email: user.email!,
          role: profile.role,
          plan: profile.plan || "free",
          plan_expires_at: profile.plan_expires_at,
          createdAt: profile.created_at,
        }}
      />
    </main>
  );
}
