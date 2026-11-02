import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApiLesson from "@/components/ApiLesson";
import { apiLessons } from "@/data/api-lessons";

type Props = {
  params: Promise<{ slug: string }>;
};

function findAvailableLesson(slug: string) {
  return apiLessons.find((lesson) => lesson.slug === slug && lesson.content);
}

export function generateStaticParams() {
  return apiLessons
    .filter((lesson) => lesson.content)
    .map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = findAvailableLesson(slug);

  if (!lesson) notFound();

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

function LessonLoading() {
  return (
    <main className="site-container py-10 sm:py-14">
      <div role="status" aria-busy="true" className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">Loading lesson…</p>

        <div
          aria-hidden="true"
          className="mt-8 space-y-6 motion-safe:animate-pulse"
        >
          <div className="h-12 rounded-lg bg-border" />
          <div className="h-6 w-4/5 rounded bg-border" />
          <div className="h-48 rounded-xl border border-border bg-surface" />
        </div>
      </div>
    </main>
  );
}

async function LessonContent({ params }: Props) {
  const { slug } = await params;
  const lesson = findAvailableLesson(slug);

  if (!lesson) notFound();

  return <ApiLesson slug={lesson.slug} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<LessonLoading />}>
      <LessonContent params={params} />
    </Suspense>
  );
}
