import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Conditions and Loops",
  description:
    "Use conditions and loops to express decisions and controlled repetition.",
};

export default function Page() {
  return <ProgrammingLesson slug="conditions-and-loops" />;
}
