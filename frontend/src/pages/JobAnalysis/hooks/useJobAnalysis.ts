// src/pages/JobAnalysis/hooks/useJobAnalysis.ts
import { useState } from "react";
import {
  analyzeJobDescription,
  type JobAnalysisRequest,
  type JobAnalysisResponse,
} from "../../../services/jobAnalysisService";
import { type JobDescription } from "../../../store/schema/job.schema.ts";
import { extractJobInformation, jobAnalysis } from "../../../gemini/system.ts";
import type { ResumeDataCreate } from "../../../store/schema/resume.schema.ts";
import type { JobAnalysisResult } from "../../../store/schema/result.schema.ts";

const initialJobData: JobDescription = {
  job_title: "",
  company_name: "",
  location: "",
  employment_type: "Full-time",
  job_description: "",
  responsibilities: [],
  qualifications: [],
  skills_analysis: {
    required: [],
    preferred: [],
    nicetohave: [],
  },
  salary_range: {
    min_salary: 0,
    max_salary: 0,
  },
};

const useJobAnalysis = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<JobAnalysisResult | null>(null);
  const [jobInfo, setJobInfo] = useState<JobDescription>(initialJobData);
  const [extracting, setExtracting] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractJobInfo = async (job_description: string) => {
    setExtracting(true);
    console.log("Extracting job information...");
    const jobInfo = await extractJobInformation(job_description);
    console.log("Extracted job information:", jobInfo);
    if (!jobInfo.response) {
      alert(jobInfo.error);
      setExtracting(false);
      throw new Error("Failed to extract job information");
    }
    const job_json_data = await JSON.parse(jobInfo.response);
    console.log("Job JSON Data:", job_json_data);
    setJobInfo(job_json_data);
    setExtracting(false);
  };

  const analyzeJob = async (
    jobInfo: JobDescription,
    resume: ResumeDataCreate
  ) => {
    setAnalysing(true);
    setError(null);

    console.log("Analyzing job with info:", jobInfo);
    console.log("Resume selected:", resume);
    try {
      setAnalysing(true);
      const result = await jobAnalysis(jobInfo, resume);
      console.log("Job Analysis Result:", result);
      if (result.success && result.response) {
        const result_json = await JSON.parse(result.response);
        console.log("Parsed Job Analysis Result:", result_json);
        setResult(result_json);
        setShowResult(true);
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert(err || "");
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setAnalysing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return {
    showResult,
    jobInfo,
    extracting,
    result,
    analysing,
    error,
    setJobInfo,
    extractJobInfo,
    analyzeJob,
    resetAnalysis,
  };
};

export default useJobAnalysis;
