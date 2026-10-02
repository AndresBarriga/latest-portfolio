import type { Metadata } from "next";
import { getAllCaseStudies } from "@/src/lib/content";
import { CaseStudyListItem } from "@/src/components/CaseStudyListItem";
import { WorkSectionHeader } from "@/src/components/WorkSectionHeader";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-12 sm:px-12 sm:py-16">
      <WorkSectionHeader headingLevel="h1" />
      <div className="border-t-2 border-ink">
        {caseStudies.map((entry, index) => (
          <CaseStudyListItem
            key={entry.frontmatter.slug}
            entry={entry}
            position={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
