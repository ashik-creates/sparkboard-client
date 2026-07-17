"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-context";
import { useState } from "react";

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURED_SPARKS = [
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

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Capture the Raw Spark",
    body: "Write your startup idea in plain language — one sentence or twenty. No templates, no structure required. SparkBoard handles the scaffolding.",
  },
  {
    step: "02",
    title: "AI Builds the Canvas",
    body: "Gemini maps your input to a 9-block Lean Canvas automatically: problem, solution, channels, revenue streams, cost structure, and more.",
  },
  {
    step: "03",
    title: "Validate Against Reality",
    body: "Receive a VC-grade SWOT analysis and a 0–100 Feasibility Score across five axes: market size, technical difficulty, competition, margins, and regulatory risk.",
  },
  {
    step: "04",
    title: "Refine with Your AI Co-Founder",
    body: "Board Buddy — your context-aware AI mentor — answers strategic questions, drafts pitch frameworks, and challenges assumptions in real time.",
  },
];

const AI_FEATURES = [
  {
    icon: "◈",
    label: "Lean Canvas",
    title: "Structure in seconds.",
    body: "Transform a rough paragraph into a complete 9-block Lean Canvas. Gemini extracts customer segments, revenue streams, cost drivers, and competitive advantages automatically.",
  },
  {
    icon: "◉",
    label: "Feasibility Score",
    title: "Data over intuition.",
    body: "A 0–100 composite score across five weighted dimensions: TAM, technical complexity, competitive density, unit economics, and regulatory exposure. Updated on every revision.",
  },
  {
    icon: "◎",
    label: "SWOT Analysis",
    title: "Full strategic picture.",
    body: "Auto-generated Strengths, Weaknesses, Opportunities, and Threats — each backed by market context and actionable recommendations from Gemini.",
  },
  {
    icon: "◐",
    label: "Board Buddy",
    title: "Your AI co-founder.",
    body: "A private conversational AI trained on your specific idea. Probe pricing models, stress-test GTM assumptions, and draft investor narratives — all within a single workspace.",
  },
];

const CATEGORIES = [
  { name: "FinTech", count: 148 },
  { name: "HealthTech", count: 113 },
  { name: "EdTech", count: 97 },
  { name: "Climate Tech", count: 84 },
  { name: "AgriTech", count: 62 },
  { name: "PropTech", count: 51 },
  { name: "LegalTech", count: 44 },
  { name: "SpaceTech", count: 29 },
];

const STATS = [
  { value: "12,400+", label: "Ideas Validated" },
  { value: "3,800+", label: "Lean Canvases Generated" },
  { value: "94%", label: "Average Accuracy on Feasibility" },
  { value: "47 sec", label: "Avg. Canvas Generation Time" },
  { value: "280+", label: "Countries Represented" },
  { value: "4.9 / 5", label: "Founder Satisfaction Score" },
];

const BLOG_POSTS = [
  {
    id: "1",
    tag: "AI Strategy",
    date: "Jul 14, 2026",
    title: "Why Lean Canvas is the Wrong Starting Point for AI Startups",
    excerpt:
      "Traditional Lean Canvas assumes static markets. When your moat is a foundation model, the rules of validation change completely.",
    readTime: "6 min read",
  },
  {
    id: "2",
    tag: "Product",
    date: "Jul 08, 2026",
    title: "The Feasibility Score: How We Quantify Startup Risk",
    excerpt:
      "A behind-the-scenes look at the five axes we use to score ideas and why regulatory exposure consistently outranks technical difficulty.",
    readTime: "8 min read",
  },
  {
    id: "3",
    tag: "Founder Stories",
    date: "Jul 01, 2026",
    title: "From Napkin to VC Deck in 72 Hours Using SparkBoard",
    excerpt:
      "Fatima Khan describes how she validated her AI Triage Assistant idea, generated a SWOT report, and landed a seed meeting — all in one weekend.",
    readTime: "5 min read",
  },
];

