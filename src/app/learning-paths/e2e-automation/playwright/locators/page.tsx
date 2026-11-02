import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Locators and Reliable Element Selection",
  description: "Select elements using clear semantic and testing contracts.",
};

export default function Page() {
  return <PlaywrightLesson slug="locators" />;
}
