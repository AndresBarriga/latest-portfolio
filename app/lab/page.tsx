import type { Metadata } from "next";
import { getAllLabProjects } from "@/src/lib/content";
import { LabListItem } from "@/src/components/LabListItem";

export const metadata: Metadata = {
  title: "Lab",
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
            personal builds, not shipped features
          </span>
        </div>
        <p className="mb-8 max-w-[62ch] text-[15.5px] leading-[1.6] text-body-dark">
          Things I build on my own time to understand whether an idea holds
          up under real evaluation. Each one is written up as a product
          decision — what I tried, what broke, what I&apos;d do differently.
        </p>
        <div className="border-t border-hairline-dark">
          {labProjects.map((entry) => (
            <LabListItem key={entry.frontmatter.slug} entry={entry} />
          ))}
          <div className="py-5 font-mono text-[12.5px] text-meta-dark">
            More in progress — check back soon.
          </div>
        </div>
      </div>
    </div>
  );
}
