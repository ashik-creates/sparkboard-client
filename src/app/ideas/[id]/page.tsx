"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { useIdea } from "@/hooks/use-ideas";
import { LeanCanvas, ValidationReport } from "@/types/idea";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

type TabId = "canvas" | "validation" | "discussion";

interface Tab {
  id:    TabId;
  label: string;
}

interface Comment {
  name:    string;
  content: string;
  date:    string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { id: "canvas",     label: "Lean Canvas"      },
  { id: "validation", label: "Feasibility & SWOT" },
  { id: "discussion", label: "Discussion"         },
];

const SEED_COMMENTS: Comment[] = [
  {
    name:    "Marcus Aurelius",
    content: "The pension-per-gig model is brilliant — aligns incentives perfectly with gig platforms who want lower churn. Have you spoken to Uber or Bolt about white-label integration?",
    date:    "3 hours ago",
  },
  {
    name:    "Sophia Chen",
    content: "Regulatory question: how do you handle pension directives that differ across EU member states? PEPP might be the right vehicle here.",
    date:    "1 day ago",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 flex flex-col gap-8 animate-pulse">
        <div className="h-3 w-1/3 bg-border" />
        <div className="h-12 w-3/4 bg-border" />
        <div className="h-5 w-full bg-border" />
        <div className="h-5 w-4/5 bg-border" />
        <div className="mt-8 h-64 w-full bg-card-bg border border-border" />
      </main>
      <Footer />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6 py-24">
        <span className="font-heading text-7xl text-border select-none" aria-hidden="true">✕</span>
        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">
          Spark Not Found
        </h2>
        <p className="font-sans text-sm text-secondary max-w-sm leading-relaxed">{message}</p>
        <Button variant="primary" onClick={() => router.push("/ideas")}>
          Back to Sparks
        </Button>
      </main>
      <Footer />
    </div>
  );
}

// ── Canvas Tab ────────────────────────────────────────────────────────────────

function CanvasBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="p-6 bg-card-bg flex flex-col gap-3 min-h-[160px]">
      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-accent font-bold">
        {label}
      </span>
      <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary leading-relaxed">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function CanvasTab({ canvas }: { canvas: LeanCanvas | undefined }) {
  if (!canvas) {
    return (
      <div className="border border-border p-16 text-center bg-card-bg">
        <span className="font-sans text-xs text-muted">
          No Lean Canvas has been generated for this spark yet.
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-border">
      <div className="flex flex-col divide-y divide-border">
        <CanvasBlock label="Problem"           items={canvas.problem}          />
        <CanvasBlock label="Customer Segments" items={canvas.customerSegments} />
        <CanvasBlock label="Cost Structure"    items={canvas.costStructure}    />
      </div>
      <div className="flex flex-col divide-y divide-border">
        <CanvasBlock label="Value Proposition" items={canvas.valueProposition} />
        <CanvasBlock label="Solution"          items={canvas.solution}         />
        <CanvasBlock label="Key Metrics"       items={canvas.keyMetrics}       />
      </div>
      <div className="flex flex-col divide-y divide-border">
        <CanvasBlock label="Unfair Advantage"  items={canvas.unfairAdvantage}  />
        <CanvasBlock label="Channels"          items={canvas.channels}         />
        <CanvasBlock label="Revenue Streams"   items={canvas.revenueStreams}   />
      </div>
    </div>
  );
}

