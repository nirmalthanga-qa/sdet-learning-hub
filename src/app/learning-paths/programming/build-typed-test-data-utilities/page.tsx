import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Practice: Build Typed Test-Data Utilities",
  description:
    "Build and verify reusable factories with typed contracts, validation, and isolated data.",
};

export default function Page() {
  return <ProgrammingLesson slug="build-typed-test-data-utilities" />;
}
