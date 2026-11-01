import type { Metadata } from "next";
import Link from "next/link";
import LessonCompletion from "@/components/LessonCompletion";

export const metadata: Metadata = {
  title: "SDLC, STLC, and Quality Throughout Delivery",
  description:
    "Understand the software development lifecycle, testing activities, and continuous quality practices.",
};

const courseHref = "/learning-paths/software-quality-engineering";

const developmentStages = [
  {
    stage: "Requirements",
    activity: "Understand user needs, business rules, and constraints.",
    quality: "Clarify ambiguity and agree on testable acceptance criteria.",
  },
  {
    stage: "Design",
    activity: "Plan the architecture, interfaces, and data structures.",
    quality: "Review risks, failure handling, accessibility, and testability.",
  },
  {
    stage: "Implementation",
    activity: "Develop and integrate the software.",
    quality:
      "Use code reviews, static checks, and appropriate automated tests.",
  },
  {
    stage: "Validation",
    activity: "Evaluate the integrated application.",
    quality:
      "Check functional behavior and relevant non-functional requirements.",
  },
  {
    stage: "Release",
    activity: "Deploy a version to its intended environment.",
    quality:
      "Review remaining risks and verify deployment and rollback readiness.",
  },
  {
    stage: "Operation and maintenance",
    activity: "Support users and improve the software.",
    quality:
      "Monitor failures, investigate incidents, and feed learning into delivery.",
  },
];

const testingPhases = [
  {
    stage: "Requirement Analysis",
    goal: "Review functional and non-functional requirements, identify testable items, clarify gaps, and assess what can reasonably be automated.",
    deliverables:
      "Testable requirements, clarification notes, and an automation feasibility assessment.",
  },
  {
    stage: "Test Planning",
    goal: "Define testing scope, approach, tools, responsibilities, effort, schedules, and the criteria used to assess readiness and completion.",
    deliverables:
      "Test plan, test strategy or reference to the existing strategy, effort estimates, and schedule.",
  },
  {
    stage: "Test Case Development",
    goal: "Write and review test cases, prepare test data, map coverage to requirements, and develop automation where suitable.",
    deliverables:
      "Test cases, test data, automated scripts where applicable, and a Requirements Traceability Matrix (RTM).",
  },
  {
    stage: "Test Environment Setup",
    goal: "Configure the application, services, hardware or cloud resources, network, and databases needed for testing. Match relevant production characteristics within agreed constraints.",
    deliverables:
      "Configured test environment, setup documentation, and environment smoke-test results.",
  },
  {
    stage: "Test Execution",
    goal: "Run test cases, compare actual and expected results, record evidence, report defects, verify fixes, and perform appropriate regression checks.",
    deliverables:
      "Execution logs, test results, defect reports, and retest and regression results.",
  },
  {
    stage: "Test Cycle Closure",
    goal: "Evaluate coverage, pass rate, defects, and remaining risks; summarize outcomes, record lessons learned, and archive reusable testing assets.",
    deliverables:
      "Test closure report, archived test assets, improvement actions, and stakeholder sign-off where required by the agreed process.",
  },
];

