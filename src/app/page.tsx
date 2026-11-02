import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import SDETRoadmap from "@/components/SDETRoadmap";
import { getSearchItems } from "@/data/search-index";

export default function HomePage() {
  const searchItems = getSearchItems();

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
            className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
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
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-accent px-6 py-3 font-semibold text-surface transition-colors hover:bg-[#653b13]"
            >
              Explore learning paths
              <span aria-hidden="true">→</span>
            </Link>

            <a
              href="https://sdet-practice-lab.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 font-semibold text-accent underline underline-offset-4"
            >
              Open Practice Lab
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <div className="site-container py-10 sm:py-14">
        <div className="mb-10">
          <HomeSearch items={searchItems} />
        </div>

        <SDETRoadmap />
      </div>
    </main>
  );
}
