import Link from "next/link";
import type { CaseStudyFrontmatter, ContentEntry } from "@/src/lib/types";

export function CaseStudyListItem({
  entry,
}: {
  entry: ContentEntry<CaseStudyFrontmatter>;
}) {
  const { frontmatter } = entry;

  return (
    <Link
      href={`/work/${frontmatter.slug}`}
      className="group grid grid-cols-1 items-start gap-2 border-b border-hairline py-6 text-ink no-underline transition-colors hover:bg-paper-hover sm:grid-cols-[1fr_180px] sm:gap-8"
    >
      <div>
        <div className="font-display text-[25px] leading-tight tracking-[-0.02em]">
          {frontmatter.title}
        </div>
        <p className="mt-1.5 line-clamp-2 max-w-[62ch] text-[14.5px] leading-[1.55] text-body-muted">
          {frontmatter.problem}
        </p>
      </div>
      <div className="underline-sweep w-fit font-mono text-[11.5px] text-meta sm:ml-auto sm:text-right">
        read the decision record
      </div>
    </Link>
  );
}
