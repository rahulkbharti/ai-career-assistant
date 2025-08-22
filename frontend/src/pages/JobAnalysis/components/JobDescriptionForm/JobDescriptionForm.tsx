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
  Chip,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import type { JobAnalysisRequest } from "../../../../services/jobAnalysisService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import type {
  JobDescription,
  SalaryRange,
  SkillsAnalysis,
} from "../../../../store/schema/job.schema";

const ArrayInput: React.FC<{
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
  placeholder: string;
}> = ({ items, onChange, label, placeholder }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <TextField
          fullWidth
          size="small"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
        />
        <Button variant="contained" onClick={handleAddItem}>
          <AddIcon />
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleRemoveItem(index)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

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

  const handleSkillsChange = (
    category: keyof SkillsAnalysis,
    skills: string[]
  ) => {
    setJobInfo((prev) => ({
      ...prev,
      skills_analysis: {
        ...prev.skills_analysis,
        [category]: skills,
      },
    }));
  };

  const handleSalaryChange = (field: keyof SalaryRange, value: number) => {
    setJobInfo((prev) => ({
      ...prev,
      salary_range: {
        ...prev.salary_range,
        [field]: value,
      },
    }));
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
            startIcon={extracting ? <CircularProgress size={16} /> : null}
          >
            {extracting ? "Extracting..." : "Extract Job Description"}
          </Button>
        </Box>
      </form>
      {jobInfo.company_name && (
        <>
          <Box sx={{ mt: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Basic Info" />
              <Tab label="Description" />
              <Tab label="Responsibilities" />
              <Tab label="Qualifications" />
              <Tab label="Skills Analysis" />
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

            {activeTab === 1 && (
              <TextField
                fullWidth
                multiline
                rows={8}
                label="Job Description"
                value={jobInfo?.job_description}
                onChange={(e) =>
                  handleInputChange("job_description", e.target.value)
                }
              />
            )}

            {activeTab === 2 && (
              <ArrayInput
                items={jobInfo?.responsibilities}
                onChange={(items) =>
                  handleInputChange("responsibilities", items)
                }
                label="Responsibilities"
                placeholder="Add a responsibility"
              />
            )}

            {activeTab === 3 && (
              <ArrayInput
                items={jobInfo?.qualifications}
                onChange={(items) => handleInputChange("qualifications", items)}
                label="Qualifications"
                placeholder="Add a qualification"
              />
            )}

            {activeTab === 4 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    Required Skills
                  </Typography>
                  <ArrayInput
                    items={jobInfo?.skills_analysis.required}
                    onChange={(items) => handleSkillsChange("required", items)}
                    label="Required Skills"
                    placeholder="Add a required skill"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Preferred Skills
                  </Typography>
                  <ArrayInput
                    items={jobInfo?.skills_analysis.preferred}
                    onChange={(items) => handleSkillsChange("preferred", items)}
                    label="Preferred Skills"
                    placeholder="Add a preferred skill"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Nice-to-Have Skills
                  </Typography>
                  <ArrayInput
                    items={jobInfo?.skills_analysis.nicetohave}
                    onChange={(items) =>
                      handleSkillsChange("nicetohave", items)
                    }
                    label="Nice-to-Have Skills"
                    placeholder="Add a nice-to-have skill"
                  />
                </Grid>
              </Grid>
            )}

            {activeTab === 5 && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    size={"small"}
                    fullWidth
                    type="number"
                    label="Minimum Salary"
                    value={jobInfo?.salary_range.min_salary}
                    onChange={(e) =>
                      handleSalaryChange(
                        "min_salary",
                        parseFloat(e.target.value)
                      )
                    }
                    InputProps={{
                      inputProps: { min: 0, step: 0.01 },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    size={"small"}
                    fullWidth
                    type="number"
                    label="Maximum Salary"
                    value={jobInfo?.salary_range.max_salary}
                    onChange={(e) =>
                      handleSalaryChange(
                        "max_salary",
                        parseFloat(e.target.value)
                      )
                    }
                    InputProps={{
                      inputProps: { min: 0, step: 0.01 },
                    }}
                  />
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
              startIcon={analysing ? <CircularProgress size={16} /> : null}
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
