import { ReviewForm } from "@/components/review/ReviewForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-zinc-100">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <nav className="flex items-center justify-between border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 font-mono text-sm font-bold text-emerald-300">
              AI
            </div>
            <span className="text-sm font-semibold text-zinc-200">
              Code Reviewer
            </span>
          </div>
          <span className="hidden rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-400 sm:inline-flex">
            Next.js + OpenAI
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              AI-assisted code review
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Find bugs, security risks, and cleaner code paths before review.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              Paste a snippet, choose the language, and prepare it for an AI
              review focused on correctness, security, performance, and
              maintainability.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Bug detection", "Security notes", "Improved code"].map(
                (item) => (
                  <div
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300"
                    key={item}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <ReviewForm />
        </div>
      </section>
    </main>
  );
}
