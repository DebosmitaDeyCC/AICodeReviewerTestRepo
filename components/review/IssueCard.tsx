import type { ReviewIssue } from "@/types/review";

type IssueCardProps = {
  issue: ReviewIssue;
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-sm font-semibold text-zinc-50">{issue.title}</h4>
        <span className="w-fit rounded-md border border-amber-300/30 bg-amber-300/10 px-2 py-1 text-xs font-medium text-amber-200">
          {issue.severity}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{issue.description}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        <span className="font-medium text-emerald-300">Suggestion: </span>
        {issue.suggestion}
      </p>
      {issue.lineNumber ? (
        <p className="mt-3 text-xs text-zinc-500">Line {issue.lineNumber}</p>
      ) : null}
    </article>
  );
}
