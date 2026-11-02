import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Write Your First Interaction Test",
  description: "Prepare a page, perform an action, and verify its outcome.",
};

export default function Page() {
  return <PlaywrightLesson slug="first-test" />;
}
