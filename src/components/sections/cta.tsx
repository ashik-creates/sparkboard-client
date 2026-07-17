"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";

interface CTAProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  buttonText?: string;
  helperText?: string;
}

const DEFAULT_TITLE = (
  <>
    Your idea deserves <br className="hidden md:inline" />
    more than a notes app.
  </>
);

const DEFAULT_SUBTITLE =
  "Join 12,400+ founders who validated faster, pitched smarter, and built with more conviction — using SparkBoard as their unfair advantage.";

export function CTA({
  eyebrow = "Start Today",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  buttonText = "Validate for Free →",
  helperText = "No credit card required",
}: CTAProps) {
  const router = useRouter();
  const { user } = useAuth();

  const handleCtaClick = () => {
    if (user) {
      router.push("/manage-ideas");
    } else {
      router.push("/auth/signup");
    }
  };

  return (
    <section className="border-t border-b border-border bg-card-bg px-6 md:px-12 lg:px-16 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-16">
        
        {/* Text Block */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            {eyebrow}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-primary leading-[1.05]">
            {title}
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-3 w-full sm:w-auto flex-shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCtaClick}
            className="w-full sm:w-auto px-10 py-5 text-xs font-semibold"
          >
            {user ? "Go to Workspace →" : buttonText}
          </Button>
          <span className="font-sans text-[10px] text-muted uppercase tracking-wider text-center lg:text-left pl-1">
            {helperText}
          </span>
        </div>

      </div>
    </section>
  );
}
