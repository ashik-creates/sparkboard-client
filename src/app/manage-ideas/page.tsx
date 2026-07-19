import { Button } from "@/components/ui/button";


import ManageIdeasTable from "./ManageIdeasTable";
import { getAllIdeas } from "@/lib/api/ideas";


export default async function ManageIdeasPage() {
  const  ideas  = await getAllIdeas();

  return (
    <>

      <main className="mx-auto min-h-screen max-w-7xl px-5 py-14">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Ideas On Air
          </span>
            <h1 className="font-heading text-3xl font-bold uppercase text-primary">
              Manage Ideas
            </h1>

            <p className="mt-2 text-sm text-secondary">
              Manage all of your startup ideas.
            </p>
          </div>

          <Button href="/add-idea">+ Add Idea</Button>
        </div>

        {ideas.length === 0 ? (
          <div className="rounded-lg border border-border py-20 text-center">
            <h2 className="font-heading text-2xl font-bold">No Ideas Found</h2>

            <p className="mt-3 text-secondary">
              Start by creating your first startup idea.
            </p>

            <Button href="/add-idea" className="mt-6">
              Create Idea
            </Button>
          </div>
        ) : (
          <ManageIdeasTable ideas={ideas} />
        )}
      </main>

    </>
  );
}