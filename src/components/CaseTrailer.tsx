type Theme = { heading: string; meta: string };

const lightTheme: Theme = { heading: "text-ink", meta: "text-meta" };
const darkTheme: Theme = { heading: "text-ink-inverse", meta: "text-meta-dark" };

/**
 * Optional trailer rendered under a title, before the decision record:
 * takeaway (large text), results (stat row) and role (metadata line). Shared
 * by /work and /lab case pages — fields are omitted entirely, no placeholder
 * space, when not set.
 */
export function CaseTrailer({
  takeaway,
  results,
  role,
  theme = "light",
}: {
  takeaway?: string;
  results?: { value: string; label: string }[];
  role?: string;
  theme?: "light" | "dark";
}) {
  const t = theme === "dark" ? darkTheme : lightTheme;

  return (
    <>
      {takeaway ? (
        <p
          className={`mt-5 max-w-[48ch] font-display text-[19px] font-medium leading-[1.35] tracking-[-0.01em] sm:line-clamp-3 sm:text-[21px] ${t.heading}`}
        >
          {takeaway}
        </p>
      ) : null}

      {results?.length ? (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-10">
          {results.slice(0, 3).map((result, i) => (
            <div key={i}>
              <p
                className={`m-0 font-display text-[26px] font-medium leading-none tracking-[-0.01em] ${t.heading}`}
              >
                {result.value}
              </p>
              <p
                className={`m-0 mt-1 max-w-[22ch] font-mono text-[11px] leading-[1.4] ${t.meta}`}
              >
                {result.label}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {role ? (
        <p className={`m-0 mt-6 font-mono text-[12px] ${t.meta}`}>{role}</p>
      ) : null}
    </>
  );
}
