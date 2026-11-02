import type { Metadata } from "next";
import Link from "next/link";
import { playwrightLessons } from "@/data/playwright-lessons";
import AutomationConcepts from "@/components/AutomationConcepts";
import { cypressLessons } from "@/data/cypress-lessons";

export const metadata: Metadata = {
  title: "E2E Automation",
  description:
    "Learn browser automation through dedicated Playwright and Cypress courses.",
};

export default function E2EAutomationPage() {
  const available = playwrightLessons.filter((lesson) => lesson.content).length;
  const cypressAvailable = cypressLessons.filter(
    (lesson) => lesson.content,
  ).length;

  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/learning-paths"
          className="text-sm text-accent underline underline-offset-4"
        >
          ← All learning paths
        </Link>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            LEARNING PATH 03
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            E2E Automation
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Learn to automate meaningful user journeys, prepare reliable test
            data, investigate failures, and build maintainable test projects.
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">Before you begin</h2>

          <p className="mt-3 leading-7 text-muted">
            Be comfortable with functions, objects, modules, and asynchronous
            programming. Review the Programming course when you need a
            refresher.
          </p>

          <Link
            href="/learning-paths/programming"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            Review Programming →
          </Link>
        </aside>

        <AutomationConcepts />
        <section
          aria-label="Automation courses"
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          <article className="rounded-xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold text-accent">
              PLAYWRIGHT + TYPESCRIPT
            </p>

            <h2 className="mt-3 text-3xl font-bold">Playwright</h2>

            <p className="mt-4 leading-7 text-muted">
              Learn locators, assertions, fixtures, page object models, API
              testing, network control, debugging, and CI execution.
            </p>

            <p className="mt-4 text-sm font-semibold">
              {available} of {playwrightLessons.length} lessons available
            </p>

            <Link
              href="/learning-paths/e2e-automation/playwright"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-3 font-semibold text-surface hover:bg-[#653b13]"
            >
              Explore Playwright →
            </Link>
          </article>

          <article className="rounded-xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold text-accent">
              CYPRESS + TYPESCRIPT
            </p>

            <h2 className="mt-3 text-3xl font-bold">Cypress</h2>

            <p className="mt-4 leading-7 text-muted">
              Learn the command queue, assertions, network interception, typed
              helpers, API testing, and CI execution.
            </p>

            <p className="mt-4 text-sm font-semibold">
              {cypressAvailable} of {cypressLessons.length} lessons available
            </p>

            <Link
              href="/learning-paths/e2e-automation/cypress"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-3 font-semibold text-surface hover:bg-[#653b13]"
            >
              Explore Cypress →
            </Link>
          </article>
        </section>
      </div>
    </main>
  );
}
