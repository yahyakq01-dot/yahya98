import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background-base text-ink-primary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center">
              <span className="text-base font-black gradient-text">YK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-ink-muted">
                Signed in as {user.email}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-background-surface border border-white/8 rounded-3xl p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-success/15 border border-success/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-black mb-3">Authentication Working!</h2>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-md mx-auto">
            You&apos;re logged in as an admin. The full admin dashboard with
            edit forms for all content will be built in the next phases.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              ← Back to portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
