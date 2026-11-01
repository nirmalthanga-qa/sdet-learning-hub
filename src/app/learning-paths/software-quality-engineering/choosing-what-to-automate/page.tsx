import type { Metadata } from "next";
import FoundationLesson from "@/components/FoundationLesson";

export const metadata: Metadata = {
  title: "Choosing What to Automate",
  description:
    "Evaluate automation value, choose appropriate test layers, and plan sustainable maintenance.",
};

export default function Page() {
  return <FoundationLesson slug="choosing-what-to-automate" />;
}
