import Link from "next/link";
import { getAllCaseStudies, getAllLabProjects, getLabProjectSummary } from "@/src/lib/content";
import { CaseStudyListItem } from "@/src/components/CaseStudyListItem";
import { HomeLabRow } from "@/src/components/HomeLabRow";
import { WorkSectionHeader } from "@/src/components/WorkSectionHeader";
import { TrackedLink } from "@/src/components/TrackedLink";

// Not sourced from content/lab (its page doesn't follow the decision-record
// format — see FeatureVideoStudioListItem), so it's appended by hand here
// alongside the content-driven projects below.
const FEATURE_VIDEO_STUDIO = {
  slug: "feature-video-studio",
  label: "claude code skill",
  title: "Feature Video Studio",
  line: "A Claude Code skill that turns app screenshots into a short feature video.",
};

export default function Home() {
  const caseStudies = getAllCaseStudies();
  const labProjects = getAllLabProjects();

  return (
    <div>
      <section className="border-b border-hairline px-6 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <h1 className="m-0 mb-5 max-w-[15ch] font-display text-[36px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[56px]">
              Platform underneath, product on top
            </h1>
            <p className="m-0 max-w-[56ch] text-[16.5px] leading-[1.6] text-body">
              I&apos;m a product manager for the layer other products depend
              on: third-party APIs I don&apos;t control, shared data models,
              the integration underneath. Five years in product: a
              healthtech product 0→1 inside the German reimbursement
              system, then B2B SaaS integration platforms for hospitality.
            </p>
          </div>
          <div className="font-mono text-[12.5px] leading-[1.5] text-meta">
            <div className="grid grid-cols-[78px_1fr] gap-x-3.5 gap-y-1.5 border-t border-hairline pt-3.5">
              <div>now</div>
              <div className="text-ink">Product Manager, hospitality tech suite</div>
              <div>builds</div>
              <div className="text-ink">Integration platforms · PMS and third-party APIs · event-driven sync · AI-assisted product workflow</div>
              <div>where</div>
              <div className="text-ink">Berlin - working across EMEA</div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 pb-4 pt-10 sm:px-12 sm:pt-12">
        <div className="mx-auto w-full max-w-[1080px]">
          <WorkSectionHeader metaHref="/work" />
          <div className="border-t-2 border-ink">
            {caseStudies.map((entry, index) => (
              <CaseStudyListItem
                key={entry.frontmatter.slug}
                entry={entry}
                position={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 bg-ink px-6 py-12 text-ink-inverse sm:px-12">
        <div className="mx-auto w-full max-w-[1080px]">
          <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-[130px_1fr_24px] md:items-baseline md:gap-6">
            <h2 className="m-0 font-mono text-lg font-medium tracking-[-0.02em] sm:text-xl">
              /lab
            </h2>
            <Link
              href="/lab"
              className="font-mono text-xs leading-[1.5] text-meta-dark no-underline underline-sweep md:whitespace-nowrap"
            >
              Things I build to understand something or have fun — view all
            </Link>
          </div>
          <div className="border-t border-hairline-dark">
            {labProjects.map((entry) => (
              <HomeLabRow
                key={entry.frontmatter.slug}
                href={`/lab/${entry.frontmatter.slug}`}
                label={entry.frontmatter.tag}
                title={entry.frontmatter.title}
                line={getLabProjectSummary(entry.frontmatter)}
              />
            ))}
            <HomeLabRow
              href={`/lab/${FEATURE_VIDEO_STUDIO.slug}`}
              label={FEATURE_VIDEO_STUDIO.label}
              title={FEATURE_VIDEO_STUDIO.title}
              line={FEATURE_VIDEO_STUDIO.line}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-hairline px-6 pb-10 pt-10 sm:px-12 sm:pb-11 sm:pt-12">
        <div className="mx-auto w-full max-w-[1080px]">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 className="m-0 font-display text-2xl font-medium tracking-[-0.025em] sm:text-[28px]">
              How we build in 2026
            </h2>
          </div>
          <div className="border-t-2 border-ink py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="m-0 max-w-[56ch] text-[15.5px] leading-[1.6] text-body-muted">
                How a PM-led team takes a product from idea to production in
                weeks: prototypes validated with hotel managers before
                engineering commits.
              </p>
              <Link
                href="/how-we-build"
                className="shrink-0 font-mono text-xs text-meta no-underline underline-sweep"
              >
                read it →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-12 sm:py-11">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <div className="mb-2 font-display text-2xl tracking-[-0.02em]">
              Open to conversations
            </div>
            <p className="m-0 max-w-[52ch] text-[15.5px] leading-[1.6] text-body-muted">
              Interested in platform and API-facing product roles,
              particularly where the hard part is someone else&apos;s
              system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                href="https://calendly.com/andresbarriga/30min"
                event="booking_click"
                properties={{ source_page: "home" }}
                className="border border-ink bg-ink px-4 py-2.5 font-mono text-[12.5px] text-paper no-underline hover:border-accent hover:bg-accent"
              >
                Book 30 minutes
              </TrackedLink>
              <TrackedLink
                href="/andres-barriga-cv.pdf"
                download
                event="cv_download"
                properties={{ source_page: "home" }}
                className="border border-ink px-4 py-2.5 font-mono text-[12.5px] text-ink no-underline hover:border-accent hover:text-accent"
              >
                Download CV
              </TrackedLink>
              <TrackedLink
                href="https://www.linkedin.com/in/andres-barriga"
                event="contact_click"
                properties={{ channel: "linkedin", source_page: "home" }}
                className="border border-ink px-4 py-2.5 font-mono text-[12.5px] text-ink no-underline hover:border-accent hover:text-accent"
              >
                LinkedIn
              </TrackedLink>
              <TrackedLink
                href="mailto:andresbarrigaru@gmail.com"
                event="contact_click"
                properties={{ channel: "email", source_page: "home" }}
                className="border border-ink px-4 py-2.5 font-mono text-[12.5px] text-ink no-underline hover:border-accent hover:text-accent"
              >
                Email
              </TrackedLink>
              <TrackedLink
                href="https://github.com/AndresBarriga"
                event="contact_click"
                properties={{ channel: "github", source_page: "home" }}
                className="border border-ink px-4 py-2.5 font-mono text-[12.5px] text-ink no-underline hover:border-accent hover:text-accent"
              >
                GitHub
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
