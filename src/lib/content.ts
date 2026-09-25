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
  return readEntries<CaseStudyFrontmatter>(WORK_DIR);
}

export function getCaseStudyBySlug(
  slug: string
): ContentEntry<CaseStudyFrontmatter> | undefined {
  return getAllCaseStudies().find((entry) => entry.frontmatter.slug === slug);
}

/** Meta description for a case study: explicit frontmatter value if set,
 * otherwise the first sentence of `problem`. */
export function getCaseStudyDescription(
  frontmatter: CaseStudyFrontmatter
): string {
  if (frontmatter.description) return frontmatter.description;
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

/** Meta description for a lab project: explicit frontmatter value if set,
 * otherwise the first sentence of `problem`. */
export function getLabProjectDescription(
  frontmatter: LabProjectFrontmatter
): string {
  if (frontmatter.description) return frontmatter.description;
  const match = frontmatter.problem.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : frontmatter.problem;
}

export function getHowWeBuildEntry(): ContentEntry<EssayFrontmatter> | undefined {
  return readEntries<EssayFrontmatter>(HOW_WE_BUILD_DIR)[0];
}
