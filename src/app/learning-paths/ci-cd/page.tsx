import type { Metadata } from "next";
import Link from "next/link";
import LessonProgressBadge from "@/components/LessonProgressBadge";
import { cicdLessons } from "@/data/cicd-lessons";

export const metadata: Metadata = {
  title: "Version Control and CI/CD",
  description: "Daily Git workflows, GitHub Actions, Docker, and practical SDET pipelines.",
};
const groups = ["Git", "GitHub Actions", "Docker and integration"] as const;
const courseHref = "/learning-paths/ci-cd";

export default function CiCdOverviewPage() {
  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/learning-paths" className="underline underline-offset-4">Learning Paths</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Version Control and CI/CD</span>
        </nav>
        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">LEARNING PATH 06</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Version Control and CI/CD</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Review and share automation changes with Git, run meaningful checks with GitHub Actions,
            and package reliable test environments with Docker.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Git", "GitHub Actions", "Docker", "Playwright", "Cypress"].map(tool => (
              <span key={tool} className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-accent">{tool}</span>
            ))}
          </div>
        </header>
        <section aria-labelledby="before-you-begin" className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 id="before-you-begin" className="text-xl font-bold">Before you begin</h2>
          <p className="mt-3 leading-7 text-muted">
            Start with a terminal and a disposable Git repository. Later lessons use Node.js 24,
            browser testing fundamentals, Docker, and a GitHub repository you control.
            Run examples in sdet-ci-practice, separately from this tutorial application.
          </p>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div><dt className="text-sm text-muted">Availability</dt><dd className="mt-1 font-semibold">{cicdLessons.length} of {cicdLessons.length} lessons available</dd></div>
            <div><dt className="text-sm text-muted">Final project</dt><dd className="mt-1 font-semibold">Browser suites against a PostgreSQL-backed app</dd></div>
          </dl>
        </section>
        <nav aria-label="Course sections" className="mt-6 flex flex-wrap gap-3">
          {groups.map((group, index) => <a key={group} href={`#part-${index + 1}`} className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-accent">{group}</a>)}
        </nav>
        {groups.map((group, groupIndex) => (
          <section key={group} id={`part-${groupIndex + 1}`} aria-labelledby={`heading-${groupIndex}`} className="mt-10 scroll-mt-24">
            <p className="text-xs font-semibold tracking-[0.15em] text-accent">PART {groupIndex + 1}</p>
            <h2 id={`heading-${groupIndex}`} className="mt-2 text-3xl font-bold">{group}</h2>
            <ol start={groupIndex === 0 ? 1 : groupIndex === 1 ? 12 : 20} className="mt-6 space-y-4">
              {cicdLessons.filter(lesson => lesson.group === group).map(lesson => (
                <li key={lesson.slug}>
                  <article className="rounded-xl border border-border bg-surface p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eddbc3] text-sm font-bold text-accent">{String(lesson.number).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold">{lesson.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted">{lesson.description}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <Link href={`${courseHref}/${lesson.slug}`} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface hover:bg-[#653b13]">Open lesson →<span className="sr-only"> {lesson.title}</span></Link>
                          <LessonProgressBadge lessonId={`cicd-${lesson.slug}`} label="Lesson" />
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
}
