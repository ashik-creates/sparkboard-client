import Link from "next/link";

interface Idea {
  id: string;
  title: string;
  shortDescription: string;
  image?: string;
  category: string;
  createdAt: string;
}

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <article className="flex h-full flex-col border border-border bg-surface transition-colors hover:border-accent">
      <img
        src={idea.image || "/placeholder.jpg"}
        alt={idea.title}
        className="h-48 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
          {idea.category}
        </span>

        <h2 className="font-heading text-xl font-bold text-primary line-clamp-2">
          {idea.title}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-7 text-secondary line-clamp-3">
          {idea.shortDescription}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-secondary">
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>

          <Link
            href={`/ideas/${idea.id}`}
            className="text-xs font-medium uppercase tracking-widest text-accent transition-colors hover:text-primary"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}