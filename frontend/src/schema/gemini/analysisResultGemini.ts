const analysisResult = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Resume Analysis and Suggestions",
  description:
    "A structured output for analyzing a resume against a job description and providing tailored suggestions.",
  type: "object",
  properties: {
    overallMatchScore: {
      description:
        "An estimated percentage match between the resume and the job description.",
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    analysisSummary: {
      description:
        "A high-level summary of the resume's strengths and areas for improvement.",
      type: "string",
    },
    skillAnalysis: {
      description:
        "Analysis of skill alignment between the resume and the job description.",
      type: "object",
      properties: {
        matchedskills: {
          description:
            "skills found in both the job description and the resume.",
          type: "array",
          items: { type: "string" },
        },
        missingskills: {
          description:
            "Important skills from the job description that are missing from the resume.",
          type: "array",
          items: { type: "string" },
        },
        suggestions: {
          description:
            "Recommendations for integrating missing skills naturally.",
          type: "string",
        },
      },
      required: ["matchedskills", "missingskills", "suggestions"],
    },
    keywordAnalysis: {
      description:
        "Analysis of keyword alignment between the resume and the job description.",
      type: "object",
      properties: {
        matchedKeywords: {
          description:
            "Keywords found in both the job description and the resume.",
          type: "array",
          items: { type: "string" },
        },
        missingKeywords: {
          description:
            "Important keywords from the job description that are missing from the resume.",
          type: "array",
          items: { type: "string" },
        },
        suggestions: {
          description:
            "Recommendations for integrating missing keywords naturally.",
          type: "string",
        },
      },
      required: ["matchedKeywords", "missingKeywords", "suggestions"],
    },
    sectionBreakdown: {
      description: "Detailed, section-by-section feedback on the resume.",
      type: "array",
      items: {
        type: "object",
        properties: {
          sectionName: {
            description:
              "The name of the resume section (e.g., 'Professional Summary', 'Work Experience', 'Skills').",
            type: "string",
          },
          analysis: {
            description: "A brief analysis of the section's current state.",
            type: "string",
          },
          suggestions: {
            description:
              "Specific, actionable suggestions for improving this section.",
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["sectionName", "analysis", "suggestions"],
      },
    },
    actionPlan: {
      description:
        "A prioritized list of actions the user should take to improve their resume.",
      type: "array",
      items: {
        type: "object",
        properties: {
          priority: {
            description:
              "The priority of the action (e.g., 'High', 'Medium', 'Low').",
            type: "string",
            enum: ["High", "Medium", "Low"],
          },
          action: {
            description: "The specific action item to be completed.",
            type: "string",
          },
        },
        required: ["priority", "action"],
      },
    },
  },
  required: [
    "overallMatchScore",
    "analysisSummary",
    "keywordAnalysis",
    "sectionBreakdown",
    "actionPlan",
  ],
};

export default analysisResult;
