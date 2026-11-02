import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "SDET Coding Practice",
  description:
    "Practise duplicate detection, collection comparisons, and complexity reasoning.",
};

export default function Page() {
  return <ProgrammingLesson slug="sdet-coding-practice" />;
}
