"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface Props {
  stats: {
    totalIdeas: number;
    totalCategories: number;
    categoryStats: {
      name: string;
      value: number;
    }[];
  };
}

const COLORS = [
  "#FF5A3C",
  "#0EA5E9",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#14B8A6",
  "#EC4899",
];

export default function StatisticsSection({
  stats,
}: Props) {
  return (
    <section className="border-y border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
            Community Insights
          </p>

          <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-primary">
            SparkBoard Statistics
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            Explore how the community is shaping innovative startup ideas across
            multiple industries.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Stats */}

          <div className="flex flex-col border border-border">
            <div className="border-b border-border bg-surface p-8">
              <p className="text-xs uppercase tracking-widest text-secondary">
                Total Ideas
              </p>

              <h3 className="mt-3 font-heading text-6xl font-bold text-accent">
                {stats.totalIdeas}
              </h3>
            </div>

            <div className="bg-surface p-8">
              <p className="text-xs uppercase tracking-widest text-secondary">
                Categories
              </p>

              <h3 className="mt-3 font-heading text-6xl font-bold text-accent">
                {stats.totalCategories}
              </h3>
            </div>
          </div>

          {/* Chart */}

          <div className="border border-border bg-surface p-8 lg:col-span-2">
            <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-heading text-2xl font-bold uppercase text-primary">
                Ideas by Category
              </h3>

              <span className="text-xs uppercase tracking-widest text-secondary">
                Distribution
              </span>
            </div>

            <div className="h-[360px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={stats.categoryStats}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={130}
                    label
                    stroke="#1f1f1f"
                    strokeWidth={1}
                  >
                    {stats.categoryStats.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#1A1A1A",
                      border: "1px solid #333",
                      borderRadius: 0,
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}