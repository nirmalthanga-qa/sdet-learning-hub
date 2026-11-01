import type { Metadata } from "next";
import Link from "next/link";
import LessonProgressBadge from "@/components/LessonProgressBadge";
import { programmingLessons } from "@/data/programming-lessons";

export const metadata: Metadata = {
  title: "Programming: JavaScript and TypeScript",
  description:
    "Learn programming foundations for test automation through JavaScript and TypeScript examples, exercises, and practical utilities.",
};

const courseHref = "/learning-paths/programming";

export default function ProgrammingOverviewPage() {
  const availableLessons = programmingLessons.filter(
    (lesson) => lesson.content,
  ).length;

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

          <span aria-current="page">Programming</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            LEARNING PATH 02
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Programming
          </h1>

          <p className="mt-3 text-xl font-semibold text-accent">
            JavaScript &amp; TypeScript
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Build the programming skills behind reliable automation. Start with
            small JavaScript programs, then use TypeScript to create clearer
            test data and reusable utilities.
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
              <dt className="text-sm text-muted">Level</dt>
              <dd className="mt-1 font-semibold">Beginner to intermediate</dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Practice tools</dt>
              <dd className="mt-1 font-semibold">VS Code and Node.js</dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Availability</dt>
              <dd className="mt-1 font-semibold">
                {availableLessons} of {programmingLessons.length} lessons
                available
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-sm leading-7 text-muted">
            No prior programming experience is required. Run the examples
            locally in a separate practice folder and compare the output with
            the lesson.
          </p>
        </section>

        <section aria-labelledby="syllabus" className="mt-10">
          <h2 id="syllabus" className="text-3xl font-bold">
            Course syllabus
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Work through the lessons in order. Try each exercise before opening
            its example solution.
          </p>

          <ol className="mt-6 space-y-4">
            {programmingLessons.map((lesson) => (
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
                      <h3 className="text-xl font-bold leading-snug">
                        {lesson.title}
                      </h3>

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
                              Open lesson
                              <span aria-hidden="true" className="ml-2">
                                →
                              </span>
                              <span className="sr-only">: {lesson.title}</span>
                            </Link>

                            <LessonProgressBadge
                              lessonId={`programming-${lesson.slug}`}
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
            href="/learning-paths"
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            ← All learning paths
          </Link>
        </nav>
      </div>
    </main>
  );
}
