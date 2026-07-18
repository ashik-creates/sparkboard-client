import { Button } from "@/components/ui/button";

// ─── Static data ──────────────────────────────────────────────────────────────

interface Principle {
  number: string;
  title:  string;
  body:   string;
}

interface TeamMember {
  initials: string;
  name:     string;
  role:     string;
  bio:      string;
}

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title:  "Ideas Deserve Infrastructure",
    body:   "Every transformative company started as a napkin sketch. We give early-stage founders the analytical scaffolding previously only available through $500/hr consultants or elite accelerators.",
  },
  {
    number: "02",
    title:  "Rigour Over Hype",
    body:   "Our AI does not generate optimistic projections. It generates honest Lean Canvases, SWOT analyses, and competitor maps. Founders deserve truth, not flattery.",
  },
  {
    number: "03",
    title:  "Community as a Signal Layer",
    body:   "The collective intelligence of a community that has read and built validates faster than any solo analysis. Public sparks accumulate real feedback from practitioners.",
  },
  {
    number: "04",
    title:  "Iteration Over Launch",
    body:   "The best builders ship and learn. SparkBoard is designed to support the full refinement loop — draft, improve, validate, revisit — not just the initial idea burst.",
  },
];

const TEAM: TeamMember[] = [
  {
    initials: "AR",
    name:     "Amara Reeves",
    role:     "Co-founder & CEO",
    bio:      "Former VC analyst at Index Ventures. Backed 23 pre-seed rounds before realising the tooling gap for idea-stage founders.",
  },
  {
    initials: "JM",
    name:     "Jonas Müller",
    role:     "Co-founder & CTO",
    bio:      "Machine learning engineer. Previously led NLP pipelines at DeepMind's applied division. Obsessed with epistemic AI.",
  },
  {
    initials: "PL",
    name:     "Priya Lakshmanan",
    role:     "Head of Design",
    bio:      "Crafted design systems for Figma and Linear. Believes that premium software should be indistinguishable from editorial craft.",
  },
  {
    initials: "OA",
    name:     "Olumide Aderinwale",
    role:     "Head of Growth",
    bio:      "Built community-led growth strategies that took two B2B SaaS companies from 0 to 10,000 users in under six months.",
  },
];

const STATS = [
  { value: "4,200+", label: "Sparks Published"  },
  { value: "12,000+", label: "Active Founders"   },
  { value: "87",      label: "Countries Reached" },
  { value: "92%",     label: "User Satisfaction" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
      {text}
    </span>
  );
}

function PrincipleRow({ principle }: { principle: Principle }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-8 md:gap-12 items-start border-b border-divider py-8 last:border-b-0">
      <span className="font-heading text-4xl font-bold text-divider tabular-nums select-none leading-none">
        {principle.number}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
          {principle.title}
        </h3>
        <p className="font-sans text-sm text-secondary leading-relaxed max-w-2xl">
          {principle.body}
        </p>
      </div>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="border border-border bg-card-bg p-6 flex flex-col gap-5 hover:bg-surface transition-colors duration-200">
      {/* Avatar */}
      <div className="w-12 h-12 flex items-center justify-center bg-surface border border-border">
        <span className="font-heading text-sm font-bold text-accent select-none">
          {member.initials}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <span className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
          {member.name}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-widest text-accent">
          {member.role}
        </span>
      </div>

      <p className="font-sans text-xs text-secondary leading-relaxed">
        {member.bio}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-card-bg">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-6">
          <SectionLabel text="About SparkBoard" />
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-primary leading-[0.95] max-w-3xl">
            We Build Tools for
            <br />
            Honest Founders.
          </h1>
          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed max-w-xl mt-4">
            SparkBoard exists because the difference between a brilliant idea and a funded startup is rarely talent. It is tooling, access, and the courage to hear honest feedback early.
          </p>
        </div>
      </section>

      <main className="flex-1">

        {/* ── Stats Band ───────────────────────────────────────────────────── */}
        <section
          aria-label="Platform statistics"
          className="border-b border-border bg-card-bg"
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-x border-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5 p-8 md:p-10">
                <span className="font-heading text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  {stat.value}
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission ──────────────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 border-b border-border flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="flex flex-col gap-2 min-w-[180px]">
            <SectionLabel text="Mission" />
          </div>
          <div className="flex flex-col gap-6 max-w-3xl">
            <blockquote className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary leading-snug">
              &ldquo;Democratise rigorous startup thinking for every founder, regardless of geography or accelerator access.&rdquo;
            </blockquote>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              The global startup ecosystem is profoundly unequal. Top-tier validation frameworks — Lean Canvas methodology, SWOT analysis, competitor intelligence — are locked behind MBA programmes, elite accelerators, and expensive advisors. SparkBoard removes that wall.
            </p>
            <p className="font-sans text-sm text-secondary leading-relaxed">
              Our AI Coach does not just generate documents. It interrogates assumptions, surfaces blindspots, and forces founders to think through second-order consequences before they have burned runway finding out the hard way.
            </p>
          </div>
        </section>

        {/* ── Principles ───────────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 border-b border-border">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <SectionLabel text="Principles" />
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">
                How We Think About Founder Tools
              </h2>
            </div>

            <div className="border border-border bg-card-bg px-6 md:px-10 flex flex-col">
              {PRINCIPLES.map((p) => <PrincipleRow key={p.number} principle={p} />)}
            </div>
          </div>
        </section>

        {/* ── Team ─────────────────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 border-b border-border">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <SectionLabel text="Team" />
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">
                Built by Operators, Backed by Research
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border bg-border">
              {TEAM.map((member) => <TeamCard key={member.name} member={member} />)}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
          <div className="border border-border p-12 md:p-16 bg-card-bg flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <SectionLabel text="Get Started" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary">
                Your Idea Deserves Honest Analysis.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" href="/auth/signup">
                Create a Spark
              </Button>
              <Button variant="secondary" size="lg" href="/ideas">
                Browse Sparks
              </Button>
            </div>
          </div>
        </section>

      </main>

      
    </div>
  );
}
