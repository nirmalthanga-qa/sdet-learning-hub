import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Network Inspection and Mocking",
  description:
    "Observe requests and control dependency responses for focused UI checks.",
};

export default function Page() {
  return <PlaywrightLesson slug="network-mocking" />;
}
