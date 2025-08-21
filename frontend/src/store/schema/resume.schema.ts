export interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  institution: string;
  degree: string;
  gpa: string;
  graduation_date: string;
  location: string;
}

export interface TechnicalSkills {
  programming_languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud_platforms: string[];
  tools: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  location: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string[];
  date: string;
  description: string[];
  github: string;
}

export interface ResumeData {
  personal_info: PersonalInfo;
  education: Education;
  technical_skills: TechnicalSkills;
  experiences: Experience[];
  projects: Project[];
  achievements: string[];
}

// If you need a partial type for forms or updates
export type PartialResumeData = Partial<ResumeData>;

// If you need a type with optional required fields for creation
export type ResumeDataCreate = {
  id: string;
  name: string;
  job_role: string;
  personal_info: PersonalInfo;
  education: Education;
  technical_skills: TechnicalSkills;
  experiences: Experience[];
  projects: Project[];
  achievements: string[];
};
