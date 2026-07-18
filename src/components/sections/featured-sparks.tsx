import Link from "next/link";
import { getFeaturedIdeas } from "@/lib/api/ideas";
import { Idea } from "@/types/idea";

interface FeaturedSparksProps {
  title?: string;
  eyebrow?: string;
}

export default async function FeaturedSparks({
  title = "Ideas in the Wild.",
  eyebrow = "Community Sparks",
}: FeaturedSparksProps) {
  const sparks = await getFeaturedIdeas();

  return (
    <section
      id="explore"
      className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-background border-b border-border"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {eyebrow}
            </span>

            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              {title}
            </h2>
          </div>

          <Link
            href="/ideas"
            className="font-sans text-[11px] uppercase tracking-widest text-secondary hover:text-accent border-b border-divider hover:border-accent pb-1 transition-all duration-200 w-fit"
          >
            Browse all sparks →
          </Link>
        </div>


        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-divider">
          {sparks.map((spark: Idea, i: number) => (
            <Link
              key={spark._id}
              href={`/ideas/${spark._id}`}
              className="p-8 md:p-10 flex flex-col gap-6 bg-card-bg hover:bg-surface transition-colors duration-200 cursor-pointer group rounded-none"
            >

              {/* Meta */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
                  {spark.category}
                </span>


                <span className="font-heading text-xs font-bold text-primary border border-border px-2.5 py-1 bg-background rounded-none">
                  New
                </span>
              </div>


              {/* Index */}
              <span className="font-heading text-5xl font-bold text-divider leading-none select-none">
                0{i + 1}
              </span>


              {/* Title */}
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary leading-snug group-hover:text-accent transition-colors duration-200">
                {spark.title}
              </h3>


              {/* Description */}
              <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3">
                {spark.shortDescription}
              </p>


              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-divider">

                <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
                  {new Date(spark.createdAt).toLocaleDateString()}
                </span>


                <span className="font-sans text-[9px] uppercase tracking-widest text-accent border border-accent/20 px-2 py-0.5 bg-accent/5">
                  {spark.category}
                </span>

              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}