"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { getIdea } from "@/lib/api/ideas";

import ValidateIdeaButton from "@/components/ideas/ValidateIdeaButton";
import IdeaValidationReport from "@/components/ideas/IdeaValidationReport";

interface ValidationReport {
  overallScore: number;
  marketPotential: string;
  technicalDifficulty: string;
  competitionLevel: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  recommendations: string[];
  verdict: string;
}

interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
  validationReport?: ValidationReport;
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
        <main className="mx-auto max-w-6xl px-6 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-[420px] bg-surface" />

            <div className="h-10 w-2/3 bg-surface" />

            <div className="h-5 w-full bg-surface" />

            <div className="h-5 w-4/5 bg-surface" />
          </div>
        </main>
      </>
    );
  }

  if (!idea) {
    return (
      <>
        <main className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="space-y-5 text-center">
            <h2 className="font-heading text-3xl font-bold uppercase text-primary">
              Idea Not Found
            </h2>

            <p className="text-secondary">
              The startup idea you are looking for does not exist.
            </p>

            <Button href="/ideas">Back to Ideas</Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-20">
        <Link
          href="/ideas"
          className="mb-8 inline-block text-sm text-accent hover:underline"
        >
          ← Back to Ideas
        </Link>

        {/* Hero */}

        <div className="overflow-hidden border border-border bg-surface">
          <div className="relative h-[420px] w-full">
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              priority
              className="object-cover"
            />
          </div>

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

        {/* Description */}

        <section className="mt-14 space-y-4">
          <h2 className="font-heading text-2xl font-bold uppercase text-primary">
            Description
          </h2>

          <p className="leading-8 text-secondary">{idea.description}</p>
        </section>

        {/* Information */}

        <section className="mt-14 space-y-6">
          <h2 className="font-heading text-2xl font-bold uppercase text-primary">
            Key Information
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

        {/* AI Validation */}

        {/* AI Validation */}

        <section className="mt-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              Artificial Intelligence
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold uppercase text-primary">
              AI Startup Validation
            </h2>

            <p className="mt-2 max-w-2xl text-secondary">
              Let AI evaluate this startup idea for market potential,
              competition, technical difficulty, risks, and provide practical
              recommendations.
            </p>
          </div>

          {idea.validationReport ? (
            <>
              <div className="mb-6 flex justify-end">
                <ValidateIdeaButton ideaId={idea._id} reanalyze />
              </div>

              <IdeaValidationReport report={idea.validationReport} />
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-surface p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                🤖
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-primary">
                No AI Analysis Yet
              </h3>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-secondary">
                Validate this startup idea with AI to receive an intelligent
                business analysis, including strengths, weaknesses, competition,
                risks, and recommendations.
              </p>

              <div className="mt-8">
                <ValidateIdeaButton ideaId={idea._id} />
              </div>
            </div>
          )}
        </section>

        {/* Footer */}

        <div className="mt-16 border-t border-border pt-8">
          <Button href="/ideas">Back to Ideas</Button>
        </div>
      </main>
    </>
  );
}
