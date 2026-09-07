"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudyFrontmatter } from "@/src/lib/types";

const FIELDS: { key: keyof CaseStudyFrontmatter; label: string }[] = [
  { key: "problem", label: "problem" },
  { key: "evidence", label: "evidence" },
  { key: "alternatives", label: "alternatives considered" },
  { key: "decision", label: "decision" },
  { key: "outcome", label: "outcome" },
  { key: "lessons", label: "lessons" },
];

// Field rows start their stagger after the two header rules have had a
// moment to draw, so the motion reads top-to-bottom rather than everything
// firing at once.
const ROW_BASE_DELAY_MS = 150;
const ROW_STAGGER_MS = 60;

export function DecisionRecord({
  frontmatter,
}: {
  frontmatter: CaseStudyFrontmatter;
}) {
  const [openFields, setOpenFields] = useState<Record<string, boolean>>({});
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toggle(key: string) {
    setOpenFields((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div
      ref={containerRef}
      className="border border-ink bg-paper-raised lg:sticky lg:top-6"
    >
      <div
        className={`dr-rule px-4 py-3 font-mono text-[11.5px] ${hasEntered ? "dr-in" : ""}`}
      >
        decision record
      </div>
      <p
        className={`dr-rule dr-rule-dotted px-4 pb-2 pt-3 font-mono text-[10.5px] text-meta ${hasEntered ? "dr-in" : ""}`}
        style={{ animationDelay: "100ms" }}
      >
        click a field to open the supporting detail
      </p>
      <dl className="m-0 px-4 pb-2">
        {FIELDS.map(({ key, label }, index) => {
          const isOpen = openFields[key] ?? false;
          const value = frontmatter[key];
          const isLast = index === FIELDS.length - 1;

          return (
            <div
              key={key}
              className={`dr-row ${hasEntered ? "dr-in" : ""} ${
                isLast
                  ? "py-[13px]"
                  : "border-b border-dotted border-divider py-[13px]"
              }`}
              style={{
                animationDelay: `${ROW_BASE_DELAY_MS + index * ROW_STAGGER_MS}ms`,
              }}
            >
              <dt className="m-0">
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-baseline justify-between gap-2 border-0 bg-transparent p-0 text-left font-mono text-[11px] text-meta"
                >
                  <span>{label}</span>
                  <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
                </button>
              </dt>
              <dd
                className={
                  isOpen
                    ? "m-0 mt-[5px] border-l-2 border-accent pl-3 text-[14.5px] leading-[1.6] text-body"
                    : "m-0 mt-[5px] line-clamp-2 text-[14.5px] leading-[1.55] text-body"
                }
              >
                {value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
