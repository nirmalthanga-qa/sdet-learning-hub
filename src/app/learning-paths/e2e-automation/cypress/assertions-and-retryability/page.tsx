import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Assertions and Retry-ability",
  description:
    "Use retrying Cypress assertions to check asynchronous UI behavior.",
};

export default function Page() {
  return <CypressLesson slug="assertions-and-retryability" />;
}
