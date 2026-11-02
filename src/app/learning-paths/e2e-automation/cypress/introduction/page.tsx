import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Introduction to Cypress",
  description:
    "Understand Cypress, TypeScript tests, command chains, and meaningful assertions.",
};

export default function Page() {
  return <CypressLesson slug="introduction" />;
}
