---
name: frontend-design
description: Design guidance for this portfolio. Load before styling any page or component.
---

# Frontend Design — Portfolio

Ground every visual decision in what this site actually is: a PM's
evidence that he thinks in structured tradeoffs and ships real things.
Not a generic "clean modern portfolio." See CLAUDE.md for the content
model and section purposes — read that first if you haven't.

## Before touching CSS

Ask: what does this specific page need to communicate? A case study
page needs to make the decision-record structure (problem / evidence /
alternatives / decision / outcome / lessons) visible and easy to scan.
A Lab page needs to read as "product judgment applied to a personal
build," not a features list. Don't reach for the same layout for both.

## Avoid these — they are the most common AI-generated-page tells

- A warm cream background (~#F4F1EA) with a terracotta/clay accent
  (~#D97757) — this combo is so common in AI output it reads as a tell.
- Near-black background with a single neon-green or vermilion accent.
- The generic SaaS-card kit: identical rounded cards, one border-radius
  applied everywhere regardless of hierarchy, the same soft grey shadow
  under each, gradient washes as decoration.
- Tracked-out ALL-CAPS eyebrow labels above every heading.
- Numbered markers (01 / 02 / 03) unless the content is genuinely
  sequential — a case study is not a numbered sequence.
- A "→" appended to every link or button.
- Fade-and-slide-up entrance animation on every section, hover
  transitions on every card — scattered motion reads as generated.
  One deliberate moment (a single page-load sequence, one reveal) beats
  motion everywhere.
- Accenting a single word in a headline with italic/bold/color.

## Typography

One serif for headlines with real character, one sans for body, one
monospace reserved for metadata only (dates, status tags, decision-panel
labels). Line length under 80 characters. Set a real type scale, don't
just make things bigger for emphasis.

## Color

Already decided — see the tokens in tailwind.config once they exist.
Don't introduce ad hoc colors. If a new color is needed, it needs a
reason tied to meaning (status, category), not decoration.

## Layout

Left-aligned, asymmetric where it serves the content (e.g. the decision
panel sitting alongside case study narrative). No wall-to-wall card
grids as a default. Structural devices (dividers, labels, borders)
should encode real information, not decorate.

## Restraint

Spend boldness in one place per page. If unsure whether an element
earns its spot, cut it and see if anything is actually lost.

## Visual QA — do not skip

Code that should look right is not the same as code that does look
right. After any meaningful visual change:

1. Run `npm run screenshot` (captures every route at desktop and mobile
   widths into `screenshots/`).
2. View the resulting images directly.
3. Critique against this file and CLAUDE.md's section-purpose rules
   before calling the task done — check hierarchy, whether /work and
   /lab are visually distinct as intended, and whether anything reads
   as one of the AI-tell patterns above.
4. Fix what's wrong, re-run, re-check.

Never report a styling task complete without having looked at the
rendered screenshot.
