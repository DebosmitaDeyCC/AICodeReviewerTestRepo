"use client";

import { ChangeEvent, DragEvent, FormEvent, useMemo, useState } from "react";
import { CodeEditor } from "@/components/code/CodeEditor";
import { LanguageSelect } from "@/components/code/LanguageSelect";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ReviewResults } from "@/components/review/ReviewResults";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { FontSwitcher } from "@/components/ui/FontSwitcher";
import { CODE_FONTS, type CodeFontId } from "@/constants/code-fonts";
import {
  getCodeSample,
  isBuiltInSample,
} from "@/constants/code-samples";
import { REVIEW_THEMES, type ReviewThemeId } from "@/constants/review-themes";
import { cn } from "@/lib/utils/cn";
import type { ApiErrorResponse, ReviewResponse } from "@/types/api";
import type { CodeReview } from "@/types/review";

const toolbarControlClass =
  "inline-flex h-9 min-w-0 cursor-pointer items-center justify-center rounded-full bg-zinc-900/80 px-3 text-xs font-semibold text-zinc-300 shadow-sm shadow-black/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-zinc-800 hover:text-zinc-50 hover:shadow-md hover:shadow-black/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[76px]";

export function ReviewForm() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(() => getCodeSample(language));
  const [themeId, setThemeId] = useState<ReviewThemeId>("matrix");
  const [fontId, setFontId] = useState<CodeFontId>("geist");
  const [review, setReview] = useState<CodeReview | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const theme = useMemo(
    () => REVIEW_THEMES.find((item) => item.id === themeId) ?? REVIEW_THEMES[0],
    [themeId],
  );
  const codeFont = useMemo(
    () => CODE_FONTS.find((font) => font.id === fontId) ?? CODE_FONTS[0],
    [fontId],
  );

  function handleLanguageChange(nextLanguage: string) {
    setLanguage(nextLanguage);
    setReview(null);

    if (!code.trim() || isBuiltInSample(code)) {
      setCode(getCodeSample(nextLanguage));
    }
  }

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

  async function handlePasteFromClipboard() {
    setError("");

    try {
      const clipboardText = await navigator.clipboard.readText();

      if (!clipboardText.trim()) {
        setError("Clipboard does not contain code to paste.");
        return;
      }

      setCode(clipboardText);
      setReview(null);
    } catch {
      setError("Clipboard access was blocked. Paste with your keyboard instead.");
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await loadCodeFile(file);
    event.target.value = "";
  }

  async function handleDrop(event: DragEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    const droppedText = event.dataTransfer.getData("text");

    if (file) {
      await loadCodeFile(file);
      return;
    }

    if (droppedText.trim()) {
      setCode(droppedText);
      setReview(null);
    }
  }

  async function loadCodeFile(file: File) {
    setError("");

    if (file.size > 250_000) {
      setError("Please import a file smaller than 250 KB.");
      return;
    }

    const fileText = await file.text();
    setCode(fileText);
    setReview(null);
  }

  return (
    <form
      className={cn(
        "overflow-hidden rounded-lg border shadow-2xl shadow-black/30 transition-colors",
        theme.surface,
      )}
      onSubmit={handleSubmit}
    >
      <div
        className={cn(
          "flex flex-col gap-4 border-b p-4",
          theme.border,
        )}
      >
        <div className="max-w-xl">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.2em]",
              theme.accentText,
            )}
          >
            Code review workspace
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-50">
            Paste code for instant analysis
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(300px,420px)_minmax(220px,260px)] lg:items-end">
          <div className="grid gap-3">
            <div className="flex flex-col gap-2 text-sm font-medium text-zinc-300">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Theme
              </span>
              <ThemeSwitcher activeTheme={themeId} onThemeChange={setThemeId} />
            </div>
            <div className="flex flex-col gap-2 text-sm font-medium text-zinc-300">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Font
              </span>
              <FontSwitcher activeFont={fontId} onFontChange={setFontId} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <LanguageSelect
              value={language}
              onChange={(event) => handleLanguageChange(event.target.value)}
            />
            <Button
              className={cn("w-full", theme.action)}
              disabled={isLoading}
              type="submit"
            >
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
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-4 gap-1.5">
            <button
              className={toolbarControlClass}
              disabled={isLoading}
              onClick={handlePasteFromClipboard}
              type="button"
            >
              Paste
            </button>
            <label
              className={cn(
                toolbarControlClass,
                isLoading && "cursor-not-allowed opacity-60",
              )}
            >
              Import
              <input
                className="sr-only"
                disabled={isLoading}
                onChange={handleFileChange}
                type="file"
              />
            </label>
            <button
              className={toolbarControlClass}
              disabled={isLoading}
              onClick={() => {
                setCode(getCodeSample(language));
                setReview(null);
                setError("");
              }}
              type="button"
            >
              Sample
            </button>
            <button
              className={toolbarControlClass}
              disabled={isLoading || code.length === 0}
              onClick={() => {
                setCode("");
                setReview(null);
                setError("");
              }}
              type="button"
            >
              Clear
            </button>
          </div>
          <p className="rounded-full border border-zinc-800 bg-black/20 px-3 py-1.5 text-xs text-zinc-500 lg:text-right">
            {code.split(/\r\n|\r|\n/).length} lines / {code.length} chars
          </p>
        </div>
        <CodeEditor
          aria-label="Code to review"
          className={cn(
            theme.editorFocus,
            isDragging && theme.dragState,
            "disabled:cursor-wait disabled:opacity-70",
          )}
          style={{ fontFamily: codeFont.fontFamily }}
          value={code}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Paste code, drop a file, or use the clipboard button..."
          disabled={isLoading}
        />
        <p
          className={cn(
            "rounded-lg border px-3 py-2 text-xs text-zinc-400",
            theme.accentSoft,
          )}
        >
          Drag a code file onto the editor, paste from your clipboard, or start
          from the sample.
        </p>
      </div>
      {error ? (
        <div className="px-4 pb-4">
          <ErrorMessage message={error} />
        </div>
      ) : null}
      <div
        className={cn(
          "grid gap-3 border-t px-4 py-3 text-xs text-zinc-400 sm:grid-cols-3",
          theme.border,
        )}
      >
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
