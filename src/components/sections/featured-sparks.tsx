"use client";

import { useRouter } from "next/navigation";

export interface SparkItem {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  score: number;
  canvas: boolean;
  author: string;
}

interface FeaturedSparksProps {
  title?: string;
  eyebrow?: string;
  sparks?: SparkItem[];
}

const DEFAULT_SPARKS: SparkItem[] = [
  {
    id: "1",
    tag: "FinTech",
    title: "Micro-Pension Engine for Gig Workers",
    excerpt:
      "Automated fractional pension contributions deducted per completed gig. Targets the 1.7B unbanked informal workforce with zero onboarding friction.",
    score: 87,
    canvas: true,
    author: "Arjun M.",
  },
  {
    id: "2",
    tag: "HealthTech",
    title: "AI Triage Assistant for Rural Clinics",
    excerpt:
      "Offline-first LLM symptom router that operates on sub-$50 Android devices. Reduces misdiagnosis rates by pre-sorting patient queues before physician review.",
    score: 92,
    canvas: true,
    author: "Fatima K.",
  },
  {
    id: "3",
    tag: "EdTech",
    title: "Peer-Verified Skill Credentialing",
    excerpt:
      "Blockchain-attested micro-certificates issued via peer assessment panels. Competes with degree inflation by anchoring credentials to demonstrated output.",
    score: 79,
    canvas: false,
    author: "Marcus T.",
  },
];

export function FeaturedSparks({
  title = "Ideas in the Wild.",
  eyebrow = "Community Sparks",
  sparks = DEFAULT_SPARKS,
}: FeaturedSparksProps) {
  const router = useRouter();

  return (
    <section
      id="explore"
      className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-background border-b border-border"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {eyebrow}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              {title}
            </h2>
          </div>
          <button
            onClick={() => router.push("/ideas")}
            className="font-sans text-[11px] uppercase tracking-widest text-secondary hover:text-accent border-b border-divider hover:border-accent pb-1 transition-all duration-200 w-fit"
          >
            Browse all sparks →
          </button>
        </div>

        {/* Sharp cornered, thin bordered card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-divider">
          {sparks.map((spark, i) => (
            <div
              key={spark.id}
              onClick={() => router.push(`/ideas/${spark.id}`)}
              className="p-8 md:p-10 flex flex-col gap-6 bg-card-bg hover:bg-surface transition-colors duration-200 cursor-pointer group rounded-none"
            >
              {/* Meta row */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
                  {spark.tag}
                </span>
                <span className="font-heading text-xs font-bold text-primary border border-border px-2.5 py-1 bg-background rounded-none">
                  {spark.score}
                  <span className="font-sans text-[9px] font-normal text-muted ml-0.5">
                    /100
                  </span>
                </span>
              </div>

              {/* Index counter */}
              <span className="font-heading text-5xl font-bold text-divider leading-none select-none">
                0{i + 1}
              </span>

              {/* Title */}
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary leading-snug group-hover:text-accent transition-colors duration-200">
                {spark.title}
              </h3>

              {/* Excerpt */}
              <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3">
                {spark.excerpt}
              </p>

              {/* Bottom footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-divider">
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
                  {spark.author}
                </span>
                {spark.canvas && (
                  <span className="font-sans text-[9px] uppercase tracking-widest text-accent border border-accent/20 px-2 py-0.5 bg-accent/5">
                    Canvas Ready
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
