import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Reports and Failure Evidence",
  description:
    "Create useful Playwright reports and attach evidence that explains test results.",
};

export default function Page() {
  return <PlaywrightLesson slug="reporting" />;
}
