"use client";

import { useState, useSyncExternalStore } from "react";

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

type LessonCompletionProps = {
  lessonId: string;
};

export default function LessonCompletion({ lessonId }: LessonCompletionProps) {
  const storageKey = `sdet-learning-hub:completed:${lessonId}`;
  const [error, setError] = useState("");

  const completed = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(storageKey) === "true";
      } catch {
        return false;
      }
    },
    getServerSnapshot,
  );

  const loading = completed === null;

  function toggleCompletion() {
    if (loading) return;

    try {
      if (completed) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, "true");
      }

      setError("");
      window.dispatchEvent(new Event(PROGRESS_EVENT));
    } catch {
      setError(
        "Your browser could not save progress. Check whether site storage is allowed.",
      );
    }
  }

  return (
    <section
      aria-label="Lesson completion"
      className="mt-10 rounded-xl border border-border bg-surface p-6"
    >
      <h2 className="text-xl font-bold">Your progress</h2>

      <p role="status" className="mt-3 text-sm leading-6 text-muted">
        {loading
          ? "Checking saved progress…"
          : completed
            ? "You’ve marked this lesson as complete."
            : "Finished reading and tried the exercise? Mark this lesson as complete."}
      </p>

      <button
        type="button"
        disabled={loading}
        aria-pressed={completed === true}
        onClick={toggleCompletion}
        className="mt-4 inline-flex min-h-11 items-center justify-center
          rounded-lg bg-accent px-5 py-3 text-sm font-semibold
          text-surface hover:bg-[#653b13]
          disabled:cursor-wait disabled:opacity-60"
      >
        {loading
          ? "Loading progress…"
          : completed
            ? "Mark as incomplete"
            : "Mark as complete"}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <p className="mt-4 text-xs leading-5 text-muted">
        Progress is saved in this browser. Clearing site data removes it, and it
        does not sync across devices.
      </p>
    </section>
  );
}
