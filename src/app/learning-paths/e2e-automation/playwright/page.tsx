import type { Metadata } from "next";
import Link from "next/link";
import LessonProgressBadge from "@/components/LessonProgressBadge";
import { playwrightLessons } from "@/data/playwright-lessons";

export const metadata: Metadata = {
  title: "Playwright with TypeScript",
  description:
    "Learn Playwright from your first test through fixtures, API testing, debugging, and a practical automation project.",
};

const courseHref = "/learning-paths/e2e-automation/playwright";

export default function PlaywrightOverviewPage() {
  const available = playwrightLessons.filter((lesson) => lesson.content).length;

  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link
            href="/learning-paths/e2e-automation"
            className="underline underline-offset-4"
          >
            E2E Automation
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page">Playwright</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            BROWSER AUTOMATION WITH TYPESCRIPT
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Playwright</h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Start with clear browser checks, then build reusable automation
            around realistic application behavior.
          </p>
        </header>

        <section
          aria-labelledby="course-details"
          className="mt-8 rounded-xl border border-border bg-surface p-6"
        >
          <h2 id="course-details" className="text-xl font-bold">
            Before you begin
          </h2>

          <dl className="mt-4 grid gap-5 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted">Language</dt>
              <dd className="mt-1 font-semibold">TypeScript</dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Practice environment</dt>
              <dd className="mt-1 font-semibold">
                Separate local automation project
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Availability</dt>
              <dd className="mt-1 font-semibold">
                {available} of {playwrightLessons.length} lessons available
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-sm leading-7 text-muted">
            Lessons 1–5 use controlled HTML examples. Later lessons introduce
            application navigation, backend interactions, isolated data, and
            complete workflows.
          </p>

          <Link
            href="/learning-paths/programming/typescript"
            className="mt-3 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            TypeScript reference →
          </Link>
        </section>

        <section aria-labelledby="syllabus" className="mt-10">
          <h2 id="syllabus" className="text-3xl font-bold">
            Course syllabus
          </h2>

          <ol className="mt-6 space-y-4">
            {playwrightLessons.map((lesson) => (
              <li key={lesson.slug}>
                <article className="rounded-xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eddbc3] text-sm font-bold text-accent"
                    >
                      {String(lesson.number).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold">{lesson.title}</h3>

                      <p className="mt-2 text-sm leading-7 text-muted">
                        {lesson.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        {lesson.content ? (
                          <>
                            <Link
                              href={`${courseHref}/${lesson.slug}`}
                              className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface hover:bg-[#653b13]"
                            >
                              Open lesson →
                              <span className="sr-only"> {lesson.title}</span>
                            </Link>

                            <LessonProgressBadge
                              lessonId={`playwright-${lesson.slug}`}
                              label="Lesson"
                            />
                          </>
                        ) : (
                          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                            Coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <nav
          aria-label="Course navigation"
          className="mt-10 border-t border-border pt-6"
        >
          <Link
            href="/learning-paths/e2e-automation"
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            ← E2E Automation courses
          </Link>
        </nav>
      </div>
    </main>
  );
}
