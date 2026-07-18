"use client";

import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  totalPages,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`/ideas?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        isDisabled={currentPage === 1}
        onPress={() => changePage(currentPage - 1)}
        className="h-11 rounded-none border border-border bg-surface px-5 text-secondary transition hover:border-accent hover:text-accent disabled:opacity-40"
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onPress={() => changePage(page)}
          className={
            currentPage === page
              ? "h-11 w-11 min-w-11 rounded-none border border-accent bg-accent font-semibold text-background"
              : "h-11 w-11 min-w-11 rounded-none border border-border bg-surface font-semibold text-primary transition hover:border-accent hover:text-accent"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        isDisabled={currentPage === totalPages}
        onPress={() => changePage(currentPage + 1)}
        className="h-11 rounded-none border border-border bg-surface px-5 text-secondary transition hover:border-accent hover:text-accent disabled:opacity-40"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;