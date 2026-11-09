"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const topics = [
  { value: "demo", label: "Book a live demo" },
  { value: "product", label: "Product question" },
  { value: "pricing", label: "Pricing" },
  { value: "partnership", label: "Partnerships" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Something else" },
];

const planNames: Record<string, string> = {
  agency: "Staffing Agencies",
  startup: "Startups",
  smb: "SMBs & Mid-Market",
  enterprise: "Enterprise",
};

// Optional: set NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a HubSpot/Formspree URL) to send submissions.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<Record<"name" | "company" | "email" | "form", string>>;

const inputCls =
  "h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-[15px] text-fg placeholder:text-subtle transition-[border-color,box-shadow] focus:border-mh-400/70 focus:outline-none focus:ring-4 focus:ring-mh-400/15 aria-[invalid=true]:border-red-400/70";

export function ContactForm() {
  const [topic, setTopic] = useState("demo");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [firstName, setFirstName] = useState("");

  // Read ?topic= and ?plan= on the client (keeps the page fully static; no Suspense needed).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("topic");
    const plan = params.get("plan");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (t && topics.some((x) => x.value === t)) setTopic(t);
    if (plan && planNames[plan]) setMessage(`I'm interested in the ${planNames[plan]} plan.`);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please add your name.";
    if (!data.company?.trim()) next.company = "Please add your company.";
    if (!emailRe.test(data.email?.trim() ?? "")) next.email = "Please use a valid work email.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setFirstName(data.name.trim().split(/\s+/)[0]);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: "Something went wrong. Please email support@merithyre.ai or call 650-374-4160." });
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[520px] flex-col items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.02] p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full border border-mh-400/40 bg-mh-400/10 text-mh-300 shadow-[0_0_40px_-10px_rgb(52_227_156/0.8)]">
          <CheckCircle2 aria-hidden className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-fg">Thanks, {firstName}.</h2>
        <p className="mt-3 max-w-sm text-muted">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form
      id="form"
      noValidate
      onSubmit={onSubmit}
      className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgb(255_255_255/0.045),rgb(255_255_255/0.01))] p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold tracking-[-0.025em] text-fg">Send us a message</h2>
      <p className="mt-1.5 text-sm text-muted">We respond within one business day.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {(
          [
            { name: "name", label: "Name", type: "text", auto: "name", placeholder: "Jordan Ortiz" },
            { name: "company", label: "Company", type: "text", auto: "organization", placeholder: "Acme Staffing" },
            { name: "email", label: "Work email", type: "email", auto: "email", placeholder: "jordan@acme.com" },
            { name: "phone", label: "Phone (optional)", type: "tel", auto: "tel", placeholder: "(555) 010-0000" },
          ] as const
        ).map((f) => {
          const err = f.name in errors ? errors[f.name as keyof Errors] : undefined;
          return (
            <div key={f.name}>
              <label htmlFor={`f-${f.name}`} className="mb-2 block text-sm font-medium text-fg">
                {f.label}
              </label>
              <input
                id={`f-${f.name}`}
                name={f.name}
                type={f.type}
                autoComplete={f.auto}
                placeholder={f.placeholder}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? `e-${f.name}` : undefined}
                className={inputCls}
              />
              {err && (
                <p id={`e-${f.name}`} className="mt-1.5 text-[13px] text-red-300">
                  {err}
                </p>
              )}
            </div>
          );
        })}
        <div className="sm:col-span-2">
          <label htmlFor="f-topic" className="mb-2 block text-sm font-medium text-fg">
            What can we help with?
          </label>
          <select
            id="f-topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={cn(inputCls, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a3aab4%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10")}
          >
            {topics.map((t) => (
              <option key={t.value} value={t.value} className="bg-panel">
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-message" className="mb-2 block text-sm font-medium text-fg">
            Message <span className="font-normal text-subtle">(optional)</span>
          </label>
          <textarea
            id="f-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your roles and hiring volume."
            className={cn(inputCls, "h-auto py-3 leading-relaxed")}
          />
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="mt-5 text-sm text-red-300">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-mh-400 text-base font-medium text-[#03140b] shadow-[0_0_0_1px_rgb(52_227_156/0.55),0_12px_40px_-12px_rgb(52_227_156/0.75)] transition-colors hover:bg-mh-300 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
