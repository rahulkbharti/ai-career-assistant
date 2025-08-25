// src/pages/JobAnalysis/hooks/useJobAnalysis.ts
import { useState } from "react";
import type { JobDescription } from "../../../schema/types/jd.types.ts";
import type { ResumeAnalysisOutput } from "../../../schema/types/result.types.ts";
import type { ResumeSchema } from "../../../schema/types/resume.types.ts";
import {
  extractJobInfo as ExtractJobInfo,
  analysisInfo,
} from "../../../gemini/system2.ts";

const initialJobData: JobDescription = {
  jobTitle: "",
  companyName: "",
  location: "",
  jobType: "Unknown",
  jobSummary: "",
  coreResponsibilities: [],
  qualifications: {
    required: [],
    preferred: [],
  },
  technicalSkills: {
    mustHave: [],
    niceToHave: [],
  },
  softSkills: [],
  keywords: [],
};

const useJobAnalysis = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisOutput | null>(null);
  const [jobInfo, setJobInfo] = useState<JobDescription>(initialJobData);
  const [extracting, setExtracting] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractJobInfo = async (job_description: string) => {
    setExtracting(true);
    console.log("Extracting job information...");
    const jobInfo = await ExtractJobInfo(job_description);
    // const jobInfo = await extractJobInformation(job_description);
    console.log("Extracted job information:", jobInfo);
    if (!jobInfo.response) {
      alert(jobInfo.error);
      setExtracting(false);
      throw new Error("Failed to extract job information");
    }
    setJobInfo(jobInfo.response);
    setExtracting(false);
  };

  const analyzeJob = async (jobInfo: JobDescription, resume: ResumeSchema) => {
    setAnalysing(true);
    setError(null);

    console.log("Analyzing job with info:", jobInfo);
    console.log("Resume selected:", resume);
    try {
      setAnalysing(true);
      const res = await analysisInfo(jobInfo, resume);
      console.log("Result Analysis Report ", res);
      if (!res.response) {
        alert(res.error);
        setExtracting(false);
        setShowResult(false);
        throw new Error("Failed to extract job information");
      }
      setShowResult(true);
      setResult(res.response);
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
    setShowResult(false);
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
