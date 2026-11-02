import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Tables and Dynamic Content",
  description:
    "Inspect meaningful rows and verify changing collections with Playwright.",
};

export default function Page() {
  return <PlaywrightLesson slug="tables-and-dynamic-content" />;
}
