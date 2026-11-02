import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Tables and Dynamic Content",
  description:
    "Scope Cypress table queries and verify asynchronously filtered content.",
};

export default function Page() {
  return <CypressLesson slug="tables-and-dynamic-content" />;
}
