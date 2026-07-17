"use client";

import { useRouter } from "next/navigation";

interface BlogPost {
  id: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

interface LatestBlogsProps {
  eyebrow?: string;
  title?: string;
  posts?: BlogPost[];
}

const DEFAULT_POSTS: BlogPost[] = [
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

export function LatestBlogs({
  eyebrow = "From the Blog",
  title = "Thinking out loud.",
  posts = DEFAULT_POSTS,
}: LatestBlogsProps) {
  const router = useRouter();

  return (
    <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-secondary-bg border-b border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Header block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {eyebrow}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              {title}
            </h2>
          </div>
          <button
            onClick={() => router.push("/blog")}
            className="font-sans text-[11px] uppercase tracking-widest text-secondary hover:text-accent border-b border-divider hover:border-accent pb-1 transition-all duration-200 w-fit"
          >
            Read all posts →
          </button>
        </div>

        {/* 3-Column Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-border">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => router.push(`/blog/${post.id}`)}
              className="p-8 md:p-10 flex flex-col gap-6 bg-card-bg hover:bg-surface transition-colors duration-200 cursor-pointer group rounded-none"
            >
              {/* Meta row */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
                  {post.tag}
                </span>
                <span className="font-sans text-[10px] text-muted" aria-hidden="true">
                  ·
                </span>
                <span className="font-sans text-[10px] text-secondary">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3 flex-grow">
                {post.excerpt}
              </p>

              {/* Read time */}
              <span className="font-sans text-[10px] uppercase tracking-widest text-muted mt-4 block">
                {post.readTime}
              </span>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
