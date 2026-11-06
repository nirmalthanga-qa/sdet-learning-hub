import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const contacts = [
  { label: "Email", href: "mailto:nirmalthanga.qa@gmail.com" },
  { label: "GitHub", href: "https://github.com/nirmalthanga-qa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nirmal-thanga" },
];

export default function AboutPage() {
  return (
    <main className="site-container py-16">
      <h1 className="text-4xl font-bold">About SDET Learning Hub</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Created by Nirmal Kumar, SDET Learning Hub helps you learn quality
        engineering through clear explanations, practical examples, and projects
        you can build locally in VS Code.
      </p>

      <section aria-labelledby="connect-title" className="mt-10 max-w-2xl border-t border-border pt-8">
        <h2 id="connect-title" className="text-2xl font-bold">Let’s connect</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {contacts.map(({ label, href }) => {
            const external = href.startsWith("https://");
            return (
              <li key={href}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-accent bg-surface px-5 font-semibold text-accent hover:bg-accent hover:text-surface"
                >
                  {label}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
