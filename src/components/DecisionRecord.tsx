"use client";

import { useEffect, useRef, useState } from "react";

export type DecisionRecordField<T> = { key: keyof T; label: string };

type Theme = {
  containerBorder: string;
  containerBg: string;
  heading: string;
  meta: string;
  divider: string;
  accent: string;
  body: string;
  dottedColorVar: string;
};

const lightTheme: Theme = {
  containerBorder: "border-ink",
  containerBg: "bg-paper-raised",
  heading: "text-ink",
  meta: "text-meta",
  divider: "border-divider",
  accent: "border-accent",
  body: "text-body",
  dottedColorVar: "var(--color-divider)",
};

const darkTheme: Theme = {
  containerBorder: "border-hairline-dark",
  containerBg: "bg-ink-hover",
  heading: "text-ink-inverse",
  meta: "text-meta-dark",
  divider: "border-hairline-dark",
  accent: "border-accent-dark",
  body: "text-body-dark",
  dottedColorVar: "var(--color-hairline-dark)",
};

// Field rows start their stagger after the two header rules have had a
// moment to draw, so the motion reads top-to-bottom rather than everything
// firing at once.
const ROW_BASE_DELAY_MS = 150;
const ROW_STAGGER_MS = 60;

export function DecisionRecord<T>({
  data,
  fields,
  theme = "light",
  sticky = true,
}: {
  data: T;
  fields: DecisionRecordField<T>[];
  theme?: "light" | "dark";
  sticky?: boolean;
}) {
  const [openFields, setOpenFields] = useState<Record<string, boolean>>({});
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = theme === "dark" ? darkTheme : lightTheme;

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
      className={`border ${t.containerBorder} ${t.containerBg} ${sticky ? "lg:sticky lg:top-6" : ""}`}
    >
      <div
        className={`dr-rule px-4 py-3 font-mono text-[11.5px] ${t.heading} ${hasEntered ? "dr-in" : ""}`}
      >
        decision record
      </div>
      <p
        className={`dr-rule dr-rule-dotted px-4 pb-2 pt-3 font-mono text-[10.5px] ${t.meta} ${hasEntered ? "dr-in" : ""}`}
        style={{
          animationDelay: "100ms",
          ["--dr-dotted-color" as string]: t.dottedColorVar,
        }}
      >
        click a field to open the supporting detail
      </p>
      <dl className="m-0 px-4 pb-2">
        {fields.map(({ key, label }, index) => {
          const isOpen = openFields[String(key)] ?? false;
          const value = data[key];
          const isLast = index === fields.length - 1;

          return (
            <div
              key={String(key)}
              className={`dr-row ${hasEntered ? "dr-in" : ""} ${
                isLast
                  ? "py-[13px]"
                  : `border-b border-dotted ${t.divider} py-[13px]`
              }`}
              style={{
                animationDelay: `${ROW_BASE_DELAY_MS + index * ROW_STAGGER_MS}ms`,
              }}
            >
              <dt className="m-0">
                <button
                  type="button"
                  onClick={() => toggle(String(key))}
                  aria-expanded={isOpen}
                  className={`flex w-full cursor-pointer items-baseline justify-between gap-2 border-0 bg-transparent p-0 text-left font-mono text-[11px] ${t.meta}`}
                >
                  <span>{label}</span>
                  <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
                </button>
              </dt>
              <dd
                className={
                  isOpen
                    ? `m-0 mt-[5px] whitespace-pre-line border-l-2 ${t.accent} pl-3 text-[14.5px] leading-[1.6] ${t.body}`
                    : `m-0 mt-[5px] line-clamp-2 text-[14.5px] leading-[1.55] ${t.body}`
                }
              >
                {typeof value === "string" ? value : ""}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
