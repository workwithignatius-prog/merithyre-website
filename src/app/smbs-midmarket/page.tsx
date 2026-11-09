import type { Metadata } from "next";
import { SolutionPage } from "@/components/solutions/solution-page";
import { getSegment } from "@/content/segments";
import { pageMetadata } from "@/lib/metadata";

const segment = getSegment("smbs-midmarket");

export const metadata: Metadata = pageMetadata({
  title: segment.meta.title,
  description: segment.meta.description,
  path: segment.href,
});

export default function SmbPage() {
  return <SolutionPage segment={segment} />;
}