export default function SdlcAndStlcLesson() {
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
          <span aria-current="page">Lesson 02</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            SOFTWARE QUALITY ENGINEERING · LESSON 02
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            SDLC, STLC, and Quality Throughout Delivery
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Understand how software is developed and how testing contributes
            throughout its lifecycle.
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">What you’ll learn</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>The purpose of the SDLC and STLC.</li>
            <li>The six STLC phases, their goals, and key deliverables.</li>
            <li>How entry and exit criteria guide testing decisions.</li>
            <li>Why testing activities overlap and repeat.</li>
          </ul>
        </aside>

        <div className="mt-10 space-y-10">
          <section aria-labelledby="sdlc">
            <h2 id="sdlc" className="text-2xl font-bold">
              What is the SDLC?
            </h2>
            <p className="mt-4 leading-8">
              The Software Development Life Cycle describes how software is
              planned, built, delivered, operated, and maintained. Different
              teams organize these activities differently.
            </p>
            <p className="mt-3 leading-8 text-muted">
              The stages below are a useful learning model. In iterative
              delivery, they overlap and repeat rather than happening only once
              in a fixed sequence.
            </p>

            <div className="mt-5 space-y-4">
              {developmentStages.map((item) => (
                <article
                  key={item.stage}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="text-xl font-bold">{item.stage}</h3>
                  <p className="mt-2 leading-7">{item.activity}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    <strong>Quality contribution:</strong> {item.quality}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="stlc">
            <h2 id="stlc" className="text-2xl font-bold">
              What is the STLC?
            </h2>
            <p className="mt-4 leading-8">
              The Software Testing Life Cycle describes how testing is analyzed,
              planned, prepared, executed, and brought to closure. This lesson
              uses a six-phase model to organize that work.
            </p>
            <p className="mt-3 leading-8 text-muted">
              Teams may group activities differently. These phases can overlap
              and repeat, especially during iterative delivery. Monitoring and
              control continue across the cycle rather than forming a separate
              phase in this model.
            </p>

            <h3 className="mt-6 text-xl font-bold">The 6 Phases of STLC</h3>
            <div className="mt-5 space-y-4">
              {testingPhases.map((item, index) => (
                <article
                  key={item.stage}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h4 className="text-xl font-bold">
                    {index + 1}. {item.stage}
                  </h4>
                  <p className="mt-2 leading-7">
                    <strong>Goal:</strong> {item.goal}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    <strong>Key deliverables:</strong> {item.deliverables}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="criteria">
            <h2 id="criteria" className="text-2xl font-bold">
              Core concepts: entry and exit criteria
            </h2>
            <div className="mt-5 space-y-4">
              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-xl font-bold">Entry criteria</h3>
                <p className="mt-2 leading-7">
                  Agreed prerequisites for starting a testing phase or activity.
                  They help the team decide whether it is ready to proceed.
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  <strong>Example before test execution:</strong> The build is
                  deployed, environment smoke checks pass, test cases are
                  reviewed, and the required accounts and test data are ready.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-xl font-bold">Exit criteria</h3>
                <p className="mt-2 leading-7">
                  Agreed conditions for considering a testing phase or activity
                  complete. Evaluate the evidence against these conditions
                  before concluding or signing off the work.
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  <strong>Example before test cycle closure:</strong> Required
                  checks have run, agreed coverage targets are met, defects have
                  been assessed, and remaining risks have documented decisions
                  from the responsible stakeholders.
                </p>
              </article>
            </div>
            <p className="mt-4 leading-8 text-muted">
              Set measurable criteria that fit the product and its risks. If a
              criterion is unmet, make the gap visible and record any authorized
              exception. A high pass rate alone does not establish release
              readiness.
            </p>
          </section>

          <section aria-labelledby="comparison">
            <h2 id="comparison" className="text-2xl font-bold">
              How do they relate?
            </h2>
            <p className="mt-4 leading-8">
              The SDLC covers the broader software lifecycle. The STLC focuses
              on testing activities within that lifecycle.
            </p>
            <p className="mt-3 leading-8 text-muted">
              For example, reviewing checkout acceptance criteria is a testing
              activity during requirements work. Executing an automated checkout
              test happens after the relevant behavior is available. Both
              support the same delivery.
            </p>
          </section>

          <section aria-labelledby="example">
            <h2 id="example" className="text-2xl font-bold">
              Example: preventing orders for unavailable stock
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
              <li>
                Clarify what should happen if stock runs out after a customer
                adds an item to the cart.
              </li>
              <li>
                Review how checkout validates stock, including simultaneous
                orders from different customers.
              </li>
              <li>
                Prepare data and tests for available, unavailable, and
                insufficient stock.
              </li>
              <li>
                Execute checks against the UI, API, and relevant database
                changes.
              </li>
              <li>
                Investigate failures, retest fixes, and communicate any
                unresolved risks.
              </li>
              <li>
                After release, monitor stock-related checkout failures and use
                the findings to improve coverage.
              </li>
            </ol>
          </section>

          <section aria-labelledby="early-feedback">
            <h2 id="early-feedback" className="text-2xl font-bold">
              Early feedback and production feedback
            </h2>
            <p className="mt-4 leading-8">
              Shift-left practices bring useful quality feedback earlier, such
              as reviewing requirements or running fast automated checks during
              development.
            </p>
            <p className="mt-3 leading-8 text-muted">
              Shift-right practices use information from running systems, such
              as monitoring and production observations. Earlier testing does
              not remove the need to learn after release.
            </p>
          </section>

          <section
            aria-labelledby="exercise"
            className="rounded-xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-semibold tracking-[0.15em] text-accent">
              PRACTICE EXERCISE
            </p>
            <h2 id="exercise" className="mt-3 text-2xl font-bold">
              Plan quality activities for a password reset
            </h2>
            <p className="mt-4 leading-7">
              Write one activity for each point: before development, during
              implementation, before release, and after release.
            </p>

            <details className="mt-6 border-t border-border pt-4">
              <summary
                className="cursor-pointer rounded-sm font-semibold
                  text-accent focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-accent"
              >
                View example answers
              </summary>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
                <li>
                  Before development: clarify token expiry and whether a reset
                  link can be used more than once.
                </li>
                <li>
                  During implementation: add automated checks for valid,
                  expired, and previously used tokens.
                </li>
                <li>
                  Before release: validate the complete reset journey in a
                  controlled environment.
                </li>
                <li>
                  After release: monitor reset failures without logging
                  passwords or reset tokens.
                </li>
              </ul>
            </details>
          </section>

          <section aria-labelledby="takeaway">
            <h2 id="takeaway" className="text-2xl font-bold">
              Key takeaway
            </h2>
            <p className="mt-4 leading-8">
              Testing supports the entire software lifecycle. Plan it early,
              adapt it as the product changes, and use delivery and production
              feedback to improve it.
            </p>
          </section>
        </div>

        <LessonCompletion lessonId="sqe-sdlc-and-stlc" />

        <nav
          aria-label="Lesson navigation"
          className="mt-12 flex flex-wrap justify-between gap-4
            border-t border-border pt-6"
        >
          <Link
            href={`${courseHref}/what-is-quality-engineering`}
            className="inline-flex min-h-11 items-center font-semibold
              text-accent underline underline-offset-4"
          >
            ← Previous lesson
          </Link>
          <Link
            href={courseHref}
            className="inline-flex min-h-11 items-center font-semibold
              text-accent underline underline-offset-4"
          >
            Back to course overview
          </Link>
        </nav>
      </div>
    </main>
  );
}
