import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Dialogs, Popups, and Tabs",
  description:
    "Handle browser dialogs and coordinate new-page events reliably.",
};

export default function Page() {
  return <PlaywrightLesson slug="dialogs-and-tabs" />;
}
