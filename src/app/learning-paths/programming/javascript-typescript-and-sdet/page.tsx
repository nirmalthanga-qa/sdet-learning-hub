import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "JavaScript, TypeScript, and the SDET Role",
  description:
    "Understand programming languages, runtimes, and their role in test automation.",
};

export default function Page() {
  return <ProgrammingLesson slug="javascript-typescript-and-sdet" />;
}