const FAQS = [
  {
    q: "Is SparkBoard only for technical founders?",
    a: "Not at all. SparkBoard is designed for anyone with an idea — developers, designers, domain experts, and business generalists alike. If you can write a sentence, you can use SparkBoard.",
  },
  {
    q: "How does the AI validate my idea?",
    a: "SparkBoard uses Gemini to analyze your input across multiple dimensions: market sizing signals, competitive landscape, technical complexity, regulatory environment, and unit economics. The result is a structured canvas and a scored validation report.",
  },
  {
    q: "Is my idea kept private?",
    a: "Yes. Every idea is scoped to your account and never shared publicly unless you explicitly choose to publish it to the Explore feed.",
  },
  {
    q: "What is Board Buddy?",
    a: "Board Buddy is your context-aware AI co-founder. It operates within the boundary of your specific idea — answering strategic questions, drafting pitch content, and challenging weak assumptions.",
  },
  {
    q: "Can I export my Lean Canvas?",
    a: "Export to PDF and Markdown is available on the Pro tier. Free accounts can copy individual canvas sections at any time.",
  },
];

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();
  const { user, signIn } = useAuth();

  const handlePrimaryCTA = () => {
    router.push(user ? "/ideas" : "/auth/signup");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="editorial-grid relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-40 overflow-hidden">
        {/* Top eyebrow */}
        <span className="animate-fade-in font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-6">
          AI-Powered Startup Intelligence
        </span>

        {/* Headline */}
        <h1 className="animate-fade-in delay-100 font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-[0.95] uppercase mb-8 max-w-5xl">
          Build. Validate.{" "}
          <br className="hidden md:inline" />
          Ship Smarter.
        </h1>

        {/* Sub-headline */}
        <p className="animate-fade-in delay-200 font-sans text-base md:text-lg text-secondary max-w-2xl leading-relaxed mb-10">
          SparkBoard transforms raw startup thoughts into structured Lean
          Canvases, VC-grade feasibility scores, and SWOT reports — powered by
          Gemini AI. Your co-founder never sleeps.
        </p>

        {/* CTA cluster */}
        <div className="animate-fade-in delay-300 flex flex-col sm:flex-row gap-3 mb-16">
          <Button variant="primary" size="lg" onClick={handlePrimaryCTA}>
            {user ? "Open My Workspace" : "Start Validating Free"}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => signIn("Jane Doe", "jane@example.com")}
          >
            Try Live Demo
          </Button>
        </div>

        {/* Social proof micro-line */}
        <p className="animate-fade-in delay-400 font-sans text-[10px] uppercase tracking-widest text-secondary/60">
          Trusted by 12,400+ founders across 280 countries
        </p>
      </section>

      {/* ── STATS TICKER ──────────────────────────────────────────────────── */}
      <div className="border-t border-b border-border bg-surface overflow-hidden py-5">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {/* Duplicate for infinite scroll effect */}
          {[...STATS, ...STATS].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-10 border-r border-border last:border-r-0"
            >
              <span className="font-heading text-xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED SPARKS ───────────────────────────────────────────────── */}
      <section
        id="explore"
        className="px-6 md:px-16 py-24 md:py-32 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              Community Sparks
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Ideas in the Wild.
            </h2>
          </div>
          <a
            href="/explore"
            className="font-sans text-xs uppercase tracking-widest text-secondary hover:text-primary border-b border-secondary/30 hover:border-primary pb-0.5 transition-all duration-200 w-fit"
          >
            Browse all sparks →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {FEATURED_SPARKS.map((spark, i) => (
            <div
              key={spark.id}
              className="p-8 md:p-10 flex flex-col gap-5 bg-surface hover:bg-background transition-colors duration-300 group cursor-pointer"
              onClick={() => router.push(`/ideas/${spark.id}`)}
            >
              {/* Meta row */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-semibold">
                  {spark.tag}
                </span>
                <span className="font-heading text-xs font-bold text-primary border border-border px-2 py-0.5">
                  {spark.score}
                  <span className="font-sans text-[9px] font-normal text-secondary">
                    /100
                  </span>
                </span>
              </div>

              {/* Number */}
              <span className="font-heading text-5xl font-bold text-border leading-none">
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

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary">
                  {spark.author}
                </span>
                {spark.canvas && (
                  <span className="font-sans text-[9px] uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5">
                    Canvas Ready
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-t border-border bg-surface px-6 md:px-16 py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              The Process
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              From Idea to
              <br />
              Investment-Ready.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border divide-y lg:divide-y-0 lg:divide-x divide-border">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="p-8 flex flex-col gap-6">
                <span className="font-heading text-3xl font-bold text-accent">
                  {step.step}
                </span>
                <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI FEATURES ───────────────────────────────────────────────────── */}
      <section
        id="features"
        className="px-6 md:px-16 py-24 md:py-32 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col gap-2 mb-16 max-w-2xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            Core AI Engine
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            Four tools.
            <br />
            One workspace.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Left column — first two features stacked */}
          <div className="flex flex-col divide-y divide-border">
            {AI_FEATURES.slice(0, 2).map((feat) => (
              <div key={feat.label} className="p-8 md:p-10 flex flex-col gap-5 hover:bg-surface transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl text-accent">
                    {feat.icon}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-semibold">
                    {feat.label}
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                  {feat.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed max-w-md">
                  {feat.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right column — last two features stacked */}
          <div className="flex flex-col divide-y divide-border">
            {AI_FEATURES.slice(2).map((feat) => (
              <div key={feat.label} className="p-8 md:p-10 flex flex-col gap-5 hover:bg-surface transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl text-accent">
                    {feat.icon}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-semibold">
                    {feat.label}
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                  {feat.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed max-w-md">
                  {feat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              Browse by Domain
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Every sector.
              <br />
              Every ambition.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-border divide-y md:divide-y-0 divide-x divide-border">
            {CATEGORIES.map((cat, i) => (
              <a
                key={cat.name}
                href={`/explore?category=${cat.name}`}
                className={`flex flex-col gap-2 p-6 md:p-8 hover:bg-background transition-colors duration-200 group ${
                  i >= 4 ? "border-t border-border" : ""
                }`}
              >
                <span className="font-heading text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                  {cat.name}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary">
                  {cat.count} sparks
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS ────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24 md:py-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            By the Numbers
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            Scale speaks
            <br />
            for itself.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 border border-border divide-y divide-x divide-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-8 md:p-12 flex flex-col gap-3">
              <span className="font-heading text-4xl md:text-5xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST BLOGS ──────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
                From the Blog
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
                Thinking out loud.
              </h2>
            </div>
            <a
              href="/blog"
              className="font-sans text-xs uppercase tracking-widest text-secondary hover:text-primary border-b border-secondary/30 hover:border-primary pb-0.5 transition-all duration-200 w-fit"
            >
              Read all posts →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="p-8 md:p-10 flex flex-col gap-5 hover:bg-background transition-colors duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-semibold">
                    {post.tag}
                  </span>
                  <span className="font-sans text-[10px] text-secondary/50">
                    ·
                  </span>
                  <span className="font-sans text-[10px] text-secondary/70">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary mt-auto">
                  {post.readTime}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="px-6 md:px-16 py-24 md:py-32 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            Questions
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            Straight answers.
          </h2>
        </div>

        <div className="flex flex-col border border-border divide-y divide-border max-w-3xl">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-border bg-primary px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              Start Today
            </span>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-background leading-[0.95]">
              Your idea deserves
              <br />
              more than a notes app.
            </h2>
            <p className="font-sans text-sm text-background/60 leading-relaxed max-w-xl">
              Join 12,400+ founders who validated faster, pitched smarter, and
              built with more conviction — using SparkBoard as their unfair
              advantage.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePrimaryCTA}
              className="font-sans uppercase text-xs tracking-widest font-medium border border-background text-primary bg-background px-10 py-4 hover:bg-transparent hover:text-background transition-colors duration-200"
            >
              {user ? "Go to Workspace →" : "Validate for Free →"}
            </button>
            <span className="font-sans text-[10px] text-background/40 uppercase tracking-wider text-center">
              No credit card required
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-heading text-base md:text-lg font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors duration-200">
          {q}
        </span>
        <span className={`font-heading text-2xl font-thin text-secondary flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-6 animate-fade-in">
          <p className="font-sans text-sm text-secondary leading-relaxed max-w-2xl">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}
