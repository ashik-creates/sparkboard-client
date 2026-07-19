interface ImprovementReport {
  improvedTitle: string;
  improvedShortDescription: string;
  improvedDescription: string;
  newFeatures: string[];
  targetCustomers: string[];
  businessModel: string;
  goToMarket: string[];
  marketingIdeas: string[];
}

interface Props {
  report: ImprovementReport;
}

export default function IdeaImprovementReport({
  report,
}: Props) {
  return (
    <div className="space-y-8">

      <div className="border border-border p-6">
        <h3 className="text-xl font-bold text-primary">
          Improved Title
        </h3>

        <p className="mt-3 text-secondary">
          {report.improvedTitle}
        </p>
      </div>

      <div className="border border-border p-6">
        <h3 className="text-xl font-bold text-primary">
          Improved One-liner
        </h3>

        <p className="mt-3 text-secondary">
          {report.improvedShortDescription}
        </p>
      </div>

      <div className="border border-border p-6">
        <h3 className="text-xl font-bold text-primary">
          Improved Description
        </h3>

        <p className="mt-3 whitespace-pre-line leading-8 text-secondary">
          {report.improvedDescription}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="border border-border p-6">
          <h3 className="mb-4 text-lg font-bold">
            Suggested Features
          </h3>

          <ul className="space-y-2">
            {report.newFeatures.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="border border-border p-6">
          <h3 className="mb-4 text-lg font-bold">
            Target Customers
          </h3>

          <ul className="space-y-2">
            {report.targetCustomers.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border border-border p-6">
        <h3 className="text-lg font-bold">
          Business Model
        </h3>

        <p className="mt-3 text-secondary">
          {report.businessModel}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="border border-border p-6">
          <h3 className="mb-4 text-lg font-bold">
            Go To Market Strategy
          </h3>

          <ul className="space-y-2">
            {report.goToMarket.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="border border-border p-6">
          <h3 className="mb-4 text-lg font-bold">
            Marketing Ideas
          </h3>

          <ul className="space-y-2">
            {report.marketingIdeas.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}