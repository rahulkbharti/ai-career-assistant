export interface SkillMatch {
  skill: string;
  match: boolean;
}

export interface Suggestion {
  actual: string;
  suggestion: string;
}

export interface SkillsAnalysis {
  required: SkillMatch[];
  preferred: SkillMatch[];
  nicetohave: SkillMatch[];
  missing: SkillMatch[];
}

export interface JobAnalysisResult {
  job_role: string;
  company_name: string;
  skills_analysis: SkillsAnalysis;
  gap_analysis: string[];
  area_of_improvements: string[];
  suggestions: Suggestion[];
  recomendations: string[];
}
