import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Andres Barriga",
};

export default function AboutPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-12 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_340px]">
      <div className="max-w-[65ch]">
        <h1 className="m-0 mb-6 font-display text-[30px] font-medium leading-[1.14] tracking-[-0.02em] sm:text-[39px]">
          About
        </h1>
        <p className="mb-7 text-[16.5px] leading-[1.68] text-body">
          I studied business and tourism in Madrid and ended up in Berlin
          building software. Telecom and IoT delivery first, then five years of product: a remote patient health monitoring platform that went from nothing to reimbursement approval inside the German healthcare system and live to production, and since then hospitality tech — integration layers, PMS connectivity, and the products built on top of them.
        </p>
        <p className="mb-7 text-[16.5px] leading-[1.68] text-body">
          I like working close to the systems. Most of what I own sits
          between our products and someone else&apos;s API, which means the
          interesting decisions are usually about constraints rather than
          features: what a third party will let you do, what a pricing model
          will carry, where an abstraction stops paying for itself. I
          prototype before I write specs, and I would rather ship something
          narrow that works than wait for the version that covers everything.
        </p>
        <p className="text-[16.5px] leading-[1.68] text-body">
          Spanish, based in Berlin, working in English and German. Outside
          work I climb, mostly on limestone in Spain, and spend more time
          than I should maintaining an old VW campervan.
        </p>
      </div>

      <div className="font-mono text-xs leading-[1.5]">
        <div className="mb-2 font-medium text-ink">currently</div>
        <div className="grid grid-cols-[84px_1fr] gap-x-3.5 gap-y-1.5 border-t border-hairline pt-3.5 text-meta">
          <div>role</div>
          <div className="text-ink">Product Manager, hospitality tech</div>
          <div>open to</div>
          <div className="text-ink">platform and API product roles</div>
          <div>based</div>
          <div className="text-ink">Berlin</div>
        </div>

        <div className="mb-2 mt-8 font-medium text-ink">elsewhere</div>
        <div className="grid grid-cols-[84px_1fr] gap-x-3.5 gap-y-1.5 border-t border-hairline pt-3.5 text-meta">
          <div>book time</div>
          <div>
            <a href="https://calendly.com/andresbarriga/30min">
              calendly.com/andresbarriga/30min
            </a>
          </div>
          <div>email</div>
          <div>
            <a href="mailto:andresbarrigaru@gmail.com">
              andresbarrigaru@gmail.com
            </a>
          </div>
          <div>github</div>
          <div>
            <a href="https://github.com/AndresBarriga">
              github.com/AndresBarriga
            </a>
          </div>
          <div>linkedin</div>
          <div>
            <a href="https://www.linkedin.com/in/andres-barriga/">
              linkedin.com/in/andres-barriga
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
