import AddIdeaForm from "@/components/ideas/AddIdeaForm";

export default function AddIdeaPage() {
  return (
    <main className="min-h-[calc(100vh-180px)]">
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Share Your Idea
          </span>

          <h1 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
            Create a Startup Idea
          </h1>

          <p className="mt-3 max-w-2xl text-secondary">
            Share your startup idea with the community. Add a title,
            description, category, tags, and a cover image to help others
            discover your idea.
          </p>
        </div>

        <AddIdeaForm />
      </section>
    </main>
  );
}
