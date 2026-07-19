import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-accent">
          Error 404
        </p>

        <h1 className="mt-5 font-heading text-7xl font-bold uppercase text-primary">
          Page Not Found
        </h1>

        <p className="mx-auto mt-6 max-w-md leading-8 text-secondary">
          The page you are looking for does not exist or may have
          been moved.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button href="/">
            Home
          </Button>

          <Button
            href="/ideas"
            variant="secondary"
          >
            Browse Ideas
          </Button>
        </div>
      </div>
    </main>
  );
}