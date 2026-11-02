import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "TypeScript Types, Inference, and Unions",
  description:
    "Compile TypeScript examples and learn annotations, inference, and literal unions.",
};

export default function Page() {
  return <ProgrammingLesson slug="typescript-types-and-unions" />;
}
