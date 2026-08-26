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

// 🎨 🎵 DAFTAR 9 TARGET (BISA MEMUTAR DARI TENGAH LAGU)
export const TARGET_LIST = [
  {
    index: 0,
    title: "Animal - KATSEYE",
    audioSrc: "/assets/Animal.mp3",
    startTime: 45,
    duration: 60,
    flowerLeft: "🌸",
    flowerRight: "🌷",
    loveIcon: "💖",
  },
  {
    index: 1,
    title: "About You - The 1975",
    audioSrc: "/assets/About You.mp3",
    startTime: 60,
    duration: 60,
    flowerLeft: "🌹",
    flowerRight: "🌺",
    loveIcon: "💕",
  },
  {
    index: 2,
    title: "Backburner - NIKI",
    audioSrc: "/assets/Backburner.mp3",
    startTime: 50,
    duration: 60,
    flowerLeft: "🌻",
    flowerRight: "🌼",
    loveIcon: "💗",
  },
  {
    index: 3,
    title: "December - Neck Deep",
    audioSrc: "/assets/December.mp3",
    startTime: 40,
    duration: 60,
    flowerLeft: "🪻",
    flowerRight: "🌸",
    loveIcon: "💓",
  },
  {
    index: 4,
    title: "Die With A Smile - Lady Gaga & Bruno Mars",
    audioSrc: "/assets/Die With A Smile.mp3",
    startTime: 65,
    duration: 60,
    flowerLeft: "🌺",
    flowerRight: "🌷",
    loveIcon: "❤️",
  },
  {
    index: 5,
    title: "Famous Last Words - My Chemical Romance",
    audioSrc: "/assets/Famous Last Words.mp3",
    startTime: 55,
    duration: 60,
    flowerLeft: "🌷",
    flowerRight: "🌻",
    loveIcon: "💖",
  },
  {
    index: 6,
    title: "Payphone - Maroon 5",
    audioSrc: "/assets/Payphone.mp3",
    startTime: 30,
    duration: 60,
    flowerLeft: "🌼",
    flowerRight: "🌹",
    loveIcon: "💘",
  },
  {
    index: 7,
    title: "Sailor Song - Gigi Perez",
    audioSrc: "/assets/Sailor Song.mp3",
    startTime: 45,
    duration: 60,
    flowerLeft: "🌸",
    flowerRight: "🪻",
    loveIcon: "💝",
  },
  {
    index: 8,
    title: "Tanpa Cinta - Yovie & Nuno",
    audioSrc: "/assets/Tanpa Cinta.mp3",
    startTime: 50,
    duration: 60,
    flowerLeft: "🌹",
    flowerRight: "🌸",
    loveIcon: "💞",
  },
  {
    index: 9,
    title: "Ibu Rosalia",
    audioSrc: "/assets/buRosalia.mp3",
    startTime: 0,
    duration: 60,
    flowerLeft: "🌹",
    flowerRight: "🌺",
    loveIcon: "💖",
  },
];

