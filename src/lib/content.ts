import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  CaseStudyFrontmatter,
  LabProjectFrontmatter,
  EssayFrontmatter,
  ContentEntry,
} from "./types";

const WORK_DIR = path.join(process.cwd(), "content/work");
const LAB_DIR = path.join(process.cwd(), "content/lab");
const HOW_WE_BUILD_DIR = path.join(process.cwd(), "content/how-we-build");

// Single source of truth for case study display order — home, /work, and
// the prev/next nav on /work/[slug] all read getAllCaseStudies(), so
// reordering here reorders everywhere at once. Slugs not listed here sort
// after the ones that are, in their filesystem order.
const CASE_STUDY_ORDER = [
  "shared-integration-service",
  "document-scanning-decision",
  "remote-patient-monitoring",
  "mcp-orchestration",
  "translation-cache",
];

function readEntries<TFrontmatter>(dir: string): ContentEntry<TFrontmatter>[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { frontmatter: data as TFrontmatter, content };
    });
}

export function getAllCaseStudies(): ContentEntry<CaseStudyFrontmatter>[] {
  const entries = readEntries<CaseStudyFrontmatter>(WORK_DIR);
  return entries.sort((a, b) => {
    const aIndex = CASE_STUDY_ORDER.indexOf(a.frontmatter.slug);
    const bIndex = CASE_STUDY_ORDER.indexOf(b.frontmatter.slug);
    return (
      (aIndex === -1 ? CASE_STUDY_ORDER.length : aIndex) -
      (bIndex === -1 ? CASE_STUDY_ORDER.length : bIndex)
    );
  });
}

export function getCaseStudyBySlug(
  slug: string
): ContentEntry<CaseStudyFrontmatter> | undefined {
  return getAllCaseStudies().find((entry) => entry.frontmatter.slug === slug);
}

/** Summary for a case study, used as both the list-row teaser and the meta
 * description: explicit frontmatter `description` if set, otherwise
 * `takeaway`, otherwise the first sentence of `problem`. */
export function getCaseStudyDescription(
  frontmatter: CaseStudyFrontmatter
): string {
  if (frontmatter.description) return frontmatter.description;
  if (frontmatter.takeaway) return frontmatter.takeaway;
  const match = frontmatter.problem.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : frontmatter.problem;
}

/** Lowercase industry/focus/tech tags for a case study. Omits `tech` when
 * the case study doesn't set it. */
export function getCaseStudyTags(frontmatter: CaseStudyFrontmatter): string[] {
  return [frontmatter.industry, frontmatter.focus, frontmatter.tech]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase());
}

/** Compact "industry · focus · tech" meta line for the case study header. */
export function getCaseStudyMetaLine(frontmatter: CaseStudyFrontmatter): string {
  return getCaseStudyTags(frontmatter).join(" · ");
}

export function getAllLabProjects(): ContentEntry<LabProjectFrontmatter>[] {
  return readEntries<LabProjectFrontmatter>(LAB_DIR);
}

export function getLabProjectBySlug(
  slug: string
): ContentEntry<LabProjectFrontmatter> | undefined {
  return getAllLabProjects().find((entry) => entry.frontmatter.slug === slug);
}

/** Meta description for a lab project: explicit frontmatter `description` if
 * set, otherwise `takeaway`, otherwise the first sentence of `problem`. */
export function getLabProjectDescription(
  frontmatter: LabProjectFrontmatter
): string {
  if (frontmatter.description) return frontmatter.description;
  if (frontmatter.takeaway) return frontmatter.takeaway;
  const match = frontmatter.problem.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : frontmatter.problem;
}

/** One-line teaser for a lab project's list row (/lab and home): explicit
 * `summary` if set, otherwise the full `problem` text. */
export function getLabProjectSummary(frontmatter: LabProjectFrontmatter): string {
  return frontmatter.summary ?? frontmatter.problem;
}

export function getHowWeBuildEntry(): ContentEntry<EssayFrontmatter> | undefined {
  return readEntries<EssayFrontmatter>(HOW_WE_BUILD_DIR)[0];
}
