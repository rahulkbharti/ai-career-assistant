import React from "react";
import {
  Typography,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

const Onboarding: React.FC = () => {
  return (
    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome to AI Career Assistant
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={0} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Upload Resume</StepLabel>
          </Step>
          <Step>
            <StepLabel>Connect Profiles</StepLabel>
          </Step>
          <Step>
            <StepLabel>Preferences</StepLabel>
          </Step>
        </Stepper>
        <Typography variant="body1" align="center">
          Let's get started by setting up your profile.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Onboarding;
