import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Fixtures and Test Data",
  description:
    "Load and validate Cypress fixture data and create independently reported test cases.",
};

export default function Page() {
  return <CypressLesson slug="fixtures-and-test-data" />;
}
