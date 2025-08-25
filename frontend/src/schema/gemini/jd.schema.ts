import { Type } from "@google/genai";

const jobDescriptionSchema = {
  name: "job_description",
  description:
    "A schema to structure the extracted details from a job description.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      jobTitle: {
        type: Type.STRING,
        description: "The title of the job position.",
      },
      companyName: {
        type: Type.STRING,
        description: "The name of the company posting the job.",
      },
      location: {
        type: Type.STRING,
        description: "The geographical location or remote status of the job.",
      },
      jobType: {
        type: Type.STRING,
        description:
          "The type of employment (e.g., Full-Time, Part-Time, Contract).",
        default: "Full-Time",
      },
      jobSummary: {
        type: Type.STRING,
        description: "A brief summary or overview of the job role.",
      },
      coreResponsibilities: {
        type: Type.ARRAY,
        description:
          "A list of the primary duties and responsibilities for the role.",
        items: { type: Type.STRING },
      },
      qualifications: {
        type: Type.OBJECT,
        description:
          "An object containing required and preferred qualifications.",
        properties: {
          required: {
            type: Type.ARRAY,
            description:
              "A list of essential qualifications, skills, or experience.",
            items: { type: Type.STRING },
          },
          preferred: {
            type: Type.ARRAY,
            description: "A list of desired but not essential qualifications.",
            items: { type: Type.STRING },
          },
        },
        required: ["required", "preferred"],
      },
      technicalSkills: {
        type: Type.OBJECT,
        description:
          "An object containing must-have and nice-to-have technical skills.",
        properties: {
          mustHave: {
            type: Type.ARRAY,
            description:
              "A list of essential technical skills or technologies.",
            items: { type: Type.STRING },
          },
          niceToHave: {
            type: Type.ARRAY,
            description:
              "A list of desirable but not essential technical skills.",
            items: { type: Type.STRING },
          },
        },
        required: ["mustHave", "niceToHave"],
      },
      softSkills: {
        type: Type.ARRAY,
        description:
          "A list of interpersonal or soft skills mentioned in the description.",
        items: { type: Type.STRING },
      },
      keywords: {
        type: Type.ARRAY,
        description:
          "A list of important keywords for quick resume tailoring and ATS optimization.",
        items: { type: Type.STRING },
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
  },
};

export default jobDescriptionSchema;
