export type CodeFontId = "geist" | "system" | "classic";

export type CodeFont = {
  id: CodeFontId;
  name: string;
  preview: string;
  fontFamily: string;
};

export const CODE_FONTS: CodeFont[] = [
  {
    id: "geist",
    name: "Geist",
    preview: "G",
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  },
  {
    id: "system",
    name: "System",
    preview: "S",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  {
    id: "classic",
    name: "Classic",
    preview: "C",
    fontFamily: '"Courier New", Courier, monospace',
  },
];
