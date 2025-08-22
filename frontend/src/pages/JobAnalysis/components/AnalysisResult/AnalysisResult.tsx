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
import type { JobAnalysisResult } from "../../../../store/schema/result.schema";

interface AnalysisResultProps {
  result: JobAnalysisResult;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
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
          {result.job_role} at {result.company_name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Profile Match:
          </Typography>
          <Box sx={{ width: "100px", mr: 2 }}>
            <LinearProgress
              variant="determinate"
              // value={gapAnalysis.matchPercentage}
              sx={{ height: 10, borderRadius: 5 }}
              // color={
              //   gapAnalysis.matchPercentage > 75
              //     ? "success"
              //     : gapAnalysis.matchPercentage > 50
              //     ? "warning"
              //     : "error"
              // }
            />
          </Box>
          <Typography variant="body2" fontWeight="bold">
            {/* {gapAnalysis.matchPercentage}% */}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Skills Analysis */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Skills Analysis
          </Typography>

          {result.skills_analysis.required.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Required Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {result.skills_analysis.required.map((skill) => (
                  <Chip
                    key={skill.skill}
                    label={skill.skill}
                    color={skill.match ? "success" : "error"}
                    size="small"
                    icon={skill.match ? <CheckIcon /> : <WarningIcon />}
                  />
                ))}
              </Box>
            </Box>
          )}

          {result.skills_analysis.preferred.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preferred Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {result.skills_analysis.preferred.map((skill) => (
                  <Chip
                    key={skill.skill}
                    label={skill.skill}
                    color={skill.match ? "success" : "default"}
                    variant={skill.match ? "filled" : "outlined"}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {result.skills_analysis.nicetohave.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Nice-to-Have Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {result.skills_analysis.nicetohave.map((skill) => (
                  <Chip
                    key={skill.skill}
                    label={skill.skill}
                    color={skill.match ? "success" : "default"}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {result.skills_analysis.missing.length > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Missing Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {result.skills_analysis.missing.map((skill) => (
                  <Chip
                    key={skill.skill}
                    label={skill.skill}
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
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <SkillMatchChart
            matchedSkills={matchedSkills.length}
            totalSkills={extractedSkills.length}
            matchPercentage={gapAnalysis.matchPercentage}
          />
        </Grid> */}
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
                {result.gap_analysis.map((strength, index) => (
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
                {result.area_of_improvements.map((weakness, index) => (
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
      <ProjectRecommendations recomendations={result.recomendations} />

      <Divider sx={{ my: 3 }} />

      {/* Suggestions */}
      <SuggestionList suggestions={result.suggestions} />
    </Paper>
  );
};

export default AnalysisResult;
