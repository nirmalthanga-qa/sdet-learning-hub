import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Setup: Node.js, VS Code, and Running Code",
  description:
    "Create a local practice folder and run your first JavaScript programs.",
};

export default function Page() {
  return <ProgrammingLesson slug="local-programming-setup" />;
}
