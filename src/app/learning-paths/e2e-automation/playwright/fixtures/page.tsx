import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Reusable Fixtures",
  description:
    "Create typed Playwright fixtures with explicit setup, scope, and teardown.",
};

export default function Page() {
  return <PlaywrightLesson slug="fixtures" />;
}
