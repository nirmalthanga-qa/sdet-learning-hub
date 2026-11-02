import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Variables and Aliases",
  description:
    "Use Cypress closures, query aliases, and static snapshots correctly.",
};

export default function Page() {
  return <CypressLesson slug="variables-and-aliases" />;
}
