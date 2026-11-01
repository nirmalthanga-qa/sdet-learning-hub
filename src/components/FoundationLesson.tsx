import Link from "next/link";
import LessonCompletion from "@/components/LessonCompletion";
import { foundationLessons } from "@/data/foundation-lessons";

const courseHref = "/learning-paths/software-quality-engineering";

export default function FoundationLesson({ slug }: { slug: string }) {
  const lesson = foundationLessons.find((item) => item.slug === slug);

  if (!lesson) {
    throw new Error(`Unknown foundation lesson: ${slug}`);
  }

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
            Software Quality Engineering
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page">
            Lesson {String(lesson.number).padStart(2, "0")}
          </span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            SOFTWARE QUALITY ENGINEERING · LESSON{" "}
            {String(lesson.number).padStart(2, "0")}
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            {lesson.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            {lesson.introduction}
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">What you’ll learn</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            {lesson.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </aside>

        <div className="mt-10 space-y-10">
          {lesson.sections.map((section, index) => (
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
                  aria-label={section.title}
                  tabIndex={0}
                  className="mt-5 overflow-x-auto rounded-xl border border-border"
                >
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-surface">
                      <tr>
                        {section.table.headers.map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="border-b border-border p-4 font-semibold"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-b border-border last:border-0"
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="p-4 align-top leading-7"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.example && (
                <aside className="mt-5 rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-semibold">
                    Shopping application example
                  </h3>
                  <p className="mt-2 leading-7 text-muted">{section.example}</p>
                </aside>
              )}
            </section>
          ))}

          <section
            aria-labelledby="exercise"
            className="rounded-xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-semibold tracking-[0.15em] text-accent">
              PRACTICE EXERCISE
            </p>

            <h2 id="exercise" className="mt-3 text-2xl font-bold">
              {lesson.exercise.title}
            </h2>

            <p className="mt-4 leading-7">{lesson.exercise.scenario}</p>

            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
              {lesson.exercise.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>

            <details className="mt-6 border-t border-border pt-4">
              <summary className="cursor-pointer rounded-sm font-semibold text-accent">
                View example answers
              </summary>

              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
                {lesson.exercise.answers.map((answer) => (
                  <li key={answer}>{answer}</li>
                ))}
              </ul>
            </details>
          </section>

          <section aria-labelledby="takeaway">
            <h2 id="takeaway" className="text-2xl font-bold">
              Key takeaway
            </h2>

            <p className="mt-4 leading-8">{lesson.takeaway}</p>
          </section>
        </div>

        <LessonCompletion lessonId={`sqe-${lesson.slug}`} />

        <nav
          aria-label="Lesson navigation"
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
        >
          <Link
            href={`${courseHref}/${lesson.previousSlug}`}
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            ← Previous lesson
          </Link>

          <Link
            href={courseHref}
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            Course overview
          </Link>

          {lesson.nextSlug && (
            <Link
              href={`${courseHref}/${lesson.nextSlug}`}
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
