import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Volume2, Sparkles, ArrowRight, Heart, Music, Image as ImageIcon, Sun } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CritaEyang — Pindai Foto Kenangan & Dengarkan Lagunya" },
      {
        name: "description",
        content:
          "CritaEyang oleh Aurelie. Pindai foto fisik kenangan, lihat objek dan dengarkan cerita lagunya secara otomatis.",
      },
      { property: "og:title", content: "CritaEyang — Pindai Foto Kenangan & Dengarkan Lagunya" },
      {
        property: "og:description",
        content: "CritaEyang oleh Aurelie. Pindai foto fisik kenangan, lihat objek dan dengarkan cerita lagunya secara otomatis.",
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
    desc: "Klik tombol merah muda di bawah untuk membuka kamera HP.",
    icon: Camera,
    color: "bg-[#C2185B]/10 text-[#C2185B] border-[#C2185B]/20",
  },
  {
    step: "2",
    title: "Arahkan ke Foto Eyang",
    desc: "Posisikan foto fisik Eyang tepat di tengah layar kamera.",
    icon: Sparkles,
    color: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  {
    step: "3",
    title: "Dengarkan Pesannya",
    desc: "Suara hangat dan pesan bermakna akan otomatis terdengar.",
    icon: Volume2,
    color: "bg-rose-500/10 text-rose-700 border-rose-500/20",
  },
];

const eyangSlides = [
  {
    src: "/assets/hero_illustration.jpg",
    caption: "1. Eyang menyimpan album kenangan penuh rasa rindu",
  },
  {
    src: "/assets/hero_story_2.jpg",
    caption: "2. Eyang menceritakan kisah bermakna kepada cucu tercinta",
  },
  {
    src: "/assets/hero_story_3.jpg",
    caption: "3. Kehangatan dan kebersamaan keluarga yang selalu abadi",
  },
];

function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eyangSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFF8F5] text-[#2C2C2C] font-sans selection:bg-[#C2185B]/20 overflow-hidden">
      {/* Hidden Watermark */}
      <span className="sr-only select-none pointer-events-none" aria-hidden="true" data-author="DanendraF">
        Built & Engineered by DanendraF
      </span>

      {/* Background Floating Nostalgia Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-10 text-[#C2185B]/25 animate-pulse">
          <Heart className="w-9 h-9 rotate-12 fill-[#C2185B]/10" />
        </div>
        <div className="absolute top-1/4 right-12 text-amber-400/35 animate-bounce" style={{ animationDuration: "3s" }}>
          <Music className="w-9 h-9 -rotate-12" />
        </div>
        <div className="absolute bottom-1/3 left-16 text-[#C2185B]/20 animate-pulse">
          <ImageIcon className="w-10 h-10 rotate-6" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-amber-500/25 animate-spin" style={{ animationDuration: "14s" }}>
          <Sun className="w-10 h-10" />
        </div>
        <div className="absolute bottom-12 left-1/3 text-[#C2185B]/30 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
      </div>

      {/* Subtle Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5d8d0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#C2185B]/10 via-amber-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 py-5 px-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#C2185B] flex items-center justify-center text-white shadow-md shadow-[#C2185B]/30">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tight text-[#2C2C2C]">
            Crita<span className="text-[#C2185B]">Eyang</span> 🌸
          </span>
        </div>
        <span className="text-xs font-semibold px-3.5 py-1 bg-[#C2185B]/10 border border-[#C2185B]/20 text-[#C2185B] rounded-full shadow-sm">
          Oleh Aurelie
        </span>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-2 pb-14">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C2185B]/10 border border-[#C2185B]/20 text-[#C2185B] font-semibold text-xs shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Album Foto Kenangan Digital Eyang 💖
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2C2C2C] leading-tight tracking-tight">
                Pindai Foto, <br className="hidden sm:inline" />
                <span className="text-[#C2185B] underline decoration-[#C2185B]/40 decoration-wavy underline-offset-4">
                  Dengarkan Pesan di Baliknya
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#3E2723] leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Arahkan kamera HP ke foto fisik. Suara lembut dan pesan penuh kasih dari Eyang akan langsung terdengar secara otomatis.
              </p>
            </div>

            {/* Solid Pink Primary CTA Button */}
            <div className="pt-1">
              <Link
                to="/scan"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-[#C2185B] hover:bg-[#D64B7A] text-white text-base sm:text-lg font-bold shadow-md shadow-[#C2185B]/25 transition-all duration-200 active:scale-95"
              >
                <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Buka Kamera Sekarang</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                *Tanpa perlu mendaftar atau mengunduh aplikasi tambahan
              </p>
            </div>

            {/* Simple 3 Steps */}
            <div className="pt-6 border-t border-amber-200/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center lg:text-left">
                Tiga Langkah Mudah:
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-left">
                {steps.map((s) => (
                  <div
                    key={s.step}
                    className="p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-amber-200/70 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`w-7 h-7 rounded-lg border ${s.color} flex items-center justify-center font-bold text-xs`}>
                        {s.step}
                      </div>
                      <span className="font-bold text-[#2C2C2C] text-xs sm:text-sm">{s.title}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#3E2723]/80 leading-normal">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Warm Visual Illustration Slideshow */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Soft backdrop glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C2185B]/20 to-amber-200/60 rounded-3xl blur-xl -z-10" />
              
              {/* Animated Slideshow Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white bg-white shadow-xl">
                {eyangSlides.map((slide, idx) => (
                  <div
                    key={slide.src}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      idx === currentSlide
                        ? "opacity-100 scale-100 blur-0"
                        : "opacity-0 scale-105 blur-sm pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-[#2C2C2C]/90 backdrop-blur-md p-3 rounded-xl text-white text-center shadow-lg">
                      <p className="text-xs font-semibold text-amber-100 leading-snug">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Slide indicator dots */}
                <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                  {eyangSlides.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentSlide(dotIdx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        dotIdx === currentSlide
                          ? "w-5 bg-[#C2185B]"
                          : "bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 border-t border-amber-200/60 text-center text-xs text-slate-500">
        <p>© 2026 CritaEyang • Dibuat oleh Aurelie • Didesain Khusus untuk Kenyamanan Semua Usia</p>
      </footer>
    </div>
  );
}

