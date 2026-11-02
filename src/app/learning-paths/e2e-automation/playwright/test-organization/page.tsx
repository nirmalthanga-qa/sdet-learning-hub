import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Test Organization",
  description:
    "Organize Playwright tests using suites, hooks, tags, and steps.",
};

export default function Page() {
  return <PlaywrightLesson slug="test-organization" />;
}
