// src/pages/JobAnalysis/JobAnalysis.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import JobDescriptionForm from "./components/JobDescriptionForm/JobDescriptionForm";
import useJobAnalysis from "./hooks/useJobAnalysis";
import AnalysisResult from "./components/AnalysisResult/AnalysisResult";

import type { ResumeSchema } from "../../schema/types/resume.types";
import ResumeAnalysis from "./Result";
import Result from "./components/AnalysisResult/test";

const emptyResume: ResumeSchema = {
  id: "master",
  name: "Master Resume",
  job_role: "Software Engineer",
  basics: {
    name: "Alex Johnson",
    label: "Full Stack Developer",
    email: "alex.johnson@example.com",
    phone: "555-123-4567",
    location: {
      city: "San Francisco",
      region: "CA",
      countryCode: "US",
      postalCode: "94105",
    },
    website: "https://alexjohnson.dev",
    profiles: [
      {
        network: "LinkedIn",
        username: "alexjohnson",
        url: "https://linkedin.com/in/alexjohnson",
      },
      {
        network: "GitHub",
        username: "alexjdev",
        url: "https://github.com/alexjdev",
      },
    ],
  },
  summary:
    "Experienced full stack developer with a passion for building scalable web applications and working with modern JavaScript frameworks.",
  workExperience: [
    {
      company: "Tech Solutions Inc.",
      position: "Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2021-06-01",
      endDate: "2023-05-31",
      summary:
        "Developed and maintained user interfaces for SaaS products using React and TypeScript.",
      highlights: [
        "Implemented a reusable component library in React.",
        "Improved application performance by 30% through code optimization.",
      ],
      keywords: [],
    },
    {
      company: "Innovatech",
      position: "Software Engineer Intern",
      location: "Remote",
      startDate: "2020-06-01",
      endDate: "2020-08-31",
      summary: "Assisted in backend API development and database design.",
      highlights: [
        "Built RESTful APIs with Node.js and Express.",
        "Wrote unit tests to ensure code quality.",
      ],
      keywords: [],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: "2017-09-01",
      endDate: "2021-05-31",
      gpa: "3.8",
      courses: ["CS61A", "CS61B", "CS170"],
    },
  ],
  skills: [
    {
      category: "JavaScript",
      keywords: ["ES6", "React", "Node.js"],
    },
    {
      category: "TypeScript",
      keywords: ["Types", "Generics"],
    },
    {
      category: "Python",
      keywords: ["Flask", "Data Analysis"],
    },
  ],
  projects: [
    {
      name: "Personal Portfolio",
      summary:
        "A responsive portfolio website built with React and Material-UI.",
      technologies: ["React", "Material-UI"],
      highlights: ["Showcases projects and blogs.", "Deployed using Netlify."],
      url: "https://alexjohnson.dev",
      repository: "",
    },
    {
      name: "Task Manager API",
      summary:
        "RESTful API for managing tasks, built with Node.js and MongoDB.",
      technologies: ["Node.js", "MongoDB"],
      highlights: [
        "JWT authentication and CRUD operations.",
        "Comprehensive test coverage.",
      ],
      url: "https://github.com/alexjdev/task-manager-api",
      repository: "https://github.com/alexjdev/task-manager-api",
    },
  ],
  achievements: [
    {
      title: "Winner, Hackathon 2022",
      date: "2022-11-15",
      description: "Led a team to develop an AI-powered job matching platform.",
      url: "",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      date: "2023-03-01",
      issuer: "Amazon Web Services",
      url: "",
    },
  ],
  languages: [
    {
      language: "English",
      fluency: "Native",
    },
    {
      language: "Spanish",
      fluency: "Professional working proficiency",
    },
  ],
  interests: [
    {
      name: "Open Source",
      keywords: ["Contributing", "Community"],
    },
    {
      name: "Cycling",
      keywords: ["Road biking", "Fitness"],
    },
  ],
  references: [
    {
      note: "Alex is a dedicated developer who consistently delivers high-quality work.",
    },
  ],
};

const JobAnalysis: React.FC = () => {
  const {
    result,
    showResult,
    jobInfo,
    setJobInfo,
    extracting,
    analysing,
    extractJobInfo,
    analyzeJob,
    error,
    resetAnalysis,
  } = useJobAnalysis();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleSaveToTracker = () => {
    // This would integrate with the job tracker functionality
    setSaveDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };

  const handleConfirmSave = () => {
    // Save the job to the tracker
    // console.log("Saving job to tracker:", result);
    setSaveDialogOpen(false);
    // Here you would call a function to save the job to your tracker
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Job Analysis
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {showResult === false ? (
        <JobDescriptionForm
          jobInfo={jobInfo}
          setJobInfo={setJobInfo}
          extracting={extracting}
          analysing={analysing}
          extractJobInfo={extractJobInfo}
          analyzeJob={analyzeJob}
        />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="outlined" onClick={resetAnalysis} sx={{ mr: 1 }}>
              Analyze Another Job
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveToTracker}
              startIcon={<AddIcon />}
            >
              Save to Job Tracker
            </Button>
          </Box>

          <AnalysisResult result={result} />
        </>
      )}

      <Dialog open={saveDialogOpen} onClose={handleCloseSaveDialog}>
        <DialogTitle>
          Save to Job Tracker
          <IconButton
            aria-label="close"
            onClick={handleCloseSaveDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Would you like to save this job analysis to your job tracker? You'll
            be able to track your application status and refer back to these
            insights.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog}>Cancel</Button>
          <Button onClick={handleConfirmSave} variant="contained">
            Save Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobAnalysis;
