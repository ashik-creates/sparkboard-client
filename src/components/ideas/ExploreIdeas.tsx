"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import { useIdeas } from "@/hooks/use-ideas";
import { IdeaCard } from "./IdeaCard";
import { IdeaCardSkeleton } from "./IdeaCardSkeleton";

const categories = [
  "All",
  "SaaS",
  "AI",
  "Education",
  "Health",
  "Finance",
  "E-commerce",
  "Productivity",
  "Other",
];

export function ExploreIdeas() {
   const { data: ideas = [], isLoading } = useIdeas();


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");

  const filteredIdeas = useMemo(() => {
    const ideas = [
      {
        id: "1",
        title: "AI Resume Builder",
        shortDescription:
          "Generate professional resumes tailored to any job using AI.",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        category: "AI",
        createdAt: "2026-07-18",
      },
      {
        id: "2",
        title: "StudyBuddy",
        shortDescription:
          "A collaborative study platform with AI-powered learning assistance.",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
        category: "Education",
        createdAt: "2026-07-16",
      },
      {
        id: "3",
        title: "FitTrack",
        shortDescription:
          "Track workouts, nutrition and habits with personalized AI coaching.",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
        category: "Health",
        createdAt: "2026-07-14",
      },
      {
        id: "4",
        title: "InvoiceFlow",
        shortDescription:
          "Simple invoicing and expense management for freelancers and startups.",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
        category: "Finance",
        createdAt: "2026-07-12",
      },
      {
        id: "5",
        title: "ShopPilot",
        shortDescription:
          "AI-powered product recommendations to increase e-commerce sales.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        category: "E-commerce",
        createdAt: "2026-07-10",
      },
      {
        id: "6",
        title: "TaskForge",
        shortDescription:
          "Minimal project and task management built for remote teams.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
        category: "Productivity",
        createdAt: "2026-07-08",
      },
      {
        id: "7",
        title: "CodeMentor AI",
        shortDescription:
          "An AI coding mentor that reviews code and explains improvements.",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
        category: "AI",
        createdAt: "2026-07-05",
      },
      {
        id: "8",
        title: "GreenCart",
        shortDescription:
          "Marketplace connecting local farmers directly with consumers.",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
        category: "Other",
        createdAt: "2026-07-03",
      },
    ];

    let result = [...ideas];

    if (search) {
      result = result.filter((idea) =>
        idea.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      result = result.filter((idea) => idea.category === category);
    }

    if (sort === "Newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (sort === "Oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    return result;
  }, [ideas, search, category, sort]);

  return (
    <>
      {/* Filters */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <IdeaCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && filteredIdeas.length === 0 && (
        <div className="border border-border py-20 text-center">
          <h2 className="font-heading text-2xl uppercase text-primary">
            No Sparks Found
          </h2>

          <p className="mt-2 text-secondary">
            Try changing your search or category.
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && filteredIdeas.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </>
  );
}
