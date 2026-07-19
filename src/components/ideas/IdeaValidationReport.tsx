interface ValidationReport {
  overallScore: number;
  marketPotential: string;
  technicalDifficulty: string;
  competitionLevel: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  recommendations: string[];
  verdict: string;
}

interface IdeaValidationReportProps {
  report: ValidationReport;
}

export default function IdeaValidationReport({
  report,
}: IdeaValidationReportProps) {
  return (
    <section className="mt-10 border border-border bg-surface">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
          AI Analysis
        </p>

        <h2 className="mt-2 text-2xl font-bold text-primary">
          Startup Validation Report
        </h2>

        <p className="mt-2 text-sm text-secondary">
          AI evaluated your startup idea based on market potential,
          feasibility, competition, and execution.
        </p>
      </div>

      <div className="space-y-8 p-6">
        {/* Score Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-border bg-background p-5">
            <p className="text-xs uppercase tracking-wider text-secondary">
              Overall Score
            </p>

            <h3 className="mt-3 text-5xl font-bold text-accent">
              {report.overallScore}
            </h3>

            <span className="text-secondary">/100</span>
          </div>

          <div className="border border-border bg-background p-5">
            <p className="text-xs uppercase tracking-wider text-secondary">
              Market Potential
            </p>

            <p className="mt-3 font-medium text-primary">
              {report.marketPotential}
            </p>
          </div>

          <div className="border border-border bg-background p-5">
            <p className="text-xs uppercase tracking-wider text-secondary">
              Technical Difficulty
            </p>

            <p className="mt-3 font-medium text-primary">
              {report.technicalDifficulty}
            </p>
          </div>

          <div className="border border-border bg-background p-5">
            <p className="text-xs uppercase tracking-wider text-secondary">
              Competition
            </p>

            <p className="mt-3 font-medium text-primary">
              {report.competitionLevel}
            </p>
          </div>
        </div>

        {/* Lists */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-border p-5">
            <h3 className="mb-4 text-lg font-semibold text-green-500">
              ✅ Strengths
            </h3>

            <ul className="space-y-2">
              {report.strengths.map((item, index) => (
                <li
                  key={index}
                  className="text-sm leading-6 text-secondary"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border p-5">
            <h3 className="mb-4 text-lg font-semibold text-red-500">
              ❌ Weaknesses
            </h3>

            <ul className="space-y-2">
              {report.weaknesses.map((item, index) => (
                <li
                  key={index}
                  className="text-sm leading-6 text-secondary"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border p-5">
            <h3 className="mb-4 text-lg font-semibold text-yellow-500">
              ⚠ Risks
            </h3>

            <ul className="space-y-2">
              {report.risks.map((item, index) => (
                <li
                  key={index}
                  className="text-sm leading-6 text-secondary"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border p-5">
            <h3 className="mb-4 text-lg font-semibold text-accent">
              💡 Recommendations
            </h3>

            <ul className="space-y-2">
              {report.recommendations.map((item, index) => (
                <li
                  key={index}
                  className="text-sm leading-6 text-secondary"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="border-l-4 border-accent bg-background p-6">
          <p className="text-xs uppercase tracking-wider text-secondary">
            Final Verdict
          </p>

          <p className="mt-3 text-lg leading-8 text-primary">
            {report.verdict}
          </p>
        </div>
      </div>
    </section>
  );
}