import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Strings, Dates, and JSON",
  description:
    "Transform text, handle explicit timestamps, and parse and validate JSON data.",
};

export default function Page() {
  return <ProgrammingLesson slug="strings-dates-and-json" />;
}
