import type { Metadata } from "next";
import Link from "next/link";
import LessonCompletion from "@/components/LessonCompletion";

export const metadata: Metadata = {
  title: "What is Software Quality Engineering?",
  description:
    "Understand software quality engineering, how it differs from testing, and the role of an SDET.",
};

export default function QualityEngineeringLesson() {
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

          <Link
            href="/learning-paths/software-quality-engineering"
            className="underline underline-offset-4"
          >
            Software Quality Engineering
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page">Lesson 01</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            SOFTWARE QUALITY ENGINEERING · LESSON 01
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            What is Software Quality Engineering?
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Quality begins before the first test runs. It starts with
            understanding what users need and continues throughout software
            delivery.
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">What you’ll learn</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>What software quality engineering means.</li>
            <li>How testing contributes to quality engineering.</li>
            <li>How an SDET helps a team deliver reliable software.</li>
          </ul>
        </aside>

        <div className="mt-10 space-y-10">
          <section aria-labelledby="definition">
            <h2 id="definition" className="text-2xl font-bold">
              A simple definition
            </h2>

            <p className="mt-4 leading-8">
              Software Quality Engineering is the practice of building quality
              into the entire software lifecycle through prevention, testing,
              automation, and continuous feedback.
            </p>

            <p className="mt-3 leading-8 text-muted">
              It includes reviewing requirements, identifying risks, making
              software easier to test, validating behavior, and learning from
              problems after release.
            </p>
          </section>

          <section aria-labelledby="example">
            <h2 id="example" className="text-2xl font-bold">
              Example: placing an order
            </h2>

            <p className="mt-4 leading-8">
              Imagine a shopping application where users can place orders. A
              quality engineer considers questions such as:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
              <li>
                Requirements: What should happen when an item is out of stock?
              </li>
              <li>Design: How will the system prevent duplicate orders?</li>
              <li>
                Testing: Are totals, stock changes, and order records correct?
              </li>
              <li>
                Accessibility: Can a keyboard-only user complete checkout?
              </li>
              <li>
                Performance: Does checkout remain responsive under the expected
                workload?
              </li>
              <li>
                Monitoring: How will the team detect failed orders after
                release?
              </li>
            </ul>
          </section>

          <section aria-labelledby="testing">
            <h2 id="testing" className="text-2xl font-bold">
              Where does testing fit?
            </h2>

            <p className="mt-4 leading-8">
              Testing evaluates software and related work products to uncover
              problems and provide information about quality. It includes
              activities such as reviewing requirements and executing tests.
            </p>

            <p className="mt-3 leading-8 text-muted">
              Quality engineering includes testing alongside broader practices
              such as defect prevention, testability, delivery checks, and
              production feedback.
            </p>
          </section>

          <section aria-labelledby="sdet">
            <h2 id="sdet" className="text-2xl font-bold">
              What does an SDET contribute?
            </h2>

            <p className="mt-4 leading-8">
              An SDET combines testing knowledge with software development
              skills to create effective automated tests, frameworks, tools, and
              feedback systems.
            </p>

            <p className="mt-3 leading-8 text-muted">
              For the shopping example, an SDET might automate checkout,
              validate its API and database records, and run those checks in CI.
              Quality remains a shared team responsibility.
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
              Think like a quality engineer
            </h2>

            <p className="mt-4 leading-7">Consider a login page. Write down:</p>

            <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
              <li>Two questions to clarify before development.</li>
              <li>Two functional checks.</li>
              <li>One accessibility check.</li>
              <li>One security concern to discuss with the team.</li>
            </ol>

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
                  Clarifications: Which login methods are supported? What
                  happens after repeated failed attempts?
                </li>
                <li>
                  Functional: Valid credentials allow access. Invalid
                  credentials do not create a session.
                </li>
                <li>
                  Accessibility: All controls can be reached and operated with a
                  keyboard.
                </li>
                <li>
                  Security: How are automated password-guessing attempts
                  limited?
                </li>
              </ul>
            </details>
          </section>

          <section aria-labelledby="takeaway">
            <h2 id="takeaway" className="text-2xl font-bold">
              Key takeaway
            </h2>

            <p className="mt-4 leading-8">
              Quality engineering helps teams prevent problems, evaluate risks,
              and deliver software that meets user needs. Automation supports
              this work, but it does not replace critical thinking.
            </p>
          </section>
        </div>

        <LessonCompletion lessonId="sqe-what-is-quality-engineering" />

        <nav
          aria-label="Lesson navigation"
          className="mt-12 border-t border-border pt-6"
        >
          <Link
            href="/learning-paths/software-quality-engineering"
            className="inline-flex min-h-11 items-center font-semibold
              text-accent underline underline-offset-4"
          >
            ← Back to course overview
          </Link>
        </nav>
      </div>
    </main>
  );
}
