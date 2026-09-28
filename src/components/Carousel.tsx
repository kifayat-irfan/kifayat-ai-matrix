"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Swipable cover-flow style carousel. Touch + drag + arrow keys.
 * Auto-advances only when the user is idle and not hovering.
 */
export default function Carousel({
  slides,
  alt,
  aspect = "9 / 16",
  autoPlayMs = 5000,
}: {
  slides: string[];
  alt: string;
  aspect?: string;
  autoPlayMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback(
    (dir: number) => setIdx((i) => (i + dir + n) % n),
    [n]
  );

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  }

  return (
    <figure
      role="region"
      aria-label={`${alt} carousel — ${idx + 1} of ${n}`}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group/carousel relative mx-auto w-full max-w-[340px] select-none overflow-hidden rounded-2xl border border-matrix-cyan/20 bg-matrix-panel shadow-lg shadow-black/40 focus-visible:ring-2 focus-visible:ring-matrix-cyan"
      style={{ aspectRatio: aspect }}
    >
      {/* Slider track */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(calc(${-idx * 100}% + ${drag}px))`,
        }}
      >
        {slides.map((src, i) => (
          <div key={i} className="h-full w-full flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} slide ${i + 1}`}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Swipe hint (first slide only) */}
      {idx === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center">
          <span className="animate-pulse rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] text-slate-200 backdrop-blur-sm">
            ← swipe →
          </span>
        </div>
      )}

      <figcaption className="absolute inset-0">
        {/* Arrows */}
        {n > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-md bg-black/45 p-2 text-lg text-white opacity-0 transition-opacity hover:bg-matrix-cyan hover:text-black focus-visible:opacity-100 group-hover/carousel:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-md bg-black/45 p-2 text-lg text-white opacity-0 transition-opacity hover:bg-matrix-cyan hover:text-black focus-visible:opacity-100 group-hover/carousel:opacity-100"
            >
              ›
            </button>
          </>
        )}

        {/* Counter */}
        <span className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[11px] text-slate-100 backdrop-blur-sm">
          {idx + 1}/{n}
        </span>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === idx}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx
                  ? "w-5 bg-matrix-cyan"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </figcaption>

      {/* Touch / pointer drag */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        onTouchStart={(e) => {
          start.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchMove={(e) => {
          if (start.current !== null) setDrag(e.touches[0].clientX - start.current);
        }}
        onTouchEnd={() => {
          if (drag < -60) go(1);
          else if (drag > 60) go(-1);
          start.current = null;
          setDrag(0);
        }}
        onMouseDown={(e) => {
          start.current = e.clientX;
          setPaused(true);
        }}
        onMouseMove={(e) => {
          if (start.current !== null) setDrag(e.clientX - start.current);
        }}
        onMouseUp={() => {
          if (start.current !== null) {
            if (drag < -60) go(1);
            else if (drag > 60) go(-1);
          }
          start.current = null;
          setDrag(0);
          setPaused(false);
        }}
      />

      {/* Auto-advance */}
      <AutoAdvance paused={paused || n <= 1} delay={autoPlayMs} onTick={() => go(1)} />
    </figure>
  );
}

function AutoAdvance({
  paused,
  delay,
  onTick,
}: {
  paused: boolean;
  delay: number;
  onTick: () => void;
}) {
  const saved = useRef(onTick);
  useEffect(() => {
    saved.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => saved.current(), delay);
    return () => window.clearInterval(id);
  }, [paused, delay]);

  return null;
}
