"use client";

import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createIdea } from "@/lib/action/ideas";

const categories = [
  "SaaS",
  "AI",
  "Education",
  "Health",
  "Finance",
  "E-commerce",
  "Productivity",
  "Other",
];

export default function AddIdeaForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    image: "",
    category: "SaaS",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      image: "",
      category: "SaaS",
      tags: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const idea = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        description: formData.description,
        image: formData.image,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString().split("T")[0],
      };

      const res = await createIdea(idea);

      if (res.insertedId || res.success) {
        toast.success("Idea published successfully!");

        resetForm();

        router.push("/manage-ideas");
      } else {
        toast.error(res.message || "Failed to publish idea.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-surface">
      {/* Header */}
      <div className="border-b border-border px-8 py-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
          Submit Startup
        </p>

        <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-primary">
          Startup Information
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-secondary">
          Share your startup idea with the community. AI can later validate and
          improve your submission.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-8 p-8">
        <Input
          label="Title"
          name="title"
          placeholder="AI Resume Builder"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Input
          label="Short Description"
          name="shortDescription"
          placeholder="Describe your startup in one sentence"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Description"
          name="description"
          rows={7}
          placeholder="Explain the problem, your solution, target users and business model..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Input
          label="Cover Image URL"
          name="image"
          type="url"
          placeholder="https://images.unsplash.com/..."
          value={formData.image}
          onChange={handleChange}
          required
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-secondary">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="h-12 w-full border border-border bg-background px-4 text-sm text-primary outline-none transition focus:border-accent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Tags"
            name="tags"
            placeholder="ai, productivity, startup"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-border bg-background px-8 py-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={resetForm}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Publishing..." : "Publish Idea"}
        </Button>
      </div>
    </form>
  );
}
