import Link from "next/link";

const roadmap = [
  {
    title: "Quality Engineering",
    topics: "Foundations, test design & strategy",
    position: "lg:col-start-1 lg:row-start-1",
    direction: "right",
  },
  {
    title: "Programming",
    topics: "JavaScript | TypeScript",
    position: "lg:col-start-2 lg:row-start-1",
    direction: "right",
  },
  {
    title: "E2E Automation",
    topics: "Playwright | Cypress",
    position: "lg:col-start-3 lg:row-start-1",
    direction: "down",
  },
  {
    title: "API Testing",
    topics: "Postman | Swagger UI",
    position: "lg:col-start-3 lg:row-start-2",
    direction: "left",
  },
  {
    title: "Database",
    topics: "SQL | PostgreSQL",
    position: "lg:col-start-2 lg:row-start-2",
    direction: "left",
  },
  {
    title: "CI/CD",
    topics: "GitHub Actions | Docker",
    position: "lg:col-start-1 lg:row-start-2",
    direction: "down",
  },
  {
    title: "Non-Functional Testing",
    topics: "Accessibility | Performance",
    position: "lg:col-start-1 lg:row-start-3",
    direction: "right",
  },
  {
    title: "Cloud",
    topics: "Environments, deployment & monitoring",
    position: "lg:col-start-2 lg:row-start-3",
    direction: "right",
  },
  {
    title: "AI-Assisted Playwright",
    topics: "MCP, CLI & agent workflows",
    position: "lg:col-start-3 lg:row-start-3",
    direction: "down",
  },
  {
    title: "Build AI Agents",
    topics: "TypeScript | LangChain | n8n",
    position: "lg:col-start-3 lg:row-start-4",
    direction: "left",
  },
  {
    title: "AI-Driven Testing",
    topics: "Connect the complete testing workflow",
    position: "lg:col-start-2 lg:row-start-4",
    direction: "none",
  },
] as const;

type Direction = (typeof roadmap)[number]["direction"];

function RoadmapArrow({ direction }: { direction: Direction }) {
  if (direction === "none") return null;

  const desktopPosition = {
    right: "lg:-right-8 lg:top-1/2 lg:left-auto lg:-translate-y-1/2",
    left: "lg:-left-8 lg:top-1/2 lg:-translate-y-1/2",
    down: "lg:left-1/2 lg:top-full lg:-translate-x-1/2",
  }[direction];

  const desktopRotation = {
    right: "lg:-rotate-90",
    left: "lg:rotate-90",
    down: "",
  }[direction];

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-full
        z-10 h-8 w-8 -translate-x-1/2 text-accent
        lg:translate-x-0 ${desktopPosition}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={`h-full w-full ${desktopRotation}`}
      >
        <path
          d="M16 1V29M11 24L16 29L21 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="home-hero border-b border-border bg-surface"
      >
        <div className="site-container py-16 text-center sm:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent sm:text-sm">
            LEARN. PRACTICE. BUILD CONFIDENCE.
          </p>

          <h1
            id="hero-title"
            className="mx-auto mt-5 max-w-4xl text-4xl font-bold
              leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Your journey to
            <br className="hidden sm:block" /> AI-driven quality engineering.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Build your skills step by step — from software quality fundamentals
            to intelligent test automation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/learning-paths"
              className="inline-flex min-h-12 items-center justify-center
                gap-3 rounded-lg bg-accent px-6 py-3 font-semibold
                text-surface transition-colors hover:bg-[#653b13]"
            >
              Explore learning paths
              <span aria-hidden="true">→</span>
            </Link>

            <a
              href="https://sdet-practice-lab.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2
                font-semibold text-accent underline underline-offset-4"
            >
              Open Practice Lab
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="roadmap-title"
        className="site-container py-10 sm:py-14"
      >
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <div className="text-center">
            <h2 id="roadmap-title" className="text-3xl font-bold sm:text-4xl">
              Your roadmap to SDET
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
              A guided learning route. Start at the beginning or explore a
              topic.
            </p>
          </div>

          <ol
            aria-label="SDET learning roadmap"
            className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {roadmap.map((step, index) => {
              const isFinalStep = index === roadmap.length - 1;

              return (
                <li
                  key={step.title}
                  className={`relative min-w-0 ${step.position}`}
                >
                  <div
                    className={`flex h-28 items-center gap-4 rounded-xl
                      border p-4 ${
                        isFinalStep
                          ? "border-[#c79b67] bg-[#f7e6cf]"
                          : "border-border bg-surface"
                      }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center
                        justify-center rounded-full bg-[#eddbc3]
                        text-sm font-bold text-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-muted">
                        {step.topics}
                      </p>
                    </div>
                  </div>

                  <RoadmapArrow direction={step.direction} />
                </li>
              );
            })}
          </ol>

          <p className="mt-10 border-t border-border pt-6 text-center text-sm leading-6 text-muted">
            Learn here. Build locally in VS Code. Practice in the SDET Practice
            Lab.
          </p>
        </div>
      </section>
    </main>
  );
}
