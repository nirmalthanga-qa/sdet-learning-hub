import type { Metadata } from "next";
import Link from "next/link";
import LessonCompletion from "@/components/LessonCompletion";

export const metadata: Metadata = {
  title: "Agile, Scrum, and Team Collaboration",
  description:
    "Learn Agile and Scrum fundamentals through practical quality engineering examples.",
};

const courseHref = "/learning-paths/software-quality-engineering";

const events = [
  {
    title: "Sprint",
    description:
      "A fixed period of one month or less containing the other Scrum events.",
  },
  {
    title: "Sprint Planning",
    description:
      "Agree on why the Sprint is valuable, what can be delivered, and how the work will be done.",
  },
  {
    title: "Daily Scrum",
    description:
      "A 15-minute event for Developers to inspect progress toward the Sprint Goal and adapt their plan.",
  },
  {
    title: "Sprint Review",
    description:
      "Inspect the outcome with stakeholders and discuss what to adapt next.",
  },
  {
    title: "Sprint Retrospective",
    description: "Identify ways to improve quality and effectiveness.",
  },
];

const collaboration = [
  {
    title: "Clarify the story",
    description:
      "For a discount-code feature, ask whether codes expire, whether discounts can be combined, and what happens when a code is invalid.",
  },
  {
    title: "Prepare test examples",
    description:
      "Agree on example prices, expected totals, test accounts, and the environments needed to validate the feature.",
  },
  {
    title: "Work with developers",
    description:
      "Investigate a discount applying twice together. Share the request, response, and database evidence.",
  },
  {
    title: "Communicate blockers early",
    description:
      "If the test environment is unavailable, explain which checks are blocked and collaborate on restoring access.",
  },
  {
    title: "Make risks visible",
    description:
      "Explain that normal checkout passes but expired-code behavior fails. Distinguish confirmed results from checks that have not run.",
  },
  {
    title: "Improve the next iteration",
    description:
      "If repeated data resets delayed testing, propose a repeatable seed script and agree on an owner.",
  },
];

