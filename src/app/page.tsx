"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/shared/hero";
import { FeaturedSparks } from "@/components/sections/featured-sparks";
import { HowItWorks } from "@/components/sections/how-it-works";
import { AICoachPreview } from "@/components/sections/ai-coach-preview";
import { Categories } from "@/components/sections/categories";
import { Statistics } from "@/components/sections/statistics";
import { LatestBlogs } from "@/components/sections/latest-blogs";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

// ─── Stats Ticker Data ────────────────────────────────────────────────────────

const TICKER_STATS = [
  { value: "12,400+", label: "Ideas Scored" },
  { value: "94.2%",   label: "Precision Rate" },
  { value: "47s",     label: "Generation Speed" },
  { value: "280+",    label: "Niches Tracked" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Pinned Navigation Header */}
      <Navbar />

      {/* Hero Header Area */}
      <Hero />

      {/* ── STATS TICKER MARQUEE ────────────────────────────────────────── */}
      <div className="border-b border-border bg-card-bg overflow-hidden py-5 select-none" aria-hidden="true">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {/* Duplicate for infinite horizontal scrolling marquee effect */}
          {[...TICKER_STATS, ...TICKER_STATS, ...TICKER_STATS].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-12 border-r border-border last:border-r-0"
            >
              <span className="font-heading text-lg font-bold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Sparks ledger */}
      <FeaturedSparks />

      {/* Step by step validation procedure */}
      <HowItWorks />

      {/* Feature breakdown with Board Buddy */}
      <AICoachPreview />

      {/* Categories / Niches catalog */}
      <Categories />

      {/* Quantified layout metrics grid */}
      <Statistics />

      {/* Industry articles and guides ledger */}
      <LatestBlogs />

      {/* Frequently Asked Questions accordion */}
      <FAQ />

      {/* Bottom Conversion Section */}
      <CTA />

      {/* Bottom Footer Info */}
      <Footer />
    </div>
  );
}
