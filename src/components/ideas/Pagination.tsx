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
        onClick={() => changePage(currentPage - 1)}
        className="h-11 rounded-xl border-gray-300 bg-white px-5 text-[#2C2C2C] transition hover:border-[#FF5A3C] hover:text-[#FF5A3C]"
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "primary" : "outline"}
          onClick={() => changePage(page)}
          className={
            currentPage === page
              ? "h-11 w-11 min-w-11 rounded-xl bg-[#FF5A3C] font-semibold text-white hover:bg-[#ef4b2d]"
              : "h-11 w-11 min-w-11 rounded-xl border-gray-300 bg-white font-semibold text-[#2C2C2C] transition hover:border-[#FF5A3C] hover:text-[#FF5A3C]"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        isDisabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="h-11 rounded-xl border-gray-300 bg-white px-5 text-[#2C2C2C] transition hover:border-[#FF5A3C] hover:text-[#FF5A3C]"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;