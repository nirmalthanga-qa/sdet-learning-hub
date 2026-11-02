import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Page Objects and Components",
  description:
    "Organize reusable Playwright interactions with typed page and component objects.",
};

export default function Page() {
  return <PlaywrightLesson slug="page-objects" />;
}
