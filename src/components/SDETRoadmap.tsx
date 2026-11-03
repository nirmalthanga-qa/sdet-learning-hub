import Link from "next/link";

const milestones = [
  {
    title: "Software Quality Engineering",
    topics: "Foundations · Test design · Strategy",
    icon: "quality",
    position: "lg:col-start-1 lg:row-start-1",
    href: "/learning-paths/software-quality-engineering",
  },
  {
    title: "Programming",
    topics: "JavaScript · TypeScript",
    icon: "code",
    position: "lg:col-start-2 lg:row-start-1",
    href: "/learning-paths/programming",
  },
  {
    title: "E2E Automation",
    topics: "Playwright · Cypress",
    icon: "browser",
    position: "lg:col-start-3 lg:row-start-1",
    href: "/learning-paths/e2e-automation",
  },
  {
    title: "API Testing",
    topics: "Postman · Swagger UI",
    icon: "api",
    position: "lg:col-start-3 lg:row-start-2",
    href: "/learning-paths/api-testing",
  },
  {
    title: "Database",
    topics: "SQL · PostgreSQL",
    icon: "database",
    position: "lg:col-start-2 lg:row-start-2",
    href: "/learning-paths/database",
  },
  {
    title: "CI/CD",
    href: "/learning-paths/ci-cd",
    topics: "Git · GitHub Actions · Docker",
    icon: "pipeline",
    position: "lg:col-start-1 lg:row-start-2",
  },
  {
    title: "Non-Functional Testing",
    href: "/learning-paths/non-functional-testing",
    topics: "Accessibility · Performance",
    icon: "performance",
    position: "lg:col-start-1 lg:row-start-3",
  },
  {
    title: "Cloud",
    href: "/learning-paths/cloud",
    topics: "AWS · Release verification",
    icon: "cloud",
    position: "lg:col-start-2 lg:row-start-3",
  },
  {
    title: "AI-Assisted Playwright",
    href: "/learning-paths/ai-assisted-playwright",
    topics: "MCP · CLI · Agent workflows",
    icon: "sparkles",
    position: "lg:col-start-3 lg:row-start-3",
  },
  {
    title: "Build AI Agents",
    href: "/learning-paths/build-ai-agents",
    topics: "TypeScript · LangChain · n8n",
    icon: "robot",
    position: "lg:col-start-3 lg:row-start-4",
  },
  {
    title: "AI-Driven Testing",
    href: "/learning-paths/ai-driven-testing",
    topics: "Connect the complete workflow",
    icon: "flag",
    position: "lg:col-start-2 lg:row-start-4",
  },
];

