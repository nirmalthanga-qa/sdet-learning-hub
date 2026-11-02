import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "CI Execution",
  description:
    "Run Playwright checks in GitHub Actions and retain execution evidence.",
};

export default function Page() {
  return <PlaywrightLesson slug="ci-execution" />;
}
