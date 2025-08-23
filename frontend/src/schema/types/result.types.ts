/**
 * @type KeywordAnalysis
 * @description Defines the structure for the keyword analysis section.
 */
export type KeywordAnalysis = {
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string;
};
/**
 * @type skillAnalysis
 * @description Defines the structure for the keyword analysis section.
 */
export type SkillAnalysis = {
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string;
};

/**
 * @type SectionFeedback
 * @description Defines the structure for feedback on a single resume section.
 */
export type SectionFeedback = {
  sectionName:
    | "Professional Summary"
    | "Work Experience"
    | "Skills"
    | "Education"
    | "Projects";
  analysis: string;
  suggestions: string[];
};

/**
 * @type ActionItem
 * @description Defines a single, prioritized action for the user to take.
 */
export type ActionItem = {
  priority: "High" | "Medium" | "Low";
  action: string;
};

/**
 * @type ResumeAnalysisOutput
 * @description Represents the main structure for the complete resume analysis output.
 */
export type ResumeAnalysisOutput = {
  overallMatchScore: number;
  analysisSummary: string;
  keywordAnalysis: KeywordAnalysis;
  skillAnalysis: SkillAnalysis;
  sectionBreakdown: SectionFeedback[];
  actionPlan: ActionItem[];
};
