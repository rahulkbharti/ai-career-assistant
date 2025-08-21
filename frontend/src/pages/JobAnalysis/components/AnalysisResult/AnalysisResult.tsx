// src/pages/JobAnalysis/components/AnalysisResult/AnalysisResult.tsx
import React from "react";
import {
  Paper,
  Typography,
  Box,
  Chip,
  Alert,
  Divider,
  Grid,
  LinearProgress,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import type { JobAnalysisResponse } from "../../../../services/jobAnalysisService";
import SkillMatchChart from "../SkillMatchChart/SkillMatchChart";
import SuggestionList from "../SuggestionList/SuggestionList";
import ProjectRecommendations from "../ProjectRecommendations/ProjectRecommendations";

interface AnalysisResultProps {
  result: JobAnalysisResponse;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const { extractedRole, extractedCompany, extractedSkills, gapAnalysis } =
    result;

  const requiredSkills = extractedSkills.filter(
    (skill) => skill.importance === "required"
  );
  const preferredSkills = extractedSkills.filter(
    (skill) => skill.importance === "preferred"
  );
  const niceToHaveSkills = extractedSkills.filter(
    (skill) => skill.importance === "nice-to-have"
  );

  const matchedSkills = extractedSkills.filter((skill) => skill.foundInProfile);
  const missingSkills = extractedSkills.filter(
    (skill) => !skill.foundInProfile
  );
  const theme = useTheme();
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Analysis Results
      </Typography>

      {/* Header with extracted info */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {extractedRole} {extractedCompany && `at ${extractedCompany}`}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Profile Match:
          </Typography>
          <Box sx={{ width: "100px", mr: 2 }}>
            <LinearProgress
              variant="determinate"
              value={gapAnalysis.matchPercentage}
              sx={{ height: 10, borderRadius: 5 }}
              color={
                gapAnalysis.matchPercentage > 75
                  ? "success"
                  : gapAnalysis.matchPercentage > 50
                  ? "warning"
                  : "error"
              }
            />
          </Box>
          <Typography variant="body2" fontWeight="bold">
            {gapAnalysis.matchPercentage}%
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Skills Analysis */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Skills Analysis
          </Typography>

          {requiredSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Required Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {requiredSkills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    color={skill.foundInProfile ? "success" : "error"}
                    size="small"
                    icon={
                      skill.foundInProfile ? <CheckIcon /> : <WarningIcon />
                    }
                  />
                ))}
              </Box>
            </Box>
          )}

          {preferredSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preferred Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {preferredSkills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    color={skill.foundInProfile ? "success" : "default"}
                    variant={skill.foundInProfile ? "filled" : "outlined"}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {niceToHaveSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Nice-to-Have Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {niceToHaveSkills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    color={skill.foundInProfile ? "success" : "default"}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {missingSkills.length > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Missing Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {missingSkills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Alert>
          )}
        </Grid>

        {/* Skill Match Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SkillMatchChart
            matchedSkills={matchedSkills.length}
            totalSkills={extractedSkills.length}
            matchPercentage={gapAnalysis.matchPercentage}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Gap Analysis */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Gap Analysis
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Alert severity="success" icon={<CheckIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                Your Strengths
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {gapAnalysis.strengths.map((strength, index) => (
                  <Box component="li" key={index} sx={{ typography: "body2" }}>
                    {strength}
                  </Box>
                ))}
              </Box>
            </Alert>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Alert severity="info" icon={<InfoIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                Areas for Improvement
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {gapAnalysis.weaknesses.map((weakness, index) => (
                  <Box component="li" key={index} sx={{ typography: "body2" }}>
                    {weakness}
                  </Box>
                ))}
              </Box>
            </Alert>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Project Recommendations */}
      <ProjectRecommendations result={result} />

      <Divider sx={{ my: 3 }} />

      {/* Suggestions */}
      <SuggestionList result={result} />
    </Paper>
  );
};

export default AnalysisResult;
