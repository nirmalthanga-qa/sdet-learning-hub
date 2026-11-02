import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Selectors and Navigation",
  description:
    "Use stable Cypress selectors, scope repeated controls, and verify navigation.",
};

export default function Page() {
  return <CypressLesson slug="selectors-and-navigation" />;
}
