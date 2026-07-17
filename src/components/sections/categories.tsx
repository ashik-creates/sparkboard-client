"use client";

import { useRouter } from "next/navigation";

interface CategoryItem {
  name: string;
  count: number;
}

interface CategoriesProps {
  eyebrow?: string;
  title?: string;
  categories?: CategoryItem[];
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { name: "FinTech", count: 148 },
  { name: "HealthTech", count: 113 },
  { name: "EdTech", count: 97 },
  { name: "Climate Tech", count: 84 },
  { name: "AgriTech", count: 62 },
  { name: "PropTech", count: 51 },
  { name: "LegalTech", count: 44 },
  { name: "SpaceTech", count: 29 },
];

export function Categories({
  eyebrow = "Browse by Domain",
  title = "Every sector. Every ambition.",
  categories = DEFAULT_CATEGORIES,
}: CategoriesProps) {
  const router = useRouter();

  return (
    <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-secondary-bg border-b border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            {eyebrow}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            {title}
          </h2>
        </div>

        {/* 2x4 Grid of Sectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border divide-y md:divide-y-0 divide-x divide-border bg-border">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => router.push(`/ideas?category=${encodeURIComponent(cat.name)}`)}
              className={`flex flex-col text-left gap-2 p-6 md:p-8 bg-card-bg hover:bg-surface transition-colors duration-200 group rounded-none focus:outline-none focus:ring-1 focus:ring-accent ${
                i >= 4 ? "border-t border-border" : ""
              }`}
            >
              <span className="font-heading text-lg md:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                {cat.name}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
                {cat.count} sparks
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
