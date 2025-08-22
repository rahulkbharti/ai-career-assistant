export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Temporary";

export interface SkillsAnalysis {
  required: string[];
  preferred: string[];
  nicetohave: string[];
}

export interface SalaryRange {
  min_salary: number;
  max_salary: number;
}

export interface JobDescription {
  job_title: string;
  company_name: string;
  location: string;
  employment_type: EmploymentType;
  job_description: string;
  responsibilities: string[];
  qualifications: string[];
  skills_analysis: SkillsAnalysis;
  salary_range: SalaryRange;
}
