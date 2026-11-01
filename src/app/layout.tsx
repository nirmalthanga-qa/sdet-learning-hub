import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "SDET Learning Hub",
    template: "%s | SDET Learning Hub",
  },
  description:
    "Learn software quality engineering, automation, API testing, databases, CI/CD, and AI-driven testing through practical tutorials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-4"
        >
          Skip to main content
        </a>

        <Header />

        <div id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </div>

        <footer className="border-t border-border px-4 py-6 text-center text-sm text-muted">
          <p className="leading-7">
            Developed by{" "}
            <a
              href="https://nirmal-portfolio-azure.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-4"
            >
              Nirmal Kumar
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {" · "}
            <span className="inline-block">
              Senior SDET | AI-Driven Quality Engineer
            </span>
          </p>
        </footer>
      </body>
    </html>
  );
}
