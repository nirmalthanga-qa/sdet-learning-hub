import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Type Aliases, Interfaces, and Optional Properties",
  description:
    "Model reusable contracts and handle optional values with TypeScript.",
};

export default function Page() {
  return <ProgrammingLesson slug="type-aliases-and-interfaces" />;
}
