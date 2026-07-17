"use client";

interface StatItem {
  value: string;
  label: string;
}

interface StatisticsProps {
  eyebrow?: string;
  title?: string;
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { value: "12,400+", label: "Ideas Validated" },
  { value: "3,800+", label: "Lean Canvases Generated" },
  { value: "94.2%", label: "Feasibility Score Accuracy" },
  { value: "47 sec", label: "Avg. Canvas Generation Time" },
  { value: "280+", label: "Niches Tracked" },
  { value: "4.9 / 5", label: "Founder Satisfaction Score" },
];

export function Statistics({
  eyebrow = "By the Numbers",
  title = "Scale speaks for itself.",
  stats = DEFAULT_STATS,
}: StatisticsProps) {
  return (
    <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-background border-b border-border">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            {eyebrow}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            {title}
          </h2>
        </div>

        {/* 2x3 Statistics Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 border border-border divide-y divide-x divide-border bg-border">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="p-8 md:p-12 flex flex-col gap-3 bg-card-bg hover:bg-surface transition-colors duration-200"
            >
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
