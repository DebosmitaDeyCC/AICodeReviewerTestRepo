import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-emerald-400 text-zinc-950 hover:bg-emerald-300 focus-visible:outline-emerald-300",
        variant === "secondary" &&
          "border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 focus-visible:outline-zinc-500",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
