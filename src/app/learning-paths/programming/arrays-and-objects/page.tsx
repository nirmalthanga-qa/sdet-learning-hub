import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Arrays and Objects",
  description:
    "Model test data using arrays and objects, transform collections, and understand references and mutation.",
};

export default function Page() {
  return <ProgrammingLesson slug="arrays-and-objects" />;
}
