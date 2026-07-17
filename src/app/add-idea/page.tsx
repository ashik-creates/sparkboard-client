"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateIdea } from "@/hooks/use-ideas";
import Link from "next/link";

// ─── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "AgTech / IoT",
  "SaaS / Compliance",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Climate Tech",
  "PropTech",
  "DevTools",
  "General / Other",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AddSpark() {
  const router = useRouter();
  const createIdeaMutation = useCreateIdea();

  // Form State
  const [title, setTitle] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [isPublic, setIsPublic] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Add custom tags
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !oneLiner) return;

    try {
      const result = await createIdeaMutation.mutateAsync({
        title,
        oneLiner,
        description,
        industry,
        isPublic,
        tags,
      });
      // Redirect to the newly created idea workspace canvas under /manage-ideas/[id]
      router.push(`/manage-ideas/${result.id}`);
    } catch (err) {
      console.error("Failed to save spark:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* ── Left Column: Creation Form ────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Header guides */}
          <div className="border-b border-border pb-6 flex flex-col gap-2">
            <Link 
              href="/manage-ideas" 
              className="font-sans text-[10px] uppercase tracking-widest text-accent hover:text-accent-hover transition-colors w-fit mb-2 block"
            >
              &larr; Back to My Workspace
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary">
              New Spark.
            </h1>
            <p className="font-sans text-xs text-secondary">
              Configure your startup blueprint. The details you write here help Gemini formulate a highly accurate Lean Canvas structure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Title */}
            <Input
              id="title-input"
              label="Startup Name / Concept"
              placeholder="e.g. TerraGrow IoT"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* One-Liner Tagline */}
            <Input
              id="pitch-input"
              label="Elevator Pitch (One-Liner)"
              placeholder="What problem does it solve, in one sentence?"
              value={oneLiner}
              onChange={(e) => setOneLiner(e.target.value)}
              required
            />

            {/* Industry sector drop-down select */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-sans text-[10px] uppercase tracking-wider text-secondary font-medium">
                Domain / Industry Sector
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-surface border border-border text-primary px-4 py-3 font-sans text-sm outline-none focus:border-accent rounded-none transition-colors duration-150"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Visibility Toggle buttons */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[10px] uppercase tracking-wider text-secondary font-medium">
                Blueprint Visibility
              </span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`py-3 text-xs uppercase tracking-widest font-bold border transition-colors duration-200 rounded-none ${
                    !isPublic
                      ? "bg-accent border-accent text-background"
                      : "bg-surface border-border text-secondary hover:text-primary hover:border-accent"
                  }`}
                >
                  Private Workspace
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`py-3 text-xs uppercase tracking-widest font-bold border transition-colors duration-200 rounded-none ${
                    isPublic
                      ? "bg-accent border-accent text-background"
                      : "bg-surface border-border text-secondary hover:text-primary hover:border-accent"
                  }`}
                >
                  Publish Publicly
                </button>
              </div>
              <span className="font-sans text-[9px] text-muted italic">
                {isPublic 
                  ? "✓ Public blueprints are listed in the Sparks feed for community comments." 
                  : "✓ Private blueprints are only visible in your personal drafts workspace."
                }
              </span>
            </div>

            {/* Tags builder */}
            <div className="flex flex-col gap-2">
              <Input
                id="tag-builder"
                label="Tags (Keywords)"
                placeholder="Type keyword and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleRemoveTag(tag)}
                      className="font-sans text-[9px] uppercase tracking-widest bg-surface border border-border text-primary px-2.5 py-1 cursor-pointer hover:bg-red-950/20 hover:text-red-400 hover:border-red-800/40 transition-colors"
                      title="Click to remove tag"
                    >
                      {tag} &times;
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Long Description Textarea */}
            <Textarea
              id="description-input"
              label="Detailed Business Description"
              placeholder="Describe your startup freely. What is the business model, the customer demographic, marketing strategies, and production costs?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="min-h-[160px]"
            />

            {/* Actions button row */}
            <div className="border-t border-border pt-6 flex gap-4 mt-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={createIdeaMutation.isPending}
              >
                Save Draft Spark
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/manage-ideas")}
              >
                Cancel
              </Button>
            </div>

          </form>
        </div>

        {/* ── Right Column: Interactive Live Preview Outline ────────────────── */}
        <div className="lg:col-span-5 hidden lg:block sticky top-24 h-fit border border-border bg-card-bg p-8 flex flex-col gap-6 rounded-none">
          <div className="flex flex-col gap-1 border-b border-divider pb-4">
            <span className="font-sans text-[9px] uppercase tracking-widest text-accent font-bold">
              Canvas Sandbox
            </span>
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
              AI Preview Matrix.
            </h3>
          </div>

          {/* Hollow layout structure cards */}
          <div className="grid grid-cols-3 gap-2 py-4">
            {[
              "Problem", "Solution", "Key Metrics",
              "Value Prop", "Unfair Adv", "Channels",
              "Segments", "Cost Structure", "Revenue Streams"
            ].map((box) => (
              <div 
                key={box}
                className="border border-dashed border-border p-3 flex flex-col justify-between min-h-[64px] select-none"
              >
                <span className="font-sans text-[8px] uppercase tracking-widest text-muted">
                  {box}
                </span>
                <span className="w-1.5 h-1.5 bg-border rounded-none" />
              </div>
            ))}
          </div>

          <p className="font-sans text-xs text-secondary/60 leading-relaxed text-center italic bg-background/50 border border-divider p-4">
            &ldquo;Your full Lean Canvas structure and market validation scorecard will be dynamically calculated by Gemini once the spark draft is saved.&rdquo;
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
