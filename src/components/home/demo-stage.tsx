"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { SceneDecide, SceneInterview, SceneRank, SceneSource } from "./demo-scenes";

const chapters = [
  { label: "Source", Scene: SceneSource },
  { label: "Screen & rank", Scene: SceneRank },
  { label: "AI interview", Scene: SceneInterview },
  { label: "Your call", Scene: SceneDecide },
];
const CHAPTER_MS = 4800;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Hero "product demo video" block. Until a real video is configured in
 * site.demoVideo it plays a silent four-step product preview; the play button
 * opens the video (or a "coming soon" note) in a dialog.
 */
export function DemoStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const running = !paused && !hovering && !reducedMotion;
  const { src, embedUrl } = site.demoVideo;
  const hasVideo = Boolean(src || embedUrl);

  const openVideo = () => {
    setVideoOpen(true);
    dialogRef.current?.showModal();
  };
  const closeVideo = () => {
    dialogRef.current?.close();
  };

  return (
    <div>
      <div
        className="bg-backdrop relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_50px_120px_-50px_rgb(0_0_0/0.9)] sm:aspect-[16/13]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgb(0_0_0/0.55),transparent_60%)]" />

        {chapters.map(({ label, Scene }, i) => (
          <div
            key={label}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-x-4 bottom-[88px] top-4 flex items-center justify-center transition-[opacity,transform] duration-500 ease-out sm:inset-x-10 sm:bottom-[92px] sm:top-6",
              i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
            )}
          >
            <Scene />
          </div>
        ))}

        <button
          type="button"
          onClick={openVideo}
          className="group absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/55 py-1.5 pl-1.5 pr-5 text-left backdrop-blur-md transition-colors hover:bg-black/70 sm:bottom-5 sm:left-5"
        >
          <span className="grid size-11 place-items-center rounded-full bg-white text-[#0b0b0c] transition-transform duration-200 group-hover:scale-105">
            <Play aria-hidden className="ml-0.5 size-4 fill-current" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">Watch the product demo</span>
            <span className="block text-xs text-white/70">A real role, job post to shortlist</span>
          </span>
        </button>
      </div>

      {/* chapter progress */}
      <div className="mt-5 grid grid-cols-4 gap-2" aria-hidden>
        {chapters.map((c, i) => (
          <span key={c.label} className="h-[3px] overflow-hidden rounded-full bg-white/15">
            {i < active && <span className="block h-full w-full bg-white/70" />}
            {i === active && (
              <span
                key={`fill-${active}`}
                className={cn("block h-full w-full bg-white", reducedMotion ? "" : "chapter-fill")}
                style={{ ["--chapter-ms" as string]: `${CHAPTER_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                onAnimationEnd={() => setActive((a) => (a + 1) % chapters.length)}
              />
            )}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play preview" : "Pause preview"}
          className="grid size-10 place-items-center rounded-full border border-white/15 text-fg transition-colors hover:bg-white/[0.06]"
        >
          {paused || reducedMotion ? <Play aria-hidden className="ml-0.5 size-3.5 fill-current" /> : <Pause aria-hidden className="size-3.5 fill-current" />}
        </button>
        {chapters.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
              i === active ? "border-white bg-white text-[#0b0b0c]" : "border-white/15 text-fg hover:border-white/30",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-subtle">Preview with sample data. Tap a step to jump ahead.</p>

      <dialog
        ref={dialogRef}
        onClose={() => setVideoOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeVideo();
        }}
        className="m-auto w-[min(960px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-white/10 bg-[#0e0f11] p-0 text-fg backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <p className="text-sm font-medium">MeritHyre product demo</p>
          <button type="button" onClick={closeVideo} aria-label="Close video" className="grid size-9 place-items-center rounded-full hover:bg-white/[0.06]">
            <X aria-hidden className="size-4" />
          </button>
        </div>
        {hasVideo ? (
          <div className="aspect-video bg-black">
            {videoOpen &&
              (embedUrl ? (
                <iframe
                  src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
                  title="MeritHyre product demo"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="size-full"
                />
              ) : (
                <video src={src} controls autoPlay playsInline className="size-full" />
              ))}
          </div>
        ) : (
          <div className="bg-backdrop relative px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 bg-black/45" />
            <div className="relative">
              <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-white">The demo video is in the edit.</p>
              <p className="mx-auto mt-3 max-w-md text-white/80">
                Rather see it live? We&apos;ll run one of your real roles through MeritHyre in 30 minutes.
              </p>
              <ButtonLink href={site.demoHref} size="lg" arrow className="mt-8" onClick={closeVideo}>
                Book a live demo
              </ButtonLink>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
