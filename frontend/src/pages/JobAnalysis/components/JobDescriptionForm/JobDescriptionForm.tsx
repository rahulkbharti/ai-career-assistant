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
  IconButton,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Add as AddIcon,
  Close as CloseIcon,
  AutoAwesome,
} from "@mui/icons-material";
import type { JobAnalysisRequest } from "../../../../services/jobAnalysisService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import type { JobDescription } from "../../../../schema/types/jd.types";
import type { ResumeSchema } from "../../../../schema/types/resume.types";

interface JobDescriptionFormComponentProps {
  jobInfo: JobDescription;
  setJobInfo: React.Dispatch<React.SetStateAction<JobDescription>>;
  extracting: boolean;
  analysing: boolean;
  extractJobInfo: (desc: string) => void;
  analyzeJob: (jobInfo: JobDescription, resume: ResumeSchema) => void;
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
  const handleJobAnalysis = () => {
    if (resume === "empty") {
      alert("Please select a resume.");
      return;
    }
    const selectedResume = resumes.find((_resume) => _resume.id === resume);
    if (!selectedResume) {
      alert("Cannot find resume.");
      return;
    }
    analyzeJob(jobInfo, selectedResume);
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
    } catch (err) {
      console.error("Failed to read clipboard contents:", err);
    }
  };

  const handleJobExtruction = () => {
    if (!jobDescription) {
      alert("Enter The Job Description");
      return;
    }
    extractJobInfo(jobDescription);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    name: string,
    index?: number
  ) => {
    const job = { ...jobInfo };
    const value = e.target.value;
    switch (section) {
      case "coreResponsibilities":
        if (typeof index === "number") job.coreResponsibilities[index] = value;
        break;
      case "qualifications":
        if (typeof name === "string" && typeof index === "number")
          if (name === "required") {
            job.qualifications.required[index] = value;
          } else {
            job.qualifications.preferred[index] = value;
          }
        break;
      case "technicalSkills":
        if (typeof index === "number") {
          if (name === "mustHave") {
            job.technicalSkills.mustHave[index] = value;
          } else {
            job.technicalSkills.niceToHave[index] = value;
          }
        }
        break;
      case "softSkills":
        if (typeof index === "number") job.softSkills[index] = value;
        break;
      case "keywords":
        if (typeof index === "number") job.keywords[index] = value;
        break;
      default:
        if (name === "jobTitle") job.jobTitle = value;
        else if (name === "companyName") job.companyName = value;
        else if (name === "location") job.location = value;
        else if (name === "jobType")
          job.jobType = value as JobDescription["jobType"];
        else if (name === "jobSummary") job.jobSummary = value;
        break;
    }
    setJobInfo(job);
  };
  const handleAddItem = (section: string, name?: string) => {
    const job = { ...jobInfo };
    switch (section) {
      case "coreResponsibilities":
        job.coreResponsibilities.push("");
        break;
      case "qualifications":
        if (name === "required" || name === "preferred")
          job.qualifications[name].push("");
        break;
      case "technicalSkills":
        if (name === "mustHave" || name === "niceToHave")
          job.technicalSkills[name].push("");
        break;
      case "softSkills":
        job.softSkills.push("");
        break;
      case "keywords":
        job.keywords.push("");
        break;
    }
    setJobInfo(job);
  };
  const handleRemoveItem = (section: string, index: number, name?: string) => {
    const job = { ...jobInfo };
    switch (section) {
      case "coreResponsibilities":
        job.coreResponsibilities.splice(index, 1);
        break;
      case "qualifications":
        if (name === "required") {
          job.qualifications.required.splice(index, 1);
        } else if (name === "preferred") {
          job.qualifications.preferred.splice(index, 1);
        }
        break;
      case "technicalSkills":
        if (name === "mustHave") {
          job.technicalSkills.mustHave.splice(index, 1);
        } else if (name === "niceToHave") {
          job.technicalSkills.niceToHave.splice(index, 1);
        }
        break;
      case "softSkills":
        job.softSkills.splice(index, 1);
        break;
      case "keywords":
        job.keywords.splice(index, 1);
        break;
      default:
        break;
    }
    setJobInfo(job);
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

      <Box>
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
            type="button"
            variant="contained"
            size="large"
            disabled={extracting || !jobDescription.trim()}
            startIcon={
              extracting ? <CircularProgress size={16} /> : <AutoAwesome />
            }
            onClick={handleJobExtruction}
          >
            {extracting ? "Extracting..." : "Extract Job Description"}
          </Button>
        </Box>
      </Box>
      {jobInfo && (
        <>
          <Box sx={{ mt: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Basic Info" />
              <Tab label="Responsibilities" />
              <Tab label="Qualifications" />
              <Tab label="Technical Skills" />
              <Tab label="Soft Skills" />
              <Tab label="KeyWords" />
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
                    value={jobInfo?.jobTitle}
                    onChange={(e) => handleInputChange(e, "", "jobTitle")}
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
                    value={jobInfo?.companyName}
                    onChange={(e) => handleInputChange(e, "", "companyName")}
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
                    onChange={(e) => handleInputChange(e, "", "location")}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Employment Type</InputLabel>
                    <Select
                      size={"small"}
                      value={jobInfo?.jobType}
                      label="Employment Type"
                      onChange={(e) => handleInputChange(e, "", "jobType")}
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Temporary">Temporary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Job Summary"
                    fullWidth
                    multiline
                    rows={3}
                    value={jobInfo?.jobSummary}
                    onChange={(e) => handleInputChange(e, "", "jobSummary")}
                  />
                </Grid>
              </Grid>
            )}
            {activeTab == 1 && (
              <Box>
                {jobInfo.coreResponsibilities.map((responce, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      placeholder="Responsibilty"
                      value={responce}
                      margin="dense"
                      onChange={(e) =>
                        handleInputChange(e, "coreResponsibilities", "", index)
                      }
                    />
                    <IconButton
                      onClick={() =>
                        handleRemoveItem("coreResponsibilities", index)
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("coreResponsibilities")}
                >
                  Add Responsibilities
                </Button>
              </Box>
            )}
            {activeTab == 2 && (
              <Box>
                <Typography variant="h6">Required Qualifications</Typography>
                {jobInfo.qualifications.required.map((qualification, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      placeholder="Required Qualification"
                      value={qualification}
                      margin="dense"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "qualifications",
                          "required",
                          index
                        )
                      }
                    />
                    <IconButton
                      onClick={() =>
                        handleRemoveItem("qualifications", index, "required")
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("qualifications", "required")}
                >
                  {" "}
                  Add Qualification
                </Button>
                <Typography variant="h6">Prfered Qulifications</Typography>
                {jobInfo.qualifications.preferred.map(
                  (qualification, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        placeholder="Prefered Qualification"
                        value={qualification}
                        margin="dense"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "qualifications",
                            "preferred",
                            index
                          )
                        }
                      />
                      <IconButton
                        onClick={() =>
                          handleRemoveItem("qualifications", index, "preferred")
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )
                )}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("qualifications", "preferred")}
                >
                  Add Qualification
                </Button>
              </Box>
            )}
            {activeTab == 3 && (
              <Box>
                <Typography variant="h6">Required Skills</Typography>
                {jobInfo.technicalSkills.mustHave.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      placeholder="Must Have Skill"
                      value={skill}
                      margin="dense"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "technicalSkills",
                          "mustHave",
                          index
                        )
                      }
                    />
                    <IconButton
                      onClick={() =>
                        handleRemoveItem("technicalSkills", index, "mustHave")
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("technicalSkills", "mustHave")}
                >
                  Add Skill
                </Button>
                <Typography variant="h6">Prfered Skills</Typography>
                {jobInfo.technicalSkills.niceToHave.map(
                  (qualification, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        placeholder="Nice To Have Skill"
                        value={qualification}
                        margin="dense"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "technicalSkills",
                            "niceToHave",
                            index
                          )
                        }
                      />
                      <IconButton
                        onClick={() =>
                          handleRemoveItem(
                            "technicalSkills",
                            index,
                            "niceToHave"
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )
                )}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("technicalSkills", "niceToHave")}
                >
                  Add Skill
                </Button>
              </Box>
            )}
            {activeTab == 4 && (
              <Box>
                {jobInfo.softSkills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      placeholder="Soft Skill"
                      value={skill}
                      margin="dense"
                      onChange={(e) =>
                        handleInputChange(e, "softSkills", "", index)
                      }
                    />
                    <IconButton
                      onClick={() => handleRemoveItem("softSkills", index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("softSkills", "")}
                >
                  Add Skill
                </Button>
              </Box>
            )}
            {activeTab == 5 && (
              <Box>
                {jobInfo.keywords.map((keyword, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      placeholder="keyword"
                      value={keyword}
                      margin="dense"
                      onChange={(e) =>
                        handleInputChange(e, "keywords", "", index)
                      }
                    />
                    <IconButton
                      onClick={() => handleRemoveItem("keywords", index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => handleAddItem("keywords", "")}
                >
                  Add Keyword
                </Button>
              </Box>
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
              onClick={handleJobAnalysis}
              disabled={analysing}
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
