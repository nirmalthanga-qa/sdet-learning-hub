"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/data/search-index";

type Props = {
  items: SearchItem[];
};

const suggestions = [
  "Playwright",
  "Cypress",
  "TypeScript",
  "Docker",
  "Page Objects",
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function HomeSearch({ items }: Props) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const inputId = `${id}-input`;
  const hintId = `${id}-hint`;
  const resultsId = `${id}-results`;

  const normalizedQuery = normalize(query);
  const hasQuery = normalizedQuery.length > 0;

  const searchIndex = useMemo(
    () =>
      items.map((item) => ({
        item,
        title: normalize(item.title),
        category: normalize(item.category),
        text: normalize(
          [item.title, item.description, item.category, item.keywords].join(
            " ",
          ),
        ),
      })),
    [items],
  );

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    const words = normalizedQuery.split(/\s+/);

    return searchIndex
      .filter((entry) => words.every((word) => entry.text.includes(word)))
      .map((entry) => ({
        item: entry.item,
        score:
          (entry.title === normalizedQuery ? 100 : 0) +
          (entry.title.includes(normalizedQuery) ? 40 : 0) +
          (entry.category === normalizedQuery ? 25 : 0) +
          words.reduce(
            (score, word) => score + (entry.title.includes(word) ? 5 : 0),
            0,
          ),
      }))
      .sort(
        (a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title),
      )
      .map((entry) => entry.item);
  }, [normalizedQuery, searchIndex]);

  const visibleResults = showAll ? results : results.slice(0, 6);

  function updateQuery(value: string) {
    setQuery(value);
    setShowAll(false);
  }

  function clearSearch() {
    updateQuery("");
    inputRef.current?.focus();
  }

  return (
    <section
      aria-label="Search learning content"
      className="mx-auto max-w-3xl text-left"
    >
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        {" "}
        <label
          htmlFor={inputId}
          className="block text-lg font-semibold text-foreground"
        >
          What would you like to learn?
        </label>
        <p id={hintId} className="mt-2 text-sm leading-6 text-muted">
          Search lessons and reference topics as you type.
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 focus-within:ring-2 focus-within:ring-accent">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0 text-accent"
          >
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="m16 16 4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                clearSearch();
              }
            }}
            aria-describedby={hintId}
            aria-controls={resultsId}
            placeholder="Try Cypress, Docker, or test strategy"
            autoComplete="off"
            spellCheck={false}
            maxLength={120}
            className="min-h-14 w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted"
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="min-h-11 shrink-0 rounded-md px-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Clear
            </button>
          )}
        </div>
        {!hasQuery && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-muted">Try a topic:</span>

            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  updateQuery(suggestion);
                  inputRef.current?.focus();
                }}
                className="min-h-10 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-[#eddbc3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={hasQuery ? "mt-4 text-sm text-muted" : "sr-only"}
        >
          {hasQuery
            ? `${results.length} ${
                results.length === 1 ? "result" : "results"
              } found.`
            : ""}
        </p>
        <div id={resultsId}>
          {hasQuery && results.length === 0 && (
            <div className="mt-4 rounded-xl border border-border bg-surface p-5">
              <p className="font-semibold">No matching lessons yet.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Try a broader term such as “testing”, “Cypress”, or
                “TypeScript”.
              </p>
              <Link
                href="/learning-paths"
                className="mt-3 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
              >
                Browse learning paths →
              </Link>
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <ul className="mt-4 space-y-3">
                {visibleResults.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent hover:bg-[#f7eee2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
                    >
                      <span className="text-xs font-semibold tracking-wide text-accent">
                        {item.category}
                      </span>

                      <span className="mt-2 block text-lg font-semibold text-foreground">
                        {item.title}
                        <span aria-hidden="true"> →</span>
                      </span>

                      <span className="mt-2 line-clamp-2 block text-sm leading-6 text-muted">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {!showAll && results.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="mt-4 min-h-11 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-accent hover:bg-[#eddbc3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Show all {results.length} results
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
