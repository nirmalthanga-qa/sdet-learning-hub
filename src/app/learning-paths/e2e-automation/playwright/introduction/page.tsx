import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Introduction to Playwright",
  description: "Understand browser automation and meaningful test outcomes.",
};

export default function Page() {
  return <PlaywrightLesson slug="introduction" />;
}
