// src/pages/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  // Paper,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  // useTheme,
  // useMediaQuery,
  Avatar,
  // AvatarGroup,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Event as EventIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  // Warning as WarningIcon,
  Schedule as ScheduleIcon,
  // Person as PersonIcon,
  Business as BusinessIcon,
  Analytics as AnalyticsIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { getJobApplications } from "../../services/jobAnalysisService";
import type { JobApplication } from "../../services/jobAnalysisService";
import SuggestionComponent from "./test";

// Stats card component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color?: string;
  progress?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = "primary",
  progress,
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4 }}
              color={color as any}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Task item component
interface TaskItemProps {
  text: string;
  dueDate?: Date;
  completed?: boolean;
  priority: "high" | "medium" | "low";
}

const TaskItem: React.FC<TaskItemProps> = ({
  text,
  dueDate,
  completed = false,
  priority,
}) => {
  const priorityColors = {
    high: "error",
    medium: "warning",
    low: "info",
  };

  return (
    <ListItem>
      <ListItemIcon>
        {completed ? (
          <CheckCircleIcon color="success" />
        ) : (
          <ScheduleIcon color={priorityColors[priority] as any} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Typography
              variant="body2"
              sx={{
                textDecoration: completed ? "line-through" : "none",
                opacity: completed ? 0.7 : 1,
              }}
            >
              {text}
            </Typography>
            {dueDate && (
              <Chip
                label={new Date(dueDate).toLocaleDateString()}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
        }
        secondary={
          !completed && (
            <Chip
              label={priority}
              size="small"
              color={priorityColors[priority] as any}
              variant="outlined"
            />
          )
        }
      />
    </ListItem>
  );
};

// Recent application component
interface RecentApplicationProps {
  application: JobApplication;
}

const RecentApplication: React.FC<RecentApplicationProps> = ({
  application,
}) => {
  const statusColors = {
    saved: "default",
    applied: "primary",
    interviewing: "warning",
    rejected: "error",
    offered: "success",
  };

  return (
    <ListItem>
      <ListItemIcon>
        <BusinessIcon color="action" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Typography variant="body2" sx={{ fontWeight: "medium", mr: 1 }}>
              {application.company}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {application.role}
            </Typography>
          </Box>
        }
        secondary={
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <Chip
              label={application.status}
              size="small"
              color={statusColors[application.status] as any}
              variant="outlined"
            />
            {application.appliedDate && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                Applied:{" "}
                {new Date(application.appliedDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

// Skill gap component
interface SkillGapProps {
  skill: string;
  relevance: number;
  yourLevel: number;
  requiredLevel: number;
}

const SkillGap: React.FC<SkillGapProps> = ({
  skill,
  relevance,
  yourLevel,
  requiredLevel,
}) => {
  const gap = requiredLevel - yourLevel;
  // const gapPercentage = Math.max(0, (gap / 5) * 100);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {skill}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Relevance: {relevance}%
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="caption" sx={{ width: 80 }}>
          Your level: {yourLevel}/5
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(yourLevel / 5) * 100}
          sx={{ flexGrow: 1, height: 8, borderRadius: 4, mx: 1 }}
          color={yourLevel >= requiredLevel ? "success" : "warning"}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="caption" sx={{ width: 80 }}>
          Required: {requiredLevel}/5
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(requiredLevel / 5) * 100}
          sx={{ flexGrow: 1, height: 8, borderRadius: 4, mx: 1 }}
          color="primary"
        />
      </Box>
      {gap > 0 && (
        <Alert severity="warning" sx={{ mt: 1 }}>
          You need to improve this skill by {gap} level{gap > 1 ? "s" : ""}
        </Alert>
      )}
    </Box>
  );
};

// Main Dashboard component
const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Load applications on component mount
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const apps = await getJobApplications();
      setApplications(apps);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    interviewing: applications.filter((app) => app.status === "interviewing")
      .length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    offered: applications.filter((app) => app.status === "offered").length,
    successRate:
      applications.length > 0
        ? Math.round(
            (applications.filter((app) => app.status === "offered").length /
              applications.length) *
              100
          )
        : 0,
  };

  // Mock data for tasks
  const tasks: TaskItemProps[] = [
    {
      text: "Follow up with Google recruiter",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      priority: "high",
    },
    {
      text: "Complete GraphQL tutorial",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      priority: "medium",
    },
    {
      text: "Update LinkedIn profile",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      priority: "medium",
    },
    {
      text: "Prepare for Amazon interview",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      priority: "high",
    },
    {
      text: "Send thank you email to Microsoft",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      completed: true,
      priority: "medium",
    },
  ];

  // Mock data for skill gaps
  const skillGaps: SkillGapProps[] = [
    {
      skill: "GraphQL",
      relevance: 85,
      yourLevel: 2,
      requiredLevel: 4,
    },
    {
      skill: "AWS",
      relevance: 75,
      yourLevel: 3,
      requiredLevel: 4,
    },
    {
      skill: "TypeScript",
      relevance: 90,
      yourLevel: 4,
      requiredLevel: 4,
    },
    {
      skill: "React",
      relevance: 95,
      yourLevel: 5,
      requiredLevel: 4,
    },
  ];

  // Mock data for recommendations
  const recommendations = [
    "Highlight your React experience in your resume summary",
    "Add 2-3 quantifiable achievements to your experience section",
    "Create a portfolio project demonstrating GraphQL skills",
    "Practice behavioral interview questions using the STAR method",
    "Connect with 5 recruiters from your target companies on LinkedIn",
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <SuggestionComponent />
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Welcome back! Here's an overview of your job search progress and
        recommendations.
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Applications"
            value={stats.total}
            subtitle="Jobs applied to"
            icon={<WorkIcon />}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Interviews"
            value={stats.interviewing}
            subtitle="Active interviews"
            icon={<EventIcon />}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Offers"
            value={stats.offered}
            subtitle="Job offers received"
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Success Rate"
            value={`${stats.successRate}%`}
            subtitle="Application to offer ratio"
            icon={<TrendingUpIcon />}
            color="info"
            progress={stats.successRate}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Applications */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AssignmentIcon sx={{ mr: 1 }} /> Recent Applications
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {applications.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <WorkIcon
                    sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                  />
                  <Typography variant="body1" color="textSecondary">
                    No job applications yet
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Start Applying
                  </Button>
                </Box>
              ) : (
                <List>
                  {applications.slice(0, 5).map((application, index) => (
                    <React.Fragment key={application.id}>
                      <RecentApplication application={application} />
                      {index < applications.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Skill Gaps Analysis */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AnalyticsIcon sx={{ mr: 1 }} /> Skill Gap Analysis
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Based on your recent job applications and profile
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {skillGaps.map((skill, index) => (
                <React.Fragment key={index}>
                  <SkillGap {...skill} />
                  {index < skillGaps.length - 1 && <Divider sx={{ my: 2 }} />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Upcoming Tasks */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ScheduleIcon sx={{ mr: 1 }} /> Upcoming Tasks
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                {tasks.map((task, index) => (
                  <React.Fragment key={index}>
                    <TaskItem {...task} />
                    {index < tasks.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>

              <Button fullWidth sx={{ mt: 2 }}>
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LightbulbIcon sx={{ mr: 1 }} /> Personalized Recommendations
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Based on your profile and job market trends
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List dense>
                {recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <LightbulbIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={recommendation} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
