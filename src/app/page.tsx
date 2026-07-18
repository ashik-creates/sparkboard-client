import { Hero } from "@/components/shared/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { AICoachPreview } from "@/components/sections/ai-coach-preview";
import { Categories } from "@/components/sections/categories";
import { Statistics } from "@/components/sections/statistics";
import { LatestBlogs } from "@/components/sections/latest-blogs";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import FeaturedSparks from "@/components/sections/featured-sparks";
import Marquee from "@/components/sections/Marquee";




export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* Hero Header Area */}
      <Hero />

      {/* ── STATS TICKER MARQUEE ────────────────────────────────────────── */}
      <Marquee />

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

    </div>
  );
}
