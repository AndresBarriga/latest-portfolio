import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getHowWeBuildEntry } from "@/src/lib/content";
import { getMdxComponents } from "@/src/components/mdx-components";
import { buildDiagramHref } from "@/src/lib/diagram";

const DIAGRAM_SRC = "/images/how-we-build/engineering-commitment-line.svg";
const DIAGRAM_ALT =
  "Discovery, owned by the PM: idea, clickable prototype, internal review, customer demos looping back, then a PRD describing what survived. A handover call is where engineering commits. Delivery, owned by engineering: TRD with agent assistance, stories implemented by agents, code review with agent pre-checks and developer ownership, customer demos again that can loop back, then pilot and rollout. Filled teal marks steps agents do; teal outline marks steps agents assist.";

export async function generateMetadata(): Promise<Metadata> {
  const entry = getHowWeBuildEntry();
  return { title: entry ? entry.frontmatter.title : "How we build" };
}

export default function HowWeBuildPage() {
  const entry = getHowWeBuildEntry();

  if (!entry) {
    notFound();
  }

  const { frontmatter, content } = entry;
  const components = getMdxComponents({
    href: "/how-we-build",
    label: "how we build",
  });

  return (
    <article>
      <div className="border-b border-hairline px-6 py-10 sm:px-12 sm:py-14">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="m-0 mb-3 font-mono text-xs text-meta">
            {frontmatter.section}
          </p>
          <h1 className="m-0 max-w-[24ch] font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[46px]">
            {frontmatter.title}
          </h1>
        </div>
      </div>

      <div className="px-6 py-10 sm:px-12 sm:py-14">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-14">
          <div className="max-w-[65ch]">
            <Suspense
              fallback={
                <p className="font-mono text-sm text-meta">Loading content…</p>
              }
            >
              <MDXRemote source={content} components={components} />
            </Suspense>
          </div>
          <div className="lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <Image
                src={DIAGRAM_SRC}
                alt={DIAGRAM_ALT}
                width={680}
                height={1036}
                className="h-auto w-full border border-hairline"
              />
            </div>
            <Link
              href={buildDiagramHref({
                src: DIAGRAM_SRC,
                alt: DIAGRAM_ALT,
                width: 680,
                height: 1036,
                backHref: "/how-we-build",
                backLabel: "how we build",
              })}
              className="flex items-center justify-center border border-hairline p-6 font-mono text-xs text-meta no-underline underline-sweep lg:hidden"
            >
              view the diagram →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
