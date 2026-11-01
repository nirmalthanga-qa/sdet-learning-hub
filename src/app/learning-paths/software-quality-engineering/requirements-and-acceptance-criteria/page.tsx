import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Requirements and Acceptance Criteria",
  description:
    "Clarify requirements, write observable acceptance criteria, and connect requirements to test evidence.",
};

export default function Page() {
  return <FoundationLesson slug="requirements-and-acceptance-criteria" />;
}
