"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { pauseWhenReducedMotion } from "./heroBackgroundMotion.mjs";

export const HeroBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const stopWatchingReducedMotion = pauseWhenReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      () => video.pause(),
    );

    setIsPlaying(!video.paused);

    return stopWatchingReducedMotion;
  }, []);

  const toggleVideoPlayback = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <>
      <div
        className="concepta-hero-background pointer-events-none absolute z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/concepta-hero-poster.jpg')",
          }}
        />

        <video
          ref={videoRef}
          className="concepta-hero-video absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/concepta-hero-poster.jpg"
          tabIndex={-1}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/assets/concepta-hero.mp4" type="video/mp4" />
        </video>

        <div
          className="concepta-hero-filter absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(42, 89, 255, 0.09), rgba(7, 27, 94, 0.14))",
          }}
        />

        {/* Keep the copy legible while preserving the movement and aqua detail. */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(90deg, rgba(5, 4, 10, 0.9) 0%, rgba(5, 4, 10, 0.64) 48%, rgba(5, 4, 10, 0.25) 100%)",
              "radial-gradient(circle at 72% 24%, rgba(58, 91, 255, 0.24) 0%, rgba(58, 91, 255, 0.08) 38%, transparent 66%)",
              "linear-gradient(180deg, rgba(5, 4, 10, 0.06) 0%, rgba(7, 11, 28, 0.2) 56%, #070b1c 100%)",
            ].join(", "),
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: [
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <button
        type="button"
        className="concepta-hero-video-control"
        onClick={toggleVideoPlayback}
        aria-label="Background motion"
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <Pause aria-hidden="true" size={16} strokeWidth={2} />
        ) : (
          <Play aria-hidden="true" size={16} strokeWidth={2} />
        )}
      </button>

      <style jsx>{`
        .concepta-hero-background {
          left: 50%;
          top: -96px;
          width: 100vw;
          height: max(980px, 115svh);
          max-height: 1100px;
          transform: translateX(-50%);
          background: #05040a;
          -webkit-mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 62%,
            rgba(0, 0, 0, 0.82) 72%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 62%,
            rgba(0, 0, 0, 0.82) 72%,
            transparent 100%
          );
        }

        .concepta-hero-video {
          opacity: 0.78;
        }

        .concepta-hero-video-control {
          position: absolute;
          z-index: 20;
          top: 80px;
          right: max(16px, calc((100vw - 1024px) / 2 + 32px));
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.78);
          background: rgba(5, 4, 10, 0.58);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .concepta-hero-video-control:hover {
          border-color: rgba(0, 235, 188, 0.58);
          color: #fff;
          background: rgba(5, 4, 10, 0.78);
        }

        .concepta-hero-video-control:focus-visible {
          outline: 2px solid #00ebbc;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .concepta-hero-video {
            display: none;
          }

          .concepta-hero-video-control {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
