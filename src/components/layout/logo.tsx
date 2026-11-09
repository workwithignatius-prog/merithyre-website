import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/cn";
import {
  LOCKUP,
  M_ICON,
  M_ICON_TRANSFORM,
  M_SMALL,
  M_SMALL_TRANSFORM,
  M_TINY,
  TICK,
  TICK_ROUND,
  WORD,
} from "./logo-paths";

const GOLD = "#f4ae45";
const TICK_GREEN = "#0f4a27";
const MERIT = "#f3f2ee";
const HYRE = "#34e39c";

/** SVG ids must be unique per instance and safe inside url(#…). */
function useSvgId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, "");
}

function TileGradient({ id }: { id: string }) {
  return (
    <radialGradient id={id} cx="28%" cy="18%" r="90%">
      <stop offset="0" stopColor="#1e8049" />
      <stop offset="0.55" stopColor="#166534" />
      <stop offset="1" stopColor="#11532b" />
    </radialGradient>
  );
}

function SealGradient({ id }: { id: string }) {
  return (
    <radialGradient id={id} cx="34%" cy="28%" r="80%">
      <stop offset="0" stopColor="#ffd98f" />
      <stop offset="0.6" stopColor={GOLD} />
      <stop offset="1" stopColor="#e39628" />
    </radialGradient>
  );
}

/**
 * The app icon in a 64-unit box. Its detail follows the size it is shown at:
 * a plain gold dot at 36 px and below (a tick would blur), a rounder tick up
 * to 63 px, and the lit tile with the calligraphic tick from 64 px.
 */
function IconArt({ px, uid }: { px: number; uid: string }) {
  if (px <= 36) {
    return (
      <>
        <rect width="64" height="64" rx="16" fill="#166534" />
        <path transform={M_SMALL_TRANSFORM} d={px <= 20 ? M_TINY : M_SMALL} fill="#fff" />
        <circle cx="52.8" cy="39.1" r={px <= 20 ? 6.6 : 5.6} fill={GOLD} />
      </>
    );
  }
  const full = px >= 64;
  return (
    <>
      <rect width="64" height="64" rx="15.2" fill={`url(#${uid}-tile)`} />
      <path transform={M_ICON_TRANSFORM} d={M_ICON} fill="#fff" />
      <g transform="translate(45.3 30.5) scale(0.6)">
        <circle cx="12" cy="12" r="12" fill={full ? `url(#${uid}-seal)` : GOLD} />
        {full ? (
          <>
            <circle cx="12" cy="12" r="11.3" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.6" />
            <path d={TICK} fill={TICK_GREEN} />
          </>
        ) : (
          <path d={TICK_ROUND} fill="none" stroke={TICK_GREEN} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </g>
    </>
  );
}

/** The merithyre. app icon on its own. */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  const uid = useSvgId();
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 64 64" className={cn("shrink-0", className)}>
      {size > 36 && (
        <defs>
          <TileGradient id={`${uid}-tile`} />
          <SealGradient id={`${uid}-seal`} />
        </defs>
      )}
      <IconArt px={size} uid={uid} />
    </svg>
  );
}

const WORD_AT = `translate(${LOCKUP.icon + LOCKUP.gap} ${LOCKUP.baseline})`;

/**
 * Icon + name, linking home. Hovering or focusing it sends a band of light
 * across the logo (styles: .logo-sweep in globals.css).
 */
export function Logo({ height = 32, className }: { height?: number; className?: string }) {
  const uid = useSvgId();
  const iconPx = height;
  const tileRx = (iconPx <= 36 ? 16 : 15.2) * (LOCKUP.icon / 64);
  const seal = { x: LOCKUP.icon + LOCKUP.gap + WORD.sealX + WORD.seal / 2, y: LOCKUP.baseline - WORD.seal / 2 };
  return (
    <Link
      href="/"
      aria-label="MeritHyre home"
      className={cn("group inline-flex shrink-0 items-center rounded-lg", className)}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${LOCKUP.width} ${LOCKUP.height}`}
        height={height}
        width={Math.round((height * LOCKUP.width) / LOCKUP.height)}
        className="block"
      >
        <defs>
          {iconPx > 36 && <TileGradient id={`${uid}-tile`} />}
          <SealGradient id={`${uid}-seal`} />
          <linearGradient id={`${uid}-band`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.32" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="0.68" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${uid}-clip`}>
            <rect width={LOCKUP.icon} height={LOCKUP.icon} rx={tileRx} />
            <path transform={WORD_AT} d={WORD.merit} />
            <path transform={WORD_AT} d={WORD.hyre} />
            <circle cx={seal.x} cy={seal.y} r={WORD.seal / 2} />
          </clipPath>
        </defs>

        <g transform={`scale(${LOCKUP.icon / 64})`}>
          <IconArt px={iconPx} uid={uid} />
        </g>
        <g transform={WORD_AT}>
          <path d={WORD.merit} fill={MERIT} />
          <path d={WORD.hyre} fill={HYRE} />
          <g transform={`translate(${WORD.sealX} ${-WORD.seal}) scale(${WORD.seal / 24})`}>
            <circle cx="12" cy="12" r="12" fill={`url(#${uid}-seal)`} />
            <circle cx="12" cy="12" r="11.3" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.6" />
            <path d={TICK} fill={TICK_GREEN} />
          </g>
        </g>

        <g clipPath={`url(#${uid}-clip)`}>
          <g transform="skewX(-22)">
            <rect className="logo-sweep" x="0" y="-20" width="70" height="150" fill={`url(#${uid}-band)`} />
          </g>
        </g>
      </svg>
    </Link>
  );
}

/**
 * The name as a thin outline, for the foot of the page. Cropped just below the
 * baseline so it sits on the edge; only the tail of the y runs off.
 */
export function LogoOutline({ className }: { className?: string }) {
  const uid = useSvgId();
  const { x, y, width } = WORD.box;
  const pad = 2;
  const bottom = 4;
  return (
    <svg
      aria-hidden
      viewBox={`${x - pad} ${y - pad} ${width + pad * 2} ${bottom - (y - pad)}`}
      className={cn("block h-auto w-full", className)}
    >
      <defs>
        <linearGradient id={`${uid}-fade`} gradientUnits="userSpaceOnUse" x1="0" y1={y} x2="0" y2={bottom}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${uid}-fade)`} strokeWidth="1" strokeLinejoin="round">
        <path d={WORD.mono} vectorEffect="non-scaling-stroke" />
        <circle
          cx={WORD.sealX + WORD.seal / 2}
          cy={-WORD.seal / 2}
          r={WORD.seal / 2}
          vectorEffect="non-scaling-stroke"
        />
        <path d={WORD.tick} vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
