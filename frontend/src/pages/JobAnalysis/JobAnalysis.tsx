// src/pages/JobAnalysis/JobAnalysis.tsx
import React, { useState } from "react";
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
import AnalysisResult from "./components/AnalysisResult/AnalysisResult";
import useJobAnalysis from "./hooks/useJobAnalysis";

const JobAnalysis: React.FC = () => {
  const { result, loading, error, analyzeJob, resetAnalysis } =
    useJobAnalysis();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleAnalyze = (request: any) => {
    analyzeJob(request);
  };

  const handleSaveToTracker = () => {
    // This would integrate with the job tracker functionality
    setSaveDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };

  const handleConfirmSave = () => {
    // Save the job to the tracker
    console.log("Saving job to tracker:", result);
    setSaveDialogOpen(false);
    // Here you would call a function to save the job to your tracker
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Job Analysis
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!result ? (
        <JobDescriptionForm onAnalyze={handleAnalyze} loading={loading} />
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
