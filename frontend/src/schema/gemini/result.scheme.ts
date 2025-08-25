import { Type } from "@google/genai";

const resultSchema = {
  name: "provide_resume_analysis",
  description:
    "A structured output for analyzing a resume against a job description and providing tailored suggestions.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      overallMatchScore: {
        description:
          "An estimated percentage match between the resume and the job description.",
        type: Type.NUMBER,
        minimum: 0,
        maximum: 100,
      },
      analysisSummary: {
        description:
          "A high-level summary of the resume's strengths and areas for improvement.",
        type: Type.STRING,
      },
      skillAnalysis: {
        description:
          "Analysis of skill alignment between the resume and the job description.",
        type: Type.OBJECT,
        properties: {
          matchedSkills: {
            description:
              "Skills found in both the job description and the resume.",
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          missingSkills: {
            description:
              "Important skills from the job description that are missing from the resume.",
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          suggestions: {
            description:
              "Recommendations for integrating missing skills naturally.",
            type: Type.STRING,
          },
        },
        required: ["matchedSkills", "missingSkills", "suggestions"],
      },
      keywordAnalysis: {
        description:
          "Analysis of keyword alignment between the resume and the job description.",
        type: Type.OBJECT,
        properties: {
          matchedKeywords: {
            description:
              "Keywords found in both the job description and the resume.",
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          missingKeywords: {
            description:
              "Important keywords from the job description that are missing from the resume.",
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          suggestions: {
            description:
              "Recommendations for integrating missing keywords naturally.",
            type: Type.STRING,
          },
        },
        required: ["matchedKeywords", "missingKeywords", "suggestions"],
      },
      sectionBreakdown: {
        description: "Detailed, section-by-section feedback on the resume.",
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            sectionName: {
              description:
                "The name of the resume section (e.g., 'Professional Summary', 'Work Experience', 'Skills').",
              type: Type.STRING,
            },
            analysis: {
              description: "A brief analysis of the section's current state.",
              type: Type.STRING,
            },
            suggestions: {
              description:
                "Specific, actionable suggestions for improving this section.",
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["sectionName", "analysis", "suggestions"],
        },
      },
      actionPlan: {
        description:
          "A prioritized list of actions the user should take to improve their resume.",
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            priority: {
              description:
                "The priority of the action (e.g., 'High', 'Medium', 'Low').",
              type: Type.STRING,
              enum: ["High", "Medium", "Low"],
            },
            action: {
              description: "The specific action item to be completed.",
              type: Type.STRING,
            },
          },
          required: ["priority", "action"],
        },
      },
    },
    required: [
      "overallMatchScore",
      "analysisSummary",
      "skillAnalysis",
      "keywordAnalysis",
      "sectionBreakdown",
      "actionPlan",
    ],
  },
};

export default resultSchema;
