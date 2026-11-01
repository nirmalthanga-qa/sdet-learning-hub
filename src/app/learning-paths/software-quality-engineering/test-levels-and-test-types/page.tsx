import type { Metadata } from "next";
import Link from "next/link";
import LessonCompletion from "@/components/LessonCompletion";

export const metadata: Metadata = {
  title: "Test Levels and Test Types",
  description:
    "Understand test levels, functional and non-functional testing, smoke testing, sanity testing, regression, and retesting.",
};

const courseHref = "/learning-paths/software-quality-engineering";

const testLevels = [
  {
    title: "Unit / Component Testing",
    definition:
      "Tests an individual component or small piece of logic in isolation.",
    example: "Check that calculateDiscount(1000, 10) returns 100.",
    focus:
      "Business rules, calculations, validation, and individual functions.",
  },
  {
    title: "Integration Testing",
    definition: "Tests interactions between components or connected systems.",
    example:
      "Verify that the order service correctly saves an order through its database integration.",
    focus:
      "Contracts, data exchange, error handling, and communication between parts.",
  },
  {
    title: "System Testing",
    definition: "Tests the behavior and capabilities of the complete system.",
    example:
      "Verify that a customer can add products, check out, and view the resulting order.",
    focus:
      "Complete workflows and functional or non-functional system requirements.",
  },
  {
    title: "Acceptance Testing",
    definition:
      "Evaluates whether the system meets acceptance criteria and is suitable for its intended use.",
    example:
      "Business representatives verify that checkout supports the agreed purchasing and cancellation rules.",
    focus:
      "Business needs, user needs, operational readiness, and acceptance conditions.",
  },
];

const testTypes = [
  {
    title: "Functional Testing",
    definition: "Checks what the system does against its expected behavior.",
    examples: [
      "A valid discount code reduces the total correctly.",
      "An out-of-stock product cannot be purchased.",
      "An authenticated customer can view their own orders.",
    ],
  },
  {
    title: "Non-Functional Testing",
    definition:
      "Evaluates quality characteristics such as performance, accessibility, reliability, and usability.",
    examples: [
      "Checkout meets its response-time target under the agreed workload.",
      "A keyboard user can complete the purchasing flow.",
      "The application recovers appropriately after a dependency failure.",
    ],
  },
];

const testingPurposes = [
  {
    title: "Smoke Testing",
    definition:
      "A small set of checks used to assess whether critical functionality works well enough for further testing.",
    example:
      "After deployment, check that the application opens, login works, products load, and a basic checkout succeeds.",
  },
  {
    title: "Sanity Testing",
    definition:
      "Commonly used to describe focused checks around a small change to assess whether the changed area behaves sensibly.",
    example:
      "After a discount-rule change, check valid, expired, and invalid discount behavior.",
  },
  {
    title: "Retesting / Confirmation Testing",
    definition:
      "Checks whether a previously reported defect has been successfully fixed.",
    example:
      "Repeat the scenario where an expired discount incorrectly reduced the total and confirm the total now stays unchanged.",
  },
  {
    title: "Regression Testing",
    definition:
      "Checks whether a change has caused unintended effects in previously working behavior.",
    example:
      "After the discount fix, verify cart totals, tax calculation, valid discounts, and order creation.",
  },
];

