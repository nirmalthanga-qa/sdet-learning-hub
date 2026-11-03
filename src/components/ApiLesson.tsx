import Link from "next/link";
import LessonCompletion from "@/components/LessonCompletion";
import { apiLessons, type ApiExample } from "@/data/api-lessons";

const courseHref = "/learning-paths/api-testing";

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="mt-4 min-w-0 overflow-hidden rounded-xl border border-border">
      <p className="bg-background px-4 py-2 text-xs font-semibold text-muted">
        {label}
      </p>

      <pre
        tabIndex={0}
        aria-label={label}
        className="overflow-x-auto bg-[#2A1A0E] p-4 text-sm leading-7 text-[#FFF8F0]"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Example({ example }: { example: ApiExample }) {
  return (
    <article className="mt-5 min-w-0 rounded-xl border border-border bg-surface p-5">
      <h3 className="text-lg font-bold">{example.title}</h3>

      <CodeBlock label={example.filename} code={example.code} />

      <CodeBlock label="How to use this example" code={example.command} />

      <p className="mt-4 leading-7">
        <strong>Expected behavior: </strong>
        {example.expected}
      </p>

      <p className="mt-3 leading-7 text-muted">{example.explanation}</p>
    </article>
  );
}

export default function ApiLesson({ slug }: { slug: string }) {
  const index = apiLessons.findIndex((lesson) => lesson.slug === slug);

  const lesson = apiLessons[index];

  if (!lesson?.content) {
    throw new Error(`api lesson content is missing: ${slug}`);
  }

  const content = lesson.content;
  const previous = apiLessons[index - 1];
  const next = apiLessons[index + 1];

  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link href="/learning-paths" className="underline underline-offset-4">
            Learning Paths
          </Link>

          <span aria-hidden="true">/</span>

          <Link href={courseHref} className="underline underline-offset-4">
            API Testing
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page">
            Lesson {String(lesson.number).padStart(2, "0")}
          </span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            API · LESSON {String(lesson.number).padStart(2, "0")}
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            {lesson.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            {content.introduction}
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">What you’ll learn</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            {content.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>

          <p className="mt-5 text-sm leading-7 text-muted">
            Practice with Postman and the local API introduced in this course.
            This website displays teaching material and does not send API
            requests.
          </p>
        </aside>

        <div className="mt-10 space-y-10">
          {content.sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`section-${index}`}>
              <h2 id={`section-${index}`} className="text-2xl font-bold">
                {section.title}
              </h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8">
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div
                  role="region"
                  aria-label={`${section.title} reference table`}
                  tabIndex={0}
                  className="my-6 overflow-x-auto rounded-2xl border border-border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      {section.title} reference
                    </caption>

                    <thead className="bg-accent text-surface">
                      <tr>
                        {section.table.headers.map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="px-5 py-4 font-semibold"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {section.table.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="odd:bg-surface even:bg-background"
                        >
                          {row.map((cell, cellIndex) =>
                            cellIndex === 0 ? (
                              <th
                                key={cellIndex}
                                scope="row"
                                className="whitespace-nowrap px-5 py-4 align-top font-bold text-accent"
                              >
                                {cell}
                              </th>
                            ) : (
                              <td
                                key={cellIndex}
                                className="px-5 py-4 align-top leading-relaxed text-foreground"
                              >
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.example && <Example example={section.example} />}
            </section>
          ))}

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className="text-2xl font-bold">
              Common mistakes
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
              {content.mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="exercise"
            className="rounded-xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-semibold tracking-[0.15em] text-accent">
              PRACTICE EXERCISE
            </p>

            <h2 id="exercise" className="mt-3 text-2xl font-bold">
              {content.exercise.title}
            </h2>

            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
              {content.exercise.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>

            <details className="mt-6 border-t border-border pt-4">
              <summary className="cursor-pointer rounded-sm font-semibold text-accent">
                View example solution
              </summary>

              <Example example={content.exercise.solution} />
            </details>
          </section>

          <section aria-labelledby="takeaway">
            <h2 id="takeaway" className="text-2xl font-bold">
              Key takeaway
            </h2>

            <p className="mt-4 leading-8">{content.takeaway}</p>
          </section>
        </div>

        <LessonCompletion lessonId={`api-${lesson.slug}`} />

        <nav
          aria-label="Lesson navigation"
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
        >
          {previous?.content && (
            <Link
              href={`${courseHref}/${previous.slug}`}
              className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
            >
              ← Previous lesson
            </Link>
          )}

          <Link
            href={courseHref}
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            Course overview
          </Link>

          {next?.content && (
            <Link
              href={`${courseHref}/${next.slug}`}
              className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
            >
              Next lesson →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
