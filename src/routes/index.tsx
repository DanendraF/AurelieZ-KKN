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
    desc: "Klik tombol merah muda diatas untuk membuka kamera HP.",
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
    caption: "“Setiap foto menyimpan rindu dan cerita yang tak pernah pudar.”",
  },
  {
    src: "/assets/hero_story_2.jpg",
    caption: "“Suara Eyang selalu menjadi kehangatan yang paling menenangkan.”",
  },
  {
    src: "/assets/hero_story_3.jpg",
    caption: "“Keluarga adalah rumah tempat kenangan indah selalu hidup.”",
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
        <div className="absolute top-12 left-10 text-[#C2185B]/25 animate-float-1">
          <Heart className="w-9 h-9 rotate-12 fill-[#C2185B]/10" />
        </div>
        <div className="absolute top-1/4 right-12 text-amber-400/35 animate-float-2">
          <Music className="w-9 h-9 -rotate-12" />
        </div>
        <div className="absolute bottom-1/3 left-16 text-[#C2185B]/20 animate-float-3">
          <ImageIcon className="w-10 h-10 rotate-6" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-amber-500/25 animate-float-1">
          <Sun className="w-10 h-10" />
        </div>
        <div className="absolute bottom-12 left-1/3 text-[#C2185B]/30 animate-float-2">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute top-16 left-1/2 text-rose-400/30 animate-float-3">
          <Heart className="w-6 h-6" />
        </div>
      </div>

      {/* Subtle Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5d8d0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#C2185B]/10 via-amber-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 py-5 px-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/CeritaEyangLogo.png"
            alt="CeritaEyang Logo"
            className="h-9 w-auto object-contain rounded-xl"
          />
          <span className="text-xl font-black tracking-tight text-[#2C2C2C]">
            Crita<span className="text-[#C2185B]">Eyang</span> 🌸
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-semibold px-3.5 py-1 bg-[#C2185B]/10 border border-[#C2185B]/20 text-[#C2185B] rounded-full shadow-sm">
            Oleh Aurelie
          </span>
          <img src="/assets/LOGO_UNIT_3.png" alt="Logo Unit 3" className="h-8 w-auto object-contain" />
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-2 pb-14">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C2185B]/10 border border-[#C2185B]/20 text-[#C2185B] font-semibold text-xs shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Cara Baru Mengenang
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#2C2C2C] leading-tight tracking-tight">
                Pindai Foto,<br />
                <span className="text-[#C2185B]">Dengarkan Pesan</span> di Baliknya
              </h1>
              <p className="text-base text-[#3E2723]/80 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Nyalakan kamera, arahkan ke foto fisik Eyang, dan saksikan fotonya bercerita. Suara mereka akan menemani setiap kenangan indah.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/scan"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#C2185B] text-white font-bold rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Camera className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Mulai Pindai Foto Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Steps & Illustration Slide */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/50">
              <h2 className="text-sm font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C2185B]" /> Cara Kerja
              </h2>
              <div className="space-y-3">
                {steps.map((s, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#2C2C2C]">{s.title}</h3>
                      <p className="text-[#3E2723]/70 text-xs font-medium leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-sm border border-white/50 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50">
                {eyangSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      idx === currentSlide ? "opacity-100 scale-100 blur-none z-10" : "opacity-0 scale-105 blur-sm z-0"
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={`Cerita Eyang Illustration ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-xs sm:text-sm font-medium leading-relaxed italic text-shadow-sm drop-shadow-md">
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
      <footer className="relative z-10 py-6 border-t border-amber-200/60 flex flex-col items-center justify-center gap-3 text-center text-xs text-slate-500">
        <img src="/assets/UII (Background Terang).png" alt="Logo UII" className="h-10 w-auto opacity-80 mix-blend-multiply" />
        <p>© 2026 CritaEyang • Dibuat oleh Aurelie • Didesain Khusus untuk Kenyamanan Semua Usia</p>
      </footer>
    </div>
  );
}
