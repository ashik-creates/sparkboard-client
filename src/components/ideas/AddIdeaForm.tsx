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
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary">
          Startup Information
        </h2>

        <p className="mt-1 text-sm text-secondary">
          Fill in the details below to publish your startup idea.
        </p>
      </div>

      <div className="space-y-6">
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
          placeholder="Describe your startup idea in one sentence"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Description"
          name="description"
          rows={6}
          placeholder="Explain your startup idea in detail..."
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

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-secondary">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-primary outline-none transition focus:border-accent"
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
            placeholder="ai, startup, productivity"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={resetForm}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>

        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Publishing..." : "Publish Idea"}
        </Button>
      </div>
    </form>
  );
}
