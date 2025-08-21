import React from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Work as WorkIcon,
  Code as CodeIcon,
  Description as ResumeIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Code as LeetCodeIcon,
  Computer as HackerRankIcon,
  Language as PortfolioIcon,
  CheckCircle as ValidIcon,
} from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";

import type { ProfileData } from "../../hooks/useProfileData";

interface ProfileOverviewProps {
  data: ProfileData;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ data }) => {
  const { resumes, socialLinks, skills, experience, preferredRoles } = data;

  const completedSections = [
    resumes.length > 0,
    socialLinks.length > 0,
    skills.length > 0,
    experience > 0,
    preferredRoles.length > 0,
  ].filter(Boolean).length;

  const profileCompleteness = (completedSections / 5) * 100;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <LinkedInIcon color="primary" />;
      case "github":
        return <GitHubIcon />;
      case "leetcode":
        return <LeetCodeIcon />;
      case "hackerrank":
        return <HackerRankIcon />;
      case "portfolio":
        return <PortfolioIcon color="secondary" />;
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Profile Overview
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Profile Completeness
          </Typography>
          <Typography variant="body2" color="primary">
            {Math.round(profileCompleteness)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={profileCompleteness}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <WorkIcon sx={{ mr: 1 }} /> Career Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Experience
                </Typography>
                <Typography variant="body1">
                  {experience} {experience === 1 ? "year" : "years"}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Preferred Roles
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {preferredRoles.map((role) => (
                    <Chip
                      key={role}
                      label={role}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Skills
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ResumeIcon sx={{ mr: 1 }} /> Resumes
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" gutterBottom>
                You have {resumes.length} resume
                {resumes.length !== 1 ? "s" : ""} tailored for:
              </Typography>

              <List dense>
                {resumes.map((resume) => (
                  <ListItem key={resume.id}>
                    <ListItemIcon>
                      <DescriptionIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={resume.role}
                      secondary={resume.name}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CodeIcon sx={{ mr: 1 }} /> Connected Profiles
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {socialLinks.map((link) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={link.platform}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {getPlatformIcon(link.platform)}
                      <Box sx={{ ml: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {link.platform}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          noWrap
                          sx={{ maxWidth: 200 }}
                        >
                          {link.username}
                        </Typography>
                      </Box>
                      {link.validated && (
                        <ValidIcon color="success" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {socialLinks.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 2 }}
                >
                  No profiles connected yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileOverview;
