import type { CodeReview } from "./review";

export type ReviewRequest = {
  code: string;
  language: string;
};

export type ReviewResponse = {
  review: CodeReview;
};

export type ApiErrorResponse = {
  error: string;
};
