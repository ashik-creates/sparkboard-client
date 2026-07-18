import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

import { getIdeas } from "@/lib/api/ideas";
import { Idea } from "@/types/idea";
import DeleteIdeaModal from "./DeleteIdeaModal";

export default async function ManageIdeasPage() {
  const { ideas } = await getIdeas({});

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl px-5 py-14">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase text-primary">
              My Ideas
            </h1>

            <p className="mt-2 text-sm text-secondary">
              Manage all of your startup ideas.
            </p>
          </div>

          <Button href="/add-idea">
            + Add Idea
          </Button>
        </div>

        {ideas.length === 0 ? (
          <div className="rounded-lg border border-border py-20 text-center">
            <h2 className="font-heading text-2xl font-bold">
              No Ideas Found
            </h2>

            <p className="mt-3 text-secondary">
              Start by creating your first startup idea.
            </p>

            <Button
              href="/add-idea"
              className="mt-6"
            >
              Create Idea
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            {/* Desktop Header */}
            <div className="hidden grid-cols-4 border-b border-border bg-surface px-6 py-4 text-xs font-semibold uppercase tracking-widest text-secondary md:grid">
              <div>Idea</div>
              <div>Category</div>
              <div>Created</div>
              <div className="text-right">Actions</div>
            </div>

            {ideas.map((idea: Idea) => (
              <div
                key={idea._id}
                className="border-b border-border last:border-b-0"
              >
                {/* Desktop */}
                <div className="hidden items-center px-6 py-5 md:grid md:grid-cols-4">
                  <div>
                    <h3 className="font-semibold text-primary">
                      {idea.title}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-sm text-secondary">
                      {idea.shortDescription}
                    </p>
                  </div>

                  <div>{idea.category}</div>

                  <div>{idea.createdAt}</div>

                  <div className="flex justify-end gap-3">
                    <Button
                      href={`/ideas/${idea._id}`}
                      variant="secondary"
                      size="sm"
                    >
                      View
                    </Button>

                    <DeleteIdeaModal ideaId={idea._id} />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-4 p-5 md:hidden">
                  <div>
                    <h3 className="font-semibold">
                      {idea.title}
                    </h3>

                    <p className="mt-2 text-sm text-secondary">
                      {idea.shortDescription}
                    </p>
                  </div>

                  <div className="text-sm text-secondary">
                    <p>
                      <strong>Category:</strong> {idea.category}
                    </p>

                    <p>
                      <strong>Created:</strong> {idea.createdAt}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      href={`/ideas/${idea._id}`}
                      variant="secondary"
                      className="flex-1"
                    >
                      View
                    </Button>

                    <DeleteIdeaModal
                      ideaId={idea._id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}