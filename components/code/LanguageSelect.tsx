import type { SelectHTMLAttributes } from "react";
import { SUPPORTED_LANGUAGES } from "@/constants/languages";
import { cn } from "@/lib/utils/cn";

type LanguageSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function LanguageSelect({ className, ...props }: LanguageSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-300">
      Language
      <select
        className={cn(
          "h-12 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20",
          className,
        )}
        {...props}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
