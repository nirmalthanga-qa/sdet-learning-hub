import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Modules, npm, and Project Structure",
  description:
    "Organize reusable JavaScript modules and understand npm scripts, dependencies, and lockfiles.",
};

export default function Page() {
  return <ProgrammingLesson slug="modules-npm-and-project-structure" />;
}
