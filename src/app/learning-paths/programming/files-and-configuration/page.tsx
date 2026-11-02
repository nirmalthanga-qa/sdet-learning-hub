import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Working with Files and Configuration",
  description:
    "Read fixtures, resolve paths, and validate configuration for automation.",
};

export default function Page() {
  return <ProgrammingLesson slug="files-and-configuration" />;
}
