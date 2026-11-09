export function Stats({ items }: { items: readonly { value: string; label: string }[] }) {
  return (
    <dl className="reveal grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-panel lg:grid-cols-4">
      {items.map((s, i) => (
        <div
          key={s.label}
          className={[
            "p-6 sm:p-8",
            i % 2 === 1 ? "border-l border-white/[0.07]" : "",
            i >= 2 ? "border-t border-white/[0.07] lg:border-t-0" : "",
            i === 2 ? "lg:border-l" : "",
          ].join(" ")}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-[clamp(2.1rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em] text-fg">{s.value}</dd>
          <dd className="mt-3 text-sm leading-snug text-muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
