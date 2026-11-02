import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Set Up a Playwright TypeScript Project",
  description: "Install and configure a separate Playwright practice project.",
};

export default function Page() {
  return <PlaywrightLesson slug="project-setup" />;
}
