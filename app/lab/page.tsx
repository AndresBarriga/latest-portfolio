import type { Metadata } from "next";
import { getAllLabProjects } from "@/src/lib/content";
import { LabListItem } from "@/src/components/LabListItem";

export const metadata: Metadata = {
  title: "[PLACEHOLDER: Lab | Site name]",
};

export default function LabIndexPage() {
  const labProjects = getAllLabProjects();

  return (
    <div className="flex-1 bg-ink text-ink-inverse">
      <div className="mx-auto w-full max-w-[1080px] px-6 py-12 sm:px-12 sm:py-16">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h1 className="m-0 font-mono text-xl font-medium tracking-[-0.02em] sm:text-2xl">
            /lab
          </h1>
          <span className="max-w-[48ch] text-right font-mono text-xs leading-[1.5] text-meta-dark">
            [PLACEHOLDER: lab section tagline]
          </span>
        </div>
        <p className="mb-8 max-w-[62ch] text-[15.5px] leading-[1.6] text-body-dark">
          [PLACEHOLDER: one-line framing for why these projects exist.]
        </p>
        <div className="border-t border-hairline-dark">
          {labProjects.map((entry) => (
            <LabListItem key={entry.frontmatter.slug} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
