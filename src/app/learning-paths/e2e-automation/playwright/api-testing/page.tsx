import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "API Testing with Playwright",
  description:
    "Validate HTTP responses, runtime contracts, and business values with Playwright.",
};

export default function Page() {
  return <PlaywrightLesson slug="api-testing" />;
}
