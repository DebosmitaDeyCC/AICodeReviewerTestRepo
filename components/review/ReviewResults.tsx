import type { CodeReview, ReviewIssue } from "@/types/review";
import { IssueCard } from "@/components/review/IssueCard";

type ReviewResultsProps = {
  review: CodeReview;
};

export function ReviewResults({ review }: ReviewResultsProps) {
  const issues = [
    ...review.bugs.map((issue) => ({ ...issue, category: "Bug" })),
    ...review.securityIssues.map((issue) => ({
      ...issue,
      category: "Security",
    })),
  ];

  return (
    <section className="space-y-5 border-t border-zinc-800 p-4">
      <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
        <h3 className="text-sm font-semibold text-emerald-200">Summary</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-200">{review.summary}</p>
      </div>

      <ReviewSection title="Detected issues" emptyText="No bugs or security issues found.">
        {issues.map((issue, index) => (
          <div className="space-y-2" key={`${issue.title}-${index}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {issue.category}
            </p>
            <IssueCard issue={issue as ReviewIssue} />
          </div>
        ))}
      </ReviewSection>

      <ReviewSection
        title="Optimization suggestions"
        emptyText="No optimization suggestions returned."
      >
        {review.optimizations.map((optimization, index) => (
          <article
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
            key={`${optimization.title}-${index}`}
          >
            <h4 className="text-sm font-semibold text-zinc-50">
              {optimization.title}
            </h4>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {optimization.description}
            </p>
            {optimization.impact ? (
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                <span className="font-medium text-sky-300">Impact: </span>
                {optimization.impact}
              </p>
            ) : null}
          </article>
        ))}
      </ReviewSection>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 px-4 py-3">
          <h3 className="text-sm font-semibold text-zinc-100">Improved code</h3>
        </div>
        <pre className="max-h-[420px] overflow-auto p-4 text-sm leading-6 text-zinc-100">
          <code>{review.improvedCode}</code>
        </pre>
      </div>
    </section>
  );
}

function ReviewSection({
  children,
  emptyText,
  title,
}: {
  children: React.ReactNode[];
  emptyText: string;
  title: string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      {children.length > 0 ? (
        children
      ) : (
        <p className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
          {emptyText}
        </p>
      )}
    </div>
  );
}
