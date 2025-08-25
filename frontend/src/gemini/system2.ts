import { GoogleGenAI } from "@google/genai";
import type { JobDescription } from "../schema/types/jd.types";
import type { ResumeSchema } from "../schema/types/resume.types";
import type { ResumeAnalysisOutput } from "../schema/types/result.types";

import jobDescriptionSchema from "../schema/gemini/jd.schema";
import resumeSchema from "../schema/gemini/resume.schema";
import resultSchema from "../schema/gemini/result.scheme";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDqI_RR_DZToRIBOc33jw2nbEBInxZDx_8",
});

const MODEL_NAME: string = "gemini-2.5-flash";

interface ApiResponse<T = any> {
  success: boolean;
  response?: T;
  error?: string;
}

const extractJobInfo = async (
  jobDescription: string
): Promise<ApiResponse<JobDescription>> => {
  console.log("Running Job Description Extraction");
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [jobDescription],
    config: {
      tools: [{ functionDeclarations: [jobDescriptionSchema] }],
    },
  });
  if (response.functionCalls) {
    console.log(response.functionCalls);
    // In a real app, you would execute the function and send the result back.
    if (!response.functionCalls[0].args)
      return {
        success: false,
        error: " Errpr While Fetching",
      };
    return {
      success: true,
      response: response.functionCalls[0].args as JobDescription,
    };
  } else {
    return {
      success: false,
      error: "error",
    };
  }
};

const extractResumeInfo = async (
  resumeDataString: string
): Promise<ApiResponse<ResumeSchema>> => {
  console.log("Running Resume Information Extraction");
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [
      "Extract resume information from this PDF. Return strictly valid JSON according to the schema.",
      {
        inlineData: {
          mimeType: "application/pdf",
          data: resumeDataString,
        },
      },
    ],
    config: {
      tools: [{ functionDeclarations: [resumeSchema] }],
    },
  });
  if (response.functionCalls && response.functionCalls.length > 0) {
    console.log(response.functionCalls);
    if (!response.functionCalls[0].args) {
      console.log(response);
      return {
        success: false,
        error: "Error While Fetching",
      };
    }
    return {
      success: true,
      response: response.functionCalls[0].args as ResumeSchema,
    };
  } else {
    console.log("Error While Fetching", response);
    return {
      success: false,
      error: "error",
    };
  }
};

const analysisInfo = async (
  jobInfo: JobDescription,
  resume: ResumeSchema
): Promise<ApiResponse<ResumeAnalysisOutput>> => {
  console.log("Running Job Analysis");
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [JSON.stringify(jobInfo), JSON.stringify(resume)],
    config: {
      tools: [{ functionDeclarations: [resultSchema] }],
    },
  });
  if (response.functionCalls) {
    console.log(response.functionCalls);
    if (!response.functionCalls[0].args)
      return {
        success: false,
        error: "Error While Fetching",
      };
    return {
      success: true,
      response: response.functionCalls[0].args as ResumeAnalysisOutput,
    };
  } else {
    return {
      success: false,
      error: "error",
    };
  }
};

export { extractJobInfo, extractResumeInfo, analysisInfo };
