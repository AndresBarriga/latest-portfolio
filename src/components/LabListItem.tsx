import Link from "next/link";
import type { LabProjectFrontmatter, ContentEntry } from "@/src/lib/types";

export function LabListItem({
  entry,
}: {
  entry: ContentEntry<LabProjectFrontmatter>;
}) {
  const { frontmatter } = entry;

  return (
    <Link
      href={`/lab/${frontmatter.slug}`}
      className="grid grid-cols-1 items-start gap-2 border-b border-hairline-dark py-5 text-ink-inverse no-underline transition-colors hover:bg-ink-hover sm:grid-cols-[1fr_210px] sm:gap-8"
    >
      <div>
        <div className="font-display text-[23px] leading-tight tracking-[-0.02em]">
          {frontmatter.title}
        </div>
        <p className="mt-1.5 max-w-[58ch] text-[14.5px] leading-[1.6] text-body-dark">
          {frontmatter.problem}
        </p>
      </div>
      <div className="font-mono text-[11.5px] leading-[1.7] text-accent-dark sm:text-right">
        {frontmatter.traction}
      </div>
    </Link>
  );
}
