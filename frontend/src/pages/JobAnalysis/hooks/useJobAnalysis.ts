// src/pages/JobAnalysis/hooks/useJobAnalysis.ts
import { useState } from "react";
import {
  analyzeJobDescription,
  type JobAnalysisRequest,
  type JobAnalysisResponse,
} from "../../../services/jobAnalysisService";

const useJobAnalysis = () => {
  const [result, setResult] = useState<JobAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeJob = async (request: JobAnalysisRequest) => {
    setLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeJobDescription(request);
      setResult(analysisResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return {
    result,
    loading,
    error,
    analyzeJob,
    resetAnalysis,
  };
};

export default useJobAnalysis;
