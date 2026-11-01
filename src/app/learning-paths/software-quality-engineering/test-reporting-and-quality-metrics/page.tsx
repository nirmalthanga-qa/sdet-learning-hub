import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Test Reporting and Quality Metrics",
  description:
    "Interpret test results and communicate coverage, defects, and remaining release risks.",
};

export default function Page() {
  return <FoundationLesson slug="test-reporting-and-quality-metrics" />;
}
