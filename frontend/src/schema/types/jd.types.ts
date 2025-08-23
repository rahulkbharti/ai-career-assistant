/**
 * @type Qualifications
 * @description Defines the structure for required and preferred qualifications.
 */
export type Qualifications = {
  required: string[];
  preferred: string[];
};

/**
 * @type TechnicalSkills
 * @description Defines the structure for must-have and nice-to-have technical skills.
 */
export type TechnicalSkills = {
  mustHave: string[];
  niceToHave: string[];
};

/**
 * @type JobDescription
 * @description Represents the main structure for the extracted job description data,
 * based on the provided JSON schema.
 */
export type JobDescription = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: "Full-Time" | "Part-Time" | "Contract" | "Internship" | "Unknown"; // Using a union type for more specific typing
  jobSummary: string;
  coreResponsibilities: string[];
  qualifications: Qualifications;
  technicalSkills: TechnicalSkills;
  softSkills: string[];
  keywords: string[];
};
