import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Test Organization and Isolation",
  description:
    "Organize independent Cypress tests with explicit prerequisites and isolated browser state.",
};

export default function Page() {
  return <CypressLesson slug="test-organization-and-isolation" />;
}
