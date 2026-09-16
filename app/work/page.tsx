import type { Metadata } from "next";
import { getAllCaseStudies } from "@/src/lib/content";
import { CaseStudyListItem } from "@/src/components/CaseStudyListItem";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-12 sm:px-12 sm:py-16">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h1 className="m-0 font-display text-[28px] font-medium tracking-[-0.025em] sm:text-[32px]">
          Work
        </h1>
        <span className="font-mono text-xs text-meta">
          [PLACEHOLDER: date range]
        </span>
      </div>
      <p className="mb-8 max-w-[62ch] text-[15.5px] leading-[1.6] text-body-muted">
        [PLACEHOLDER: one-line framing for the case study index.]
      </p>
      <div className="border-t-2 border-ink">
        {caseStudies.map((entry) => (
          <CaseStudyListItem key={entry.frontmatter.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
