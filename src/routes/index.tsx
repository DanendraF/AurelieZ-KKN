import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Volume2, Sparkles, ArrowRight, Heart, Music, Image as ImageIcon, Sun } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scan Cerita KKN — Pindai Foto, Dengarkan Kenangan" },
      {
        name: "description",
        content:
          "Aplikasi sederhana untuk lansia dan keluarga. Arahkan kamera ke foto, dengarkan lagu dan lihat kenangan indah.",
      },
      { property: "og:title", content: "Scan Cerita KKN — Pindai Foto, Dengarkan Kenangan" },
      {
        property: "og:description",
        content: "Aplikasi sederhana untuk lansia dan keluarga. Arahkan kamera ke foto, dengarkan lagu dan lihat kenangan indah.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const steps = [
  {
    step: "1",
    title: "Tekan Tombol Mulai",
    desc: "Klik tombol hijau di bawah untuk mengaktifkan kamera.",
    icon: Camera,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    step: "2",
    title: "Arahkan ke Foto",
    desc: "Posisikan foto di dalam tampilan kamera HP.",
    icon: Sparkles,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    step: "3",
    title: "Dengarkan Lagu",
    desc: "Lagu kenangan indah akan otomatis berputar.",
    icon: Volume2,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
];

function Index() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 overflow-hidden">
      {/* Background Floating Nostalgia Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-10 text-emerald-300/40 animate-pulse transition-transform duration-1000">
          <Heart className="w-8 h-8 rotate-12" />
        </div>
        <div className="absolute top-1/4 right-12 text-amber-300/50 animate-bounce transition-all duration-700">
          <Music className="w-9 h-9 -rotate-12" />
        </div>
        <div className="absolute bottom-1/3 left-16 text-rose-300/40 animate-pulse">
          <ImageIcon className="w-10 h-10 rotate-6" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-emerald-400/30 animate-spin transition-all duration-1000" style={{ animationDuration: "12s" }}>
          <Sun className="w-10 h-10" />
        </div>
        <div className="absolute bottom-12 left-1/3 text-amber-400/40 animate-pulse">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute top-16 left-1/2 text-rose-400/30 animate-bounce" style={{ animationDuration: "3s" }}>
          <Heart className="w-6 h-6" />
        </div>
      </div>

      {/* Subtle Background Pattern & Gradient Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/50 via-amber-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Simple Header */}
      <header className="relative z-10 py-4 px-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Scan Cerita <span className="text-emerald-600">KKN</span>
          </span>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-100/80 border border-emerald-200 text-emerald-800 rounded-full">
          Ramah Lansia
        </span>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-2 pb-14">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & Compact Button */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-medium text-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Album Foto Kenangan Digital
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Pindai Foto, <br className="hidden sm:inline" />
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-4">
                  Dengarkan Lagunya
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Arahkan kamera HP ke foto fisik. Lagu dan kenangan indah akan langsung berputar secara otomatis.
              </p>
            </div>

            {/* Compact Senior-Friendly CTA Button */}
            <div className="pt-1">
              <Link
                to="/scan"
                className="group relative inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold shadow-md shadow-emerald-600/20 transition-all duration-200 active:scale-95"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Buka Kamera Sekarang</span>
                <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                *Tanpa perlu mendaftar atau mengunduh aplikasi
              </p>
            </div>

            {/* Simple 3 Steps */}
            <div className="pt-6 border-t border-slate-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center lg:text-left">
                Tiga Langkah Mudah:
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-left">
                {steps.map((s) => (
                  <div
                    key={s.step}
                    className="p-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`w-7 h-7 rounded-lg border ${s.color} flex items-center justify-center font-bold text-xs`}>
                        {s.step}
                      </div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{s.title}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Warm Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Soft backdrop glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-200/60 to-amber-200/60 rounded-3xl blur-xl -z-10" />
              
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white bg-white shadow-xl">
                <img
                  src="/assets/hero_illustration.jpg"
                  alt="Ilustrasi Lansia Menggunakan AR Scan"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-md p-3 rounded-xl text-white text-center">
                  <p className="text-xs font-medium text-amber-200">
                    "Kenangan lama jadi terasa lebih hangat dan berkesan."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 py-5 border-t border-slate-200/80 text-center text-xs text-slate-400">
        <p>© 2026 AurelieZ KKN Project • Didesain Khusus untuk Kenyamanan Semua Usia</p>
      </footer>
    </div>
  );
}

