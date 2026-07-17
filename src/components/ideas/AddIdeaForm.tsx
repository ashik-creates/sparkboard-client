"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export function AddIdeaForm() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    image: "",
    category: "SaaS",
    tags: "",
    isPublic: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVisibility = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isPublic: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 border border-border bg-surface p-8"
    >
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
        label="Full Description"
        name="description"
        rows={6}
        placeholder="Explain the problem, your solution and target users..."
        value={formData.description}
        onChange={handleChange}
        required
      />

      <Input
        label="Image URL (Optional)"
        name="image"
        placeholder="https://example.com/image.jpg"
        value={formData.image}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-2">
        <label className="font-sans text-[10px] font-medium uppercase tracking-wider text-secondary">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-border bg-surface px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Tags (Optional)"
        name="tags"
        placeholder="AI, Startup, Productivity"
        value={formData.tags}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-3">
        <label className="font-sans text-[10px] font-medium uppercase tracking-wider text-secondary">
          Visibility
        </label>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleVisibility(false)}
            className={`border px-4 py-3 text-xs uppercase tracking-widest transition-colors ${
              !formData.isPublic
                ? "border-accent bg-accent text-background"
                : "border-border hover:border-accent"
            }`}
          >
            Private
          </button>

          <button
            type="button"
            onClick={() => handleVisibility(true)}
            className={`border px-4 py-3 text-xs uppercase tracking-widest transition-colors ${
              formData.isPublic
                ? "border-accent bg-accent text-background"
                : "border-border hover:border-accent"
            }`}
          >
            Public
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          type="submit"
          className="flex-1"
        >
          Create Spark
        </Button>

        <Button
          type="reset"
          variant="secondary"
          className="flex-1"
          onClick={() =>
            setFormData({
              title: "",
              shortDescription: "",
              description: "",
              image: "",
              category: "SaaS",
              tags: "",
              isPublic: false,
            })
          }
        >
          Reset
        </Button>
      </div>
    </form>
  );
}