# Project: Andres's Portfolio Site

## What this is

A personal portfolio site for a Product Manager (7 years, enterprise SaaS,
hospitality tech, healthtech). Purpose: land interviews by demonstrating
product judgment, not just listing experience. Core differentiator to
foreground throughout: he has personally shipped an AI layer with MCP
orchestration and LLM features into production — most PMs spec this,
he builds it. This is also a learning project — the owner is new to
Next.js and Claude Code, and wants to understand changes, not just
accept them.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS, Turbopack
- MDX for content (case studies and lab projects), via @next/mdx or
  next-mdx-remote — check which is actually configured before assuming
- Deploy target: Vercel

## Site structure

- `/` — home
- `/work` — case study index (reads `content/work/*.mdx`, don't hardcode)
- `/work/[slug]` — individual case study
- `/lab` — lab project index (reads `content/lab/*.mdx`, don't hardcode)
- `/lab/[slug]` — individual lab project
- `/about` — bio
- `/cv` — CV download
- Contact: Cal.com embed, not a dedicated page — likely on /about or in nav

## Content model

Case studies (`content/work/*.mdx` frontmatter):

```
title, slug, problem, evidence, alternatives, decision, outcome, lessons
```

Every field must be filled — an empty or vague field is a content gap,
not something to paper over with generic language.

Lab projects (`content/lab/*.mdx` frontmatter):

```
title, slug, problem, decision, rigor, traction, nextVersion, repoUrl?
```

`rigor` = eval notes, failure modes, what breaks — this is the whole point
of the Lab section, don't let it become a features list.

TypeScript types for both live in `src/lib/types.ts`.

## Section purpose (don't blur these)

- `/work` = professional narrative, delivered-in-a-real-org credibility.
  Case studies use problem → evidence → alternatives considered →
  decision → honest outcome → lessons. Never invent metrics; anonymize
  under NDA rather than fabricate.
- `/lab` = personal builder credibility, kept small and curated (2-4
  projects max, not a dumping ground). Each project frames as a product
  decision, not a code showcase — lead with the tradeoff, not the stack.
  Keep this visually/structurally distinct from `/work` so it adds to
  the narrative rather than diluting it.

## Working agreement

- Explain non-obvious changes in plain language before or after making them —
  assume the reader is competent but new to this specific stack.
- Prefer simple, standard patterns over clever ones. This is a small
  content site, not an app — resist state management, complex
  abstractions, or unnecessary dependencies.
- Before installing a new package, say what it's for and whether a
  built-in alternative exists.
- Keep components small and in `src/components/`. Page shells go in
  `src/app/`. Content goes in `content/`, never hardcoded into components.
- Ask before restructuring the folder layout or renaming existing files.
- Use Next's `<Image>` for any real (non-placeholder) images, not raw `<img>`.

## Design status

DECIDED. Reference implementation is in design/handoff/ — read those
files before styling anything. Key decisions:

- Layout: ruled-ledger structure, top nav, boxed interactive
  decision-record panel (click a field to expand supporting detail),
  Lab section inverts to a dark band, mobile uses accordion pattern
  for the decision record.
- Typography: display sans-serif headline (not the original serif),
  sans body, monospace reserved for metadata only.
- Color: extract exact values from the handoff files — don't
  approximate or guess at hex codes.
  When implementing, extract these into tailwind.config and globals.css
  ONCE as design tokens, before styling individual pages. Don't hardcode
  colors/fonts inline in components.

## Content status

Real case study and lab content is not written yet. Do not invent or
fabricate case study content, metrics, job history, or lab project
details — leave clearly marked placeholders
(e.g. `[PLACEHOLDER: problem statement]`) until real content is supplied.

## Out of scope for now

No CMS, no database, no auth, no blog. MDX files in the repo are the
content layer.

## Commands

- `npm run dev` — local dev server (localhost:3000)
- `npm run build` — production build (run before assuming something works)
- `npm run lint` — lint check
