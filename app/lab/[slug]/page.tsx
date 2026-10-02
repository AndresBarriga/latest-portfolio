import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "next-mdx-remote-client/rsc";
import { getAllLabProjects, getLabProjectDescription } from "@/src/lib/content";
import { getMdxComponentsDark } from "@/src/components/mdx-components";
import { DecisionRecord, type DecisionRecordField } from "@/src/components/DecisionRecord";
import { CaseTrailer } from "@/src/components/CaseTrailer";
import { TrackedLink } from "@/src/components/TrackedLink";
import { ScrollDepthTracker } from "@/src/components/ScrollDepthTracker";
import type { LabProjectFrontmatter } from "@/src/lib/types";

const LAB_FIELDS: DecisionRecordField<LabProjectFrontmatter>[] = [
  { key: "problem", label: "problem" },
  { key: "decision", label: "decision" },
  { key: "rigor", label: "rigor" },
  { key: "traction", label: "traction" },
  { key: "nextVersion", label: "next version" },
];

export function generateStaticParams() {
  return getAllLabProjects().map(({ frontmatter }) => ({
    slug: frontmatter.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/lab/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getAllLabProjects().find((e) => e.frontmatter.slug === slug);

  if (!entry) {
    return { title: "Lab project not found" };
  }

  const { title } = entry.frontmatter;
  const description = getLabProjectDescription(entry.frontmatter);
  const url = `/lab/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LabProjectPage(props: PageProps<"/lab/[slug]">) {
  const { slug } = await props.params;
  const labProjects = getAllLabProjects();
  const index = labProjects.findIndex((e) => e.frontmatter.slug === slug);

  if (index === -1) {
    notFound();
  }

  const { frontmatter, content: rawContent } = labProjects[index];
  const components = getMdxComponentsDark({
    href: `/lab/${frontmatter.slug}`,
    label: "the project",
  });
  const prev = index > 0 ? labProjects[index - 1] : undefined;
  const next = index < labProjects.length - 1 ? labProjects[index + 1] : undefined;

  // Awaited directly (no Suspense) so the whole body is guaranteed to be
  // fully compiled before this page renders — see the matching comment on
  // /work/[slug]/page.tsx for why a Suspense boundary here would risk
  // shipping a stuck "Loading…" fallback in the prerendered HTML.
  const { content, error } = await evaluate({ source: rawContent, components });
  if (error) throw error;

  const hasTakeaway = Boolean(frontmatter.takeaway);

  const decisionRecord = (
    <div>
      <DecisionRecord
        data={frontmatter}
        fields={LAB_FIELDS}
        theme="dark"
        sticky={false}
      />
      {frontmatter.repoUrl ? (
        <div className="mt-3 font-mono text-[11.5px] text-meta-dark">
          repo:{" "}
          <TrackedLink
            href={frontmatter.repoUrl}
            event="outbound_click"
            properties={{ destination: frontmatter.repoUrl }}
            className="no-underline underline-sweep text-accent-dark"
          >
            {frontmatter.repoUrl}
          </TrackedLink>
        </div>
      ) : null}
    </div>
  );

  return (
    <article className="flex-1 bg-ink text-ink-inverse">
      <ScrollDepthTracker />
      <div className="border-b border-hairline-dark px-6 py-5 sm:px-12">
        <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between font-mono text-[12.5px] text-meta-dark">
          <span>
            <Link
              href="/lab"
              className="no-underline underline-sweep text-meta-dark"
            >
              lab
            </Link>{" "}
            / {frontmatter.slug}
          </span>
          <span>
            {index + 1} of {labProjects.length}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1080px] px-6 py-10 sm:px-12 sm:py-14">
        <h1
          className={`m-0 max-w-[22ch] font-display text-[32px] font-medium leading-[1.12] tracking-[-0.02em] sm:text-[42px] ${
            hasTakeaway ? "" : "mb-8"
          }`}
        >
          {frontmatter.title}
        </h1>

        {hasTakeaway ? (
          <>
            <CaseTrailer
              theme="dark"
              takeaway={frontmatter.takeaway}
              results={frontmatter.results}
              role={frontmatter.role}
            />
            <div className="mt-10">{decisionRecord}</div>
            <div className="mt-10">{content}</div>
          </>
        ) : (
          <>
            <div className="mb-10">{content}</div>
            {decisionRecord}
          </>
        )}
      </div>

      {prev || next ? (
        <div className="border-t border-hairline-dark px-6 py-6 sm:px-12">
          <div className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between gap-6 font-mono text-[12.5px] text-meta-dark">
            {prev ? (
              <Link
                href={`/lab/${prev.frontmatter.slug}`}
                className="no-underline underline-sweep max-w-[38ch]"
              >
                ← {prev.frontmatter.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/lab/${next.frontmatter.slug}`}
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
