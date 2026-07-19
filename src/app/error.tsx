"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg border border-border bg-surface p-10 text-center">
        <div className="text-6xl">⚠️</div>

        <h1 className="mt-6 font-heading text-4xl font-bold uppercase text-primary">
          Something Went Wrong
        </h1>

        <p className="mt-4 leading-7 text-secondary">
          An unexpected error occurred while loading this page.
          Please try again.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={reset}>
            Try Again
          </Button>

          <Button
            href="/"
            variant="secondary"
          >
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
}