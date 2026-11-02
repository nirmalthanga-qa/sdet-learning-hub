import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "OOP Concepts in TypeScript",
  description:
    "Learn classes, encapsulation, abstraction, inheritance, polymorphism, and composition.",
};

export default function Page() {
  return <ProgrammingLesson slug="oop-concepts-in-typescript" />;
}
