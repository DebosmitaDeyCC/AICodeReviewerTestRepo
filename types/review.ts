export type ReviewSeverity = "low" | "medium" | "high" | "critical";

export type ReviewCategory =
  | "bug"
  | "security"
  | "performance"
  | "readability"
  | "maintainability";

export type ReviewIssue = {
  id?: string;
  category?: ReviewCategory;
  severity: ReviewSeverity | string;
  title: string;
  description: string;
  suggestion: string;
  lineNumber?: number;
  codeSnippet?: string;
};

export type ReviewSuggestion = {
  id?: string;
  title: string;
  description: string;
  impact?: string;
  before?: string;
  after?: string;
};

export type CodeReview = {
  summary: string;
  bugs: ReviewIssue[];
  securityIssues: ReviewIssue[];
  optimizations: ReviewSuggestion[];
  explanation: string;
  improvedCode: string;
};
