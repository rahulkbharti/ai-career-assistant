const JDSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Job Description Extraction",
  description:
    "A schema to structure the extracted details from a job description.",
  type: "object",
  properties: {
    jobTitle: {
      description: "The title of the job position.",
      type: "string",
    },
    companyName: {
      description: "The name of the company posting the job.",
      type: "string",
    },
    location: {
      description: "The geographical location or remote status of the job.",
      type: "string",
    },
    jobType: {
      description:
        "The type of employment (e.g., Full-Time, Part-Time, Contract).",
      type: "string",
      default: "Full-Time",
    },
    jobSummary: {
      description: "A brief summary or overview of the job role.",
      type: "string",
    },
    coreResponsibilities: {
      description:
        "A list of the primary duties and responsibilities for the role.",
      type: "array",
      items: {
        type: "string",
      },
    },
    qualifications: {
      description:
        "An object containing required and preferred qualifications.",
      type: "object",
      properties: {
        required: {
          description:
            "A list of essential qualifications, skills, or experience.",
          type: "array",
          items: {
            type: "string",
          },
        },
        preferred: {
          description: "A list of desired but not essential qualifications.",
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["required", "preferred"],
    },
    technicalSkills: {
      description:
        "An object containing must-have and nice-to-have technical skills.",
      type: "object",
      properties: {
        mustHave: {
          description: "A list of essential technical skills or technologies.",
          type: "array",
          items: {
            type: "string",
          },
        },
        niceToHave: {
          description:
            "A list of desirable but not essential technical skills.",
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["mustHave", "niceToHave"],
    },
    softSkills: {
      description:
        "A list of interpersonal or soft skills mentioned in the description.",
      type: "array",
      items: {
        type: "string",
      },
    },
    keywords: {
      description:
        "A list of important keywords for quick resume tailoring and ATS optimization.",
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: [
    "jobTitle",
    "companyName",
    "location",
    "jobType",
    "jobSummary",
    "coreResponsibilities",
    "qualifications",
    "technicalSkills",
    "softSkills",
    "keywords",
  ],
};

export default JDSchema;
