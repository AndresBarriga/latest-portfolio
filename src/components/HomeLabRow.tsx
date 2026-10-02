import Link from "next/link";

/**
 * Compact Lab row for the home page, sharing the Work row's
 * 130px|1fr|24px grid so both sections' left/right edges line up.
 * /lab itself keeps the fuller LabListItem/FeatureVideoStudioListItem
 * rows; this is a deliberately terser variant just for the homepage
 * teaser.
 */
export function HomeLabRow({
  href,
  label,
  title,
  line,
}: {
  href: string;
  label?: string;
  title: string;
  line: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Read: ${title}`}
      className="group block border-b border-hairline-dark py-5 text-ink-inverse no-underline transition-colors hover:bg-ink-hover md:grid md:grid-cols-[130px_1fr_24px] md:items-baseline md:gap-6 md:py-6"
    >
      {label ? (
        <div className="mb-1.5 font-mono text-[11px] text-meta-dark md:hidden">
          {label}
        </div>
      ) : null}

      <div className="hidden md:block">
        {label ? (
          <div className="font-mono text-[11px] text-meta-dark">{label}</div>
        ) : null}
      </div>

      <div>
        <div className="font-display text-[22px] leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent-dark group-focus-visible:text-accent-dark">
          {title}
        </div>
        <p className="m-0 mt-1.5 text-[14.5px] leading-[1.6] text-body-dark">
          {line}
        </p>
      </div>

      <div className="hidden md:block" aria-hidden="true">
        <span className="row-arrow font-mono text-ink-inverse">→</span>
      </div>
    </Link>
  );
}
