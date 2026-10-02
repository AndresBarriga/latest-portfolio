import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "next-mdx-remote-client/rsc";
import {
  getAllCaseStudies,
  getCaseStudyDescription,
  getCaseStudyMetaLine,
} from "@/src/lib/content";
import { DecisionRecord, type DecisionRecordField } from "@/src/components/DecisionRecord";
import { CaseTrailer } from "@/src/components/CaseTrailer";
import { getMdxComponents } from "@/src/components/mdx-components";
import { ScrollDepthTracker } from "@/src/components/ScrollDepthTracker";
import type { CaseStudyFrontmatter } from "@/src/lib/types";

const CASE_STUDY_FIELDS: DecisionRecordField<CaseStudyFrontmatter>[] = [
  { key: "problem", label: "problem" },
  { key: "evidence", label: "evidence" },
  { key: "alternatives", label: "alternatives considered" },
  { key: "decision", label: "decision" },
  { key: "outcome", label: "outcome" },
  { key: "lessons", label: "lessons" },
];

export function generateStaticParams() {
  return getAllCaseStudies().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getAllCaseStudies().find((e) => e.frontmatter.slug === slug);

  if (!entry) {
    return { title: "Case study not found" };
  }

  const { title } = entry.frontmatter;
  const description = getCaseStudyDescription(entry.frontmatter);
  const url = `/work/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const caseStudies = getAllCaseStudies();
  const index = caseStudies.findIndex((e) => e.frontmatter.slug === slug);

  if (index === -1) {
    notFound();
  }

  const { frontmatter, content: rawContent } = caseStudies[index];
  const components = getMdxComponents({
    href: `/work/${frontmatter.slug}`,
    label: "the case",
  });
  const prev = index > 0 ? caseStudies[index - 1] : undefined;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined;

  // Awaited directly (no Suspense) so the whole body is guaranteed to be
  // fully compiled before this page renders — these pages are statically
  // generated once at build time, so a Suspense boundary that didn't
  // settle in that single pass would leave its "Loading…" fallback frozen
  // in the prerendered HTML forever (no live server render to resolve it
  // afterward). A real MDX compile error fails the build loudly instead of
  // silently shipping a stuck fallback.
  const { content, error } = await evaluate({ source: rawContent, components });
  if (error) throw error;

  return (
    <article>
      <ScrollDepthTracker />
      <div className="border-b border-hairline px-6 py-5 sm:px-12">
        <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between font-mono text-[12.5px] text-meta">
          <span>
            <Link
              href="/work"
              className="no-underline underline-sweep text-meta"
            >
              work
            </Link>{" "}
            / {frontmatter.slug}
          </span>
          <span>
            {index + 1} of {caseStudies.length}
          </span>
        </div>
      </div>

      <div className="border-b border-hairline px-6 py-10 sm:px-12 sm:py-14">
        <div className="mx-auto w-full max-w-[1080px]">
          <p className="m-0 mb-3 font-mono text-[12px] text-meta">
            {getCaseStudyMetaLine(frontmatter)}
          </p>
          <h1 className="m-0 max-w-[24ch] font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[46px]">
            {frontmatter.title}
          </h1>

          <CaseTrailer
            takeaway={frontmatter.takeaway}
            results={frontmatter.results}
            role={frontmatter.role}
          />
        </div>
      </div>

      <div className="px-6 py-10 sm:px-12 sm:py-14">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1fr_372px] lg:items-start lg:gap-14">
          <div>{content}</div>
          <DecisionRecord data={frontmatter} fields={CASE_STUDY_FIELDS} />
        </div>
      </div>

      {prev || next ? (
        <div className="border-t border-hairline px-6 py-6 sm:px-12">
          <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between gap-6 font-mono text-[12.5px] text-meta">
            {prev ? (
              <Link
                href={`/work/${prev.frontmatter.slug}`}
                className="no-underline underline-sweep max-w-[38ch]"
              >
                ← {prev.frontmatter.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/work/${next.frontmatter.slug}`}
                className="no-underline underline-sweep max-w-[38ch] text-right"
              >
                {next.frontmatter.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}