export default function AgileScrumLesson() {
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

          <span aria-current="page">Lesson 03</span>
        </nav>

        <header className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            SOFTWARE QUALITY ENGINEERING · LESSON 03
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Agile, Scrum, and Team Collaboration
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Learn how a quality engineer contributes to shared understanding,
            useful feedback, and reliable delivery.
          </p>
        </header>

        <aside className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">What you’ll learn</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>How Agile and Scrum relate.</li>
            <li>Scrum accountabilities, events, and artifacts.</li>
            <li>Acceptance criteria and the Definition of Done.</li>
            <li>How an SDET contributes throughout delivery.</li>
          </ul>
        </aside>

        <div className="mt-10 space-y-10">
          <section aria-labelledby="agile">
            <h2 id="agile" className="text-2xl font-bold">
              Agile in simple terms
            </h2>

            <p className="mt-4 leading-8">
              Agile describes values and principles for delivering useful
              software through collaboration, frequent feedback, and adaptation.
              Teams learn as they deliver and adjust their approach.
            </p>

            <p className="mt-3 leading-8 text-muted">
              For our shopping application, this could mean delivering a small,
              usable cart improvement, gathering feedback, and refining the next
              change. We still clarify requirements, maintain technical quality,
              and record useful test evidence.
            </p>
          </section>

          <section aria-labelledby="scrum">
            <h2 id="scrum" className="text-2xl font-bold">
              Scrum in simple terms
            </h2>

            <p className="mt-4 leading-8">
              Scrum is a lightweight framework that helps teams address complex
              problems through inspection and adaptation. Teams work in Sprints
              and create usable Increments of the product.
            </p>

            <p className="mt-3 leading-8 text-muted">
              Agile provides values and principles. Scrum provides a framework a
              team can use to put an iterative approach into practice.
            </p>
          </section>

          <section aria-labelledby="accountabilities">
            <h2 id="accountabilities" className="text-2xl font-bold">
              Scrum accountabilities
            </h2>

            <div className="mt-5 space-y-4">
              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">Product Owner</h3>
                <p className="mt-2 leading-7 text-muted">
                  Accountable for maximizing product value and effective Product
                  Backlog management.
                </p>
              </article>

              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">Scrum Master</h3>
                <p className="mt-2 leading-7 text-muted">
                  Accountable for establishing Scrum and supporting the Scrum
                  Team’s effectiveness.
                </p>
              </article>

              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">Developers</h3>
                <p className="mt-2 leading-7 text-muted">
                  Accountable for creating a usable Increment each Sprint,
                  adapting their plan, and maintaining quality through the
                  Definition of Done.
                </p>
              </article>
            </div>

            <p className="mt-4 leading-8 text-muted">
              An SDET contributing to the Increment can be a Developer in Scrum
              terminology. The term includes more than programming. Quality
              remains a shared responsibility.
            </p>
          </section>

          <section aria-labelledby="events">
            <h2 id="events" className="text-2xl font-bold">
              Scrum events
            </h2>

            <dl className="mt-5 space-y-4">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <dt className="font-semibold">{event.title}</dt>
                  <dd className="mt-2 leading-7 text-muted">
                    {event.description}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 leading-8 text-muted">
              Backlog refinement is ongoing work, rather than an additional
              formal Scrum event.
            </p>
          </section>

          <section aria-labelledby="artifacts">
            <h2 id="artifacts" className="text-2xl font-bold">
              Artifacts and their commitments
            </h2>

            <div className="mt-5 space-y-4">
              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">Product Backlog</h3>
                <p className="mt-2 leading-7 text-muted">
                  An ordered, evolving list of work needed to improve the
                  product.
                </p>
                <p className="mt-2 font-semibold">Commitment: Product Goal</p>
              </article>

              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">Sprint Backlog</h3>
                <p className="mt-2 leading-7 text-muted">
                  The Sprint Goal, selected Product Backlog items, and an
                  actionable plan for delivering the Increment.
                </p>
                <p className="mt-2 font-semibold">Commitment: Sprint Goal</p>
              </article>

              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">Increment</h3>
                <p className="mt-2 leading-7 text-muted">
                  A usable addition to the product that works with previous
                  Increments and meets the Definition of Done.
                </p>
                <p className="mt-2 font-semibold">
                  Commitment: Definition of Done
                </p>
              </article>
            </div>
          </section>

          <section aria-labelledby="criteria">
            <h2 id="criteria" className="text-2xl font-bold">
              Acceptance criteria and Definition of Done
            </h2>

            <p className="mt-4 leading-8">
              Acceptance criteria describe expected behavior for a particular
              feature. The Definition of Done describes the quality conditions
              the Increment must meet.
            </p>

            <div className="mt-5 space-y-4">
              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">
                  Example acceptance criterion
                </h3>
                <p className="mt-2 leading-7 text-muted">
                  When a customer applies an expired discount code, the order
                  total stays unchanged and an explanatory message appears.
                </p>
              </article>

              <article className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-bold">
                  Example Definition of Done conditions
                </h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 leading-7 text-muted">
                  <li>Code review is complete.</li>
                  <li>Agreed automated checks pass.</li>
                  <li>Relevant accessibility checks are complete.</li>
                  <li>Required documentation is updated.</li>
                </ul>
              </article>
            </div>

            <p className="mt-4 leading-8 text-muted">
              These completion conditions are examples for discussion. Teams
              establish the applicable Definition of Done within their
              organizational standards.
            </p>
          </section>

          <section aria-labelledby="collaboration">
            <h2 id="collaboration" className="text-2xl font-bold">
              How an SDET collaborates throughout delivery
            </h2>

            <dl className="mt-5 space-y-5">
              {collaboration.map((item) => (
                <div key={item.title}>
                  <dt className="font-semibold">{item.title}</dt>
                  <dd className="mt-1 leading-7 text-muted">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="exercise"
            className="rounded-xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-semibold tracking-[0.15em] text-accent">
              PRACTICE EXERCISE
            </p>

            <h2 id="exercise" className="mt-3 text-2xl font-bold">
              A discount bug near the end of a Sprint
            </h2>

            <p className="mt-4 leading-7">
              An expired discount code still reduces the order total. A teammate
              suggests marking the feature complete and fixing it later.
            </p>

            <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
              <li>What evidence would you collect?</li>
              <li>Who would you collaborate with?</li>
              <li>What would you communicate about completion?</li>
            </ol>

            <details className="mt-6 border-t border-border pt-4">
              <summary className="cursor-pointer rounded-sm font-semibold text-accent">
                View example answers
              </summary>

              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
                <li>
                  Capture the discount code, expiry time and timezone, request,
                  actual total, expected total, and reproducible steps using
                  test data.
                </li>
                <li>
                  Work with the implementing developer and Product Owner to
                  understand impact and options.
                </li>
                <li>
                  Explain the failing behavior and its risk. Discuss fixing it
                  or adapting scope while preserving the Definition of Done.
                  Work that does not meet it cannot be part of a Done Increment.
                </li>
              </ul>
            </details>
          </section>

          <section aria-labelledby="takeaway">
            <h2 id="takeaway" className="text-2xl font-bold">
              Key takeaway
            </h2>

            <p className="mt-4 leading-8">
              An SDET contributes before, during, and after implementation.
              Clarifying requirements, preparing evidence, collaborating on
              problems, and communicating risks help the whole team deliver
              quality.
            </p>
          </section>

          <section
            aria-labelledby="reading"
            className="border-t border-border pt-6"
          >
            <h2 id="reading" className="text-xl font-bold">
              Further reading
            </h2>

            <ul className="mt-3 list-disc space-y-3 pl-5 leading-7">
              <li>
                <a
                  href="https://agilemanifesto.org/principles.html"
                  className="text-accent underline underline-offset-4"
                >
                  Principles behind the Agile Manifesto
                </a>
              </li>
              <li>
                <a
                  href="https://scrumguides.org/scrum-guide.html"
                  className="text-accent underline underline-offset-4"
                >
                  The Scrum Guide
                </a>
              </li>
            </ul>
          </section>
        </div>

        <LessonCompletion lessonId="sqe-agile-scrum-team-collaboration" />

        <nav
          aria-label="Lesson navigation"
          className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6"
        >
          <Link
            href={`${courseHref}/sdlc-and-stlc`}
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
