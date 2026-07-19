export default function Loading() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-20 animate-pulse">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto h-3 w-20 bg-border" />
          <div className="mx-auto mt-4 h-10 w-72 bg-border" />
          <div className="mx-auto mt-4 h-5 w-full max-w-md bg-border" />
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col gap-4 rounded-lg border border-border p-5 md:flex-row md:items-center md:justify-between">
          <div className="h-11 w-full rounded-md bg-border md:max-w-xs" />
          <div className="flex gap-3">
            <div className="h-11 w-40 rounded-md bg-border" />
            <div className="h-11 w-36 rounded-md bg-border" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden border border-border bg-surface"
            >
              {/* Image */}
              <div className="h-52 w-full bg-border" />

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
                <div className="flex gap-2">
                  <div className="h-7 w-16 bg-border" />
                  <div className="h-7 w-20 bg-border" />
                  <div className="h-7 w-14 bg-border" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3">
                  <div className="h-4 w-20 bg-border" />
                  <div className="h-9 w-24 bg-border" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-14 flex justify-center gap-3">
          <div className="h-11 w-24 rounded-md bg-border" />
          <div className="h-11 w-11 rounded-md bg-border" />
          <div className="h-11 w-11 rounded-md bg-border" />
          <div className="h-11 w-11 rounded-md bg-border" />
          <div className="h-11 w-24 rounded-md bg-border" />
        </div>
      </main>
    </>
  );
}