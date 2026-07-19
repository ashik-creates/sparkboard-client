"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Idea } from "@/types/idea";
import DeleteIdeaModal from "./DeleteIdeaModal";

interface ManageIdeasTableProps {
  ideas: Idea[];
}

export default function ManageIdeasTable({
  ideas = [],
}: ManageIdeasTableProps) {
  return (
    <div className="overflow-hidden border border-border bg-surface p-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-secondary">
                Idea
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-secondary">
                Category
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-secondary">
                Created
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-secondary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {ideas.map((idea) => (
              <tr
                key={idea._id}
                className="border-b border-border last:border-b-0 hover:bg-background transition-colors"
              >
                <td className="px-4 py-4 align-top">
                  <h3 className="font-semibold text-primary">{idea.title}</h3>

                  <p className="mt-1 line-clamp-1 text-sm text-secondary">
                    {idea.shortDescription}
                  </p>
                </td>

                <td className="px-4 py-4 align-top text-sm text-primary">
                  {idea.category}
                </td>

                <td className="px-4 py-4 align-top text-sm text-primary">
                  {idea.createdAt}
                </td>

                <td className="px-4 py-4 align-top">
                  <div className="flex gap-3">
                    <Link href={`/ideas/${idea._id}`}>
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </Link>

                    <DeleteIdeaModal ideaId={idea._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-border px-4 pt-4 text-sm text-secondary">
        Total Ideas: {ideas.length}
      </div>
    </div>
  );
}
