"use client";

import { useAuth } from "@/providers/auth-context";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user && typeof window !== "undefined") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-16 py-16 flex flex-col gap-12">
        {/* Editorial Heading */}
        <div className="flex flex-col gap-2 border-b border-border pb-8">
          <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
            Configuration
          </span>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary">
            Settings Workspace.
          </h1>
        </div>

        {/* Profile Details Block */}
        <section className="flex flex-col md:flex-row justify-between gap-8 border-b border-border pb-8">
          <div className="md:w-1/3 flex flex-col gap-2">
            <h3 className="font-heading text-md uppercase font-bold text-primary">
              Profile Summary
            </h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              Your registered user details and workspace email connections.
            </p>
          </div>

          <div className="flex-1 bg-surface border border-border p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-secondary">
                Account Name
              </span>
              <span className="font-sans text-sm text-primary font-medium">
                {user?.name}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-border pt-4">
              <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-secondary">
                Email Address
              </span>
              <span className="font-sans text-sm text-primary font-medium">
                {user?.email}
              </span>
            </div>
          </div>
        </section>

        {/* Subscription Tier Block */}
        <section className="flex flex-col md:flex-row justify-between gap-8 border-b border-border pb-8">
          <div className="md:w-1/3 flex flex-col gap-2">
            <h3 className="font-heading text-md uppercase font-bold text-primary">
              Subscription Plan
            </h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              Upgrade or modify your premium tier privileges.
            </p>
          </div>

          <div className="flex-1 bg-surface border border-border p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-secondary">
                  Active Tier
                </span>
                <span className="font-heading text-lg font-bold text-accent uppercase">
                  {user?.plan} Sandbox
                </span>
              </div>
              <span className="bg-primary text-background font-sans text-[10px] uppercase px-3 py-1 font-semibold tracking-wider rounded-none">
                Active
              </span>
            </div>

            <div className="border-t border-border pt-4 flex flex-col gap-4">
              <p className="font-sans text-xs text-secondary leading-relaxed">
                {user?.plan === "free"
                  ? "You are currently using the Free tier. Upgrade to access unlimited canvas structures, market SWOT reports, and private co-founder chat sessions."
                  : "Thank you for supporting SparkBoard! You have full access to our B2B modules and unlimited validation reports."}
              </p>
              {user?.plan === "free" && (
                <Button variant="primary" size="sm" className="self-start">
                  Upgrade to Pro ($15/mo)
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* API Quota Tracking Block */}
        <section className="flex flex-col md:flex-row justify-between gap-8 pb-8">
          <div className="md:w-1/3 flex flex-col gap-2">
            <h3 className="font-heading text-md uppercase font-bold text-primary">
              Gemini Consumption
            </h3>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              Quota limit analysis for automated AI validation requests.
            </p>
          </div>

          <div className="flex-1 bg-surface border border-border p-8 flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs font-sans text-secondary font-medium">
              <span>Token Limits</span>
              <span>4 / 50 calls</span>
            </div>
            {/* Custom linear progress bar matching design constraints */}
            <div className="w-full h-2 bg-background border border-border rounded-none overflow-hidden">
              <div className="w-[8%] h-full bg-accent rounded-none" />
            </div>
            <p className="font-sans text-[11px] text-secondary leading-normal">
              Consumption resets on the 1st of every month. Basic rate limits apply.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