export default function TestLevelsAndTypesLesson() {
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

          <span aria-current="page">Lesson 04</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            SOFTWARE QUALITY ENGINEERING · LESSON 04
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Test Levels and Test Types
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Understand what you are testing, which quality characteristic you
            are evaluating, and why you are running each check.
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">What you’ll learn</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Unit, integration, system, and acceptance testing.</li>
            <li>Functional and non-functional testing.</li>
            <li>Smoke, sanity, regression, and confirmation testing.</li>
            <li>How these classifications can overlap.</li>
          </ul>
        </aside>

        <div className="mt-10 space-y-10">
          <section aria-labelledby="difference">
            <h2 id="difference" className="text-2xl font-bold">
              Level, type, and purpose
            </h2>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="font-semibold">
                  Test level: what scope are we evaluating?
                </dt>
                <dd className="mt-1 leading-7 text-muted">
                  An individual component, interactions between parts, the
                  complete system, or its acceptability for use.
                </dd>
              </div>

              <div>
                <dt className="font-semibold">
                  Test type: what characteristic are we evaluating?
                </dt>
                <dd className="mt-1 leading-7 text-muted">
                  Expected functionality or characteristics such as performance,
                  accessibility, and reliability.
                </dd>
              </div>

              <div>
                <dt className="font-semibold">
                  Test purpose: why are we running this check now?
                </dt>
                <dd className="mt-1 leading-7 text-muted">
                  To assess a build, confirm a fix, or detect unintended effects
                  of a change.
                </dd>
              </div>
            </dl>

            <p className="mt-4 leading-8">
              A checkout test can be a system-level functional test and also
              belong to a smoke or regression suite.
            </p>
          </section>

          <section aria-labelledby="levels">
            <h2 id="levels" className="text-2xl font-bold">
              Test levels
            </h2>

            <div className="mt-5 space-y-5">
              {testLevels.map((level, index) => (
                <article
                  key={level.title}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <p className="text-xs font-semibold tracking-widest text-accent">
                    LEVEL {index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">{level.title}</h3>

                  <p className="mt-3 leading-7">{level.definition}</p>

                  <p className="mt-3 leading-7 text-muted">
                    <strong className="text-foreground">Example: </strong>
                    {level.example}
                  </p>

                  <p className="mt-3 leading-7 text-muted">
                    <strong className="text-foreground">Focus: </strong>
                    {level.focus}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-4 leading-8 text-muted">
              This is a simplified grouping. Integration testing can be
              separated into component integration and system integration.
              Levels describe scope; they do not require all testing to happen
              in a strict sequence.
            </p>
          </section>

          <section aria-labelledby="types">
            <h2 id="types" className="text-2xl font-bold">
              Functional and non-functional testing
            </h2>

            <div className="mt-5 space-y-5">
              {testTypes.map((type) => (
                <article
                  key={type.title}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <h3 className="text-xl font-bold">{type.title}</h3>

                  <p className="mt-3 leading-7">{type.definition}</p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-muted">
                    {type.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className="mt-4 leading-8 text-muted">
              Both can apply at different test levels. For example, you can
              measure the performance of an individual component or the complete
              checkout system.
            </p>
          </section>

          <section aria-labelledby="purposes">
            <h2 id="purposes" className="text-2xl font-bold">
              Smoke, sanity, retesting, and regression
            </h2>

            <div className="mt-5 space-y-5">
              {testingPurposes.map((purpose) => (
                <article
                  key={purpose.title}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <h3 className="text-xl font-bold">{purpose.title}</h3>

                  <p className="mt-3 leading-7">{purpose.definition}</p>

                  <p className="mt-3 leading-7 text-muted">
                    <strong className="text-foreground">Example: </strong>
                    {purpose.example}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-4 leading-8 text-muted">
              Teams sometimes use smoke and sanity differently. Agree on each
              suite’s scope and purpose instead of relying only on its name.
            </p>
          </section>

          <section aria-labelledby="comparison">
            <h2 id="comparison" className="text-2xl font-bold">
              Retesting versus regression
            </h2>

            <div className="mt-5 rounded-xl border border-border bg-surface p-6">
              <p className="leading-7">
                <strong>Defect:</strong> An expired discount code reduces the
                order total.
              </p>

              <p className="mt-4 leading-7">
                <strong>Retesting:</strong> Repeat the original failing scenario
                after the fix and verify that the expired code no longer changes
                the total.
              </p>

              <p className="mt-4 leading-7">
                <strong>Regression:</strong> Check that valid discounts, tax
                calculations, cart updates, and order creation still behave
                correctly.
              </p>
            </div>
          </section>

          <section aria-labelledby="automation">
            <h2 id="automation" className="text-2xl font-bold">
              Where do manual testing and automation fit?
            </h2>

            <p className="mt-4 leading-8">
              Manual execution and automation describe how testing is performed.
              They do not determine its level or purpose. Regression testing,
              for example, can include automated checks and manual evaluation.
            </p>

            <p className="mt-3 leading-8 text-muted">
              A tool also does not determine the test level. An API test may
              evaluate a component, an integration, or a complete system
              depending on the scope and dependencies involved.
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
              Classify these checks
            </h2>

            <p className="mt-4 leading-7">
              Identify the most useful level, type, or purpose for each example.
              More than one label can apply.
            </p>

            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
              <li>Test a tax-calculation function in isolation.</li>
              <li>
                Check that the order service correctly communicates with a
                payment provider’s sandbox.
              </li>
              <li>Measure checkout response times under an agreed workload.</li>
              <li>Repeat a previously failing login scenario after its fix.</li>
              <li>
                Check existing cart behavior after changing discount logic.
              </li>
              <li>
                Confirm critical workflows work immediately after deployment.
              </li>
            </ol>

            <details className="mt-6 border-t border-border pt-4">
              <summary className="cursor-pointer rounded-sm font-semibold text-accent">
                View example answers
              </summary>

              <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
                <li>Unit-level functional testing.</li>
                <li>System integration testing.</li>
                <li>Non-functional performance testing.</li>
                <li>Retesting, also called confirmation testing.</li>
                <li>Regression testing.</li>
                <li>Smoke testing.</li>
              </ol>
            </details>
          </section>

          <section aria-labelledby="takeaway">
            <h2 id="takeaway" className="text-2xl font-bold">
              Key takeaway
            </h2>

            <p className="mt-4 leading-8">
              Choose tests by considering scope, quality characteristics, and
              risk. Combine focused component checks with integration coverage
              and selected complete workflows to build useful evidence about the
              product.
            </p>
          </section>
        </div>

        <LessonCompletion lessonId="sqe-test-levels-and-test-types" />

        <nav
          aria-label="Lesson navigation"
          className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6"
        >
          <Link
            href={`${courseHref}/agile-scrum-team-collaboration`}
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            ← Previous lesson
          </Link>

          <Link
            href={courseHref}
            className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            Back to course overview
          </Link>
        </nav>
      </div>
    </main>
  );
}
