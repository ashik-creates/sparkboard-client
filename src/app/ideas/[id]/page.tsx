"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { getIdea } from "@/lib/api/ideas";

interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function IdeaDetailsPage({ params }: PageProps) {
  const { id } = use(params);

  const [idea, setIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const data = await getIdea(id);

        setIdea(data);
      } catch (error) {
        console.error(error);
        setIdea(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-5xl px-6 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-[420px] w-full bg-surface" />

            <div className="h-10 w-2/3 bg-surface" />

            <div className="h-5 w-full bg-surface" />

            <div className="h-5 w-5/6 bg-surface" />
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (!idea) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="space-y-6 text-center">
            <h2 className="font-heading text-3xl font-bold uppercase text-primary">
              Idea Not Found
            </h2>

            <p className="text-secondary">
              The startup idea you are looking for does not exist.
            </p>

            <Button href="/ideas">Back to Explore</Button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>

      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* Back */}

        <Link
          href="/ideas"
          className="mb-8 inline-block text-sm text-accent hover:underline"
        >
          ← Back to Ideas
        </Link>

        {/* Hero Card */}

        <div className="overflow-hidden border border-border bg-surface">
          {/* Image */}

          <div className="relative h-[420px] w-full">
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 1200px"
            />
          </div>

          {/* Header Content */}

          <div className="space-y-6 p-8">
            <span className="inline-block border border-border px-3 py-1 text-xs uppercase tracking-widest text-accent">
              {idea.category}
            </span>

            <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary md:text-5xl">
              {idea.title}
            </h1>

            <p className="text-lg leading-relaxed text-secondary">
              {idea.shortDescription}
            </p>
          </div>
        </div>

        {/* Description / Overview */}

        <section className="mt-12 space-y-4">
          <h2 className="font-heading text-2xl font-bold uppercase text-primary">
            Description / Overview
          </h2>

          <p className="leading-8 text-secondary">{idea.description}</p>
        </section>

        {/* Key Information */}

        <section className="mt-12 space-y-6">
          <h2 className="font-heading text-2xl font-bold uppercase text-primary">
            Key Information / Specifications
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="border border-border p-5">
              <p className="text-xs uppercase tracking-widest text-muted">
                Category
              </p>

              <p className="mt-2 text-primary">{idea.category}</p>
            </div>

            <div className="border border-border p-5">
              <p className="text-xs uppercase tracking-widest text-muted">
                Created
              </p>

              <p className="mt-2 text-primary">{idea.createdAt}</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted">
              Tags
            </p>

            <div className="flex flex-wrap gap-3">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-2 text-xs uppercase tracking-wider text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Action */}

        <div className="mt-12 border-t border-border pt-6">
          <Button href="/ideas">Back to Explore</Button>
        </div>
      </main>

    </>
  );
}
