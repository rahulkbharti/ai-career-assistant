// src/pages/JobTracker/JobTracker.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  useTheme,
  // useMediaQuery,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  CalendarToday as DateIcon,
  TrendingUp as StatusIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Notes as NotesIcon,
  ListAlt as ListAltIcon,
  Analytics as AnalyticsIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  LightbulbOutline as LightbulbOutlineIcon,
} from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";

import {
  getJobApplications,
  saveJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from "../../services/jobAnalysisService";
import type { JobApplication } from "../../services/jobAnalysisService";

// Tab panel component
// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// const TabPanel: React.FC<TabPanelProps> = ({
//   children,
//   value,
//   index,
//   ...other
// }) => {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`job-tracker-tabpanel-${index}`}
//       aria-labelledby={`job-tracker-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// };

// Job status options

const statusOptions = [
  { value: "saved", label: "Saved", color: "default" },
  { value: "applied", label: "Applied", color: "primary" },
  { value: "interviewing", label: "Interviewing", color: "warning" },
  { value: "rejected", label: "Rejected", color: "error" },
  { value: "offered", label: "Offered", color: "success" },
];

// Job application form component
interface JobFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    application: Omit<JobApplication, "id" | "analysisTimestamp">
  ) => void;
  editApplication?: JobApplication | null;
}

