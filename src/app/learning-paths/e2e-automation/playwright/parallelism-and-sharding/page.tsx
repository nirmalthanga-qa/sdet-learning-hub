import type { Metadata } from "next";
import PlaywrightLesson from "@/components/PlaywrightLesson";

export const metadata: Metadata = {
  title: "Parallelism and Sharding",
  description:
    "Run independent Playwright tests concurrently and distribute execution across shards.",
};

export default function Page() {
  return <PlaywrightLesson slug="parallelism-and-sharding" />;
}
