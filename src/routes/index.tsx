import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Volume2, Sparkles, ArrowRight, Heart } from "lucide-react";

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
    desc: "Klik tombol hijau besar di bawah untuk membuka kamera.",
    icon: Camera,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    step: "2",
    title: "Arahkan ke Foto",
    desc: "Arahkan kamera HP ke foto orang yang ingin dipindai.",
    icon: Sparkles,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    step: "3",
    title: "Dengarkan Lagu",
    desc: "Musik dan cerita indah akan otomatis berputar.",
    icon: Volume2,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 font-sans selection:bg-emerald-200">
      {/* Top Simple Header */}
      <header className="py-6 px-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Scan Cerita <span className="text-emerald-600">KKN</span>
          </span>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full">
          Mudah & Ramah Lansia
        </span>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-4 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Large Call To Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Album Foto Kenangan Digital
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
                Pindai Foto, <br className="hidden sm:inline" />
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-8">
                  Dengarkan Lagunya
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 pt-2">
                Cukup arahkan kamera HP ke foto fisik. Lagu dan kenangan indah akan langsung berputar secara otomatis.
              </p>
            </div>

            {/* Giant Senior-Friendly CTA Button */}
            <div className="pt-2">
              <Link
                to="/scan"
                className="group relative inline-flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-5 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white text-2xl font-black shadow-2xl shadow-emerald-600/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                <Camera className="w-8 h-8 animate-bounce" />
                <span>Buka Kamera Sekarang</span>
                <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-2" />
              </Link>
              <p className="text-xs text-slate-500 mt-3 font-medium">
                *Tanpa perlu mendaftar atau mengunduh aplikasi tambahan
              </p>
            </div>

            {/* Simple 3 Steps */}
            <div className="pt-6 border-t border-slate-200/80">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center lg:text-left">
                Tiga Langkah Mudah:
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                {steps.map((s) => (
                  <div
                    key={s.step}
                    className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-xl border ${s.color} flex items-center justify-center font-bold text-sm`}>
                        {s.step}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{s.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Warm Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Soft decorative backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200 to-amber-200 rounded-[2.5rem] blur-2xl opacity-60 -z-10" />
              
              {/* Image Frame */}
              <div className="relative rounded-[2rem] overflow-hidden border-8 border-white bg-white shadow-2xl transform hover:scale-[1.02] transition duration-500">
                <img
                  src="/assets/hero_illustration.jpg"
                  alt="Ilustrasi Lansia Menggunakan AR Scan"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl text-white text-center">
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
      <footer className="py-6 border-t border-slate-200/80 text-center text-xs text-slate-500">
        <p>© 2026 AurelieZ KKN Project • Didesain Khusus untuk Kenyamanan Semua Usia</p>
      </footer>
    </div>
  );
}

