"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Learning Paths", href: "/learning-paths" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className="border-b border-border bg-surface"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <div className="site-container flex flex-wrap items-center justify-between gap-x-4 py-4">
        <Link
          href="/"
          aria-label="SDET Learning Hub home"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-3xl text-accent sm:text-4xl"
          >
            {"{ }"}
          </span>

          <span>
            <span className="brand-title block text-lg font-bold sm:text-2xl">
              SDET Learning Hub
            </span>
            <span className="block text-xs text-muted sm:text-sm">
              by Nirmal Kumar
            </span>
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="flex h-11 w-11 shrink-0 items-center justify-center
            rounded-lg border border-border text-accent
            hover:bg-background lg:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {menuOpen ? (
              <path d="M6 6L18 18M18 6L6 18" />
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" />
            )}
          </svg>
        </button>

        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`${
            menuOpen ? "flex" : "hidden"
          } mt-4 w-full flex-col gap-1 border-t border-border pt-3
            lg:mt-0 lg:flex lg:w-auto lg:flex-row lg:items-center
            lg:gap-6 lg:border-0 lg:pt-0`}
        >
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`inline-flex min-h-11 items-center
                  border-b-2 px-2 py-2 text-sm font-semibold
                  transition-colors lg:px-0 ${
                    active
                      ? "border-accent text-accent"
                      : "border-transparent text-muted hover:border-border hover:text-accent"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
