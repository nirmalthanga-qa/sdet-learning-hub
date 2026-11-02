import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Classes and Composition for Page Objects",
  description:
    "Apply object-oriented concepts to focused page objects and reusable components.",
};

export default function Page() {
  return <ProgrammingLesson slug="classes-and-composition" />;
}
