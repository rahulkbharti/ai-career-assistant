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
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import type { JobAnalysisRequest } from "../../../../services/jobAnalysisService";

interface JobDescriptionFormProps {
  onAnalyze: (request: JobAnalysisRequest) => void;
  loading: boolean;
}

const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  onAnalyze,
  loading,
}) => {
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [resume, setResume] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    onAnalyze({
      jobDescription: jobDescription.trim(),
      company: company.trim() || undefined,
      role: role.trim() || undefined,
    });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft"
              InputProps={{
                startAdornment: <BusinessIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
              InputProps={{
                startAdornment: <WorkIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Selected Resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="e.g., MyResume.pdf"
              InputProps={{
                startAdornment: <WorkIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
        </Grid>

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
            <Button size="small" onClick={handlePaste} disabled={loading}>
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

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !jobDescription.trim()}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? "Analyzing..." : "Analyze Job Description"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default JobDescriptionForm;
