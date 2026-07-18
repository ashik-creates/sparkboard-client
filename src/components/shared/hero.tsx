"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-context";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  stats?: HeroStat[];
}

// ─── Default Constants ────────────────────────────────────────────────────────

const DEFAULT_STATS: HeroStat[] = [
  { value: "12,400+", label: "Ideas Scored" },
  { value: "94.2%", label: "Precision Rate" },
  { value: "47s", label: "Generation Speed" },
  { value: "280+", label: "Niches Tracked" },
];

const DEFAULT_TITLE = (
  <>
    Build. Validate. <br />
    Refine Startup Ideas.
  </>
);

const DEFAULT_SUBTITLE =
  "SparkBoard transforms raw startup concepts into structured Lean Canvases and AI-powered feasibility analysis. Validate, refine, and improve your ideas with intelligent insights.";

// ─── Main Hero Component ──────────────────────────────────────────────────────

export function Hero({
  eyebrow = "AI-Powered Startup Intelligence",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  primaryCtaText = "Validate Your Idea",
  secondaryCtaText = "Explore Ideas",
  stats = DEFAULT_STATS,
}: HeroProps) {
  const router = useRouter();

  const { user } = useAuth();

  const handlePrimaryClick = () => {
    if (user) {
      router.push("/manage-ideas");
    } else {
      router.push("/auth/signup");
    }
  };

  const handleSecondaryClick = () => {
    router.push("/ideas");
  };

  return (
    <section
      role="region"
      aria-label="SparkBoard Hero"
      className="relative bg-background border-b border-border min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden editorial-grid px-6 md:px-12 lg:px-16 py-16 md:py-24"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Content */}

        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 md:gap-8 z-10">
          <span className="font-sans text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            {eyebrow}
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-primary leading-[1.05]">
            {title}
          </h1>

          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed max-w-xl">
            {subtitle}
          </p>

          {/* CTA Buttons */}

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={handlePrimaryClick}
              className="w-full sm:w-auto"
            >
              {primaryCtaText}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleSecondaryClick}
              className="w-full sm:w-auto"
            >
              {secondaryCtaText}
            </Button>
          </div>
        </div>

        {/* Right Metrics Card */}

        <div className="lg:col-span-5 flex justify-center z-10 w-full">
          <div className="w-full bg-card-bg border border-border p-8 rounded-none flex flex-col gap-6 transition-colors duration-200">
            <div
              className="w-full h-24 border border-dashed border-border flex items-center justify-between px-6 select-none"
              aria-hidden="true"
            >
              <div className="flex flex-col gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent" />

                <span className="font-sans text-[8px] uppercase tracking-widest text-muted">
                  Gemini AI Engine
                </span>
              </div>

              <div className="h-full w-px bg-divider" />

              <div className="flex flex-col items-end gap-1">
                <span className="font-heading text-[10px] uppercase font-bold text-accent">
                  Status: Active
                </span>

                <span className="font-sans text-[8px] text-muted tracking-widest">
                  Live validation feeds
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-accent font-bold">
                Ecosystem Metrics
              </span>

              <h3 className="font-heading text-lg font-bold uppercase text-primary tracking-tight">
                Validation Metrics.
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-px bg-divider border border-divider">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card-bg p-5 flex flex-col gap-1.5"
                >
                  <span className="font-heading text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    {stat.value}
                  </span>

                  <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-divider">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />

              <span className="font-sans text-[9px] uppercase tracking-widest text-muted">
                AI validation systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
