import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Camera, Volume2, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

const AFRAME_SRC = "https://aframe.io/releases/1.5.0/aframe.min.js";
const MINDAR_SRC =
  "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js";

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset['loaded'] === "true") resolve();
      else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error(src)));
      }
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.addEventListener("load", () => {
      el.dataset['loaded'] = "true";
      resolve();
    });
    el.addEventListener("error", () => reject(new Error(src)));
    document.head.appendChild(el);
  });
}

// 🎵 DAFTAR 9 TARGET & AUDIO MASING-MASING
// Tinggal ganti title & audioSrc sesuai nama file audio 9 orang kamu di folder public/assets/
export const TARGET_LIST = [
  { index: 0, title: "Cerita Orang 1", audioSrc: "/assets/A.mp3", color: "#EC4899" },
  { index: 1, title: "Cerita Orang 2", audioSrc: "/assets/B.mp3", color: "#3B82F6" },
  { index: 2, title: "Cerita Orang 3", audioSrc: "/assets/audio3.mp3", color: "#10B981" },
  { index: 3, title: "Cerita Orang 4", audioSrc: "/assets/audio4.mp3", color: "#F59E0B" },
  { index: 4, title: "Cerita Orang 5", audioSrc: "/assets/audio5.mp3", color: "#8B5CF6" },
  { index: 5, title: "Cerita Orang 6", audioSrc: "/assets/audio6.mp3", color: "#EF4444" },
  { index: 6, title: "Cerita Orang 7", audioSrc: "/assets/audio7.mp3", color: "#06B6D4" },
  { index: 7, title: "Cerita Orang 8", audioSrc: "/assets/audio8.mp3", color: "#84CC16" },
  { index: 8, title: "Cerita Orang 9", audioSrc: "/assets/audio9.mp3", color: "#F97316" },
];

export default function ArScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  const startAr = async () => {
    setError(null);
    setIsInitializing(true);

    try {
      await loadScript(AFRAME_SRC);
      await loadScript(MINDAR_SRC);
      if (!containerRef.current) return;

      const targetsHtml = TARGET_LIST.map(
        (t) => `
        <a-entity class="ar-target-item" data-index="${t.index}" mindar-image-target="targetIndex: ${t.index}">
          <a-box
            position="0 0 0.25"
            scale="0.45 0.45 0.45"
            color="${t.color}"
            material="roughness: 0.3; metalness: 0.8"
            animation="property: rotation; to: 0 360 360; loop: true; dur: 5000; easing: linear"
          ></a-box>
        </a-entity>`
      ).join("");

      containerRef.current.innerHTML = `
        <a-scene
          mindar-image="imageTargetSrc: /targets/targets.mind; uiScanning: no; uiLoading: no; uiError: no; filterMinCF:0.0001; filterBeta: 0.001;"
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded
          style="width:100%;height:100%"
        >
          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
          ${targetsHtml}
        </a-scene>
      `;

      const sceneEl = containerRef.current.querySelector("a-scene");
      sceneEl?.addEventListener("arReady", () => {
        setIsInitializing(false);
      });
      sceneEl?.addEventListener("arError", (err) => {
        console.error("MindAR Error:", err);
        setError("Kamera tidak dapat diakses. Pastikan kamu membuka link ini menggunakan HTTPS atau mengizinkan akses kamera di browser HP.");
        setIsInitializing(false);
      });

      // Fallback jika arReady lambat dipanggil
      setTimeout(() => {
        setIsInitializing(false);
      }, 3500);

      const targetElements = containerRef.current.querySelectorAll(".ar-target-item");

      targetElements.forEach((el) => {
        const idx = parseInt(el.getAttribute("data-index") || "0", 10);
        const targetData = TARGET_LIST.find((t) => t.index === idx);

        el.addEventListener("targetFound", () => {
          stopCurrentAudio();
          if (targetData) {
            setActiveTitle(targetData.title);
            const audio = new Audio(targetData.audioSrc);
            audio.loop = true;
            currentAudioRef.current = audio;
            void audio.play().catch(() => {});
          }
        });

        el.addEventListener("targetLost", () => {
          stopCurrentAudio();
          setActiveTitle(null);
        });
      });
    } catch {
      setError("Kamera gagal diakses atau file targets.mind belum lengkap.");
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    void startAr();

    return () => {
      cancelled = true;
      stopCurrentAudio();
      const scene = document.querySelector("a-scene") as
        | (HTMLElement & { systems?: Record<string, { stop?: () => void }> })
        | null;
      scene?.systems?.["mindar-image-system"]?.stop?.();
      scene?.parentNode?.removeChild(scene);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-950 font-sans select-none">
      {/* Background container for A-Frame Camera */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Top Bar Navigation */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white font-medium text-sm shadow-xl hover:bg-slate-800 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        {activeTitle && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/90 text-white font-medium text-xs shadow-lg animate-pulse">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            <span>Playing Audio</span>
          </div>
        )}
      </div>

      {/* Overlay Frame Guide saat Scanning */}
      {!error && !isInitializing && !activeTitle && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-6">
          <div className="relative w-64 h-64 border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-xl" />
            <Camera className="w-10 h-10 text-white/30 animate-pulse" />
          </div>
        </div>
      )}

      {/* Loading Indicator / Explicit Start Button */}
      {isInitializing && (
        <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
          <h3 className="text-lg font-semibold">Menyiapkan AR Scanner...</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xs mb-6">
            Klik tombol di bawah jika pop-up kamera HP belum muncul secara otomatis
          </p>
          <button
            onClick={async () => {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  video: { facingMode: "environment" },
                });
                // Stop temporary test stream so MindAR takes over smoothly
                stream.getTracks().forEach((track) => track.stop());
                void startAr();
              } catch (err: unknown) {
                const errorObj = err as Error;
                setError(
                  `Izin kamera: ${errorObj.message || "Pastikan membuka via HTTPS / izinkan kamera di browser HP"}`
                );
                setIsInitializing(false);
              }
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-xl active:scale-95 flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            <span>Aktifkan Kamera HP</span>
          </button>
        </div>
      )}

      {/* Error Card */}
      {error && (
        <div className="absolute inset-0 z-30 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-red-400">Kamera Tidak Aktif</h3>
          <p className="text-sm text-slate-300 max-w-xs mt-2 leading-relaxed">{error}</p>
          <button
            onClick={() => void startAr()}
            className="mt-6 px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition shadow-lg active:scale-95 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {/* Bottom Floating Status Banner */}
      {!error && !isInitializing && (
        <div className="absolute bottom-6 left-4 right-4 z-20 pointer-events-none flex justify-center">
          <div
            className={`w-full max-w-sm px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-center ${
              activeTitle
                ? "bg-gradient-to-r from-emerald-600/90 to-teal-600/90 border-emerald-400/30 text-white scale-105"
                : "bg-slate-900/90 border-amber-500/30 text-amber-200"
            }`}
          >
            {activeTitle ? (
              <>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                <span className="font-bold text-base tracking-wide">{activeTitle}</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="font-semibold text-sm">Objek Belum Dikenali (Arahkan ke Gambar Target)</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


