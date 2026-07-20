import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

import { IdeaCard } from "@/components/ideas/IdeaCard";

import { getIdeas } from "@/lib/api/ideas";
import IdeaFilters from "@/components/ideas/IdeaFilters";
import { Idea } from "@/types/idea";
import Pagination from "@/components/ideas/Pagination";


interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function IdeasPage({
  searchParams,
}: Props) {
  const query = await searchParams;

  const {
    ideas,
    currentPage,
    totalPages,
  } = await getIdeas(query);

  return (
    <>

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent">
            Explore
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold uppercase text-primary">
            Startup Ideas
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            Browse startup ideas shared by founders around the world.
          </p>
        </div>

        <IdeaFilters />

        {ideas.length === 0 ? (
          <div className="border border-border py-20 text-center">
            <h2 className="font-heading text-2xl uppercase text-primary">
              No Ideas Found
            </h2>

            <p className="mt-3 text-secondary">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {ideas.map((idea: Idea) => (
                <IdeaCard
                  key={idea._id}
                  idea={idea}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </main>

    </>
  );
}