// ── Validation Tab ────────────────────────────────────────────────────────────

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[9px] uppercase tracking-widest text-secondary">{label}</span>
        <span className="font-heading text-sm font-bold text-primary tabular-nums">{value}</span>
      </div>
      <div className="h-1 bg-divider w-full">
        <div
          className="h-1 bg-accent transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ValidationTab({ report }: { report: ValidationReport | undefined }) {
  if (!report) {
    return (
      <div className="border border-border p-16 text-center bg-card-bg">
        <span className="font-sans text-xs text-muted">
          No validation report has been generated for this spark yet.
        </span>
      </div>
    );
  }

  const { feasibility, swot, summaryReport } = report;

  return (
    <div className="flex flex-col gap-10">

      {/* Score grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-border bg-border">
        {[
          { label: "Technical",   value: feasibility.technical          },
          { label: "Market TAM",  value: feasibility.marketSize         },
          { label: "Financials",  value: feasibility.financialViability },
          { label: "Overall",     value: feasibility.overallScore       },
        ].map((s) => (
          <div key={s.label} className="p-6 bg-card-bg flex flex-col gap-2">
            <span className="font-sans text-[9px] uppercase tracking-widest text-muted">{s.label}</span>
            <span className="font-heading text-4xl font-bold text-primary tabular-nums">
              {s.value}
              <span className="font-sans text-xs text-muted ml-0.5">/100</span>
            </span>
          </div>
        ))}
      </div>

      {/* Score bars */}
      <div className="border border-border p-6 bg-card-bg flex flex-col gap-5">
        <span className="font-sans text-[9px] uppercase tracking-widest text-accent font-bold">
          Axis Breakdown
        </span>
        <ScoreBar label="Technical Complexity"   value={feasibility.technical}          />
        <ScoreBar label="Market Size (TAM)"      value={feasibility.marketSize}         />
        <ScoreBar label="Financial Viability"    value={feasibility.financialViability} />
        <ScoreBar label="Overall Feasibility"    value={feasibility.overallScore}       />
      </div>

      {/* SWOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-border">
        <div className="flex flex-col divide-y divide-border">
          <div className="p-6 bg-card-bg flex flex-col gap-3 min-h-[160px]">
            <span className="font-sans text-[9px] uppercase tracking-widest text-success font-bold">Strengths</span>
            <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary leading-relaxed">
              {swot.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="p-6 bg-card-bg flex flex-col gap-3 min-h-[160px]">
            <span className="font-sans text-[9px] uppercase tracking-widest text-red-400 font-bold">Weaknesses</span>
            <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary leading-relaxed">
              {swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border">
          <div className="p-6 bg-card-bg flex flex-col gap-3 min-h-[160px]">
            <span className="font-sans text-[9px] uppercase tracking-widest text-accent font-bold">Opportunities</span>
            <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary leading-relaxed">
              {swot.opportunities.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
          <div className="p-6 bg-card-bg flex flex-col gap-3 min-h-[160px]">
            <span className="font-sans text-[9px] uppercase tracking-widest text-orange-400 font-bold">Threats</span>
            <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary leading-relaxed">
              {swot.threats.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="border border-border p-6 bg-card-bg flex flex-col gap-3">
        <span className="font-sans text-[9px] uppercase tracking-widest text-accent font-bold">
          VC-Grade Synthesis
        </span>
        <p className="font-sans text-xs text-secondary leading-relaxed whitespace-pre-line">
          {summaryReport}
        </p>
      </div>
    </div>
  );
}

// ── Discussion Tab ────────────────────────────────────────────────────────────

function CommentAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-8 h-8 flex-shrink-0 bg-surface border border-border flex items-center justify-center">
      <span className="font-heading text-[10px] font-bold text-accent select-none">{initials}</span>
    </div>
  );
}

function DiscussionTab() {
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [body,     setBody]     = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setComments((prev) => [...prev, { name: "Anonymous", content: body.trim(), date: "Just now" }]);
    setBody("");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Input form */}
      <form onSubmit={handlePost} className="border border-border p-6 bg-card-bg flex flex-col gap-4">
        <span className="font-sans text-[9px] uppercase tracking-widest text-accent font-bold">
          Add a Comment
        </span>
        <textarea
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          placeholder="Share feedback, critique, or scaling ideas…"
          className="w-full bg-background border border-border text-primary font-sans text-sm px-4 py-3 placeholder-secondary/40 focus:outline-none focus:border-accent rounded-none resize-none"
        />
        <Button type="submit" variant="primary" className="w-fit self-end">
          Post Comment
        </Button>
      </form>

      {/* Comment list */}
      <div className="flex flex-col border border-border divide-y divide-border bg-card-bg">
        {comments.map((c, i) => (
          <div key={i} className="p-6 flex items-start gap-4">
            <CommentAvatar name={c.name} />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xs font-bold text-primary">{c.name}</span>
                <span className="font-sans text-[9px] text-muted">{c.date}</span>
              </div>
              <p className="font-sans text-xs text-secondary leading-relaxed">{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SparkDetails({ params }: PageProps) {
  const { id }    = use(params);
  const [tab, setTab] = useState<TabId>("canvas");

  const { data: idea, isLoading, error } = useIdea(id);

  if (isLoading) return <LoadingState />;
  if (error || !idea) {
    return (
      <ErrorState message="This spark does not exist or has been made private by its author." />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 md:px-12 py-12 flex flex-col gap-10">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-muted">
            <li><Link href="/ideas" className="hover:text-primary transition-colors">Sparks</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-primary truncate max-w-xs">{idea.title}</li>
          </ol>
        </nav>

        {/* ── Hero Header ── */}
        <header className="border border-border p-8 md:p-12 bg-card-bg flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
              {idea.industry}
            </span>
            {idea.validationReport && (
              <span className="font-heading text-sm font-bold text-primary border border-border px-3 py-1.5 bg-background rounded-none tabular-nums">
                Score: {idea.validationReport.feasibility.overallScore}
                <span className="font-sans text-[10px] text-muted ml-0.5">/100</span>
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary leading-tight">
            {idea.title}
          </h1>

          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed max-w-3xl">
            {idea.description || idea.oneLiner}
          </p>

          {idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[9px] uppercase tracking-widest text-secondary border border-divider px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 pt-4 border-t border-divider">
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[8px] uppercase tracking-widest text-muted">Published</span>
              <span className="font-sans text-xs text-primary font-medium">
                {new Date(idea.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <div className="h-8 w-px bg-divider" />
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[8px] uppercase tracking-widest text-muted">Status</span>
              <span className={`font-sans text-xs font-bold uppercase tracking-wider ${
                idea.status === "validated" ? "text-success" :
                idea.status === "improving" ? "text-accent" : "text-muted"
              }`}>
                {idea.status}
              </span>
            </div>
          </div>
        </header>

        {/* ── Tab Navigation ── */}
        <div className="border-b border-border flex gap-0 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3.5 font-sans text-[10px] uppercase tracking-widest font-semibold transition-all whitespace-nowrap rounded-none focus:outline-none ${
                tab === t.id
                  ? "bg-card-bg border-t border-x border-border text-accent"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab Panels ── */}
        <div role="tabpanel">
          {tab === "canvas"     && <CanvasTab     canvas={idea.leanCanvas}         />}
          {tab === "validation" && <ValidationTab report={idea.validationReport}   />}
          {tab === "discussion" && <DiscussionTab                                  />}
        </div>

      </main>

      <Footer />
    </div>
  );
}
