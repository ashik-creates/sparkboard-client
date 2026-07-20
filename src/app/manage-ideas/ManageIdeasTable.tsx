"use client";

import Link from "next/link";
import { Table } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Idea } from "@/types/idea";
import DeleteIdeaModal from "./DeleteIdeaModal";

interface ManageIdeasTableProps {
  ideas: Idea[];
}

export default function ManageIdeasTable({ ideas = [] }: ManageIdeasTableProps) {
  return (
    <div className="my-5 border border-border bg-surface p-5">
      <Table className="bg-transparent shadow-none">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Manage ideas table"
            className="min-w-[900px] rounded-none bg-transparent shadow-none [&_th]:rounded-none [&_th]:bg-transparent [&_td]:rounded-none"
          >
            <Table.Header className="rounded-none bg-transparent border-b border-border">
              <Table.Column
                isRowHeader
                className="rounded-none bg-transparent border-b border-border"
              >
                Idea
              </Table.Column>
              <Table.Column className="rounded-none bg-transparent border-b border-border">
                Category
              </Table.Column>
              <Table.Column className="rounded-none bg-transparent border-b border-border">
                Created
              </Table.Column>
              <Table.Column className="rounded-none bg-transparent border-b border-border">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {ideas.length === 0 ? (
                <Table.Row className="rounded-none hover:bg-transparent data-[hover=true]:bg-transparent">
                  <Table.Cell className="rounded-none">
                    <p className="py-10 text-center text-sm text-secondary">
                      No ideas found
                    </p>
                  </Table.Cell>
                  <Table.Cell className="rounded-none" />
                  <Table.Cell className="rounded-none" />
                  <Table.Cell className="rounded-none" />
                </Table.Row>
              ) : (
                ideas.map((idea) => (
                  <Table.Row
                    key={idea._id}
                    className="rounded-none hover:bg-transparent data-[hover=true]:bg-transparent"
                  >
                    <Table.Cell className="rounded-none">
                      <div>
                        <h3 className="font-semibold text-primary">{idea.title}</h3>
                        <p className="mt-1 line-clamp-1 text-sm text-secondary">
                          {idea.shortDescription}
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="rounded-none text-sm text-primary">
                      {idea.category}
                    </Table.Cell>

                    <Table.Cell className="rounded-none text-sm text-primary">
                      {idea.createdAt}
                    </Table.Cell>

                    <Table.Cell className="rounded-none">
                      <div className="flex gap-3">
                        <Link href={`/ideas/${idea._id}`}>
                          <Button variant="secondary" size="sm">
                            View
                          </Button>
                        </Link>

                        <DeleteIdeaModal ideaId={idea._id} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <div className="px-4 py-2 text-sm text-secondary">
            Total Ideas: {ideas.length}
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
}