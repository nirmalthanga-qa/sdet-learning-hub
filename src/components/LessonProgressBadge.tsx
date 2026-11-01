"use client";

import { useSyncExternalStore } from "react";

const PROGRESS_EVENT = "sdet-learning-progress";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(PROGRESS_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(PROGRESS_EVENT, onChange);
  };
}

function getServerSnapshot(): boolean | null {
  return null;
}

type LessonProgressBadgeProps = {
  lessonId: string;
  label?: string;
};

export default function LessonProgressBadge({
  lessonId,
  label = "First lesson",
}: LessonProgressBadgeProps) {
  const completed = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return (
          window.localStorage.getItem(
            `sdet-learning-hub:completed:${lessonId}`,
          ) === "true"
        );
      } catch {
        return false;
      }
    },
    getServerSnapshot,
  );

  return (
    <span
      role="status"
      className={`rounded-full border px-3 py-1 text-xs ${
        completed
          ? "border-[#b9cbb4] bg-[#eef4e9] text-[#36512d]"
          : "border-border text-muted"
      }`}
    >
      {completed === null
        ? "Checking progress…"
        : `${label} ${completed ? "completed" : "available"}`}
    </span>
  );
}
