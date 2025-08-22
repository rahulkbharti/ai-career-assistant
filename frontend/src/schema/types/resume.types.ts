export type Basics = {
  name: string;
  label: string;
  email: string;
  phone: string;
  location: {
    city: string;
    region: string;
    countryCode: string;
    postalCode: string;
  };
  website: string;
  profiles: Array<{
    network: string;
    username: string;
    url: string;
  }>;
};

export type WorkExperience = {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  keywords: string[];
};

export type Education = {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string;
  courses: string[];
};

export type Skill = {
  category: string;
  keywords: string[];
};

export type Project = {
  name: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  url: string;
  repository: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  url: string;
};

export type Language = {
  language: string;
  fluency: string;
};

export type Interest = {
  name: string;
  keywords: string[];
};

export type Reference = {
  note: string;
};
export type Achievement = {
  title: string;
  date: string;
  description: string;
  url: string;
};
export type ResumeSchema = {
  id: string;
  name: string;
  job_role: string;
  basics: Basics;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certificate[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
};
