// src/pages/JobAnalysis/components/ProjectRecommendations/ProjectRecommendations.tsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Rating,
} from "@mui/material";
import type { JobAnalysisResponse } from "../../../../services/jobAnalysisService";
interface ProjectRecommendationsProps {
  result: JobAnalysisResponse;
}

const ProjectRecommendations: React.FC<ProjectRecommendationsProps> = ({
  result,
}) => {
  const { projectSuggestions } = result;

  if (!projectSuggestions || projectSuggestions.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Project Recommendations
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Based on your profile, these projects are most relevant to highlight for
        this role:
      </Typography>

      <Grid container spacing={2}>
        {projectSuggestions.map((project: any, index: number) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {project.projectName}
                  </Typography>
                  <Rating
                    value={project.relevanceScore * 5}
                    readOnly
                    precision={0.1}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Relevance: {Math.round(project.relevanceScore * 100)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={project.relevanceScore * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Typography variant="body2" paragraph>
                  {project.reason}
                </Typography>

                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    Skills Demonstrated:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {project.skillsDemonstrated.map((skill: string) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectRecommendations;
