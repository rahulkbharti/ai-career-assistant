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
            <Button variant="outlined" sx={{ mr: 1 }}>
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
