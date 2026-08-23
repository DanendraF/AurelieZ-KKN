import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Scan, Volume2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scan Cerita — Scan Gambar, Hidupkan Ceritanya" },
      {
        name: "description",
        content:
          "Arahkan kamera ke foto lama, lalu lihat animasi dan dengarkan suaranya. Mudah dipakai, teks besar dan jelas.",
      },
      { property: "og:title", content: "Scan Cerita — Scan Gambar, Hidupkan Ceritanya" },
      {
        property: "og:description",
        content: "Arahkan kamera ke foto lama, lalu lihat animasi dan dengarkan suaranya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Camera, title: "Buka Kamera", text: "Izinkan akses kamera ponsel Anda" },
  { icon: Scan, title: "Arahkan ke Foto", text: "Posisikan foto di dalam kotak pandang" },
  { icon: Volume2, title: "Lihat & Dengar", text: "Animasi dan suara akan langsung muncul" },
];

function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[2.5rem] border-[10px] border-card bg-foreground p-3 shadow-2xl shadow-foreground/10">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-secondary">
          {/* Decorative soft photo suggestion */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/40" />
            <div className="absolute left-1/2 top-1/4 h-32 w-40 -translate-x-1/2 rounded-2xl bg-primary/20" />
            <div className="absolute left-1/3 top-1/2 h-24 w-32 rounded-2xl bg-accent/30" />
          </div>

          {/* Scan frame */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative h-56 w-56 rounded-2xl border-4 border-dashed border-card/70">
              <div className="absolute left-0 top-0 h-6 w-6 -translate-x-1 -translate-y-1 border-l-4 border-t-4 border-card" />
              <div className="absolute right-0 top-0 h-6 w-6 translate-x-1 -translate-y-1 border-r-4 border-t-4 border-card" />
              <div className="absolute bottom-0 left-0 h-6 w-6 -translate-x-1 translate-y-1 border-b-4 border-l-4 border-card" />
              <div className="absolute bottom-0 right-0 h-6 w-6 translate-x-1 translate-y-1 border-b-4 border-r-4 border-card" />
              <div className="flex h-full items-center justify-center">
                <span className="rounded-full bg-card/90 px-5 py-3 text-center text-lg font-semibold text-foreground">
                  Sedang Memindai…
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-8 right-8">
            <div className="h-3 overflow-hidden rounded-full bg-card/30">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative ambient blobs */}
      <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 -z-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
    </div>
  );
}

function Index() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-12 lg:px-12">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Content side */}
        <section className="order-2 flex flex-col gap-10 lg:order-1">
          <header className="space-y-5">
            <span className="inline-block w-fit rounded-full bg-secondary px-5 py-2 text-lg font-semibold uppercase tracking-wide text-secondary-foreground">
              Scan Cerita
            </span>
            <h1 className="text-5xl font-bold leading-[1.1] text-foreground sm:text-6xl lg:text-7xl">
              Scan foto, <span className="text-primary">hidupkan cerita.</span>
            </h1>
            <p className="max-w-xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              Cara termudah untuk melihat kenangan indah di balik setiap foto lama Anda. Cukup arahkan kamera dan saksikan.
            </p>
          </header>

          <ol className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <step.icon className="size-9 shrink-0 text-primary" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-semibold text-card-foreground">{step.title}</span>
                  <span className="text-lg text-muted-foreground">{step.text}</span>
                </div>
              </li>
            ))}
          </ol>

          <Link
            to="/scan"
            className="group flex min-h-[80px] w-full items-center justify-center gap-4 rounded-2xl bg-primary px-8 text-center text-3xl font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98] sm:w-auto sm:self-start"
          >
            <Camera className="size-10" aria-hidden="true" />
            Mulai Scan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-8 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Visual side */}
        <section className="order-1 lg:order-2" aria-hidden="true">
          <PhoneMockup />
        </section>
      </div>
    </main>
  );
}
