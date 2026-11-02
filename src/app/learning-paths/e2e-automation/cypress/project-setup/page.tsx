import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Cypress Project Setup",
  description:
    "Configure a separate Cypress TypeScript project and run a local practice application.",
};

export default function Page() {
  return <CypressLesson slug="project-setup" />;
}
