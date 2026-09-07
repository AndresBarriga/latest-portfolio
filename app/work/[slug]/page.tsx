import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllCaseStudies } from "@/src/lib/content";
import { DecisionRecord } from "@/src/components/DecisionRecord";
import { getMdxComponents } from "@/src/components/mdx-components";

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

  return {
    title: entry ? entry.frontmatter.title : "Case study not found",
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const caseStudies = getAllCaseStudies();
  const index = caseStudies.findIndex((e) => e.frontmatter.slug === slug);

  if (index === -1) {
    notFound();
  }

  const { frontmatter, content } = caseStudies[index];
  const components = getMdxComponents({
    href: `/work/${frontmatter.slug}`,
    label: "the case",
  });
  const prev = index > 0 ? caseStudies[index - 1] : undefined;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined;

  return (
    <article>
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
          <h1 className="m-0 max-w-[24ch] font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[46px]">
            {frontmatter.title}
          </h1>
        </div>
      </div>

      <div className="px-6 py-10 sm:px-12 sm:py-14">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1fr_372px] lg:items-start lg:gap-14">
          <div>
            <Suspense
              fallback={
                <p className="font-mono text-sm text-meta">Loading content…</p>
              }
            >
              <MDXRemote source={content} components={components} />
            </Suspense>
          </div>
          <DecisionRecord frontmatter={frontmatter} />
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
