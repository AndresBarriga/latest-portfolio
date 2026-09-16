import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

const CV_ENTRIES = [
  {
    period: "2025—now",
    company: "HRS Hospitality & Retail Systems",
    role: "Technical Product Manager - TYNGO Products",
    detail:
      "Product direction for a multi-tenant hospitality platform and the licensed products running on it: guest journey and check-in, F&B ordering and meal entitlements, spa operations with a guest-facing booking engine. Own the platform layer that makes the suite deployable per customer, the connectivity to Opera Cloud and POS, and the boundary between AI products and core platform. Led enterprise product certification with a global hotel group and data residency certification with Oracle.",
  },
  {
    period: "2023—2025",
    company: "HRS Hospitality & Retail Systems",
    role: "Product Owner - Platform & Integrations",
    detail:
      "Owned the integration layer beneath a proprietary PMS serving 40+ hotel chains. Replaced bespoke partner integrations with a configuration-driven mapping layer — shared normalisation, event-driven sync, retry logic, idempotency — cutting average integration effort from around six engineering weeks to two. Built the real-time replication architecture later adopted across the product suite, and took GuestReg from 0→1 to 50+ properties.",
  },
  {
    period: "2021—2023",
    company: "CuraSinn",
    role: "Product Manager",
    detail:
      "Sole PM building a remote patient monitoring platform from zero under German healthcare reimbursement rules. Took it to reimbursement approval and live across four hospitals monitoring 500+ patients. Ran discovery with physicians and nurses, redesigned alert handling to cut clinician handling time by 35%, and owned both the physician platform and the patient mobile app across two engineering teams.",
  },
  {
    period: "2019—2020",
    company: "Spreenauten GmbH",
    role: "Project Manager",
    detail:
      "Telecom and IoT delivery for enterprise clients, coordinating development teams, hardware suppliers and stakeholders.",
  },
  {
    period: "2018—2019",
    company: "Miki Travel",
    role: "Associate Contract Coordinator",
    detail:
      "Supplier contracts across European markets for a Japanese tour operator. London.",
  },
];

export default function CvPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-12 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_300px]">
      <div>
        <h1 className="m-0 mb-7 font-display text-[32px] font-medium tracking-[-0.02em] sm:text-[40px]">
          Curriculum vitae
        </h1>
        <div className="border-t-2 border-ink">
          {CV_ENTRIES.map((entry) => (
            <div
              key={entry.period}
              className="grid grid-cols-1 gap-2 border-b border-hairline py-5 sm:grid-cols-[132px_1fr] sm:gap-8"
            >
              <div className="font-mono text-xs text-meta">
                <div>{entry.period}</div>
                <div className="mt-1 text-ink">{entry.company}</div>
              </div>
              <div>
                <div className="font-display text-[21px] leading-tight tracking-[-0.02em]">
                  {entry.role}
                </div>
                <p className="m-0 mt-1 max-w-[62ch] text-[14.5px] leading-[1.6] text-body-muted">
                  {entry.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3.5">
        <a
          href="/andres-barriga-cv.pdf"
          download
          className="block border border-ink bg-ink px-4.5 py-3.5 font-mono text-[12.5px] text-paper no-underline hover:border-accent hover:bg-accent"
        >
          <div>download CV</div>
          <div className="mt-1 text-meta-dark">
            PDF · 120 KB · September 2026
          </div>
        </a>
        <div className="mt-5 font-mono text-xs leading-[1.8] text-meta">
          <div className="text-ink">skills</div>
          <div>
            Platform &amp; integrations — REST APIs, webhooks, event-driven
            architecture, canonical data models, idempotency and retry design,
            multi-tenant architecture, Opera Cloud / OHIP, Simphony, FIAS,
            Stripe
          </div>
          <div>
            Product &amp; delivery — discovery, PRD authoring, roadmap
            prioritisation, vendor evaluation, enterprise security
            certification, GDPR and data residency, MCP orchestration, LLM
            integration, AI-assisted delivery
          </div>
          <div className="mt-3.5 text-ink">languages</div>
          <div>Spanish (native) · English (C1) · German (B2)</div>
        </div>
      </div>
    </div>
  );
}
