"use client";

import { FormEvent, useState } from "react";
import { CodeEditor } from "@/components/code/CodeEditor";
import { LanguageSelect } from "@/components/code/LanguageSelect";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ReviewResults } from "@/components/review/ReviewResults";
import type { ApiErrorResponse, ReviewResponse } from "@/types/api";
import type { CodeReview } from "@/types/review";

const SAMPLE_CODE = `function calculateTotal(items) {
  let total = 0

  for (item of items) {
    total += item.price * item.quantity
  }

  return total
}`;

export function ReviewForm() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState<CodeReview | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReview(null);

    if (!code.trim()) {
      setError("Paste some code before requesting a review.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = (await response.json()) as
        | ReviewResponse
        | ApiErrorResponse;

      if (!response.ok) {
        throw new Error(
          "error" in data ? data.error : "The review request failed.",
        );
      }

      if (!("review" in data)) {
        throw new Error("The review response was missing review data.");
      }

      setReview(data.review);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while reviewing the code.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 border-b border-zinc-800 p-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Code review workspace
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-50">
            Paste code for instant analysis
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <LanguageSelect
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          />
          <Button className="w-full sm:w-auto" disabled={isLoading} type="submit">
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <LoadingSpinner />
                Reviewing
              </span>
            ) : (
              "Review Code"
            )}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <CodeEditor
          aria-label="Code to review"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Paste your code here..."
          disabled={isLoading}
        />
      </div>
      {error ? (
        <div className="px-4 pb-4">
          <ErrorMessage message={error} />
        </div>
      ) : null}
      <div className="grid gap-3 border-t border-zinc-800 px-4 py-3 text-xs text-zinc-400 sm:grid-cols-3">
        <p>
          <span className="text-amber-300">Bugs</span> and edge cases
        </p>
        <p>
          <span className="text-sky-300">Security</span> risks
        </p>
        <p>
          <span className="text-emerald-300">Optimized</span> rewrite
        </p>
      </div>
      {review ? <ReviewResults review={review} /> : null}
    </form>
  );
}
