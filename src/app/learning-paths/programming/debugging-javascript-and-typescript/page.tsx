import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Debugging JavaScript and TypeScript",
  description:
    "Investigate failures using breakpoints, stack traces, and reproducible examples.",
};

export default function Page() {
  return <ProgrammingLesson slug="debugging-javascript-and-typescript" />;
}
