import type { Metadata } from "next";
import Link from "next/link";
import LessonProgressBadge from "@/components/LessonProgressBadge";
import { apiLessons } from "@/data/api-lessons";

export const metadata: Metadata = {
  title: "API Testing",
  description:
    "Learn HTTP, Postman, OpenAPI, Swagger UI, authentication, API assertions, and reliable service testing.",
};

const courseHref = "/learning-paths/api-testing";

export default function ApiOverviewPage() {
  const available = apiLessons.filter((lesson) => lesson.content).length;

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

          <span aria-current="page">API Testing</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            LEARNING PATH 04
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">API Testing</h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Understand service contracts, explore APIs with Postman and Swagger
            UI, and build checks that verify meaningful application behavior.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["HTTP", "Postman", "OpenAPI", "Swagger UI"].map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-accent"
              >
                {tool}
              </span>
            ))}
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
            Be comfortable with basic testing concepts and JSON. JavaScript
            fundamentals will help when writing Postman scripts. Completing the
            browser automation courses is not required.
          </p>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Practice environment</dt>
              <dd className="mt-1 font-semibold">
                Postman and a controlled local API
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Availability</dt>
              <dd className="mt-1 font-semibold">
                {available} of {apiLessons.length} lessons available
              </dd>
            </div>
          </dl>

          <Link
            href="/learning-paths/programming"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            Review programming fundamentals →
          </Link>
        </section>

        <aside className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">Documentation and verification</h2>
          <p className="mt-3 leading-7 text-muted">
            Swagger UI helps you understand and explore the documented API.
            Postman helps you send requests and assert results. Our scenarios
            connect both tools to explicit requirements and controlled test
            data.
          </p>
        </aside>

        <section aria-labelledby="syllabus" className="mt-10">
          <h2 id="syllabus" className="text-3xl font-bold">
            Course syllabus
          </h2>

          <ol className="mt-6 space-y-4">
            {apiLessons.map((lesson) => (
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
                              lessonId={`api-${lesson.slug}`}
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
