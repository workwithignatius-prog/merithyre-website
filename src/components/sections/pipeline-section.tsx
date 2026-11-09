import { OvernightChips } from "@/components/sections/heading-chips";
import { PipelineTrack } from "@/components/sections/pipeline-track";
import { SectionHeading } from "@/components/ui/section-heading";

/** "How it works": the 7-stage pipeline presented on its own lit stage. */
export function PipelineSection({ id, body }: { id?: string; body?: string }) {
  return (
    <section id={id} className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0c0d0f] px-6 pb-14 pt-14 sm:px-10 sm:pb-16 sm:pt-20">
        {/* light falling on the stage from above, a warmer pool where the human decision sits */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(55%_100%_at_50%_0%,rgb(47_154_104/0.17),transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(40%_100%_at_50%_100%,rgb(231_165_82/0.08),transparent_75%)]"
        />
        <div className="relative">
          <SectionHeading
            decor={<OvernightChips />}
            eyebrow="How it works"
            title={
              <>
                Seven stages. AI runs six.
                <br className="hidden sm:inline" /> You make the call.
              </>
            }
            body={body}
          />
          <div className="mt-16">
            <PipelineTrack />
          </div>
        </div>
      </div>
    </section>
  );
}