const JobForm: React.FC<JobFormProps> = ({
  open,
  onClose,
  onSubmit,
  editApplication,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    jobDescription: "",
    status: "saved" as JobApplication["status"],
    notes: "",
    resumeUsed: "",
    coverLetterUsed: "",
    nextSteps: [""],
  });

  useEffect(() => {
    if (editApplication) {
      setFormData({
        company: editApplication.company,
        role: editApplication.role,
        jobDescription: editApplication.jobDescription,
        status: editApplication.status,
        notes: editApplication.notes || "",
        resumeUsed: editApplication.resumeUsed || "",
        coverLetterUsed: editApplication.coverLetterUsed || "",
        nextSteps:
          editApplication.nextSteps.length > 0
            ? editApplication.nextSteps
            : [""],
      });
    } else {
      setFormData({
        company: "",
        role: "",
        jobDescription: "",
        status: "saved",
        notes: "",
        resumeUsed: "",
        coverLetterUsed: "",
        nextSteps: [""],
      });
    }
  }, [editApplication, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      nextSteps: formData.nextSteps.filter((step) => step.trim() !== ""),
      appliedDate: formData.status !== "saved" ? new Date() : undefined,
      analysis: {} as any, // This would be populated with actual analysis in a real app
    });
  };

  const handleAddNextStep = () => {
    setFormData({
      ...formData,
      nextSteps: [...formData.nextSteps, ""],
    });
  };

  const handleNextStepChange = (index: number, value: string) => {
    const newNextSteps = [...formData.nextSteps];
    newNextSteps[index] = value;
    setFormData({
      ...formData,
      nextSteps: newNextSteps,
    });
  };

  const handleRemoveNextStep = (index: number) => {
    const newNextSteps = formData.nextSteps.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      nextSteps: newNextSteps,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editApplication ? "Edit Job Application" : "Add New Job Application"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                size="small"
                fullWidth
                label="Company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                size="small"
                fullWidth
                label="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  size="small"
                  value={formData.status}
                  label="Status"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as JobApplication["status"],
                    })
                  }
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                size="small"
                fullWidth
                label="Job Description"
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData({ ...formData, jobDescription: e.target.value })
                }
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                size="small"
                fullWidth
                label="Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                size="small"
                fullWidth
                label="Resume Used"
                value={formData.resumeUsed}
                onChange={(e) =>
                  setFormData({ ...formData, resumeUsed: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                size="small"
                fullWidth
                label="Cover Letter Used"
                value={formData.coverLetterUsed}
                onChange={(e) =>
                  setFormData({ ...formData, coverLetterUsed: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" gutterBottom>
                Next Steps
              </Typography>
              {formData.nextSteps.map((step, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    value={step}
                    onChange={(e) =>
                      handleNextStepChange(index, e.target.value)
                    }
                    placeholder="Next step action"
                  />
                  <IconButton
                    onClick={() => handleRemoveNextStep(index)}
                    sx={{ ml: 1 }}
                    disabled={formData.nextSteps.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                onClick={handleAddNextStep}
                startIcon={<AddIcon />}
                size="small"
              >
                Add Next Step
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editApplication ? "Update" : "Add"} Application
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Job application card component
interface JobCardProps {
  application: JobApplication;
  onEdit: (application: JobApplication) => void;
  onDelete: (id: string) => void;
  onView: (application: JobApplication) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  application,
  onEdit,
  onDelete,
  onView,
}) => {
  const statusOption = statusOptions.find(
    (option) => option.value === application.status
  );

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            noWrap
            sx={{ maxWidth: "70%" }}
          >
            {application.role}
          </Typography>
          <Chip
            label={statusOption?.label}
            color={statusOption?.color as any}
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {application.company}
          </Typography>
        </Box>

        {application.appliedDate && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <DateIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Applied: {new Date(application.appliedDate).toLocaleDateString()}
            </Typography>
          </Box>
        )}

        {application.analysis && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <StatusIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Match: {application.analysis.estimatedApplicationStrength}%
            </Typography>
          </Box>
        )}

        {application.notes && (
          <Typography variant="body2" sx={{ mt: 2 }} noWrap>
            {application.notes}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <IconButton size="small" onClick={() => onView(application)}>
          <ViewIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onEdit(application)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(application.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

// Job tracker filters component
interface JobFiltersProps {
  filters: {
    status: string;
    company: string;
    role: string;
    sortBy: string;
  };
  onFilterChange: (field: string, value: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <FilterIcon sx={{ mr: 1 }} /> Filters
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => onFilterChange("status", e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="company">Company Name</MenuItem>
              <MenuItem value="role">Job Role</MenuItem>
              <MenuItem value="status">Application Status</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            size="small"
            fullWidth
            label="Company"
            value={filters.company}
            onChange={(e) => onFilterChange("company", e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon color="action" />,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            size="small"
            fullWidth
            label="Role"
            value={filters.role}
            onChange={(e) => onFilterChange("role", e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon color="action" />,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

// Job tracker stats component
interface JobStatsProps {
  applications: JobApplication[];
}

const JobStats: React.FC<JobStatsProps> = ({ applications }) => {
  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    interviewing: applications.filter((app) => app.status === "interviewing")
      .length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    offered: applications.filter((app) => app.status === "offered").length,
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Application Statistics
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {stats.total}
            </Typography>
            <Typography variant="body2">Total</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {stats.applied}
            </Typography>
            <Typography variant="body2">Applied</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="warning.main">
              {stats.interviewing}
            </Typography>
            <Typography variant="body2">Interviewing</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="error.main">
              {stats.rejected}
            </Typography>
            <Typography variant="body2">Rejected</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="success.main">
              {stats.offered}
            </Typography>
            <Typography variant="body2">Offered</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="text.secondary">
              {stats.total > 0
                ? Math.round((stats.offered / stats.total) * 100)
                : 0}
              %
            </Typography>
            <Typography variant="body2">Success Rate</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Main JobTracker component
const JobTracker: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [editApplication, setEditApplication] = useState<JobApplication | null>(
    null
  );
  const [viewApplication, setViewApplication] = useState<JobApplication | null>(
    null
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(
    null
  );

  const [filters, setFilters] = useState({
    status: "all",
    company: "",
    role: "",
    sortBy: "newest",
  });

  const theme = useTheme();
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

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddApplication = () => {
    setEditApplication(null);
    setFormOpen(true);
  };

  const handleEditApplication = (application: JobApplication) => {
    setEditApplication(application);
    setFormOpen(true);
  };

  const handleViewApplication = (application: JobApplication) => {
    setViewApplication(application);
  };

  const handleCloseView = () => {
    setViewApplication(null);
  };

  const handleSubmitApplication = async (
    applicationData: Omit<JobApplication, "id" | "analysisTimestamp">
  ) => {
    try {
      if (editApplication) {
        await updateJobApplication(editApplication.id, applicationData);
      } else {
        await saveJobApplication(applicationData);
      }
      setFormOpen(false);
      setEditApplication(null);
      loadApplications(); // Reload applications to reflect changes
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save application"
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    setApplicationToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (applicationToDelete) {
      try {
        await deleteJobApplication(applicationToDelete);
        setDeleteConfirmOpen(false);
        setApplicationToDelete(null);
        loadApplications(); // Reload applications to reflect changes
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete application"
        );
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setApplicationToDelete(null);
  };

  // Filter and sort applications
  const filteredApplications = applications
    .filter((app) => {
      if (filters.status !== "all" && app.status !== filters.status)
        return false;
      if (
        filters.company &&
        !app.company.toLowerCase().includes(filters.company.toLowerCase())
      )
        return false;
      if (
        filters.role &&
        !app.role.toLowerCase().includes(filters.role.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return (
            new Date(b.appliedDate || 0).getTime() -
            new Date(a.appliedDate || 0).getTime()
          );
        case "oldest":
          return (
            new Date(a.appliedDate || 0).getTime() -
            new Date(b.appliedDate || 0).getTime()
          );
        case "company":
          return a.company.localeCompare(b.company);
        case "role":
          return a.role.localeCompare(b.role);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Job Tracker
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <JobStats applications={applications} />

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="All Applications" />
          <Tab label="Saved" />
          <Tab label="Applied" />
          <Tab label="Interviewing" />
          <Tab label="Offers" />
        </Tabs>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">
          {filteredApplications.length}{" "}
          {filteredApplications.length === 1 ? "Application" : "Applications"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddApplication}
        >
          Add Application
        </Button>
      </Box>

      <JobFilters filters={filters} onFilterChange={handleFilterChange} />

      {filteredApplications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <WorkIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No job applications found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {filters.status !== "all" || filters.company || filters.role
              ? "Try adjusting your filters to see more results."
              : "Get started by adding your first job application."}
          </Typography>
          <Button variant="contained" onClick={handleAddApplication}>
            Add Your First Application
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filteredApplications.map((application) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={application.id}>
              <JobCard
                application={application}
                onEdit={handleEditApplication}
                onDelete={handleDeleteClick}
                onView={handleViewApplication}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <JobForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitApplication}
        editApplication={editApplication}
      />

      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this job application? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!viewApplication}
        onClose={handleCloseView}
        maxWidth="md"
        fullWidth
      >
        {viewApplication && (
          <>
            <DialogTitle>
              {viewApplication.role} at {viewApplication.company}
              <Chip
                label={
                  statusOptions.find((o) => o.value === viewApplication.status)
                    ?.label
                }
                color={
                  statusOptions.find((o) => o.value === viewApplication.status)
                    ?.color as any
                }
                size="small"
                sx={{ ml: 2 }}
              />
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0.5 }}>
                {/* Company and Role */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 1,
                    }}
                  >
                    <BusinessIcon
                      color="primary"
                      sx={{ mb: 1, fontSize: 24 }}
                    />
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Company
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {viewApplication.company}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 1,
                    }}
                  >
                    <WorkIcon color="primary" sx={{ mb: 1, fontSize: 24 }} />
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Role
                    </Typography>
                    <Typography variant="h6">{viewApplication.role}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Match Score
                    </Typography>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        mb: 1,
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={
                          viewApplication.analysis.estimatedApplicationStrength
                        }
                        size={80}
                        thickness={5}
                        color={
                          viewApplication.analysis
                            .estimatedApplicationStrength > 75
                            ? "success"
                            : viewApplication.analysis
                                .estimatedApplicationStrength > 50
                            ? "warning"
                            : "error"
                        }
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          color="text.primary"
                        >
                          {`${Math.round(
                            viewApplication.analysis
                              .estimatedApplicationStrength
                          )}%`}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {viewApplication.analysis.estimatedApplicationStrength >
                      75
                        ? "Strong Match"
                        : viewApplication.analysis
                            .estimatedApplicationStrength > 50
                        ? "Good Match"
                        : "Needs Improvement"}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Application Details */}
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <DateIcon sx={{ mr: 1 }} /> Application Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="body1">
                    {viewApplication.jobDescription}
                  </Typography>
                </Grid>

                {viewApplication.appliedDate && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DateIcon color="action" sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Applied Date
                        </Typography>
                        <Typography variant="body1">
                          {new Date(
                            viewApplication.appliedDate
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}

                {viewApplication.resumeUsed && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DescriptionIcon color="action" sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Resume Used
                        </Typography>
                        <Typography
                          variant="body1"
                          noWrap
                          sx={{ maxWidth: 200 }}
                        >
                          {viewApplication.resumeUsed}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}

                {viewApplication.coverLetterUsed && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DescriptionIcon color="action" sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Cover Letter Used
                        </Typography>
                        <Typography
                          variant="body1"
                          noWrap
                          sx={{ maxWidth: 200 }}
                        >
                          {viewApplication.coverLetterUsed}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}

                {/* Notes Section */}
                {viewApplication.notes && (
                  <>
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <NotesIcon sx={{ mr: 1 }} /> Notes
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Typography
                        variant="body1"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {viewApplication.notes}
                      </Typography>
                    </Grid>
                  </>
                )}

                {/* Next Steps */}
                {viewApplication.nextSteps &&
                  viewApplication.nextSteps.length > 0 && (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <ListAltIcon sx={{ mr: 1 }} /> Next Steps
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          {viewApplication.nextSteps.map((step, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckCircleOutlineIcon
                                  color="primary"
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              <ListItemText primary={step} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </>
                  )}

                {/* Analysis Section */}
                {viewApplication.analysis && (
                  <>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <AnalyticsIcon sx={{ mr: 1 }} /> Analysis
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {viewApplication.analysis.suggestedActions &&
                      viewApplication.analysis.suggestedActions.length > 0 && (
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Suggested Actions
                            </Typography>
                            <List dense>
                              {viewApplication.analysis.suggestedActions
                                .slice(0, 3)
                                .map((action, index) => (
                                  <ListItem key={index} sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <LightbulbOutlineIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    </ListItemIcon>
                                    <ListItemText primary={action} />
                                  </ListItem>
                                ))}
                            </List>
                            {viewApplication.analysis.suggestedActions.length >
                              3 && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                +
                                {viewApplication.analysis.suggestedActions
                                  .length - 3}{" "}
                                more suggestions
                              </Typography>
                            )}
                          </Paper>
                        </Grid>
                      )}
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseView}>Close</Button>
              <Button
                onClick={() => {
                  handleCloseView();
                  handleEditApplication(viewApplication);
                }}
                variant="contained"
              >
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default JobTracker;
