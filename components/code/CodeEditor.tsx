import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CodeEditorProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function CodeEditor({ className, ...props }: CodeEditorProps) {
  return (
    <textarea
      className={cn(
        "min-h-[320px] w-full resize-y rounded-lg border border-zinc-800 bg-[#080b10] p-4 font-mono text-sm leading-6 text-zinc-100 shadow-inner outline-none transition placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 md:min-h-[430px]",
        className,
      )}
      spellCheck={false}
      {...props}
    />
  );
}