function MilestoneIllustration({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 96 80"
      fill="none"
      aria-hidden="true"
      className="h-20 w-24"
    >
      <ellipse cx="48" cy="70" rx="29" ry="5" fill="#2A1A0E" opacity=".08" />
      <circle cx="48" cy="37" r="31" fill="#F2E2CA" />
      <circle cx="76" cy="17" r="5" fill="#B8C8A4" />
      <circle cx="19" cy="53" r="4" fill="#CF9C6C" />

      <g
        transform="translate(26 15)"
        stroke="#4D2A00"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "quality" && (
          <>
            <path
              d="M22 2 38 8v13c0 10-7 17-16 21C13 38 6 31 6 21V8Z"
              fill="#FFF8F0"
            />
            <path d="m13 21 6 6 12-13" stroke="#63794C" strokeWidth="3" />
          </>
        )}

        {kind === "code" && (
          <>
            <rect x="1" y="5" width="42" height="30" rx="4" fill="#FFF8F0" />
            <path d="m15 15-6 5 6 5m14-10 6 5-6 5m-5-13-5 26M0 40h44" />
          </>
        )}

        {kind === "browser" && (
          <>
            <rect x="1" y="3" width="42" height="36" rx="5" fill="#FFF8F0" />
            <path d="M1 13h42" />
            <circle cx="7" cy="8" r="1" fill="#4D2A00" />
            <circle cx="13" cy="8" r="1" fill="#4D2A00" />
            <path d="m14 25 6 6 12-12" stroke="#63794C" strokeWidth="3" />
          </>
        )}

        {kind === "api" && (
          <>
            <rect x="0" y="4" width="13" height="34" rx="4" fill="#FFF8F0" />
            <rect x="31" y="4" width="13" height="34" rx="4" fill="#FFF8F0" />
            <path d="M12 15h20m-5-5 5 5-5 5M32 28H12m5-5-5 5 5 5" />
          </>
        )}

        {kind === "database" && (
          <>
            <path d="M5 10v25c0 9 34 9 34 0V10" fill="#FFF8F0" />
            <ellipse cx="22" cy="10" rx="17" ry="7" fill="#DCE5D0" />
            <path d="M5 22c0 9 34 9 34 0M5 34c0 9 34 9 34 0" />
          </>
        )}

        {kind === "pipeline" && (
          <>
            <path d="M10 10h24v24H10Z" />
            <rect x="2" y="2" width="15" height="15" rx="4" fill="#FFF8F0" />
            <rect x="27" y="2" width="15" height="15" rx="4" fill="#DCE5D0" />
            <rect x="2" y="27" width="15" height="15" rx="4" fill="#DCE5D0" />
            <rect x="27" y="27" width="15" height="15" rx="4" fill="#FFF8F0" />
          </>
        )}

        {kind === "performance" && (
          <>
            <path d="M3 34a20 20 0 1 1 38 0Z" fill="#FFF8F0" />
            <path d="m22 27 11-13M9 23l4 1M17 9l1 4M32 10l-2 4" />
            <circle cx="22" cy="27" r="4" fill="#63794C" />
          </>
        )}

        {kind === "cloud" && (
          <>
            <path
              d="M12 34a10 10 0 0 1-1-20 13 13 0 0 1 25-1 11 11 0 0 1 0 21Z"
              fill="#FFF8F0"
            />
            <path d="M23 40V20m-7 7 7-7 7 7" stroke="#63794C" />
          </>
        )}

        {kind === "sparkles" && (
          <>
            <rect x="2" y="11" width="31" height="29" rx="4" fill="#FFF8F0" />
            <path d="M2 20h31m-21 8 4 4 7-7" />
            <path d="m34 0 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#DCE5D0" />
          </>
        )}

        {kind === "robot" && (
          <>
            <path d="M22 3v7M1 23v10m42-10v10" />
            <circle cx="22" cy="3" r="2" fill="#63794C" />
            <rect x="5" y="11" width="34" height="30" rx="8" fill="#FFF8F0" />
            <circle cx="15" cy="24" r="3" fill="#63794C" stroke="none" />
            <circle cx="29" cy="24" r="3" fill="#63794C" stroke="none" />
            <path d="M16 33h12" />
          </>
        )}

        {kind === "flag" && (
          <>
            <path d="M10 42V3" />
            <path d="M10 4c9-8 17 8 29 0v22c-12 8-20-8-29 0Z" fill="#DCE5D0" />
            <path d="m18 14 5 5 8-9" stroke="#63794C" />
            <path d="M3 42h17" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function SDETRoadmap() {
  const road =
    "M167 120 H833 " +
    "C1000 120 1000 424 833 424 " +
    "H167 C0 424 0 728 167 728 " +
    "H833 C1000 728 1000 1032 833 1032 H500";

  return (
    <section
      aria-labelledby="roadmap-title"
      className="overflow-hidden rounded-3xl border border-border bg-surface px-5 py-10 sm:px-8"
    >
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#c5d1b7] bg-[#edf2e6] px-4 py-2 text-xs font-semibold tracking-wide text-[#425632]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#63794C]"
          />
          SDET (Node-stack)
        </span>

        <h2
          id="roadmap-title"
          className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Your roadmap to SDET
        </h2>

        <p className="mt-4 leading-7 text-muted">
          Follow the road from quality fundamentals to AI-driven testing. Build
          your automation skills with JavaScript, TypeScript, and the Node.js
          ecosystem.
        </p>
      </header>

      <div className="relative mt-12">
        {/* Desktop road follows the numbered milestone order. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 1152"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          fill="none"
        >
          <path
            d={road}
            stroke="#E7D6BF"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <path
            d={road}
            stroke="#8A6A4C"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d={road}
            stroke="#FFF8F0"
            strokeWidth="2"
            strokeDasharray="9 12"
            strokeLinecap="round"
          />
        </svg>

        {/* Mobile road keeps the same reading order. */}
        <div
          aria-hidden="true"
          className="absolute bottom-24 left-1/2 top-24 w-5 -translate-x-1/2 rounded-full bg-[#8A6A4C] lg:hidden"
        >
          <div className="mx-auto h-full w-px border-l-2 border-dashed border-[#FFF8F0]" />
        </div>

        <ol
          aria-label="SDET learning roadmap"
          className="relative grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:grid-rows-[repeat(4,240px)] lg:gap-y-16"
        >
          {milestones.map((milestone, index) => {
            const isFinal = index === milestones.length - 1;

            return (
              <li
                key={milestone.title}
                className={`relative mx-auto w-full max-w-[260px] lg:max-w-[230px] ${milestone.position}`}
              >
                <article
                  className={`flex min-h-60 flex-col items-center rounded-2xl border px-4 py-5 text-center shadow-[0_8px_24px_rgba(77,42,0,0.07)] lg:h-60 ${
                    isFinal
                      ? "border-[#aebf98] bg-[#f0f4e9]"
                      : "border-border bg-surface"
                  }`}
                >
                  <span className="absolute -top-3 left-4 inline-flex h-7 min-w-9 items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-surface">
                    <span className="sr-only">Step </span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <MilestoneIllustration kind={milestone.icon} />

                  <h3 className="mt-2 text-lg font-bold leading-snug">
                    {milestone.href ? (
                      <Link
                        href={milestone.href}
                        className="rounded-sm hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        {milestone.title}
                        <span className="sr-only"> — course overview</span>
                      </Link>
                    ) : (
                      milestone.title
                    )}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {milestone.topics}
                  </p>

                  {isFinal && (
                    <span className="mt-auto pt-2 text-xs font-semibold text-[#425632]">
                      Bring it all together
                    </span>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <footer className="mt-10 border-t border-border pt-6 text-center">
        <p className="text-sm leading-7 text-muted">
          Learn here. Build locally in VS Code. Practice in the SDET Practice
          Lab.
        </p>
      </footer>
    </section>
  );
}
