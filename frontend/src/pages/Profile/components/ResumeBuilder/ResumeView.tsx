// ResumeView.tsx
import React from "react";
import {
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import type { ResumeSchema } from "../../../../schema/types/resume.types";

interface ResumeViewProps {
  resume: ResumeSchema;
}

const ResumeView: React.FC<ResumeViewProps> = ({ resume }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">{resume.basics.name}</Typography>
        <Chip label={resume.job_role} color="primary" />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Contact Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Address:</strong> {resume.basics.location.city},{" "}
            {resume.basics.location.region},{" "}
            {resume.basics.location.countryCode},{" "}
            {resume.basics.location.postalCode}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Phone:</strong> {resume.basics.phone}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Email:</strong> {resume.basics.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>LinkedIn:</strong>{" "}
            {
              resume.basics.profiles.find(
                (profile) => profile.network.toLowerCase() === "linkedin"
              )?.url
            }
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>GitHub:</strong>{" "}
            {
              resume.basics.profiles.find(
                (profile) => profile.network.toLowerCase() === "github"
              )?.url
            }
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <Typography paragraph>{resume.summary}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {resume.education.length === 0 && (
        <Typography>No education details available</Typography>
      )}
      {resume.education.map((edu, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography>
            <strong>{edu.institution}</strong>
          </Typography>
          <Typography>
            {edu.area} {edu.studyType && `- ${edu.studyType}`}
          </Typography>
          <Typography>GPA: {edu.gpa}</Typography>
          <Typography>Graduation: {edu.endDate}</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Technical Skills
      </Typography>
      <Grid container spacing={2}>
        {resume.skills.map((skill, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Typography>
              <strong>{skill.category}:</strong>{" "}
              {skill.keywords.map((keyword, i) => (
                <Chip
                  sx={{ mx: 0.5, mb: 0.5 }}
                  key={i}
                  label={keyword}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Experiences
      </Typography>
      {resume.workExperience.map((exp, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography>
            <strong>{exp.company}</strong> - {exp.position}
          </Typography>
          <Typography>
            {exp.startDate} to {exp.endDate} | {exp.location}
          </Typography>
          <List dense>
            {exp.highlights.map((resp, i) => (
              <ListItem
                key={i}
                sx={{
                  display: "list-item",
                  listStyleType: "disc",
                  pl: 0,
                  ml: 2,
                }}
              >
                <Typography variant="body2">{resp}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>
      {resume.projects.map((project, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography>
            {index + 1}. <strong>{project.name}</strong>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, my: 1 }}>
            {project.technologies.map((tech, i) => (
              <Chip key={i} label={tech} size="small" variant="outlined" />
            ))}
          </Box>
          <List dense>
            {project.highlights.map((desc, i) => (
              <ListItem
                key={i}
                sx={{
                  display: "list-item",
                  listStyleType: "disc",
                  pl: 0,
                  ml: 2,
                }}
              >
                <Typography variant="body2">{desc}</Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant="body2">
            <strong>GitHub:</strong> {project.repository}
          </Typography>
          <Typography variant="body2">
            <strong>Live Demo:</strong> {project.url}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Achievements
      </Typography>
      <List dense>
        {resume.achievements.map((achievement, index) => (
          <ListItem
            key={index}
            sx={{ display: "list-item", listStyleType: "disc", pl: 0, ml: 2 }}
          >
            <Typography variant="body2">
              <strong>{achievement.title}</strong> ({achievement.date}):{" "}
              {achievement.description}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ResumeView;
