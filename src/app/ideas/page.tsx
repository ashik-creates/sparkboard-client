import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ExploreIdeas } from "@/components/ideas/ExploreIdeas";


export default function IdeasPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="mb-12">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-accent">
            Explore
          </p>

          <h1 className="font-heading text-5xl font-bold uppercase text-primary">
            Explore Sparks
          </h1>

          <p className="mt-4 max-w-2xl text-secondary">
            Browse startup ideas from the community. Discover inspiration,
            validate concepts and find your next big opportunity.
          </p>
        </div>

        <ExploreIdeas />
      </main>

      <Footer />
    </>
  );
}