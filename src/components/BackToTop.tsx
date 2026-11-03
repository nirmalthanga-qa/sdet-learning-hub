"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 120;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#page-top"
      className="fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent bg-accent text-xl font-bold text-surface shadow-md hover:bg-surface hover:text-accent sm:bottom-6 sm:right-6"
    >
      <span aria-hidden="true">↑</span>
      <span className="sr-only">Back to top</span>
    </a>
  );
}
