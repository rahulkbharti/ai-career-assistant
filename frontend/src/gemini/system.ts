import { GoogleGenerativeAI } from "@google/generative-ai";

import JDSchema from "./schemas/job_descriptions.schema.ts";
import ResumeSchema from "./schemas/resume.schema.ts";
import analysisResult from "./schemas/job_analysis.schema.ts";

import type { JobDescription } from "../schema/types/jd.types.ts";
import type { ResumeSchema as ResumeSchemaTYPE } from "../schema/types/resume.types.ts";

interface ApiResponse<T = any> {
  success: boolean;
  response?: T;
  error?: string;
}

const API_KEY = "AIzaSyDqI_RR_DZToRIBOc33jw2nbEBInxZDx_8"; // You should get this from environment variables

if (!API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export const extractJobInformation = async (
  prompt: string = ""
): Promise<ApiResponse<string>> => {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are an expert HR analyst. Your task is to Extruct the JOb information for ATS. Strictly Follow the responseSchema",
            },
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: JDSchema,
      },
    });

    const response = result.response.text();
    console.log("The Result", response);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error generating content:", error);
    return { success: false, error: error.message };
  }
};

export const extractResumeInformation = async (
  data_string: string = ""
): Promise<ApiResponse<string>> => {
  try {
    if (!data_string) {
      return { success: false, error: "Data not found" };
    }
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are an expert HR analyst. Your task is Exturct Resume DATA for ATS. Strictly Follow the responseSchema",
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: data_string,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: ResumeSchema,
      },
    });

    const response = result.response.text();
    console.log("The Result", response);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error generating content:", error);
    return { success: false, error: error.message };
  }
};

export const jobAnalysis = async (
  jobInfo: JobDescription,
  resumeInfo: ResumeSchemaTYPE
): Promise<ApiResponse<string>> => {
  try {
    const promt = `This Is JOB INFO :  ${JSON.stringify(
      jobInfo
    )} \n This is Resume : ${JSON.stringify(resumeInfo)}}`;
    console.log(promt);
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: ` **Role and Goal:** You are an expert HR analyst. Your task is to meticulously compare the provided resume against the job description and calculate a precise matching score out of 100. Strictly Follow the responseSchema.`,
            },
            {
              text: promt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: analysisResult,
      },
    });

    const response = result.response.text();
    console.log("The Result", response);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error generating content:", error);
    return { success: false, error: error.message };
  }
};
