import Link from "next/link";

/**
 * Shared Work-section header for home and /work: a 130px|1fr|24px grid
 * (matching the case-row grid below it) so the title, the meta line and
 * the row numbers all share the same left/right edges. Collapses to a
 * single column under md, with title+meta inline on one line there.
 */
export function WorkSectionHeader({
  headingLevel = "h2",
  metaHref,
}: {
  headingLevel?: "h1" | "h2";
  metaHref?: string;
}) {
  const Heading = headingLevel;
  const headingClassName =
    headingLevel === "h1"
      ? "m-0 font-display text-[28px] font-medium tracking-[-0.025em] sm:text-[32px]"
      : "m-0 font-display text-2xl font-medium tracking-[-0.025em] sm:text-[28px]";

  const meta = <span className="font-mono text-[11px] text-meta">2021 — present</span>;

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-[130px_1fr_24px] md:items-baseline md:gap-6">
      <div className="flex items-baseline justify-between gap-4 md:block">
        <Heading className={headingClassName}>Work</Heading>
        {metaHref ? (
          <Link
            href={metaHref}
            className="no-underline underline-sweep md:mt-1.5 md:block"
          >
            {meta}
          </Link>
        ) : (
          <div className="md:mt-1.5 md:block">{meta}</div>
        )}
      </div>
      <p className="m-0 text-[15.5px] leading-[1.6] text-body-muted md:whitespace-nowrap">
        One decision per case: what I knew, what I rejected, what it cost.
      </p>
    </div>
  );
}
