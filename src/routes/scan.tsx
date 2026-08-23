import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ArScanner = lazy(() => import("../components/ArScanner"));

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Kamera Scan AR — CritaEyang" },
      {
        name: "description",
        content: "Arahkan kamera ke foto untuk melihat kenangan objek 3D dan mendengar suaranya.",
      },
      { property: "og:title", content: "Kamera Scan AR — CritaEyang" },
      {
        property: "og:description",
        content: "Arahkan kamera ke foto untuk melihat kenangan objek 3D dan mendengar suaranya.",
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
