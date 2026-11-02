import type { Metadata } from "next";
import CypressLesson from "@/components/CypressLesson";

export const metadata: Metadata = {
  title: "Command Queue and Subjects",
  description:
    "Understand Cypress command scheduling, yielded subjects, and callbacks.",
};

export default function Page() {
  return <CypressLesson slug="command-queue" />;
}
