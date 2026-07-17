"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id:       string;
  tag:      string;
  date:     string;
  title:    string;
  excerpt:  string;
  readTime: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TAGS = ["All", "AI Strategy", "Product", "Founder Stories", "Engineering", "Design"] as const;

const ALL_POSTS: BlogPost[] = [
  {
    id:       "1",
    tag:      "AI Strategy",
    date:     "Jul 14, 2026",
    title:    "Why Lean Canvas is the Wrong Starting Point for AI Startups",
    excerpt:  "Traditional Lean Canvas assumes static markets and traditional margins. When your primary moat is a dynamic foundation model, structural validation rules must change completely.",
    readTime: "6 min read",
  },
  {
    id:       "2",
    tag:      "Product",
    date:     "Jul 08, 2026",
    title:    "The Feasibility Score: How We Quantify Startup Risk",
    excerpt:  "An analytical look at the five axes we use to compute concept feasibility and why regulatory barriers consistently outrank software development difficulty.",
    readTime: "8 min read",
  },
  {
    id:       "3",
    tag:      "Founder Stories",
    date:     "Jul 01, 2026",
    title:    "From Napkin to Seed Deck in 72 Hours Using SparkBoard",
    excerpt:  "Fatima Khan describes how she structured her AI symptom triage platform, ran VC SWOT metrics, and signed early pilot contracts over one weekend.",
    readTime: "5 min read",
  },
  {
    id:       "4",
    tag:      "Engineering",
    date:     "Jun 24, 2026",
    title:    "Orchestrating Structured Gemini API Responses in B2B SaaS",
    excerpt:  "How to leverage Gemini schema models to output structured JSON, preventing typical token pollution or parsing bottlenecks in serverless runtimes.",
    readTime: "10 min read",
  },
  {
    id:       "5",
    tag:      "Design",
    date:     "Jun 18, 2026",
    title:    "Editorial Design Systems in Modern Enterprise Software",
    excerpt:  "Ditching playful rounded buttons and colorful templates for high-contrast architectural grids, sharp margins, and typography-first hierarchies.",
    readTime: "7 min read",
  },
  {
    id:       "6",
    tag:      "AI Strategy",
    date:     "Jun 10, 2026",
    title:    "The Second-Order Consequences of Autonomous AI Agents in SaaS",
    excerpt:  "When your product's core loop is mediated by a language model, traditional retention metrics collapse. Here is how to build new measurement frameworks.",
    readTime: "9 min read",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PostMeta({ tag, date }: { tag: string; date: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">{tag}</span>
      <span className="font-sans text-[10px] text-muted" aria-hidden="true">·</span>
      <span className="font-sans text-[10px] text-secondary">{date}</span>
    </div>
  );
}

function FeaturedPostHero({ post }: { post: BlogPost }) {
  const router = useRouter();
  return (
    <section
      aria-label={`Featured: ${post.title}`}
      onClick={() => router.push(`/blog/${post.id}`)}
      className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-card-bg hover:bg-surface transition-colors duration-300 cursor-pointer group"
    >
      {/* Placeholder image block */}
      <div
        className="lg:col-span-7 h-64 lg:h-80 bg-secondary-bg border-b lg:border-b-0 lg:border-r border-border flex items-center justify-center p-10 select-none"
        aria-hidden="true"
      >
        <div className="w-full h-full border border-dashed border-border flex flex-col items-center justify-center gap-3">
          <span className="font-heading text-4xl font-bold text-divider select-none">✦</span>
          <span className="font-heading text-sm uppercase font-bold tracking-widest text-muted">
            Featured Essay
          </span>
        </div>
      </div>

      {/* Text column */}
      <div className="lg:col-span-5 p-8 md:p-10 flex flex-col gap-5 justify-center">
        <div className="flex items-center gap-2">
          <span className="font-sans text-[9px] uppercase tracking-widest border border-accent/40 text-accent px-2 py-0.5">
            Featured
          </span>
        </div>
        <PostMeta tag={post.tag} date={post.date} />
        <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors duration-200 leading-tight">
          {post.title}
        </h2>
        <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-divider">
          <span className="font-sans text-[10px] uppercase tracking-widest text-muted">{post.readTime}</span>
          <span className="font-sans text-[11px] uppercase tracking-widest text-accent font-bold">Read Article →</span>
        </div>
      </div>
    </section>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/blog/${post.id}`)}
      className="p-8 md:p-10 flex flex-col gap-5 bg-card-bg hover:bg-surface transition-colors duration-200 cursor-pointer group"
    >
      <PostMeta tag={post.tag} date={post.date} />

      <h3 className="font-heading text-base md:text-lg font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug">
        {post.title}
      </h3>

      <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3 flex-grow">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-divider">
        <span className="font-sans text-[10px] uppercase tracking-widest text-muted">{post.readTime}</span>
        <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">Read →</span>
      </div>
    </article>
  );
}

function NewsletterBlock() {
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section
      aria-label="Newsletter signup"
      className="border border-border p-8 md:p-12 bg-card-bg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
    >
      <div className="flex flex-col gap-2 max-w-xl">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
          Newsletter
        </span>
        <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-primary">
          Stay Ahead of the Idea Curve.
        </h3>
        <p className="font-sans text-xs md:text-sm text-secondary leading-relaxed">
          Analytical teardowns on startup niches and AI tooling — delivered twice a month. Zero spam, unsubscribe anytime.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-sm"
        aria-label="Email newsletter subscription"
      >
        {subscribed ? (
          <span className="font-sans text-xs uppercase tracking-widest text-success font-bold py-3">
            ✓ Subscription confirmed. Welcome.
          </span>
        ) : (
          <>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background flex-1"
              aria-label="Email address"
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </>
        )}
      </form>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogList() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filteredPosts =
    selectedTag === "All" ? ALL_POSTS : ALL_POSTS.filter((p) => p.tag === selectedTag);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="border-b border-border bg-card-bg px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            Guides &amp; Essays
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary">
            From the Blog.
          </h1>

          {/* Tag filter strip */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 select-none"
            role="tablist"
            aria-label="Filter posts by category"
          >
            {TAGS.map((tag) => (
              <button
                key={tag}
                role="tab"
                aria-selected={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 font-sans text-[9px] uppercase tracking-widest transition-colors border font-bold whitespace-nowrap rounded-none focus:outline-none ${
                  selectedTag === tag
                    ? "bg-accent border-accent text-background"
                    : "bg-card-bg border-border text-secondary hover:text-primary hover:border-secondary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 md:px-12 lg:px-16 py-12 flex flex-col gap-16">

        {/* ── Featured hero (only when no filter) ── */}
        {selectedTag === "All" && <FeaturedPostHero post={ALL_POSTS[0]} />}

        {/* ── Article grid ── */}
        <section aria-label="Article list">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
            <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
              {selectedTag === "All" ? "Latest Articles." : `${selectedTag} Articles.`}
            </h2>
            <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
              {filteredPosts.length} Article{filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border divide-y md:divide-y-0 divide-x divide-border bg-border">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="border border-border p-16 bg-card-bg flex flex-col items-center justify-center gap-4 text-center">
              <span className="font-heading text-6xl text-border select-none" aria-hidden="true">◎</span>
              <p className="font-sans text-xs text-muted">No articles found for this category.</p>
            </div>
          )}
        </section>

        {/* ── Newsletter ── */}
        <NewsletterBlock />

      </main>

      <Footer />
    </div>
  );
}
