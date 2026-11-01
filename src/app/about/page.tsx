import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="site-container py-16">
      <h1 className="text-4xl font-bold">About SDET Learning Hub</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Created by Nirmal Kumar, SDET Learning Hub helps you learn quality
        engineering through clear explanations, practical examples, and projects
        you can build locally in VS Code.
      </p>
    </main>
  );
}
