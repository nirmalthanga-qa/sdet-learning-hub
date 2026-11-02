import type { Metadata } from "next";
import ProgrammingLesson from "@/components/ProgrammingLesson";

export const metadata: Metadata = {
  title: "Promises, Async/Await, and Error Handling",
  description:
    "Coordinate asynchronous work, handle failures, and choose between sequential and concurrent execution.",
};

export default function Page() {
  return <ProgrammingLesson slug="async-await-and-error-handling" />;
}