export default function ArScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioTimeUpdateHandlerRef = useRef<(() => void) | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activeTargetIndex, setActiveTargetIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const activeTarget = activeTargetIndex !== null ? TARGET_LIST.find(t => t.index === activeTargetIndex) : null;

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      if (audioTimeUpdateHandlerRef.current) {
        currentAudioRef.current.removeEventListener("timeupdate", audioTimeUpdateHandlerRef.current);
        audioTimeUpdateHandlerRef.current = null;
      }
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  const startAr = async () => {
    setError(null);
    setIsInitializing(true);

    // Tandai bahwa permission sudah diberikan untuk 7 hari (7 * 24 * 60 * 60 * 1000 ms)
    try {
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem("critaeyang_cam_granted", (Date.now() + SEVEN_DAYS_MS).toString());
    } catch {}

    try {
      await loadScript(AFRAME_SRC);
      await loadScript(MINDAR_SRC);
      if (!containerRef.current) return;

      const targetsHtml = TARGET_LIST.map((t) => {
        // 1. Jika ada model 3D nyata (file .glb / .gltf / .obj)
        if (t.model3d) {
          const isObj = t.model3d.endsWith(".obj");
          return `
          <a-entity class="ar-target-item" data-index="${t.index}" mindar-image-target="targetIndex: ${t.index}">
            <${isObj ? "a-obj-model" : "a-gltf-model"}
              src="${t.model3d}"
              position="0 0 0.2"
              scale="0.3 0.3 0.3"
              animation="${t.animation}"
            ></${isObj ? "a-obj-model" : "a-gltf-model"}>
          </a-entity>`;
        }

        // 2. Jika ada imageOverlay (foto / PNG / GIF)
        if (t.imageOverlay) {
          return `
          <a-entity class="ar-target-item" data-index="${t.index}" mindar-image-target="targetIndex: ${t.index}">
            <a-image
              src="${t.imageOverlay}"
              position="0 0 0.1"
              scale="0.8 0.8 0.8"
              animation="${t.animation}"
            ></a-image>
          </a-entity>`;
        }

        // 3. Tanpa 3D shape/geometri bawaan (hanya trigger deteksi target & putar audio + filter partikel bunga)
        return `
        <a-entity class="ar-target-item" data-index="${t.index}" mindar-image-target="targetIndex: ${t.index}">
        </a-entity>`;
      }).join("");

      containerRef.current.innerHTML = `
        <a-scene
          mindar-image="imageTargetSrc: /targets/targets.mind; uiScanning: no; uiLoading: no; uiError: no; filterMinCF:0.0001; filterBeta: 0.001;"
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights, alpha: true"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded
          style="width:100%;height:100%;background:transparent;"
        >
          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
          ${targetsHtml}
        </a-scene>
      `;

      const sceneEl = containerRef.current.querySelector("a-scene");
      const fixVideoBounds = () => {
        const video = document.querySelector("video");
        if (video) {
          video.style.position = "absolute";
          video.style.top = "0";
          video.style.left = "0";
          video.style.width = "100%";
          video.style.height = "100%";
          video.style.objectFit = "cover";
          video.style.opacity = "1";
          video.style.zIndex = "1";
        }
        const canvas = containerRef.current?.querySelector("canvas");
        if (canvas) {
          canvas.style.position = "absolute";
          canvas.style.top = "0";
          canvas.style.left = "0";
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.objectFit = "cover";
        }
      };

      sceneEl?.addEventListener("arReady", () => {
        setIsInitializing(false);
        fixVideoBounds();
      });
      sceneEl?.addEventListener("arError", (err) => {
        console.error("MindAR Error:", err);
        setError("Kamera tidak dapat diakses. Pastikan kamu membuka link ini menggunakan HTTPS atau mengizinkan akses kamera di browser HP.");
        setIsInitializing(false);
      });

      // Fallback jika arReady lambat dipanggil
      setTimeout(() => {
        setIsInitializing(false);
        fixVideoBounds();
      }, 2500);

      // Auto trigger jika dibuka via QR Code spesifik target (misal /scan?target=1)
      const urlParams = new URLSearchParams(window.location.search);
      const targetParam = urlParams.get("target");

      if (targetParam !== null) {
        const targetIndexFromUrl = parseInt(targetParam, 10);
        const autoTargetData = TARGET_LIST.find((t) => t.index === targetIndexFromUrl);
        if (autoTargetData) {
          setActiveTitle(autoTargetData.title);
          const audio = new Audio(autoTargetData.audioSrc);
          const startSec = autoTargetData.startTime || 0;
          const playDur = autoTargetData.duration || 60;

          currentAudioRef.current = audio;

          const handleTimeUpdate = () => {
            if (audio.currentTime >= startSec + playDur) {
              audio.currentTime = startSec;
            }
          };

          audioTimeUpdateHandlerRef.current = handleTimeUpdate;
          audio.addEventListener("timeupdate", handleTimeUpdate);

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                if (startSec > 0 && Math.abs(audio.currentTime - startSec) > 2) {
                  audio.currentTime = startSec;
                }
              })
              .catch(() => {});
          }
        }
      }

      const targetElements = containerRef.current.querySelectorAll(".ar-target-item");

      targetElements.forEach((el) => {
        const idx = parseInt(el.getAttribute("data-index") || "0", 10);
        const targetData = TARGET_LIST.find((t) => t.index === idx);

        el.addEventListener("targetFound", () => {
          stopCurrentAudio();
          if (targetData) {
            setActiveTitle(targetData.title);
            setActiveTargetIndex(targetData.index);
            const audio = new Audio(targetData.audioSrc);
            const startSec = targetData.startTime || 0;
            const playDur = targetData.duration || 60;

            currentAudioRef.current = audio;

            const handleTimeUpdate = () => {
              if (audio.currentTime >= startSec + playDur) {
                audio.currentTime = startSec;
              }
            };

            audioTimeUpdateHandlerRef.current = handleTimeUpdate;
            audio.addEventListener("timeupdate", handleTimeUpdate);

            // Play audio first, then seek to startTime once ready
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  if (startSec > 0 && Math.abs(audio.currentTime - startSec) > 2) {
                    audio.currentTime = startSec;
                  }
                })
                .catch((err) => {
                  console.warn("Autoplay audio blocked or error:", err);
                });
            }
          }
        });

        el.addEventListener("targetLost", () => {
          stopCurrentAudio();
          setActiveTitle(null);
          setActiveTargetIndex(null);
        });
      });
    } catch {
      setError("Kamera gagal diakses atau file targets.mind belum lengkap.");
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const initCamWithPermissionCheck = async () => {
      try {
        const storedExpiry = localStorage.getItem("critaeyang_cam_granted");
        const expiryTime = storedExpiry ? parseInt(storedExpiry, 10) : 0;

        // Jika izin pernah diberikan dan belum lewat 7 hari
        if (expiryTime > Date.now()) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch {}

      if (!cancelled) {
        void startAr();
      }
    };

    void initCamWithPermissionCheck();

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
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-[#C2185B] rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-[#C2185B] rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-[#C2185B] rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-[#C2185B] rounded-br-xl" />
            <Camera className="w-10 h-10 text-white/30 animate-pulse" />
          </div>
        </div>
      )}

      {/* Loading Indicator / Explicit Start Button */}
      {isInitializing && (
        <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <RefreshCw className="w-10 h-10 text-[#C2185B] animate-spin mb-4" />
          <h3 className="text-lg font-semibold">Menyiapkan Kamera CritaEyang...</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xs mb-6">
            Klik tombol di bawah jika pop-up kamera HP belum muncul secara otomatis
          </p>
          <button
            onClick={async () => {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  video: { facingMode: "environment" },
                });
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
            className="px-6 py-3 rounded-full bg-[#C2185B] hover:bg-[#D64B7A] text-white font-bold text-sm shadow-xl active:scale-95 flex items-center gap-2"
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
            className="mt-6 px-6 py-2.5 rounded-full bg-[#C2185B] hover:bg-[#D64B7A] text-white font-semibold text-sm transition shadow-lg active:scale-95 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {/* Minimalist Corner Flower & Heart Accent saat Target Terdeteksi */}
      {activeTitle && (
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {/* Subtle Bunga + Love Kiri Bawah */}
          <div className="absolute bottom-20 left-4 text-white animate-fade-in">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-medium">
              <span className="animate-spin" style={{ animationDuration: "9s" }}>
                {activeTarget?.flowerLeft || "🌸"}
              </span>
              <span>{activeTarget?.loveIcon || "💖"}</span>
              <span className="text-white/80">Memutar Pesan</span>
            </div>
          </div>

          {/* Subtle Bunga Kanan Bawah */}
          <div className="absolute bottom-20 right-4 text-white animate-fade-in">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-medium">
              <span>{activeTarget?.loveIcon || "💖"}</span>
              <span className="animate-spin" style={{ animationDuration: "8s" }}>
                {activeTarget?.flowerRight || "🌺"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Minimalist Bottom Status Banner */}
      {!error && !isInitializing && (
        <div className="absolute bottom-6 left-4 right-4 z-20 pointer-events-none flex justify-center">
          <div
            className={`px-5 py-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-center ${
              activeTitle
                ? "bg-[#C2185B]/90 border-[#C2185B]/40 text-white"
                : "bg-black/60 border-white/20 text-white/90"
            }`}
          >
            {activeTitle ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-200 animate-pulse" />
                <span className="font-semibold text-xs sm:text-sm tracking-wide">{activeTitle}</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 text-amber-300" />
                <span className="font-medium text-xs sm:text-sm">Arahkan kamera ke foto target</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


