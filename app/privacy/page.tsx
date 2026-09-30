import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[680px] px-6 py-12 sm:px-12 sm:py-16">
      <h1 className="m-0 mb-2 font-display text-[30px] font-medium tracking-[-0.02em] sm:text-[36px]">
        Privacy
      </h1>
      <p className="mb-8 max-w-[60ch] text-[13.5px] leading-[1.6] text-meta">
        General overview for a personal portfolio site, covering the basics
        required under GDPR. Not a substitute for legal advice.
      </p>

      <div className="space-y-8 text-[15px] leading-[1.68] text-body">
        <section>
          <h2 className="mb-2 font-display text-lg font-medium tracking-[-0.01em] text-ink">
            Controller
          </h2>
          <p className="m-0">
            Andres Barriga, Hiddenseer Str. 8, 10437 Berlin, Germany.
            Contact:{" "}
            <a href="mailto:andresbarrigaru@gmail.com">
              andresbarrigaru@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-medium tracking-[-0.01em] text-ink">
            Hosting
          </h2>
          <p className="m-0">
            This site is hosted on Vercel. Vercel processes standard
            technical data (such as IP address and request logs) as part of
            serving the site; this is necessary to operate the site and
            happens regardless of any analytics choice below.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-medium tracking-[-0.01em] text-ink">
            Analytics
          </h2>
          <p className="m-0 mb-3">
            This site uses PostHog Cloud (EU region) to understand which
            pages and links get used, so the content can be improved. It is
            configured deliberately narrowly:
          </p>
          <ul className="m-0 list-disc space-y-1 pl-5">
            <li>
              Cookieless mode — no cookies and no persistent device ID are
              stored in your browser.
            </li>
            <li>Session recording is disabled.</li>
            <li>Autocapture is disabled — only specific, named actions are tracked (e.g. opening a decision-record field, playing a video, downloading the CV), not every click.</li>
            <li>
              Visitors are never identified — no name, email, or account is
              ever attached to analytics events.
            </li>
            <li>
              A coarse country (e.g. &quot;DE&quot;) is attached to each
              event, derived from your IP address at the hosting layer
              (Vercel). The IP address itself is never stored, logged by
              this site, or sent to the analytics provider — only the
              resulting country code is, and only for the current visit.
            </li>
          </ul>
          <p className="m-0 mt-3">
            Because no cookies or persistent identifiers are used, this site
            does not show a cookie consent banner. Processing is based on a
            legitimate interest (Art. 6(1)(f) GDPR) in understanding
            aggregate, non-identifying usage of the site.
          </p>
          <p className="m-0 mt-3">
            To opt out of analytics entirely on a given browser, visit{" "}
            <Link href="/no-track" className="underline-sweep">
              /no-track
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-medium tracking-[-0.01em] text-ink">
            External links
          </h2>
          <p className="m-0">
            Links to Calendly, GitHub, LinkedIn, and any linked repositories
            take you to third-party sites governed by their own privacy
            policies, not this one.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-medium tracking-[-0.01em] text-ink">
            Your rights
          </h2>
          <p className="m-0">
            Under GDPR you have the right to access, rectify, or erase your
            data, to restrict or object to processing, and to lodge a
            complaint with a supervisory authority. Contact{" "}
            <a href="mailto:andresbarrigaru@gmail.com">
              andresbarrigaru@gmail.com
            </a>{" "}
            for any request.
          </p>
        </section>
      </div>
    </div>
  );
}
