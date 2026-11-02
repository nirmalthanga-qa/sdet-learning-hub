import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Shopping Application Automation",
  description:
    "Combine Playwright fixtures, page objects, browser workflows, and API checks in a shopping project.",
};

export default function Page() {
  return <PlaywrightLesson slug="shopping-automation-project" />;
}
