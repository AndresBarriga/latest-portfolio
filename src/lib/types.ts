export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  problem: string;
  evidence: string;
  alternatives: string;
  decision: string;
  outcome: string;
  lessons: string;
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
