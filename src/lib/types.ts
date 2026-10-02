export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  industry: string;
  focus: string;
  /** Optional; the index row and header show only industry + focus when omitted. */
  tech?: string;
  /** Optional one-sentence hook rendered large under the title/tags, before
   * the body. Omitted entirely (no empty space) when not set. */
  takeaway?: string;
  /** Optional one-line statement of the author's specific contribution,
   * rendered metadata-style in the trailer. */
  role?: string;
  /** Optional headline numbers (max 3) rendered as a stat row in the
   * trailer, each a big value with a mono label underneath. */
  results?: { value: string; label: string }[];
  problem: string;
  evidence: string;
  alternatives: string;
  decision: string;
  outcome: string;
  lessons: string;
  /** Optional explicit meta description. Falls back to the first sentence
   * of `problem` (see getCaseStudyDescription in content.ts) when omitted. */
  description?: string;
}

export interface LabProjectFrontmatter {
  title: string;
  slug: string;
  /** Optional one-line teaser used for the /lab and home page list rows
   * instead of `problem` when set (see getLabProjectSummary in content.ts). */
  summary?: string;
  /** Optional one-sentence hook rendered large under the title, before the
   * decision record — same trailer as case studies (shared CaseTrailer
   * component). Omitted entirely (no empty space) when not set. */
  takeaway?: string;
  /** Optional one-line statement of the author's specific contribution,
   * rendered metadata-style in the trailer. */
  role?: string;
  /** Optional headline numbers (max 3) rendered as a stat row in the
   * trailer, each a big value with a mono label underneath. */
  results?: { value: string; label: string }[];
  /** Optional short mono label for the /lab list row (e.g. "rag · evals"),
   * shown in place of `traction` when set. */
  tag?: string;
  problem: string;
  decision: string;
  rigor: string;
  traction: string;
  nextVersion: string;
  repoUrl?: string;
  /** Optional explicit meta description. Falls back to `takeaway`, then the
   * first sentence of `problem` (see getLabProjectDescription in
   * content.ts) when omitted. */
  description?: string;
}

export interface EssayFrontmatter {
  title: string;
  slug: string;
  section: string;
}

export interface ContentEntry<TFrontmatter> {
  frontmatter: TFrontmatter;
  content: string;
}
