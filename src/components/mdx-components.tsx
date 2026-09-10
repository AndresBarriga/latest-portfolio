import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { buildDiagramHref } from "@/src/lib/diagram";

type MdxTheme = {
  body: string;
  heading: string;
  meta: string;
  link: string;
};

const lightTheme: MdxTheme = {
  body: "text-body",
  heading: "text-ink",
  meta: "text-meta",
  link: "text-accent",
};

const darkTheme: MdxTheme = {
  body: "text-body-dark",
  heading: "text-ink-inverse",
  meta: "text-meta-dark",
  link: "text-accent-dark",
};

type BackLink = { href: string; label: string };

// Prose elements are capped at 64ch; Diagram is deliberately left out of that
// cap so it can fill the full width of its grid column instead of the
// narrower reading column.
function createMdxComponents(theme: MdxTheme, back: BackLink): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2
        className={`mb-3 mt-9 max-w-[64ch] font-display text-2xl font-medium tracking-[-0.025em] sm:text-[26px] ${theme.heading}`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`mb-2 mt-7 max-w-[64ch] font-display text-xl font-medium tracking-[-0.02em] ${theme.heading}`}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className={`mb-4 max-w-[64ch] text-[16.5px] leading-[1.68] ${theme.body}`}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className={`mb-4 max-w-[64ch] list-disc space-y-1.5 pl-5 text-[16.5px] leading-[1.68] ${theme.body}`}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={`mb-4 max-w-[64ch] list-decimal space-y-1.5 pl-5 text-[16.5px] leading-[1.68] ${theme.body}`}
      >
        {children}
      </ol>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className={`no-underline underline-sweep ${theme.link}`}
      >
        {children}
      </a>
    ),
    // Wraps a short emphasised passage inside the prose flow — same max
    // width as surrounding paragraphs, not a full-bleed breakout. The first
    // child (the markdown line before the blank line) is re-styled as a
    // display-type lede; the rest render as ordinary prose via the `p`
    // component above.
    Callout: ({ children }) => {
      const items = Children.toArray(children);
      const [first, ...rest] = items;
      return (
        <div
          className={`my-10 max-w-[64ch] border-y border-hairline p-8 [&>*:last-child]:mb-0! sm:my-12`}
        >
          {isValidElement(first)
            ? cloneElement(first as ReactElement<{ className?: string }>, {
                className: `mb-4 font-display text-xl font-medium tracking-[-0.02em] leading-snug ${theme.heading}`,
              })
            : first}
          {rest}
        </div>
      );
    },
    Diagram: (props) => {
      const { src, alt, width, height } = props as ImageProps;
      const href = buildDiagramHref({
        src: typeof src === "string" ? src : "",
        alt: typeof alt === "string" ? alt : "",
        width: typeof width === "number" ? width : undefined,
        height: typeof height === "number" ? height : undefined,
        backHref: back.href,
        backLabel: back.label,
      });

      return (
        <div className="my-6">
          <div className="hidden lg:block">
            <Image
              sizes="100vw"
              className="h-auto w-full border border-hairline"
              {...(props as ImageProps)}
            />
          </div>
          <Link
            href={href}
            className={`flex items-center justify-center border border-hairline p-6 font-mono text-xs no-underline underline-sweep lg:hidden ${theme.meta}`}
          >
            view the diagram →
          </Link>
        </div>
      );
    },
  };
}

export function getMdxComponents(back: BackLink): MDXComponents {
  return createMdxComponents(lightTheme, back);
}

export function getMdxComponentsDark(back: BackLink): MDXComponents {
  return createMdxComponents(darkTheme, back);
}
