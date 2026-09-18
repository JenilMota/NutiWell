import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriWell — Accessible Nutrition & Well-being Optimizer",
  description:
    "AI-powered nutrition assistant for sustainable wellness. Analyze food labels, get personalized meal plans, and track your health goals — all powered by responsible AI. Supporting SDG 3: Good Health and Well-being.",
  keywords: [
    "nutrition",
    "wellness",
    "AI",
    "sustainable",
    "food labels",
    "meal planning",
    "health",
    "SDG 3",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NutriWell",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F2F2F7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full h-full flex flex-col bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

// Client component for the app shell with bottom tab bar
import AppShell from "@/components/AppShell";
