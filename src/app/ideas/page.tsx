"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useIdeas, useCreateIdea, useDeleteIdea } from "@/hooks/use-ideas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-context";

export default function IdeasDirectory() {
  const { user } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOneLiner, setNewOneLiner] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newTagsStr, setNewTagsStr] = useState("");

  const { data: ideas = [], isLoading } = useIdeas({ search, tag: selectedTag });
  const createIdeaMutation = useCreateIdea();
  const deleteIdeaMutation = useDeleteIdea();

  // Redirect if not signed in (fallback for mock auth client state)
  if (!user && typeof window !== "undefined") {
    router.push("/auth/signin");
    return null;
  }

  const handleCreateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const tagsArray = newTagsStr
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    await createIdeaMutation.mutateAsync({
      title: newTitle,
      oneLiner: newOneLiner,
      description: newDesc,
      industry: newIndustry,
      tags: tagsArray,
    });

    // Reset Form
    setNewTitle("");
    setNewOneLiner("");
    setNewDesc("");
    setNewIndustry("");
    setNewTagsStr("");
    setIsModalOpen(false);
  };

  // Compile list of unique tags from all ideas for the quick filter bar
  const allTags = Array.from(
    new Set(ideas.flatMap((idea) => idea.tags))
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-16 flex flex-col gap-12">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
              Personal Sandbox
            </span>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary">
              Startup Ideas.
            </h1>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Add New Idea
          </Button>
        </div>

        {/* Directory Search & Filters */}
        <div className="flex flex-col md:flex-row gap-6 border-b border-border pb-8">
          <div className="w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search ideas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface border border-border focus:outline-none focus:border-accent text-sm font-sans rounded-none"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedTag(undefined)}
              className={`px-3 py-1 font-sans text-xs uppercase tracking-wider transition-colors border ${
                selectedTag === undefined
                  ? "bg-primary text-background border-primary"
                  : "bg-surface text-secondary border-border hover:border-secondary"
              } rounded-none`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 font-sans text-xs uppercase tracking-wider transition-colors border ${
                  selectedTag === tag
                    ? "bg-primary text-background border-primary"
                    : "bg-surface text-secondary border-border hover:border-secondary"
                } rounded-none`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Directory List */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full bg-border/20 animate-pulse rounded-none" />
            <div className="h-12 w-full bg-border/20 animate-pulse rounded-none" />
            <div className="h-12 w-full bg-border/20 animate-pulse rounded-none" />
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border flex flex-col items-center gap-4">
            <p className="font-sans text-sm text-secondary">
              No startup ideas found in this collection.
            </p>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>
              Record Your First Idea
            </Button>
          </div>
        ) : (
          <div className="border border-border bg-surface">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-4 border-b border-border bg-background font-sans text-[10px] uppercase tracking-widest text-secondary font-bold">
              <div className="col-span-12 md:col-span-5">Idea</div>
              <div className="hidden md:block col-span-3">Industry</div>
              <div className="hidden md:block col-span-2">Validation</div>
              <div className="col-span-12 md:col-span-2 text-right">Action</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {ideas.map((idea) => {
                const score = idea.validationReport?.feasibility.overallScore;

                return (
                  <div
                    key={idea.id}
                    className="grid grid-cols-12 px-6 py-6 items-center hover:bg-background/40 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/ideas/${idea.id}`)}
                  >
                    <div className="col-span-12 md:col-span-5 flex flex-col gap-1.5">
                      <h3 className="font-heading text-lg font-bold uppercase text-primary group-hover:text-accent transition-colors">
                        {idea.title}
                      </h3>
                      <p className="font-sans text-xs text-secondary leading-relaxed">
                        {idea.oneLiner}
                      </p>
                      <div className="flex gap-2 flex-wrap mt-1">
                        {idea.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-sans text-[9px] uppercase tracking-wider text-secondary bg-background border border-border px-1.5 py-0.5 rounded-none"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:block col-span-3 font-sans text-xs text-secondary uppercase tracking-wider">
                      {idea.industry}
                    </div>

                    <div className="hidden md:block col-span-2">
                      {score ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block w-2.5 h-2.5 border rounded-none ${
                              score >= 80
                                ? "bg-accent border-accent"
                                : score >= 50
                                ? "bg-primary border-primary"
                                : "bg-transparent border-border"
                            }`}
                          />
                          <span className="font-heading text-sm font-semibold text-primary">
                            {score}%
                          </span>
                        </div>
                      ) : (
                        <span className="font-sans text-xs text-secondary/50 uppercase tracking-wider">
                          Unvalidated
                        </span>
                      )}
                    </div>

                    <div className="col-span-12 md:col-span-2 text-right flex justify-end gap-4 mt-4 md:mt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/ideas/${idea.ideaId || idea.id}`);
                        }}
                        className="font-sans text-[10px] uppercase tracking-widest text-primary border-b border-primary hover:text-accent hover:border-accent transition-colors"
                      >
                        Canvas
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Delete this startup idea?")) {
                            deleteIdeaMutation.mutate(idea.id);
                          }
                        }}
                        className="font-sans text-[10px] uppercase tracking-widest text-red-700 hover:text-red-900 transition-colors"
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
      </main>

      {/* Add Idea Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Startup Idea"
      >
        <form onSubmit={handleCreateIdea} className="flex flex-col gap-4">
          <Input
            label="Startup Name"
            placeholder="e.g., TerraGrow"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <Input
            label="One-Liner Hook"
            placeholder="e.g., Automated crop monitoring systems."
            value={newOneLiner}
            onChange={(e) => setNewOneLiner(e.target.value)}
            required
          />
          <Textarea
            label="Raw Startup Idea Description"
            placeholder="Describe what problem you are solving, how you plan to monetize, and who your target audience is. The more details you provide, the smarter Gemini will model your Lean Canvas."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Industry Classification"
              placeholder="e.g., B2B / AgTech"
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
            />
            <Input
              label="Tags (comma separated)"
              placeholder="e.g., hardware, sustainability"
              value={newTagsStr}
              onChange={(e) => setNewTagsStr(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={createIdeaMutation.isPending}
            >
              Record Idea
            </Button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
}
