export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-14 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="mb-10 text-center sm:mb-12">
        <div className="mx-auto h-3 w-20 bg-border" />

        <div className="mx-auto mt-4 h-8 w-56 bg-border sm:h-10 sm:w-72" />

        <div className="mx-auto mt-4 h-4 w-full max-w-xs bg-border sm:h-5 sm:max-w-md" />
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 border border-border bg-surface p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="h-11 w-full bg-border lg:max-w-sm" />

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="h-11 w-full bg-border sm:w-40" />
          <div className="h-11 w-full bg-border sm:w-36" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden border border-border bg-surface"
          >
            {/* Image */}
            <div className="aspect-[16/10] w-full bg-border" />

            <div className="space-y-5 p-5">
              {/* Category */}
              <div className="h-5 w-20 bg-border" />

              {/* Title */}
              <div className="space-y-2">
                <div className="h-6 w-5/6 bg-border" />
                <div className="h-6 w-2/3 bg-border" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-border" />
                <div className="h-4 w-5/6 bg-border" />
                <div className="h-4 w-2/3 bg-border" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <div className="h-7 w-16 bg-border" />
                <div className="h-7 w-20 bg-border" />
                <div className="h-7 w-14 bg-border" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-20 bg-border" />

                <div className="h-9 w-24 bg-border" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex flex-wrap justify-center gap-2 sm:mt-14 sm:gap-3">
        <div className="h-10 w-20 bg-border sm:h-11 sm:w-24" />
        <div className="h-10 w-10 bg-border sm:h-11 sm:w-11" />
        <div className="h-10 w-10 bg-border sm:h-11 sm:w-11" />
        <div className="h-10 w-10 bg-border sm:h-11 sm:w-11" />
        <div className="h-10 w-20 bg-border sm:h-11 sm:w-24" />
      </div>
    </main>
  );
}