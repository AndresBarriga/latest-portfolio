import { getCaseStudyDescription, getCaseStudyTags } from "@/src/lib/content";
import { TrackedLink } from "@/src/components/TrackedLink";
import type { CaseStudyFrontmatter, ContentEntry } from "@/src/lib/types";

export function CaseStudyListItem({
  entry,
  position,
}: {
  entry: ContentEntry<CaseStudyFrontmatter>;
  position: number;
}) {
  const { frontmatter } = entry;
  const tags = getCaseStudyTags(frontmatter);
  const description = getCaseStudyDescription(frontmatter);
  const firstResult = frontmatter.results?.[0];

  return (
    <TrackedLink
      href={`/work/${frontmatter.slug}`}
      event="work_row_click"
      properties={{ case: frontmatter.slug, position }}
      aria-label={`Read: ${frontmatter.title}`}
      className="group block border-b border-hairline py-5 text-ink no-underline transition-colors hover:bg-paper-hover md:grid md:grid-cols-[130px_1fr_24px] md:items-baseline md:gap-6 md:py-6"
    >
      {/* Mobile-only stat line; the desktop left column below is hidden on mobile. */}
      {firstResult ? (
        <div className="mb-2 font-mono text-[12.5px] text-meta md:hidden">
          <span className="font-medium text-ink">{firstResult.value}</span>{" "}
          {firstResult.label}
        </div>
      ) : null}

      <div className="hidden md:block">
        {firstResult ? (
          <>
            <div className="font-mono text-[24px] font-medium leading-none text-ink">
              {firstResult.value}
            </div>
            <div className="mt-1.5 line-clamp-2 font-mono text-[11px] leading-[1.4] text-meta">
              {firstResult.label}
            </div>
          </>
        ) : null}
      </div>

      <div>
        <div className="font-display text-[22px] leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent group-focus-visible:text-accent">
          {frontmatter.title}
        </div>
        <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-[1.55] text-body-muted">
          {description}
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

      <div className="hidden md:block" aria-hidden="true">
        <span className="row-arrow font-mono text-ink">→</span>
      </div>
    </TrackedLink>
  );
}
