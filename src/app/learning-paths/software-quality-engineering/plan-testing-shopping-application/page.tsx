import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Practice: Plan Testing for a Shopping Application",
  description:
    "Apply quality engineering foundations to create a practical shopping application test plan covering risks, scenarios, data, automation, and reporting.",
};

export default function Page() {
  return <FoundationLesson slug="plan-testing-shopping-application" />;
}
