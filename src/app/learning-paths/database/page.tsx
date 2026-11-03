import type { Metadata } from "next";
import Link from "next/link";
import LessonProgressBadge from "@/components/LessonProgressBadge";
import { databaseLessons } from "@/data/database-lessons";

export const metadata: Metadata = {
  title: "Database Testing",
  description:
    "Learn SQL and PostgreSQL for SDET database validation, test data management, and automation.",
};

const courseHref = "/learning-paths/database";

export default function DatabaseOverviewPage() {
  const available = databaseLessons.filter((lesson) => lesson.content).length;

  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link href="/learning-paths" className="underline underline-offset-4">
            Learning Paths
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Database Testing</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            LEARNING PATH 05
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Database Testing
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Learn SQL and PostgreSQL to validate stored data, investigate
            application behavior, and build reliable database checks for
            automation.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["SQL", "PostgreSQL", "Data Validation", "TypeScript"].map(
              (tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-accent"
                >
                  {tool}
                </span>
              ),
            )}
          </div>
        </header>

        <section
          aria-labelledby="course-details"
          className="mt-8 rounded-xl border border-border bg-surface p-6"
        >
          <h2 id="course-details" className="text-xl font-bold">
            Before you begin
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Start with basic software testing knowledge. No previous SQL
            experience is required. API testing and TypeScript fundamentals will
            help with the later integration lessons.
          </p>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Practice environment</dt>
              <dd className="mt-1 font-semibold">
                Local PostgreSQL and a shopping database
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Availability</dt>
              <dd className="mt-1 font-semibold">
                {available} of {databaseLessons.length} lessons available
              </dd>
            </div>
          </dl>
        </section>

        <aside className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">Connect behavior to stored data</h2>
          <p className="mt-3 leading-7 text-muted">
            Follow customers, products, orders, and order items through
            realistic validation scenarios. Learn when database checks add
            useful evidence and how to isolate your test data.
          </p>
        </aside>

        <section aria-labelledby="syllabus" className="mt-10">
          <h2 id="syllabus" className="text-3xl font-bold">
            Course syllabus
          </h2>

          <ol className="mt-6 space-y-4">
            {databaseLessons.map((lesson) => (
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
                              lessonId={`database-${lesson.slug}`}
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
      </div>
    </main>
  );
}
