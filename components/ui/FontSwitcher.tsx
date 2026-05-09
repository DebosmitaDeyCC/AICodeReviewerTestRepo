import { CODE_FONTS, type CodeFontId } from "@/constants/code-fonts";
import { cn } from "@/lib/utils/cn";

type FontSwitcherProps = {
  activeFont: CodeFontId;
  onFontChange: (font: CodeFontId) => void;
};

export function FontSwitcher({
  activeFont,
  onFontChange,
}: FontSwitcherProps) {
  return (
    <div
      className="grid w-full grid-cols-3 gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1 shadow-inner shadow-black/50"
      aria-label="Font options"
    >
      {CODE_FONTS.map((font) => {
        const isActive = activeFont === font.id;

        return (
          <button
            aria-label={`Use ${font.name} font`}
            aria-pressed={isActive}
            className={cn(
              "flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-semibold text-zinc-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-zinc-200 hover:shadow-md hover:shadow-black/30 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400",
              isActive &&
                "bg-zinc-100 text-zinc-950 shadow-sm shadow-black/30 hover:bg-zinc-100 hover:text-zinc-950",
            )}
            key={font.id}
            onClick={() => onFontChange(font.id)}
            title={font.name}
            type="button"
          >
            <span
              className="grid size-4 place-items-center rounded-full bg-zinc-800 text-[10px] text-zinc-200"
              style={{ fontFamily: font.fontFamily }}
            >
              {font.preview}
            </span>
            <span className="truncate">{font.name}</span>
          </button>
        );
      })}
    </div>
  );
}
