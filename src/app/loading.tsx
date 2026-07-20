export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="mb-10 text-center sm:mb-12">
        <div className="mx-auto h-3 w-20 bg-border" />

        <div className="mx-auto mt-4 h-8 w-56 bg-border sm:h-10 sm:w-72" />

        <div className="mx-auto mt-4 h-4 w-full max-w-xs bg-border sm:h-5 sm:max-w-md" />
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="h-11 w-full border border-border bg-surface md:max-w-xs" />

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="h-11 w-full border border-border bg-surface sm:w-40" />

          <div className="h-11 w-full border border-border bg-surface sm:w-32" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border border-border bg-surface"
          >
            {/* Image */}
            <div className="h-48 bg-border sm:h-52" />

            <div className="space-y-4 p-5">
              {/* Category */}
              <div className="h-4 w-20 bg-border" />

              {/* Title */}
              <div className="space-y-2">
                <div className="h-6 w-5/6 bg-border" />
                <div className="h-6 w-2/3 bg-border" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-border" />
                <div className="h-4 w-5/6 bg-border" />
                <div className="h-4 w-3/4 bg-border" />
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-border" />
                <div className="h-6 w-20 bg-border" />
                <div className="h-6 w-14 bg-border" />
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
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:mt-14">
        <div className="h-10 w-20 bg-border sm:w-24" />

        <div className="h-10 w-10 bg-border" />
        <div className="h-10 w-10 bg-border" />
        <div className="h-10 w-10 bg-border" />

        <div className="h-10 w-20 bg-border sm:w-24" />
      </div>
    </main>
  );
}