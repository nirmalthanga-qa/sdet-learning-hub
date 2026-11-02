import type { Metadata } from "next";
import Link from "next/link";
import {
  typescriptTopics,
  typescriptReferences,
} from "@/data/typescript-guide";

export const metadata: Metadata = {
  title: "TypeScript for SDET",
  description:
    "A practical TypeScript guide covering language concepts, configuration, runtime validation, Playwright, and Cypress automation.",
};

const groups = Array.from(
  new Set(typescriptTopics.map((topic) => topic.group)),
);

export default function TypeScriptGuidePage() {
  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link href="/learning-paths" className="underline underline-offset-4">
            Learning Paths
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href="/learning-paths/programming"
            className="underline underline-offset-4"
          >
            Programming
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page">TypeScript</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            LANGUAGE TO AUTOMATION
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            TypeScript for SDET
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Connect TypeScript concepts to practical test-data utilities, page
            objects, fixtures, API validation, and reliable Playwright and
            Cypress automation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {["Language foundations", "Playwright", "Cypress"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-border bg-surface px-4 py-2"
              >
                {label}
              </span>
            ))}
          </div>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">How to use this guide</h2>

          <p className="mt-3 leading-7 text-muted">
            Work through the Programming lessons for the fundamentals, then use
            this page to connect them to automation. Read each explanation,
            inspect its example, and complete the practice prompt.
          </p>

          <p className="mt-3 leading-7 text-muted">
            Language examples and framework snippets have different execution
            requirements. Playwright and Cypress examples belong in their
            respective automation projects and require the stated application
            routes, selectors, and contracts.
          </p>

          <p className="mt-3 font-semibold leading-7">
            Playwright uses promises and await. Cypress uses queued commands and
            chainable subjects.
          </p>
        </aside>

        <nav
          aria-label="TypeScript guide contents"
          className="mt-10 rounded-xl border border-border bg-surface p-6"
        >
          <h2 className="text-2xl font-bold">Explore the guide</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {groups.map((group) => (
              <div key={group}>
                <h3 className="font-semibold text-accent">{group}</h3>

                <ul className="mt-3 space-y-2">
                  {typescriptTopics
                    .filter((topic) => topic.group === group)
                    .map((topic) => (
                      <li key={topic.id}>
                        <a
                          href={`#${topic.id}`}
                          className="inline-block py-1 text-sm leading-6 underline underline-offset-4"
                        >
                          {topic.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="mt-12 space-y-10">
          {typescriptTopics.map((topic) => (
            <section
              key={topic.id}
              id={topic.id}
              aria-labelledby={`${topic.id}-title`}
              className="scroll-mt-8 rounded-xl border border-border bg-surface p-5 sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {topic.group}
              </p>

              <h2 id={`${topic.id}-title`} className="mt-3 text-2xl font-bold">
                {topic.title}
              </h2>

              <p className="mt-4 leading-8">{topic.explanation}</p>

              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted">
                {topic.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {topic.code && (
                <div className="mt-6 min-w-0 overflow-hidden rounded-xl border border-border">
                  <p className="bg-background px-4 py-2 text-xs font-semibold text-muted">
                    Example
                  </p>

                  <pre
                    tabIndex={0}
                    aria-label={`${topic.title} example`}
                    className="overflow-x-auto bg-[#2A1A0E] p-4 text-sm leading-7 text-[#FFF8F0]"
                  >
                    <code>{topic.code}</code>
                  </pre>
                </div>
              )}

              {topic.exampleContext && (
                <p className="mt-3 text-sm leading-7 text-muted">
                  {topic.exampleContext}
                </p>
              )}

              <aside className="mt-6 rounded-lg border border-border bg-background p-4">
                <h3 className="font-semibold">Put it into practice</h3>
                <p className="mt-2 leading-7">{topic.practice}</p>
              </aside>
            </section>
          ))}
        </div>

        <section
          aria-labelledby="references"
          className="mt-12 border-t border-border pt-8"
        >
          <h2 id="references" className="text-2xl font-bold">
            Official documentation
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
            {typescriptReferences.map((reference) => (
              <li key={reference.href}>
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {reference.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav
          aria-label="Guide navigation"
          className="mt-10 border-t border-border pt-6"
        >
          <Link
            href="/learning-paths/programming"
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            ← Back to Programming
          </Link>
        </nav>
      </div>
    </main>
  );
}
