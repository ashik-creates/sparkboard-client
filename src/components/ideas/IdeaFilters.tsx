"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

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

export default function IdeaFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <div className="mb-10 grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search ideas..."
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) =>
          updateQuery("search", e.target.value)
        }
      />

      <select
        defaultValue={
          searchParams.get("category") || "All"
        }
        onChange={(e) =>
          updateQuery("category", e.target.value)
        }
        className="border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
      >
        {categories.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        defaultValue={
          searchParams.get("sort") || "newest"
        }
        onChange={(e) =>
          updateQuery("sort", e.target.value)
        }
        className="border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>
      </select>
    </div>
  );
}