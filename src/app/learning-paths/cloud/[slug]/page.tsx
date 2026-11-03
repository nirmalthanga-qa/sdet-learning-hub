import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CloudLesson from "@/components/CloudLesson";
import { cloudLessons } from "@/data/cloud-lessons";

type Props = {
  params: Promise<{ slug: string }>;
};

function findAvailableLesson(slug: string) {
  return cloudLessons.find(
    (lesson) => lesson.slug === slug && lesson.content,
  );
}

export function generateStaticParams() {
  return cloudLessons
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

async function LessonContent({ params }: Props) {
  const { slug } = await params;
  const lesson = findAvailableLesson(slug);

  if (!lesson) notFound();

  return <CloudLesson slug={lesson.slug} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="site-container py-10 sm:py-14">
          <p role="status" className="mx-auto max-w-3xl text-muted">
            Loading lesson…
          </p>
        </main>
      }
    >
      <LessonContent params={params} />
    </Suspense>
  );
}
