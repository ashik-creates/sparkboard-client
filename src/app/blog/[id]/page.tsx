"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

interface BlogPost {
  id:        string;
  tag:       string;
  date:      string;
  title:     string;
  excerpt:   string;
  readTime:  string;
  author:    string;
  content:   Section[];
}

interface Section {
  heading?: string;
  body:     string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const POSTS: Record<string, BlogPost> = {
  "1": {
    id:       "1",
    tag:      "AI Strategy",
    date:     "Jul 14, 2026",
    title:    "Why Lean Canvas is the Wrong Starting Point for AI Startups",
    excerpt:  "Traditional Lean Canvas assumes static markets and traditional margins. When your primary moat is a dynamic foundation model, structural validation rules must change completely.",
    readTime: "6 min read",
    author:   "Amara Reeves",
    content: [
      {
        body: "The Lean Canvas model, popularised by Ash Maurya in 2010, was designed for bootstrapped software products operating in reasonably stable markets. It assumes that your \"unfair advantage\" is something competitors cannot easily copy — a patent, a network effect, a unique distribution channel.",
      },
      {
        heading: "The Foundation Model Problem",
        body: "When your product's core intelligence is a foundation model — GPT-4, Gemini, Claude — your moat dissolves the moment your competitor plugs in the same API. The Lean Canvas block labelled \"Unfair Advantage\" becomes a fiction exercise unless you are building proprietary fine-tuning pipelines, unique datasets, or structural feedback loops that compound over time.",
      },
      {
        heading: "What to Build Instead",
        body: "We argue for a validation framework that centres on three AI-specific axes: (1) Data Moat Depth — how long would it take a well-funded competitor to replicate your training data? (2) Inference Cost Asymmetry — do you have structural cost advantages at scale versus competitors? (3) Regulatory Positioning — are you operating ahead or behind pending AI regulation curves?",
      },
      {
        heading: "The SparkBoard Approach",
        body: "SparkBoard's AI Coach integrates these axes directly into its validation prompts. Every time a founder marks their startup as AI-native, the system automatically flags the Lean Canvas's \"unfair advantage\" section and asks a set of pointed interrogation questions designed by our research team. The output is a much more honest picture of defensibility.",
      },
      {
        heading: "Conclusion",
        body: "The Lean Canvas is not useless for AI startups — it is a useful communication tool and a fast mental model for describing market structure. But as a validation framework for defensibility and moat construction, it fails AI-native companies in predictable ways. Founders building on foundation models need a supplementary analytical layer that directly interrogates the dynamics of model commoditisation.",
      },
    ],
  },
  "2": {
    id:       "2",
    tag:      "Product",
    date:     "Jul 08, 2026",
    title:    "The Feasibility Score: How We Quantify Startup Risk",
    excerpt:  "An analytical look at the five axes we use to compute concept feasibility and why regulatory barriers consistently outrank software development difficulty.",
    readTime: "8 min read",
    author:   "Jonas Müller",
    content: [
      {
        body: "When we set out to build SparkBoard's feasibility scoring engine, we faced a fundamental epistemological problem: how do you quantify the likelihood of a startup idea succeeding without access to a crystal ball — or a 10-year track record of outcomes?",
      },
      {
        heading: "The Four Axes",
        body: "After extensive analysis of 2,000 startup post-mortems, we identified four primary axes of failure that collectively explain over 80% of early-stage collapses: Technical Complexity, Market TAM, Financial Viability, and Regulatory Risk. Each is scored 0–100 by our AI engine based on the founder's inputs and supplemented by sector-specific datasets.",
      },
      {
        heading: "Why Regulation Dominates",
        body: "The single most consistent finding in our post-mortem dataset: regulatory friction kills more startups than technical difficulty. Founders dramatically underestimate the cost and timeline of navigating compliance in FinTech, HealthTech, and ClimateTech. Our scoring engine weights regulatory signals heavily and surfaces this risk early.",
      },
    ],
  },
};

const RELATED_POSTS = [
  { id: "3", tag: "Founder Stories", title: "From Napkin to Seed Deck in 72 Hours" },
  { id: "4", tag: "Engineering",     title: "Orchestrating Structured Gemini API Responses" },
  { id: "5", tag: "Design",          title: "Editorial Design Systems in Enterprise Software" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleSection({ section }: { section: Section }) {
  return (
    <div className="flex flex-col gap-3">
      {section.heading && (
        <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-primary">
          {section.heading}
        </h2>
      )}
      <p className="font-sans text-base text-secondary leading-[1.85]">
        {section.body}
      </p>
    </div>
  );
}

function NotFoundState() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
        <span className="font-heading text-7xl text-border select-none" aria-hidden="true">◎</span>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">
          Article Not Found
        </h1>
        <p className="font-sans text-sm text-muted">
          This article may have been moved or removed.
        </p>
        <Button variant="secondary" onClick={() => router.push("/blog")}>
          Back to Blog
        </Button>
      </main>
      <Footer />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogArticle({ params }: PageProps) {
  const { id } = use(params);
  const post   = POSTS[id];

  if (!post) return <NotFoundState />;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">

        {/* ── Article Header ── */}
        <header className="border-b border-border bg-card-bg">
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-muted">
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-primary truncate max-w-xs">{post.tag}</li>
              </ol>
            </nav>

            {/* Tag + date */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
                {post.tag}
              </span>
              <span className="text-muted" aria-hidden="true">·</span>
              <span className="font-sans text-[10px] text-secondary">{post.date}</span>
              <span className="text-muted" aria-hidden="true">·</span>
              <span className="font-sans text-[10px] text-secondary">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="font-sans text-sm md:text-base text-secondary leading-relaxed border-l-2 border-accent pl-4">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-2 border-t border-divider">
              <div className="w-8 h-8 flex items-center justify-center bg-surface border border-border flex-shrink-0">
                <span className="font-heading text-[10px] font-bold text-accent select-none">
                  {post.author.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-xs font-bold text-primary">{post.author}</span>
                <span className="font-sans text-[9px] uppercase tracking-widest text-muted">SparkBoard Team</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Article Body ── */}
        <article className="max-w-3xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-10">
          {post.content.map((section, i) => (
            <ArticleSection key={i} section={section} />
          ))}
        </article>

        {/* ── Divider ── */}
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="border-t border-border" />
        </div>

        {/* ── Related articles ── */}
        <section
          aria-label="Related articles"
          className="max-w-3xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              Continue Reading
            </span>
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-primary">
              Related Articles
            </h2>
          </div>

          <div className="flex flex-col border border-border divide-y divide-border">
            {RELATED_POSTS.filter((r) => r.id !== id).map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.id}`}
                className="group p-5 bg-card-bg hover:bg-surface transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-accent">
                    {related.tag}
                  </span>
                  <span className="font-heading text-sm font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors leading-snug">
                    {related.title}
                  </span>
                </div>
                <span className="text-secondary group-hover:text-accent transition-colors flex-shrink-0 text-sm" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" href="/blog">
              ← All Articles
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
