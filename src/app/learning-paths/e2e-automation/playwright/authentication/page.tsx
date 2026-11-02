import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Authentication and Storage State",
  description:
    "Understand Playwright storage state, authentication reuse, and test isolation.",
};

export default function Page() {
  return <PlaywrightLesson slug="authentication" />;
}
