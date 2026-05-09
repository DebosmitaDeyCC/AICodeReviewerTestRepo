import { REVIEW_THEMES, type ReviewThemeId } from "@/constants/review-themes";
import { cn } from "@/lib/utils/cn";

type ThemeSwitcherProps = {
  activeTheme: ReviewThemeId;
  onThemeChange: (theme: ReviewThemeId) => void;
};

export function ThemeSwitcher({
  activeTheme,
  onThemeChange,
}: ThemeSwitcherProps) {
  return (
    <div
      className="grid w-full grid-cols-4 gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1 shadow-inner shadow-black/50"
      aria-label="Theme options"
    >
      {REVIEW_THEMES.map((theme) => {
        const isActive = activeTheme === theme.id;

        return (
          <button
            aria-label={`Use ${theme.name} theme`}
            aria-pressed={isActive}
            className={cn(
              "flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-semibold text-zinc-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-zinc-200 hover:shadow-md hover:shadow-black/30 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400",
              isActive &&
                "bg-zinc-100 text-zinc-950 shadow-sm shadow-black/30 hover:bg-zinc-100 hover:text-zinc-950",
            )}
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            title={theme.name}
            type="button"
          >
            <span
              className={cn(
                "size-2.5 rounded-full transition-transform duration-200",
                theme.swatch,
                isActive && "scale-110",
              )}
            />
            <span className="truncate">
              {theme.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
