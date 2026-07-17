"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIdeas } from "@/hooks/use-ideas";
import { Idea } from "@/types/idea";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTORS = [
  "All",
  "AgTech / IoT",
  "SaaS / Compliance",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Climate Tech",
  "PropTech",
  "DevTools",
];

const STATUS_FILTERS = [
  { value: "all",       label: "All"      },
  { value: "validated", label: "Scored"   },
  { value: "draft",     label: "Draft"    },
] as const;

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent"       },
  { value: "score",  label: "Feasibility Score" },
] as const;

type StatusValue = typeof STATUS_FILTERS[number]["value"];
type SortValue   = typeof SORT_OPTIONS[number]["value"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SparkCard({ idea, index }: { idea: Idea; index: number }) {
  const router = useRouter();
  const score  = idea.validationReport?.feasibility?.overallScore;

  return (
    <article
      onClick={() => router.push(`/ideas/${idea.id}`)}
      className="group p-8 md:p-10 bg-card-bg hover:bg-surface transition-colors duration-200 cursor-pointer flex flex-col gap-5 rounded-none"
    >
      {/* Meta row */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
          {idea.industry}
        </span>
        {score !== undefined && (
          <span className="font-heading text-xs font-bold text-primary border border-border px-2.5 py-1 bg-background rounded-none tabular-nums">
            {score}
            <span className="font-sans text-[9px] font-normal text-muted ml-0.5">/100</span>
          </span>
        )}
      </div>

      {/* Index decoration */}
      <span className="font-heading text-4xl font-bold text-divider leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
        {idea.title}
      </h3>

      {/* Tagline */}
      <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3 flex-grow">
        {idea.oneLiner}
      </p>

      {/* Footer meta */}
      <div className="flex items-center justify-between pt-4 border-t border-divider mt-auto">
        <div className="flex items-center gap-2">
          {idea.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[8px] uppercase tracking-widest text-secondary border border-divider px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        {idea.leanCanvas && (
          <span className="font-sans text-[8px] uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5 bg-accent/5">
            Canvas Ready
          </span>
        )}
      </div>
    </article>
  );
}

function SparkCardSkeleton() {
  return (
    <div className="p-8 md:p-10 bg-card-bg animate-pulse flex flex-col gap-5 rounded-none">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 bg-border" />
        <div className="h-6 w-12 bg-border" />
      </div>
      <div className="h-9 w-12 bg-border" />
      <div className="h-6 w-4/5 bg-border" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-border" />
        <div className="h-4 w-full bg-border" />
        <div className="h-4 w-3/5 bg-border" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-divider mt-auto">
        <div className="h-3 w-20 bg-border" />
        <div className="h-3 w-16 bg-border" />
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-2 border border-border p-16 flex flex-col items-center justify-center text-center gap-6 bg-card-bg">
      <span className="font-heading text-7xl text-border select-none" aria-hidden="true">◎</span>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-primary">
          No Sparks Found
        </h3>
        <p className="font-sans text-xs text-muted max-w-xs leading-relaxed">
          No community blueprints match your current filters. Adjust your search or clear all filters.
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onReset}>
        Clear Filters
      </Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExploreSparks() {
  const [search,          setSearch]          = useState("");
  const [selectedSector,  setSelectedSector]  = useState("All");
  const [selectedStatus,  setSelectedStatus]  = useState<StatusValue>("all");
  const [sortBy,          setSortBy]          = useState<SortValue>("recent");

  const { data: rawIdeas = [], isLoading } = useIdeas({ search: search.trim() || undefined });

  const ideas = useMemo(() => {
    let list = rawIdeas.filter((i) => i.isPublic);

    if (selectedSector !== "All") {
      list = list.filter((i) => i.industry.includes(selectedSector));
    }

    if (selectedStatus !== "all") {
      list = list.filter((i) => i.status === selectedStatus);
    }

    if (sortBy === "recent") {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      list = [...list].sort(
        (a, b) =>
          (b.validationReport?.feasibility?.overallScore ?? 0) -
          (a.validationReport?.feasibility?.overallScore ?? 0)
      );
    }

    return list;
  }, [rawIdeas, selectedSector, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedSector("All");
    setSelectedStatus("all");
    setSortBy("recent");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-card-bg px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            Community Directory
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary">
            Explore Sparks.
          </h1>
          <p className="font-sans text-sm text-secondary max-w-xl leading-relaxed mt-2">
            Early-stage startup blueprints published by founders worldwide. Each spark includes an
            AI-generated Lean Canvas, feasibility score, and SWOT analysis.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

          {/* ── Sidebar ────────────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit border border-border bg-card-bg p-6">

            <div className="border-b border-divider pb-4">
              <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-primary">
                Filters
              </h2>
            </div>

            {/* Search */}
            <Input
              id="search-sparks"
              label="Search"
              placeholder="Keyword, name, sector…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background text-xs"
            />

            {/* Sector list */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-semibold">
                Sector
              </span>
              <div className="flex flex-col border border-divider bg-background divide-y divide-divider overflow-y-auto max-h-52">
                {SECTORS.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`text-left px-3 py-2.5 font-sans text-[10px] uppercase tracking-wider transition-colors duration-150 rounded-none ${
                      selectedSector === sector
                        ? "bg-accent text-background font-bold"
                        : "text-secondary hover:bg-surface hover:text-primary"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Status toggle */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-semibold">
                Status
              </span>
              <div className="grid grid-cols-3 border border-divider divide-x divide-divider bg-divider">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedStatus(s.value)}
                    className={`py-2.5 font-sans text-[9px] uppercase tracking-widest font-bold transition-colors bg-card-bg ${
                      selectedStatus === s.value
                        ? "text-accent"
                        : "text-muted hover:text-primary"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-semibold">
                Sort By
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortValue)}
                className="w-full bg-background border border-border text-primary px-3 py-2.5 font-sans text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent rounded-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <Button variant="secondary" size="sm" className="w-full" onClick={resetFilters}>
              Reset All Filters
            </Button>
          </aside>

          {/* ── Results ────────────────────────────────────────────────────── */}
          <section aria-live="polite" aria-busy={isLoading}>

            {/* Results count */}
            {!isLoading && (
              <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
                  {ideas.length} Spark{ideas.length !== 1 ? "s" : ""} Found
                </span>
              </div>
            )}

            {/* Loading skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-border">
                {[0, 1, 2, 3].map((n) => <SparkCardSkeleton key={n} />)}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && ideas.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
                <EmptyState onReset={resetFilters} />
              </div>
            )}

            {/* Cards grid */}
            {!isLoading && ideas.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-border">
                {ideas.map((idea, i) => (
                  <SparkCard key={idea.id} idea={idea} index={i} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
