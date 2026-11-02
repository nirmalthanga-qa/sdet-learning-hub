import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Generics, Utility Types, and Type Narrowing",
  description:
    "Preserve type relationships and validate uncertain values with TypeScript.",
};

export default function Page() {
  return <ProgrammingLesson slug="generics-utility-types-and-narrowing" />;
}
