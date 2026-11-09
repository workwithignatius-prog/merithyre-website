"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { agencyPlan, inHousePlans, type Plan } from "@/content/pricing";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "agency", label: "Staffing agencies" },
  { id: "inhouse", label: "In-house teams" },
] as const;
type TabId = (typeof tabs)[number]["id"];

function PlanCard({ plan, dark }: { plan: Plan; dark?: boolean }) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[22px] border p-7 sm:p-8",
        plan.featured
          ? "border-mh-400/40 bg-[linear-gradient(180deg,rgb(52_227_156/0.09),rgb(255_255_255/0.015)_45%)] shadow-[0_0_60px_-20px_rgb(52_227_156/0.5)]"
          : dark
            ? "border-white/10 bg-[linear-gradient(180deg,rgb(255_255_255/0.05),rgb(255_255_255/0.01))]"
            : "border-white/10 bg-white/[0.02]",
      )}
    >
      {plan.tag && (
        <span className="absolute -top-3 left-7 rounded-full bg-mh-400 px-3 py-1 text-[11px] font-semibold text-[#03140b]">{plan.tag}</span>
      )}
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-fg">{plan.name}</h3>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="text-[52px] font-semibold leading-none tracking-[-0.05em] text-fg">${plan.price}</span>
        <span className="text-sm text-muted">{plan.unit}</span>
      </p>
      <p className="mt-4 min-h-[44px] text-[15px] leading-relaxed text-muted">{plan.blurb}</p>
      <ButtonLink
        href={`${site.demoHref}&plan=${plan.segment}`}
        variant={plan.featured || dark ? "primary" : "secondary"}
        className="mt-6 w-full"
        arrow={plan.featured || dark}
      >
        {plan.cta}
      </ButtonLink>
      <ul className="mt-8 space-y-3 border-t border-white/[0.07] pt-7">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[15px] leading-snug text-fg/90">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-mh-400" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SeatCalculator() {
  const [seats, setSeats] = useState(5);
  const total = seats * agencyPlan.price;
  const pct = ((seats - 1) / 49) * 100;
  return (
    <div className="flex flex-col rounded-[22px] border border-white/10 bg-white/[0.02] p-7 sm:p-8">
      <label htmlFor="seats" className="text-lg font-semibold tracking-[-0.02em] text-fg">
        How many recruiters on your desk?
      </label>
      <div className="mt-7 flex items-center gap-4">
        <input
          id="seats"
          type="range"
          min={1}
          max={50}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          aria-describedby="seat-total"
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full accent-mh-400 [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-mh-400 [&::-moz-range-thumb]:bg-canvas [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-mh-400 [&::-webkit-slider-thumb]:bg-canvas [&::-webkit-slider-thumb]:shadow-[0_0_14px_rgb(52_227_156/0.7)]"
          style={{ background: `linear-gradient(90deg, #34e39c ${pct}%, rgb(255 255 255 / 0.1) ${pct}%)` }}
        />
        <output htmlFor="seats" className="grid h-10 min-w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-base font-semibold tabular-nums text-fg">
          {seats}
        </output>
      </div>
      <div id="seat-total" aria-live="polite" className="mt-8 rounded-2xl border border-mh-400/25 bg-mh-400/[0.07] p-6">
        <p className="text-gradient-brand text-[46px] font-semibold leading-none tracking-[-0.05em] tabular-nums">
          ${total.toLocaleString("en-US")}
        </p>
        <p className="mt-2 text-sm text-muted">
          per month · ${agencyPlan.price} × {seats} recruiter{seats === 1 ? "" : "s"}
        </p>
      </div>
      <ul className="mt-7 flex-1 space-y-2.5 text-[15px] text-fg/90">
        {["No long-term contract", "Setup in under a day", "Bigger desk? Ask about enterprise volume pricing"].map((t) => (
          <li key={t} className="flex gap-3">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-mh-400" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingTabs() {
  const [tab, setTab] = useState<TabId>("agency");

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="flex justify-center">
        <div role="tablist" aria-label="Pricing for" className="relative grid grid-cols-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-mh-400 shadow-[0_8px_30px_-8px_rgb(52_227_156/0.8)] transition-transform duration-300",
              tab === "inhouse" && "translate-x-full",
            )}
          />
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next = tab === "agency" ? "inhouse" : "agency";
                  setTab(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
              tabIndex={tab === t.id ? 0 : -1}
              className={cn(
                "relative z-10 h-10 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors sm:px-6",
                tab === t.id ? "text-[#03140b]" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div id="panel-agency" role="tabpanel" aria-labelledby="tab-agency" hidden={tab !== "agency"} className="mt-12">
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <PlanCard plan={agencyPlan} dark />
          <SeatCalculator />
        </div>
      </div>

      <div id="panel-inhouse" role="tabpanel" aria-labelledby="tab-inhouse" hidden={tab !== "inhouse"} className="mt-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {inHousePlans.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-subtle">Prices in USD · <span className="whitespace-nowrap">No per-role or per-hire fees</span> · <span className="whitespace-nowrap">No long-term contract</span></p>
    </div>
  );
}
