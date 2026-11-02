import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Configuration and Projects",
  description:
    "Configure Playwright browser projects, timeouts, and execution settings.",
};

export default function Page() {
  return <PlaywrightLesson slug="configuration-and-projects" />;
}
