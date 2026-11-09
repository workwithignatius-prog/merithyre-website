export function Stats({ items }: { items: readonly { value: string; label: string }[] }) {
  return (
    <dl className="reveal grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.02] lg:grid-cols-4">
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
          <dd className="text-gradient-brand text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-none tracking-[-0.045em]">{s.value}</dd>
          <dd className="mt-3 text-sm leading-snug text-muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
