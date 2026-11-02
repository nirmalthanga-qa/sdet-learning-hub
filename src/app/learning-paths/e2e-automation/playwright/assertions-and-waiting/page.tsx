import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Assertions, Auto-Waiting, and Timeouts",
  description:
    "Synchronize tests with observable outcomes instead of fixed sleeps.",
};

export default function Page() {
  return <PlaywrightLesson slug="assertions-and-waiting" />;
}
