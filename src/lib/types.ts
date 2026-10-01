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
  problem: string;
  decision: string;
  rigor: string;
  traction: string;
  nextVersion: string;
  repoUrl?: string;
  /** Optional explicit meta description. Falls back to the first sentence
   * of `problem` (see getLabProjectDescription in content.ts) when omitted. */
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
