import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Forms and Controls",
  description:
    "Work with text inputs, checkboxes, radio buttons, dropdowns, and keyboard interactions.",
};

export default function Page() {
  return <PlaywrightLesson slug="forms-and-controls" />;
}
