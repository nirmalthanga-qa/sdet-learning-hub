import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Forms and Controls",
  description:
    "Automate text inputs, checkboxes, radio buttons, and native select controls with Cypress.",
};

export default function Page() {
  return <CypressLesson slug="forms-and-controls" />;
}
