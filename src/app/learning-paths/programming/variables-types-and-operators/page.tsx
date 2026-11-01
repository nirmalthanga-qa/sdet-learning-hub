import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Variables, Data Types, and Operators",
  description:
    "Learn variables, JavaScript values, arithmetic, comparisons, and explicit conversion.",
};

export default function Page() {
  return <ProgrammingLesson slug="variables-types-and-operators" />;
}
