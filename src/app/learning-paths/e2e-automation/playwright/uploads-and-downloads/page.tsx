import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Uploads and Downloads",
  description:
    "Supply controlled files and inspect downloaded content with Playwright.",
};

export default function Page() {
  return <PlaywrightLesson slug="uploads-and-downloads" />;
}
