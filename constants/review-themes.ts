export type ReviewThemeId = "matrix" | "ocean" | "violet" | "ember";

export type ReviewTheme = {
  id: ReviewThemeId;
  name: string;
  swatch: string;
  accentText: string;
  accentSoft: string;
  action: string;
  border: string;
  surface: string;
  editorFocus: string;
  dragState: string;
};

export const REVIEW_THEMES: ReviewTheme[] = [
  {
    id: "matrix",
    name: "Matrix",
    swatch: "bg-emerald-400",
    accentText: "text-emerald-300",
    accentSoft: "bg-emerald-400/10 border-emerald-400/30",
    action:
      "bg-emerald-400 text-zinc-950 hover:bg-emerald-300 focus-visible:outline-emerald-300",
    border: "border-zinc-800",
    surface: "border-zinc-800 bg-zinc-950/80",
    editorFocus:
      "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20",
    dragState: "border-emerald-300 ring-2 ring-emerald-400/30",
  },
  {
    id: "ocean",
    name: "Ocean",
    swatch: "bg-sky-400",
    accentText: "text-sky-300",
    accentSoft: "bg-sky-400/10 border-sky-400/30",
    action:
      "bg-sky-400 text-zinc-950 hover:bg-sky-300 focus-visible:outline-sky-300",
    border: "border-sky-950",
    surface: "border-sky-950 bg-slate-950/90",
    editorFocus: "focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20",
    dragState: "border-sky-300 ring-2 ring-sky-400/30",
  },
  {
    id: "violet",
    name: "Violet",
    swatch: "bg-violet-400",
    accentText: "text-violet-300",
    accentSoft: "bg-violet-400/10 border-violet-400/30",
    action:
      "bg-violet-400 text-zinc-950 hover:bg-violet-300 focus-visible:outline-violet-300",
    border: "border-violet-950",
    surface: "border-violet-950 bg-zinc-950/90",
    editorFocus:
      "focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20",
    dragState: "border-violet-300 ring-2 ring-violet-400/30",
  },
  {
    id: "ember",
    name: "Ember",
    swatch: "bg-orange-400",
    accentText: "text-orange-300",
    accentSoft: "bg-orange-400/10 border-orange-400/30",
    action:
      "bg-orange-400 text-zinc-950 hover:bg-orange-300 focus-visible:outline-orange-300",
    border: "border-orange-950",
    surface: "border-orange-950 bg-stone-950/90",
    editorFocus:
      "focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20",
    dragState: "border-orange-300 ring-2 ring-orange-400/30",
  },
];
