// src/pages/JobAnalysis/components/JobDescriptionForm/JobDescriptionForm.tsx
import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  AutoAwesome,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import type { JobDescription } from "../../../../store/schema/job.schema";

interface JobDescriptionFormComponentProps {
  jobInfo: JobDescription;
  setJobInfo: React.Dispatch<React.SetStateAction<JobDescription>>;
  extracting: boolean;
  analysing: boolean;
  extractJobInfo: (desc: string) => void;
  analyzeJob: (jobInfo: JobDescription, resume: any) => void;
}

const JobDescriptionForm: React.FC<JobDescriptionFormComponentProps> = ({
  jobInfo,
  setJobInfo,
  extracting,
  analysing,
  extractJobInfo,
  analyzeJob,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("empty");
  const [error, setError] = useState("");

  const resumes = useSelector(
    (state: RootState) => state.resumes.resumes || []
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    if (extracting) {
      setError("Job description is already being analyzed");
      return;
    }
    extractJobInfo(jobDescription.trim());
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }
  };

  const handleInputChange = (field: keyof JobDescription, value: any) => {
    setJobInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyzeJob = () => {
    if (analysing) return;
    const selectedResume = resumes.find((r) => r.id === resume);
    if (selectedResume) {
      analyzeJob(jobInfo, selectedResume);
    } else {
      alert("Select a resume to analyze against the job description");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <DescriptionIcon sx={{ mr: 1 }} /> Job Description Analysis
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Paste a job description to analyze how well your profile matches the
        role and get tailored suggestions for your resume.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">Job Description</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handlePaste}
              disabled={extracting}
            >
              Paste from clipboard
            </Button>
          </Box>

          <TextField
            size="small"
            fullWidth
            multiline
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            variant="outlined"
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={extracting || !jobDescription.trim()}
            startIcon={
              extracting ? <CircularProgress size={16} /> : <AutoAwesome />
            }
          >
            {extracting ? "Extracting..." : "Extract Job Description"}
          </Button>
        </Box>
      </form>
      {jobInfo && (
        <>
          <Box sx={{ mt: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Basic Info" />
              <Tab label="Description" />
              <Tab label="Responsibilities" />
              <Tab label="Qualifications" />
              <Tab label="Skills" />
              <Tab label="Salary" />
            </Tabs>
          </Box>
          <Box sx={{ py: 3 }}>
            {activeTab === 0 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Job Role"
                    value={jobInfo?.job_title}
                    onChange={(e) =>
                      handleInputChange("job_title", e.target.value)
                    }
                    placeholder="e.g., Senior Frontend Developer"
                    InputProps={{
                      startAdornment: (
                        <WorkIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Company Name"
                    value={jobInfo?.company_name}
                    onChange={(e) =>
                      handleInputChange("company_name", e.target.value)
                    }
                    placeholder="e.g., Google, Microsoft"
                    InputProps={{
                      startAdornment: (
                        <BusinessIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    size={"small"}
                    fullWidth
                    label="Location"
                    value={jobInfo?.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Employment Type</InputLabel>
                    <Select
                      size={"small"}
                      value={jobInfo?.employment_type}
                      label="Employment Type"
                      onChange={(e) =>
                        handleInputChange("employment_type", e.target.value)
                      }
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Temporary">Temporary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Box>
          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Select Resume</InputLabel>
              <Select
                size={"small"}
                value={resume}
                label="Select Resume"
                onChange={(e) => setResume(e.target.value)}
              >
                <MenuItem value="empty">Start from Scratch</MenuItem>
                {resumes &&
                  resumes.map((resume) => (
                    <MenuItem key={resume.id} value={resume.id}>
                      {resume.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={handleAnalyzeJob}
              disabled={analysing || !jobInfo.job_description.trim()}
              startIcon={
                analysing ? <CircularProgress size={16} /> : <AutoAwesome />
              }
            >
              {analysing ? "Analyzing..." : "Analyze Job Description"}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default JobDescriptionForm;
