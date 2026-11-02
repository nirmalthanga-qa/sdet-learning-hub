const concepts = [
  {
    title: "Purpose and Value",
    description:
      "Define the feedback automation should provide and weigh its benefits against development and maintenance costs.",
    example:
      "Run checkout checks on each change so the team discovers broken purchasing behavior before release.",
  },
  {
    title: "Selecting Suitable Tests",
    description:
      "Prioritize repeatable, valuable checks with clear expected outcomes and controllable prerequisites.",
    example:
      "Automate pricing rules and order permissions; use exploration to investigate a newly redesigned shopping experience.",
  },
  {
    title: "Tool Evaluation and Testability",
    description:
      "Evaluate tools against application technology, team skills, infrastructure, and the ability to observe outcomes.",
    example:
      "Try a small workflow involving login, an iframe, and a download before committing to a framework.",
  },
  {
    title: "Automation Architecture",
    description:
      "Separate test intent, reusable interactions, data preparation, execution configuration, and reporting.",
    example:
      "Keep checkout expectations in the test, page interactions in components, and account creation in a dedicated fixture.",
  },
  {
    title: "Automation Approaches",
    description:
      "Choose suitable test levels and reuse patterns, including data-driven cases and reusable domain actions.",
    example:
      "Check many discount combinations through an API and use selected browser tests for the complete customer journey.",
  },
  {
    title: "Implementation and Deployment Risks",
    description:
      "Introduce automation incrementally and address environment, dependency, data, and execution risks.",
    example:
      "Pilot a small smoke suite before making it a required release check. Give each test its own account.",
  },
  {
    title: "Maintainability",
    description:
      "Keep automation readable, modular, diagnosable, and adaptable as the application changes.",
    example:
      "Update a shared cart component when its interface changes instead of editing duplicated selectors across many tests.",
  },
  {
    title: "Delivery Pipeline Integration",
    description:
      "Run appropriate checks at useful delivery stages with controlled configuration and retained evidence.",
    example:
      "Run fast checks on pull requests and a broader browser suite against a prepared test environment.",
  },
  {
    title: "Reporting and Metrics",
    description:
      "Communicate coverage, failures, reliability, execution time, and remaining uncertainty.",
    example:
      "Report a duplicate-order failure alongside blocked scenarios instead of relying only on the overall pass percentage.",
  },
  {
    title: "Verification and Improvement",
    description:
      "Check the automation itself and use execution evidence to improve its reliability and usefulness.",
    example:
      "Introduce a controlled mismatch to confirm an assertion fails, then investigate recurring first-run failures.",
  },
];

export default function AutomationConcepts() {
  return (
    <section aria-labelledby="automation-concepts-title" className="mt-10">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent">
          BEFORE THE FIRST SCRIPT
        </p>

        <h2 id="automation-concepts-title" className="mt-3 text-3xl font-bold">
          Automation Engineering Essentials
        </h2>

        <p className="mt-4 leading-8 text-muted">
          Effective automation connects product risks to dependable feedback.
          These concepts guide how we choose, build, run, and improve tests
          across both Playwright and Cypress.
        </p>
      </header>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {concepts.map((concept, index) => (
          <article
            key={concept.title}
            className="rounded-xl border border-border bg-surface p-5 sm:p-6"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eddbc3] text-sm font-bold text-accent"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-4 text-xl font-bold">{concept.title}</h3>

            <p className="mt-3 leading-7">{concept.description}</p>

            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Practical example
              </p>

              <p className="mt-2 text-sm leading-7 text-muted">
                {concept.example}
              </p>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-6 rounded-xl border border-border bg-surface p-6">
        <h3 className="text-xl font-bold">
          What does a passing test establish?
        </h3>

        <p className="mt-3 leading-7 text-muted">
          A passing test supports the behavior it actually checked under the
          conditions in which it ran. A successful click does not prove an order
          was saved, and a green suite does not establish that every important
          risk is covered.
        </p>

        <p className="mt-3 leading-7 text-muted">
          Use automation alongside exploratory testing, reviews, and other
          relevant evidence. Keep expected outcomes and coverage gaps visible.
        </p>
      </aside>
    </section>
  );
}
