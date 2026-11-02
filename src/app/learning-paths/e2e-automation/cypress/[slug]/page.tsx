import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CypressLesson from "@/components/CypressLesson";
import { cypressLessons } from "@/data/cypress-lessons";

type Props = {
  params: Promise<{ slug: string }>;
};

function findAvailableLesson(slug: string) {
  return cypressLessons.find(
    (lesson) => lesson.slug === slug && lesson.content,
  );
}

export function generateStaticParams() {
  return cypressLessons
    .filter((lesson) => lesson.content)
    .map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = findAvailableLesson(slug);

  if (!lesson) {
    notFound();
  }

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

function LessonLoading() {
  return (
    <main className="site-container py-10 sm:py-14">
      <div
        className="mx-auto max-w-3xl"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <p className="text-sm text-muted">Loading lesson…</p>

        <div
          aria-hidden="true"
          className="mt-8 space-y-6 motion-safe:animate-pulse"
        >
          <div className="h-4 w-40 rounded bg-border" />
          <div className="h-12 w-full rounded bg-border" />
          <div className="h-6 w-4/5 rounded bg-border" />
          <div className="h-48 rounded-xl border border-border bg-surface" />
          <div className="h-64 rounded-xl border border-border bg-surface" />
        </div>
      </div>
    </main>
  );
}

async function LessonContent({ params }: Props) {
  const { slug } = await params;
  const lesson = findAvailableLesson(slug);

  if (!lesson) {
    notFound();
  }

  return <CypressLesson slug={lesson.slug} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<LessonLoading />}>
      <LessonContent params={params} />
    </Suspense>
  );
}
