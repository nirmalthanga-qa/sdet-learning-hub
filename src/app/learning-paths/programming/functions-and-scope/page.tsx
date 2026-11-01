import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Functions and Scope",
  description:
    "Create reusable helpers with explicit parameters, return values, and clear scope.",
};

export default function Page() {
  return <ProgrammingLesson slug="functions-and-scope" />;
}
