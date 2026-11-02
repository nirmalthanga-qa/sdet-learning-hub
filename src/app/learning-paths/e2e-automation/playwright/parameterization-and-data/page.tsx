import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Parameterization and Isolated Data",
  description: "Choose meaningful test cases and isolate mutable test data.",
};

export default function Page() {
  return <PlaywrightLesson slug="parameterization-and-data" />;
}
