import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Debugging and Traces",
  description:
    "Investigate Playwright failures using the inspector, reports, and execution traces.",
};

export default function Page() {
  return <PlaywrightLesson slug="debugging-and-traces" />;
}
