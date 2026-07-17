"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useIdeas, useCreateIdea, useDeleteIdea } from "@/hooks/use-ideas";
import { useAuth } from "@/providers/auth-context";
import { Idea } from "@/types/idea";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreatePayload {
  title: string;
  oneLiner: string;
  description: string;
  industry: string;
  tags: string[];
}

type SortKey = "newest" | "oldest" | "score";
type TabView = "all" | "validated" | "draft" | "improving";

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: { value: TabView; label: string }[] = [
  { value: "all", label: "All Sparks" },
  { value: "draft", label: "Drafts" },
  { value: "improving", label: "In Progress" },
  { value: "validated", label: "Validated" },
];

const STATUS_BADGE: Record<Idea["status"], { label: string; className: string }> = {
  draft: { label: "Draft", className: "text-muted border-divider" },
  improving: { label: "In Progress", className: "text-accent border-accent/40" },
  validated: { label: "Validated", className: "text-success border-success/40" },
  archived: { label: "Archived", className: "text-muted/60 border-divider/60" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Idea["status"] }) {
  const badge = STATUS_BADGE[status] ?? STATUS_BADGE.draft;
  return (
    <span
      className={`inline-flex items-center font-sans text-[8px] uppercase tracking-widest font-bold border px-2 py-0.5 ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}

function ScoreIndicator({ score }: { score: number | undefined }) {
  if (score === undefined) {
    return <span className="font-sans text-[10px] text-muted">—</span>;
  }

  const colour =
    score >= 80 ? "text-success" :
      score >= 60 ? "text-accent" :
        "text-secondary";

  return (
    <span className={`font-heading text-sm font-bold tabular-nums ${colour}`}>
      {score}
      <span className="font-sans text-[9px] text-muted ml-0.5 font-normal">/100</span>
    </span>
  );
}

function IdeaTableSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-border border border-border animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="grid grid-cols-12 items-center px-6 py-5 gap-4 bg-card-bg">
          <div className="col-span-5 flex flex-col gap-2">
            <div className="h-5 w-3/5 bg-border" />
            <div className="h-3 w-4/5 bg-border" />
          </div>
          <div className="col-span-2 h-3 w-16 bg-border" />
          <div className="col-span-2 h-4 w-10 bg-border" />
          <div className="col-span-1 h-4 w-12 bg-border" />
          <div className="col-span-2 flex gap-3 justify-end">
            <div className="h-5 w-12 bg-border" />
            <div className="h-5 w-12 bg-border" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ tab, onOpen }: { tab: TabView; onOpen: () => void }) {
  const messages: Record<TabView, string> = {
    all: "You have not created any sparks yet. Add your first startup idea to begin.",
    draft: "No draft sparks found. New sparks start as drafts.",
    improving: "No sparks are currently being improved.",
    validated: "No sparks have been validated yet. Run AI validation from the idea detail page.",
  };

  return (
    <div className="border border-border bg-card-bg p-16 flex flex-col items-center justify-center text-center gap-6">
      <span className="font-heading text-7xl text-divider select-none" aria-hidden="true">◎</span>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-primary">
          {tab === "all" ? "No Sparks Yet" : `No ${TABS.find((t) => t.value === tab)?.label ?? ""}`}
        </h3>
        <p className="font-sans text-xs text-muted max-w-xs leading-relaxed">
          {messages[tab]}
        </p>
      </div>
      {tab === "all" && (
        <Button variant="primary" onClick={onOpen}>
          Add Your First Spark
        </Button>
      )}
    </div>
  );
}

// ─── Quick-create modal form ──────────────────────────────────────────────────

function CreateSparkModal({
  isOpen,
  onClose,
  onCreate,
  isPending,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: CreatePayload) => void;
  isPending: boolean;
}) {
  const [title, setTitle] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [desc, setDesc] = useState("");
  const [industry, setIndustry] = useState("");
  const [tagsStr, setTagsStr] = useState("");

  const reset = () => {
    setTitle(""); setOneLiner(""); setDesc(""); setIndustry(""); setTagsStr("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      oneLiner: oneLiner.trim(),
      description: desc.trim(),
      industry: industry.trim() || "General",
      tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean),
    });
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); reset(); }} title="New Spark">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          id="create-title"
          label="Startup Name *"
          placeholder="e.g., TerraGrow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />
        <Input
          id="create-oneliner"
          label="One-Liner Hook *"
          placeholder="e.g., Automated crop monitoring for urban farmers."
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          required
        />
        <Textarea
          id="create-desc"
          label="Idea Description"
          placeholder="Describe the problem, target customer, and how you plan to solve it. The more detail, the better the AI canvas."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="create-industry"
            label="Industry"
            placeholder="e.g., AgTech / IoT"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <Input
            id="create-tags"
            label="Tags (comma-separated)"
            placeholder="hardware, IoT, B2B"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => { onClose(); reset(); }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isPending}
          >
            Create Spark
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManageSparks() {
  const router = useRouter();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabView>("all");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [modalOpen, setModalOpen] = useState(false);


  const { data: rawIdeas = [], isLoading } = useIdeas({ search: search.trim() || undefined });
  const createMutation = useCreateIdea();
  const deleteMutation = useDeleteIdea();

  // ── Client-side filter + sort ──────────────────────────────────────────────

  const ideas = (() => {
    let list = rawIdeas;

    if (tab !== "all") {
      list = list.filter((i) => i.status === tab);
    }

    if (sortBy === "newest") {
      list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      list = [...list].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      list = [...list].sort(
        (a, b) =>
          (b.validationReport?.feasibility?.overallScore ?? 0) -
          (a.validationReport?.feasibility?.overallScore ?? 0)
      );
    }

    return list;
  })();

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleCreate = async (payload: CreatePayload) => {
    const result = await createMutation.mutateAsync(payload);
    setModalOpen(false);
    // Redirect to the newly created idea workspace canvas under /manage-ideas/[id]
    router.push(`/manage-ideas/${result.id}`);
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    deleteMutation.mutate(id);
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const counts: Record<TabView, number> = {
    all: rawIdeas.length,
    draft: rawIdeas.filter((i) => i.status === "draft").length,
    improving: rawIdeas.filter((i) => i.status === "improving").length,
    validated: rawIdeas.filter((i) => i.status === "validated").length,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="border-b border-border bg-card-bg px-6 md:px-12 lg:px-16 py-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {user?.name ?? "Personal Workspace"}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              My Sparks.
            </h1>
            <p className="font-sans text-xs text-secondary max-w-xl leading-relaxed mt-1">
              Manage your startup ideas — add new sparks, track AI validation progress, and refine your canvases.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" href="/add-idea">Full Creation Form</Button>
            <Button
              variant="primary"
              onClick={() => setModalOpen(true)}
            >
              + New Spark
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 py-10 flex flex-col gap-8">

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-border bg-border">
          {TABS.map((t) => (
            <div
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`p-5 bg-card-bg flex flex-col gap-1 cursor-pointer hover:bg-surface transition-colors ${tab === t.value ? "border-b-2 border-accent" : ""
                }`}
            >
              <span className="font-heading text-3xl font-bold text-primary tabular-nums">
                {counts[t.value]}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-widest text-muted">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6">

          {/* Tab filter */}
          <div
            className="flex gap-0 border border-border divide-x divide-border overflow-x-auto"
            role="tablist"
            aria-label="Filter sparks by status"
          >
            {TABS.map((t) => (
              <button
                key={t.value}
                role="tab"
                aria-selected={tab === t.value}
                onClick={() => setTab(t.value)}
                className={`px-4 py-2.5 font-sans text-[9px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors focus:outline-none ${tab === t.value
                    ? "bg-accent text-background"
                    : "bg-card-bg text-secondary hover:text-primary"
                  }`}
              >
                {t.label}
                <span className="ml-1.5 text-[8px] opacity-60">({counts[t.value]})</span>
              </button>
            ))}
          </div>

          {/* Search + sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input
              id="manage-search"
              placeholder="Search sparks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background w-full md:w-56 text-xs"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-background border border-border text-primary px-3 py-2.5 font-sans text-[10px] uppercase tracking-wider focus:outline-none focus:border-accent rounded-none flex-shrink-0"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="score">By Score</option>
            </select>
          </div>
        </div>

        {/* ── Table ── */}
        {isLoading ? (
          <IdeaTableSkeleton />
        ) : ideas.length === 0 ? (
          <EmptyState tab={tab} onOpen={() => setModalOpen(true)} />
        ) : (
          <div className="border border-border flex flex-col">

            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 items-center px-6 py-3 bg-background border-b border-border">
              <div className="col-span-5 font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Idea</div>
              <div className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Industry</div>
              <div className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Status</div>
              <div className="col-span-1 font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Score</div>
              <div className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-muted font-bold text-right">Actions</div>
            </div>

            {/* Table rows */}
            <div className="flex flex-col divide-y divide-border">
              {ideas.map((idea) => {
                const score = idea.validationReport?.feasibility?.overallScore;

                return (
                  <div
                    key={idea.id}
                    onClick={() => router.push(`/manage-ideas/${idea.id}`)}
                    className="grid grid-cols-12 items-center px-6 py-5 gap-4 bg-card-bg hover:bg-surface transition-colors cursor-pointer group"
                  >
                    {/* Title + one-liner + tags */}
                    <div className="col-span-12 md:col-span-5 flex flex-col gap-1.5">
                      <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors leading-snug">
                        {idea.title}
                      </h3>
                      <p className="font-sans text-xs text-secondary leading-relaxed line-clamp-1">
                        {idea.oneLiner}
                      </p>
                      {idea.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {idea.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-sans text-[8px] uppercase tracking-widest text-secondary border border-divider px-1.5 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                          {idea.tags.length > 3 && (
                            <span className="font-sans text-[8px] text-muted">+{idea.tags.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Industry */}
                    <div className="hidden md:flex col-span-2 font-sans text-xs text-secondary uppercase tracking-wider leading-snug">
                      {idea.industry}
                    </div>

                    {/* Status */}
                    <div className="hidden md:flex col-span-2 items-center">
                      <StatusBadge status={idea.status} />
                    </div>

                    {/* Score */}
                    <div className="hidden md:flex col-span-1 items-center">
                      <ScoreIndicator score={score} />
                    </div>

                    {/* Actions */}
                    <div
                      className="col-span-12 md:col-span-2 flex items-center justify-end gap-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => router.push(`/manage-ideas/${idea.id}`)}
                        className="font-sans text-[10px] uppercase tracking-widest text-primary border-b border-primary hover:text-accent hover:border-accent transition-colors"
                      >
                        Open
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, idea.id, idea.title)}
                        className="font-sans text-[10px] uppercase tracking-widest text-red-700/70 hover:text-red-500 transition-colors"
                        aria-label={`Delete ${idea.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results count */}
        {!isLoading && ideas.length > 0 && (
          <div className="flex items-center justify-between border-t border-divider pt-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
              Showing {ideas.length} of {rawIdeas.length} spark{rawIdeas.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => { setSearch(""); setTab("all"); setSortBy("newest"); }}
              className="font-sans text-[10px] uppercase tracking-widest text-muted hover:text-accent transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* ── Create Modal ── */}
      <CreateSparkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        isPending={createMutation.isPending}
      />

      <Footer />
    </div>
  );
}
