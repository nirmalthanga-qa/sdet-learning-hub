import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Test Data and Environments",
  description:
    "Prepare representative data, isolate tests, and manage environment dependencies.",
};

export default function Page() {
  return <FoundationLesson slug="test-data-and-environments" />;
}
