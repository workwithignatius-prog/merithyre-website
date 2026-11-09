import type { Metadata } from "next";
import { SolutionPage } from "@/components/solutions/solution-page";
import { getSegment } from "@/content/segments";
import { pageMetadata } from "@/lib/metadata";

const segment = getSegment("startups");

export const metadata: Metadata = pageMetadata({
  title: segment.meta.title,
  description: segment.meta.description,
  path: segment.href,
});

export default function StartupsPage() {
  return <SolutionPage segment={segment} />;
}
