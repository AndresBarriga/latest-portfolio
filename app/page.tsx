import Link from "next/link";
import { getAllCaseStudies, getAllLabProjects } from "@/src/lib/content";
import { CaseStudyListItem } from "@/src/components/CaseStudyListItem";
import { LabListItem } from "@/src/components/LabListItem";

export default function Home() {
  const caseStudies = getAllCaseStudies();
  const labProjects = getAllLabProjects();
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <section className="border-b border-hairline px-6 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <h1 className="m-0 mb-5 max-w-[15ch] font-display text-[36px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[56px]">
              Platform underneath, product on top
            </h1>
            <p className="m-0 mb-3.5 max-w-[56ch] text-[16.5px] leading-[1.6] text-body">
              I work on the layer other products depend on: third-party APIs I don't control, shared data models, the integration underneath. Right now that's a suite of hospitality products sharing one integration layer to the property management systems (mainly Oracle Hospitality) our customers already run. Five years of B2B SaaS, and before that a healthtech product 0 → 1 inside the German reimbursement system.
            </p>
            <p className="m-0 max-w-[56ch] text-[16.5px] leading-[1.6] text-body">
              Each case below is one decision, not a project summary. What the problem was, what I knew at the time, what I rejected, what it cost.

Four of them share a habit: letting economics kill a technically correct answer. Some I got wrong. Those are written down too.
 </p>
          </div>
          <div className="font-mono text-[12.5px] leading-[1.5] text-meta">
            <div className="grid grid-cols-[78px_1fr] gap-x-3.5 gap-y-1.5 border-t border-hairline pt-3.5">
              <div>now</div>
              <div className="text-ink">Product Manager, hospitality tech suite</div>
              <div>before</div>
              <div className="text-ink">Healthtech 0→1 · Traveltech, B2B Saas</div>
              <div>builds</div>
              <div className="text-ink">Integration platforms · PMS and third-party APIs · event-driven sync · AI-assisted product workflow</div>
              <div>where</div>
              <div className="text-ink">Berlin - working across EMEA</div>
            </div>
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
                We stopped describing products and started showing them.
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

      <section id="work" className="px-6 pb-4 pt-10 sm:px-12 sm:pt-12">
        <div className="mx-auto w-full max-w-[1080px]">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 className="m-0 font-display text-2xl font-medium tracking-[-0.025em] sm:text-[28px]">
              Work
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs text-meta no-underline underline-sweep"
            >
              2021 — present
            </Link>
          </div>
          <div className="border-t-2 border-ink">
            {caseStudies.map((entry) => (
              <CaseStudyListItem key={entry.frontmatter.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 bg-ink px-6 py-12 text-ink-inverse sm:px-12">
        <div className="mx-auto w-full max-w-[1080px]">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="m-0 font-mono text-lg font-medium tracking-[-0.02em] sm:text-xl">
              /lab
            </h2>
            <Link
              href="/lab"
              className="max-w-[48ch] text-right font-mono text-xs leading-[1.5] text-meta-dark no-underline underline-sweep"
            >
              Things I build to understand something or have fun — view all
            </Link>
          </div>
          <div className="border-t border-hairline-dark">
            {labProjects.map((entry) => (
              <LabListItem key={entry.frontmatter.slug} entry={entry} />
            ))}
            <div className="py-5 font-mono text-[12.5px] text-meta-dark">
              More in progress — check back soon.
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline px-6 py-10 sm:px-12 sm:py-11">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <div className="mb-2 font-display text-2xl tracking-[-0.02em]">
              Open to conversations
            </div>
            <p className="m-0 max-w-[52ch] text-[15.5px] leading-[1.6] text-body-muted">
              Interested in platform and API-facing product roles, particularly where the hard part is someone else's system. Happy to go into more detail on any of the above than the write-ups allow.
            </p>
          </div>
          <div className="border-l border-hairline pl-6 font-mono text-[12.5px] leading-[1.9] text-meta">
            <div>https://calendly.com/andresbarriga/30min</div>
            <div>andresbarrigaru@gmail.com</div>
            <div>https://github.com/AndresBarriga</div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-5 sm:px-12">
        <div className="mx-auto flex w-full max-w-[1080px] justify-between font-mono text-xs text-meta">
          <span>Andres Barriga</span>
          <span>last updated {lastUpdated}</span>
        </div>
      </footer>
    </div>
  );
}
