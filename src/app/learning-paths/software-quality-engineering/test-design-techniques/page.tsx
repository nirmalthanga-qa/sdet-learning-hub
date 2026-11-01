import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Test Design Techniques",
  description:
    "Learn equivalence partitioning, boundary value analysis, decision tables, and state transition testing.",
};

export default function Page() {
  return <FoundationLesson slug="test-design-techniques" />;
}
