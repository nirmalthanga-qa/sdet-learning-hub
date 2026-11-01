import type { Metadata } from "next";
import Link from "next/link";
import LessonProgressBadge from "@/components/LessonProgressBadge";

export const metadata: Metadata = {
  title: "Software Quality Engineering",
  description:
    "Learn quality engineering foundations, test design, test strategy, defect management, and the role of an SDET.",
};

type Lesson = {
  title: string;
  description: string;
  href?: string;
  lessonId?: string;
};

const lessons: Lesson[] = [
  {
    title: "What is Software Quality Engineering?",
    description:
      "Understand quality engineering, its relationship to testing, and the role of an SDET.",
    href: "/learning-paths/software-quality-engineering/what-is-quality-engineering",
    lessonId: "sqe-what-is-quality-engineering",
  },
  {
    title: "SDLC, STLC, and Quality Throughout Delivery",
    description:
      "Explore development and testing activities from requirements to release.",
    href: "/learning-paths/software-quality-engineering/sdlc-and-stlc",
    lessonId: "sqe-sdlc-and-stlc",
  },
  {
    title: "Agile, Scrum, and Team Collaboration",
    description:
      "Understand how quality activities fit into iterative delivery.",
    href: "/learning-paths/software-quality-engineering/agile-scrum-team-collaboration",
    lessonId: "sqe-agile-scrum-team-collaboration",
  },
  {
    title: "Test Levels and Test Types",
    description:
      "Understand unit, integration, system, and acceptance testing, plus functional and non-functional coverage.",
    href: "/learning-paths/software-quality-engineering/test-levels-and-test-types",
    lessonId: "sqe-test-levels-and-test-types",
  },
  {
    title: "Test Design Techniques",
    description:
      "Practice equivalence partitioning, boundary values, decision tables, and state transitions.",
    href: "/learning-paths/software-quality-engineering/test-design-techniques",
    lessonId: "sqe-test-design-techniques",
  },
  {
    title: "Requirements and Acceptance Criteria",
    description:
      "Identify ambiguity, ask useful questions, and derive test scenarios.",
    href: "/learning-paths/software-quality-engineering/requirements-and-acceptance-criteria",
    lessonId: "sqe-requirements-and-acceptance-criteria",
  },
  {
    title: "Test Strategy, Planning, and Risk",
    description:
      "Define scope, prioritize coverage, and plan testing around product risks.",
    href: "/learning-paths/software-quality-engineering/test-strategy-planning-and-risk",
    lessonId: "sqe-test-strategy-planning-and-risk",
  },
  {
    title: "Defect Management",
    description:
      "Write reproducible defect reports and understand severity, priority, and triage.",
    href: "/learning-paths/software-quality-engineering/defect-management",
    lessonId: "sqe-defect-management",
  },
  {
    title: "Test Data and Environments",
    description:
      "Prepare repeatable test conditions and manage data dependencies.",
    href: "/learning-paths/software-quality-engineering/test-data-and-environments",
    lessonId: "sqe-test-data-and-environments",
  },
  {
    title: "Test Reporting and Quality Metrics",
    description:
      "Communicate coverage, findings, remaining risks, and release confidence.",
    href: "/learning-paths/software-quality-engineering/test-reporting-and-quality-metrics",
    lessonId: "sqe-test-reporting-and-quality-metrics",
  },
  {
    title: "Choosing What to Automate",
    description:
      "Evaluate automation value, maintenance costs, and appropriate test layers.",
    href: "/learning-paths/software-quality-engineering/choosing-what-to-automate",
    lessonId: "sqe-choosing-what-to-automate",
  },
  {
    title: "Practice: Plan Testing for a Shopping Application",
    description:
      "Apply the foundations to requirements, risks, scenarios, and a practical test plan.",
    href: "/learning-paths/software-quality-engineering/plan-testing-shopping-application",
    lessonId: "sqe-plan-testing-shopping-application",
  },
];

export default function SoftwareQualityEngineeringPage() {
  const availableLessons = lessons.filter((lesson) => lesson.href).length;

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

          <span aria-current="page">Software Quality Engineering</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            LEARNING PATH 01
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Software Quality Engineering
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Build a foundation in testing, risk, and software delivery. Learn
            how to ask better questions, design meaningful tests, and
            communicate quality clearly.
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
              <dd className="mt-1 font-semibold">Foundational</dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Prerequisites</dt>
              <dd className="mt-1 font-semibold">No programming required</dd>
            </div>

            <div>
              <dt className="text-sm text-muted">Availability</dt>
              <dd className="mt-1 font-semibold">
                {availableLessons} of {lessons.length} planned lessons available
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-sm leading-6 text-muted">
            Practice exercises use familiar application features such as login,
            shopping carts, and checkout.
          </p>
        </section>

        <section aria-labelledby="syllabus-title" className="mt-10">
          <h2 id="syllabus-title" className="text-3xl font-bold">
            Course syllabus
          </h2>

          <p className="mt-3 leading-7 text-muted">
            Follow the lessons in order. Additional lessons will become
            available as the course grows.
          </p>

          <ol className="mt-6 space-y-4">
            {lessons.map((lesson, index) => (
              <li key={lesson.title}>
                <article className="rounded-xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center
                        justify-center rounded-full bg-[#eddbc3]
                        text-sm font-bold text-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold leading-snug">
                        {lesson.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-muted">
                        {lesson.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        {lesson.href ? (
                          <>
                            <Link
                              href={lesson.href}
                              className="inline-flex min-h-11 items-center
                                rounded-lg bg-accent px-4 py-2 text-sm
                                font-semibold text-surface
                                hover:bg-[#653b13]"
                            >
                              Open lesson
                              <span aria-hidden="true" className="ml-2">
                                →
                              </span>
                              <span className="sr-only">: {lesson.title}</span>
                            </Link>

                            {lesson.lessonId && (
                              <LessonProgressBadge
                                lessonId={lesson.lessonId}
                                label="Lesson"
                              />
                            )}
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
            className="inline-flex min-h-11 items-center font-semibold
              text-accent underline underline-offset-4"
          >
            ← All learning paths
          </Link>
        </nav>
      </div>
    </main>
  );
}
