import Link from "next/link";

/**
 * Manual row for the Feature Video Studio lab project: it isn't sourced
 * from content/lab (its page doesn't follow the decision-record format),
 * so it can't go through LabListItem/getAllLabProjects like the others.
 * Styled to match LabListItem exactly so it reads as one list.
 */
export function FeatureVideoStudioListItem() {
  return (
    <Link
      href="/lab/feature-video-studio"
      className="grid grid-cols-1 items-start gap-2 border-b border-hairline-dark py-5 text-ink-inverse no-underline transition-colors hover:bg-ink-hover sm:grid-cols-[1fr_210px] sm:gap-8"
    >
      <div>
        <div className="font-display text-[23px] leading-tight tracking-[-0.02em]">
          Feature Video Studio
        </div>
        <p className="mt-1.5 max-w-[58ch] text-[14.5px] leading-[1.6] text-body-dark">
          A Claude Code skill that turns app screenshots into a short feature
          video.
        </p>
      </div>
      <div className="font-mono text-[11.5px] leading-[1.7] text-accent-dark sm:text-right">
        claude code skill
      </div>
    </Link>
  );
}
