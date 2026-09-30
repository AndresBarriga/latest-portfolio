import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto w-full max-w-[680px] px-6 py-12 sm:px-12 sm:py-16">
      <h1 className="m-0 mb-7 font-display text-[30px] font-medium tracking-[-0.02em] sm:text-[36px]">
        Impressum
      </h1>

      <div className="font-mono text-xs leading-[1.8] text-meta">
        <div className="mb-2 font-medium text-ink">
          Angaben gemäß § 5 TMG
        </div>
        <div className="border-t border-hairline pt-3.5">
          <div className="text-ink">Andres Barriga</div>
          <div>Hiddenseer Str. 8</div>
          <div>10437 Berlin</div>
          <div>Germany</div>
        </div>

        <div className="mb-2 mt-8 font-medium text-ink">Kontakt</div>
        <div className="border-t border-hairline pt-3.5">
          <div>
            Email:{" "}
            <a href="mailto:andresbarrigaru@gmail.com">
              andresbarrigaru@gmail.com
            </a>
          </div>
        </div>

        <div className="mb-2 mt-8 font-medium text-ink">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </div>
        <div className="border-t border-hairline pt-3.5">
          <div>Andres Barriga (address as above)</div>
        </div>

        <div className="mb-2 mt-8 font-medium text-ink">USt-IdNr.</div>
        <div className="border-t border-hairline pt-3.5">
          <div>Not applicable — no VAT ID issued.</div>
        </div>
      </div>

      <p className="mt-10 max-w-[60ch] text-[13.5px] leading-[1.7] text-meta">
        This page provides a general Impressum for a personal portfolio
        site and is not a substitute for legal advice.
      </p>
    </div>
  );
}
