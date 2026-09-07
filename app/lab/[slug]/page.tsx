import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllLabProjects } from "@/src/lib/content";
import { getMdxComponentsDark } from "@/src/components/mdx-components";

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

  return {
    title: entry ? entry.frontmatter.title : "Lab project not found",
  };
}

export default async function LabProjectPage(props: PageProps<"/lab/[slug]">) {
  const { slug } = await props.params;
  const labProjects = getAllLabProjects();
  const index = labProjects.findIndex((e) => e.frontmatter.slug === slug);

  if (index === -1) {
    notFound();
  }

  const { frontmatter, content } = labProjects[index];
  const components = getMdxComponentsDark({
    href: `/lab/${frontmatter.slug}`,
    label: "the project",
  });
  const prev = index > 0 ? labProjects[index - 1] : undefined;
  const next = index < labProjects.length - 1 ? labProjects[index + 1] : undefined;

  return (
    <article className="flex-1 bg-ink text-ink-inverse">
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
        <h1 className="m-0 mb-8 max-w-[22ch] font-display text-[32px] font-medium leading-[1.12] tracking-[-0.02em] sm:text-[42px]">
          {frontmatter.title}
        </h1>

        <dl className="m-0 mb-10 grid grid-cols-1 gap-x-10 gap-y-5 border-y border-hairline-dark py-6 font-mono text-[12.5px] sm:grid-cols-2">
          <div>
            <dt className="text-meta-dark">decision</dt>
            <dd className="m-0 mt-1 text-[14px] leading-[1.55] text-ink-inverse">
              {frontmatter.decision}
            </dd>
          </div>
          <div>
            <dt className="text-meta-dark">rigor</dt>
            <dd className="m-0 mt-1 text-[14px] leading-[1.55] text-ink-inverse">
              {frontmatter.rigor}
            </dd>
          </div>
          <div>
            <dt className="text-meta-dark">traction</dt>
            <dd className="m-0 mt-1 text-[14px] leading-[1.55] text-accent-dark">
              {frontmatter.traction}
            </dd>
          </div>
          <div>
            <dt className="text-meta-dark">next version</dt>
            <dd className="m-0 mt-1 text-[14px] leading-[1.55] text-ink-inverse">
              {frontmatter.nextVersion}
            </dd>
          </div>
          {frontmatter.repoUrl ? (
            <div>
              <dt className="text-meta-dark">repo</dt>
              <dd className="m-0 mt-1 text-[14px] leading-[1.55]">
                <a
                  href={frontmatter.repoUrl}
                  className="no-underline underline-sweep text-accent-dark"
                >
                  {frontmatter.repoUrl}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        <div>
          <Suspense
            fallback={
              <p className="font-mono text-sm text-meta-dark">Loading content…</p>
            }
          >
            <MDXRemote source={content} components={components} />
          </Suspense>
        </div>
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
