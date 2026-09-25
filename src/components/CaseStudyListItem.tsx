import Link from "next/link";
import { getCaseStudyDescription, getCaseStudyTags } from "@/src/lib/content";
import type { CaseStudyFrontmatter, ContentEntry } from "@/src/lib/types";

export function CaseStudyListItem({
  entry,
}: {
  entry: ContentEntry<CaseStudyFrontmatter>;
}) {
  const { frontmatter } = entry;
  const tags = getCaseStudyTags(frontmatter);

  return (
    <Link
      href={`/work/${frontmatter.slug}`}
      className="group grid grid-cols-1 items-start gap-2 border-b border-hairline py-6 text-ink no-underline transition-colors hover:bg-paper-hover sm:grid-cols-[1fr_180px] sm:gap-8"
    >
      <div>
        <div className="font-display text-[25px] leading-tight tracking-[-0.02em]">
          {frontmatter.title}
        </div>
        <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-[1.55] text-body-muted">
          {getCaseStudyDescription(frontmatter)}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[3px] border border-hairline px-1.5 py-0.5 font-mono text-[10.5px] text-meta"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-fit items-baseline gap-1 font-mono text-[11.5px] text-meta sm:ml-auto">
        <span>read</span>
        <span className="row-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
