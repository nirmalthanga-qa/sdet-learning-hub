import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Test Strategy, Planning, and Risk",
  description:
    "Plan testing around product risks, suitable coverage, responsibilities, and completion conditions.",
};

export default function Page() {
  return <FoundationLesson slug="test-strategy-planning-and-risk" />;
}
