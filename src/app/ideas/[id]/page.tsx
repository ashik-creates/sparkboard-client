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
            <div className="h-8 w-2/3 bg-surface" />
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

        <main className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6">
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
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <Link
          href="/ideas"
          className="mb-8 inline-block text-sm text-accent hover:underline"
        >
          ← Back to Ideas
        </Link>

        <div className="overflow-hidden border border-border bg-surface">
          <div className="relative h-[420px] w-full">
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 1024px"
            />
          </div>

          <div className="space-y-8 p-8">
            <span className="inline-block border border-border px-3 py-1 text-xs uppercase tracking-widest">
              {idea.category}
            </span>

            <h1 className="font-heading text-4xl font-bold uppercase text-primary">
              {idea.title}
            </h1>

            <p className="text-lg text-secondary">
              {idea.shortDescription}
            </p>

            <div className="space-y-3">
              <h2 className="font-heading text-xl uppercase text-primary">
                Description
              </h2>

              <p className="leading-8 text-secondary">
                {idea.description}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-xl uppercase text-primary">
                Tags
              </h2>

              <div className="flex flex-wrap gap-3">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border px-3 py-2 text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-xl uppercase text-primary">
                Created
              </h2>

              <p className="text-secondary">{idea.createdAt}</p>
            </div>

            <div className="border-t border-border pt-6">
              <Button href="/ideas">Back to Explore</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}