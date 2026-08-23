import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ArScanner = lazy(() => import("../components/ArScanner"));

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Mulai Scan — Scan Cerita" },
      {
        name: "description",
        content: "Arahkan kamera ke gambar untuk melihat animasi dan mendengar suaranya.",
      },
      { property: "og:title", content: "Mulai Scan — Scan Cerita" },
      {
        property: "og:description",
        content: "Arahkan kamera ke gambar untuk melihat animasi dan mendengar suaranya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScanPage,
});

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center text-3xl font-bold text-foreground">
      Menyiapkan kamera...
    </div>
  );
}

function ScanPage() {
  return (
    <ClientOnly fallback={<Loading />}>
      <Suspense fallback={<Loading />}>
        <ArScanner />
      </Suspense>
    </ClientOnly>
  );
}
