import Image from "next/image";
import Link from "next/link";

interface Idea {
  _id: string;
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
    <article className="flex h-full flex-col overflow-hidden border border-border bg-surface transition-colors hover:border-accent">
      <div className="relative h-48 w-full">
        <Image
          src={idea.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"}
          alt={idea.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
          {idea.category}
        </span>

        <h2 className="font-heading line-clamp-2 text-xl font-bold text-primary">
          {idea.title}
        </h2>

        <p className="mt-3 flex-1 line-clamp-3 text-sm leading-7 text-secondary">
          {idea.shortDescription}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-secondary">
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>

          <Link
            href={`/ideas/${idea._id}`}
            className="text-xs font-medium uppercase tracking-widest text-accent transition-colors hover:text-primary"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}