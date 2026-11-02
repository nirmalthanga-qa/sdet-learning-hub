import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Explore practical learning paths from software quality engineering to AI-driven testing.",
};

type LearningPath = {
  title: string;
  tools: string;
  description: string;
  topics: string[];
  lessonHref?: string;
};

const learningPaths: LearningPath[] = [
  {
    title: "Software Quality Engineering",
    lessonHref: "/learning-paths/software-quality-engineering",
    tools: "Foundations, test design & strategy",
    description:
      "Understand how quality is planned, tested, and improved throughout software delivery.",
    topics: [
      "SDLC, STLC, Agile, and the role of an SDET",
      "Test levels, test types, and test design techniques",
      "Test strategy, defect management, and risk-based testing",
    ],
  },
  {
    title: "Programming",
    lessonHref: "/learning-paths/programming",
    tools: "JavaScript | TypeScript",
    description:
      "Build the programming skills needed to write clear, maintainable automation.",
    topics: [
      "Variables, functions, arrays, objects, and control flow",
      "Promises, async/await, modules, and error handling",
      "TypeScript types, interfaces, classes, and generics",
    ],
  },
  {
    title: "E2E Automation",
    lessonHref: "/learning-paths/e2e-automation",
    tools: "Playwright | Cypress",
    description:
      "Automate realistic user journeys and organize reliable test frameworks.",
    topics: [
      "Locators, actions, assertions, and waiting",
      "Reusable test structure, fixtures, and test data",
      "Debugging, reporting, and execution strategies",
    ],
  },
  {
    title: "API Testing",
    lessonHref: "/learning-paths/api-testing",
    tools: "Postman | Swagger UI",
    description:
      "Understand API contracts and validate service behavior manually and through automation.",
    topics: [
      "HTTP methods, status codes, headers, and authentication",
      "Postman collections, variables, scripts, and assertions",
      "OpenAPI documentation, Swagger UI, workflows, and CI execution",
    ],
  },
  {
    title: "Database",
    tools: "SQL | PostgreSQL",
    description:
      "Query databases and verify the data behind application behavior.",
    topics: [
      "Filtering, joins, aggregation, and NULL handling",
      "Keys, constraints, transactions, and test data cleanup",
      "API-to-database validation with TypeScript",
    ],
  },
  {
    title: "CI/CD",
    tools: "GitHub Actions | Docker",
    description: "Run automated checks consistently during software delivery.",
    topics: [
      "Git fundamentals, branches, and pull requests",
      "GitHub Actions workflows, secrets, and test artifacts",
      "Docker images, containers, and test environments",
    ],
  },
  {
    title: "Non-Functional Testing",
    tools: "Accessibility | Performance",
    description:
      "Evaluate how usable and responsive an application is beyond its core functionality.",
    topics: [
      "Keyboard navigation, contrast, and screen reader checks",
      "Accessibility automation with axe-core and Playwright",
      "k6 workloads, thresholds, and performance analysis",
    ],
  },
  {
    title: "Cloud",
    tools: "Cloud fundamentals for SDETs",
    description:
      "Learn to work with deployed applications and cloud-based test environments.",
    topics: [
      "Core cloud concepts and environment configuration",
      "Deployment, secrets, logs, and monitoring",
      "Running automated tests against cloud environments",
    ],
  },
  {
    title: "AI-Assisted Playwright",
    tools: "Playwright MCP | CLI | AI agents",
    description:
      "Use AI tools to assist with planning, executing, and maintaining tests.",
    topics: [
      "LLM, MCP, and agent fundamentals",
      "Using Playwright MCP and CLI workflows",
      "Planner, executor, and healer roles with human review",
    ],
  },
  {
    title: "Build AI Agents",
    tools: "TypeScript | LangChain | n8n",
    description:
      "Build your own QA agents and run them locally with your own integrations.",
    topics: [
      "LLM API calls, structured outputs, and tool execution",
      "Agent workflows using TypeScript and LangChain",
      "Jira integration and workflow orchestration with n8n",
    ],
  },
  {
    title: "AI-Driven Testing",
    tools: "Jira story → test workflow",
    description:
      "Bring the learning paths together in a guided testing workflow.",
    topics: [
      "Turn Jira stories into draft strategies and scenarios",
      "Generate and execute reviewed Playwright tests",
      "Diagnose failures, validate repairs, and report results",
    ],
  },
];

export default function LearningPathsPage() {
  return (
    <main className="site-container py-12 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent">
          YOUR LEARNING JOURNEY
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Explore learning paths
        </h1>

        <p className="mt-5 text-lg leading-8 text-muted">
          Start with the foundations or explore a topic you want to strengthen.
          Follow practical lessons, study examples, and build projects locally
          in VS Code.
        </p>
      </header>

      <aside
        aria-label="Curriculum availability"
        className="mt-8 rounded-xl border border-border bg-surface p-5"
      >
        <p className="text-sm leading-6 text-muted">
          <strong className="text-foreground">
            The curriculum is taking shape.
          </strong>{" "}
          Start with our first Software Quality Engineering lesson, or preview
          the other learning paths below. More lessons will be added gradually.
          The cloud platform will be announced once selected.
        </p>
      </aside>

      <ol className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path, index) => (
          <li key={path.title} className="min-w-0">
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center
                    justify-center rounded-full bg-[#eddbc3]
                    text-sm font-bold text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                  {path.lessonHref ? "Lessons available" : "Coming soon"}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold leading-tight">
                {path.title}
              </h2>

              <p className="mt-2 text-sm font-semibold text-accent">
                {path.tools}
              </p>

              <p className="mb-6 mt-4 text-sm leading-7 text-muted">
                {path.description}
              </p>

              <details className="mt-auto border-t border-border pt-4">
                <summary
                  className="cursor-pointer rounded-sm text-sm
                    font-semibold text-accent
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-accent"
                >
                  What you’ll learn
                </summary>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">
                  {path.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </details>

              {path.lessonHref && (
                <Link
                  href={path.lessonHref}
                  className="mt-5 inline-flex min-h-11 items-center
                    justify-center rounded-lg bg-accent px-4 py-3
                    text-sm font-semibold text-surface
                    hover:bg-[#653b13]"
                >
                  Start learning
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                  <span className="sr-only">: {path.title}</span>
                </Link>
              )}
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
}
