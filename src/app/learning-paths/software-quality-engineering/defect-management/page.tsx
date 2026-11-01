import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Defect Management",
  description:
    "Write actionable defect reports, distinguish severity and priority, and verify fixes.",
};

export default function Page() {
  return <FoundationLesson slug="defect-management" />;
}
