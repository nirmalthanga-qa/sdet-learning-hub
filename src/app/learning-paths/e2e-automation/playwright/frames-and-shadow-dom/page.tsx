import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Frames and Shadow DOM",
  description: "Select elements inside iframe documents and open shadow roots.",
};

export default function Page() {
  return <PlaywrightLesson slug="frames-and-shadow-dom" />;
}
