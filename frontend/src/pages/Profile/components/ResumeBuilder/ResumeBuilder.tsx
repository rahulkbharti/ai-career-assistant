import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Paper,
  Divider,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  Alert,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addResume,
  updateResume,
  removeResume,
} from "../../../../store/features/resumeSlice";
import type { RootState } from "../../../../store/store";
import type { ResumeSchema } from "../../../../schema/types/resume.types";

// Components
import BasicInfoTab from "./tabs/BasicInfoTab";
import EducationTab from "./tabs/EducationTab";
import SkillsTab from "./tabs/SkillsTab";
import ExperienceTab from "./tabs/ExperienceTab";
import ProjectsTab from "./tabs/ProjectsTab";
import AchievementsTab from "./tabs/AchievementsTab";
import ResumeView from "./ResumeView";

const emptyResume: ResumeSchema = {
  id: "master",
  name: "Master Resume",
  job_role: "Your Job Role",
  basics: {
    name: "Your Name",
    label: "Your Label",
    email: "your.email@example.com",
    phone: "123-456-7890",
    location: {
      city: "Anytown",
      region: "CA",
      countryCode: "US",
      postalCode: "12345",
    },
    website: "https://yourwebsite.com",
    profiles: [
      {
        network: "LinkedIn",
        username: "your-linkedin",
        url: "https://linkedin.com/in/your-linkedin",
      },
      {
        network: "GitHub",
        username: "your-github",
        url: "https://github.com/your-github",
      },
    ],
  },
  summary: "A brief summary about yourself.",
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  achievements: [],
  certifications: [],
  languages: [],
  interests: [],
  references: [],
};

const ResumeBuilder = () => {
  const dispatch = useDispatch();
  const resumes = useSelector(
    (state: RootState) => state.resumes.resumes || []
  );

  const [selectedResume, setSelectedResume] = useState<ResumeSchema | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [newJobRole, setNewJobRole] = useState("");
  const [editingResume, setEditingResume] = useState<ResumeSchema | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [createFromMaster, setCreateFromMaster] = useState("empty");

  // Memoize the master resume to prevent unnecessary recalculations
  const masterResume = useMemo(() => {
    return resumes.find((r) => r.id === "master") || emptyResume;
  }, [resumes]);

  // Set initial selected resume
  useEffect(() => {
    if (resumes.length > 0 && !selectedResume) {
      setSelectedResume(resumes[0]);
    }
  }, [resumes, selectedResume]);

  const handleCreateResume = useCallback(() => {
    if (!newResumeName || !newJobRole) return;

    const baseResume =
      createFromMaster === "empty"
        ? emptyResume
        : resumes.find((r) => r.id === createFromMaster) || emptyResume;

    const _newResume: ResumeSchema = {
      ...baseResume,
      id: Date.now().toString(),
      name: newResumeName,
      job_role: newJobRole,
    };

    dispatch(addResume(_newResume));
    setNewResumeName("");
    setNewJobRole("");
    setDialogOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }, [newResumeName, newJobRole, createFromMaster, resumes, dispatch]);

  const handleEditResume = useCallback(() => {
    if (!editingResume) return;

    dispatch(updateResume(editingResume));
    setSelectedResume(editingResume);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }, [editingResume, dispatch]);

  const handleDeleteResume = useCallback(
    (id: string) => {
      if (id === "master") {
        alert("Cannot delete master resume");
        return;
      }

      dispatch(removeResume(id));

      if (selectedResume?.id === id) {
        const nextResume = resumes.find((r) => r.id !== id) || masterResume;
        setSelectedResume(nextResume);
      }
    },
    [selectedResume, resumes, masterResume, dispatch]
  );

  // Handles input changes for nested resume fields
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      section: string,
      field: string,
      index?: number,
      subIndex?: number
    ) => {
      if (!editingResume) return;
      const value = e.target.value;

      setEditingResume((prevResume) => {
        if (!prevResume) return null;

        const updatedResume = { ...prevResume };

        switch (section) {
          case "basics":
            if (
              field === "name" ||
              field === "email" ||
              field === "phone" ||
              field === "label" ||
              field === "website"
            ) {
              updatedResume.basics = {
                ...updatedResume.basics,
                [field]: value,
              };
            } else if (field.startsWith("location.")) {
              const locationField = field.split(
                "."
              )[1] as keyof typeof updatedResume.basics.location;
              updatedResume.basics.location = {
                ...updatedResume.basics.location,
                [locationField]: value,
              };
            } else if (field === "profiles" && typeof index === "number") {
              const updatedProfiles = [...updatedResume.basics.profiles];
              updatedProfiles[index] = {
                ...updatedProfiles[index],
                url: value,
              };
              updatedResume.basics.profiles = updatedProfiles;
            }
            break;

          case "education":
            if (typeof index === "number") {
              const updatedEducation = [...updatedResume.education];
              updatedEducation[index] = {
                ...updatedEducation[index],
                [field]: value,
              };
              updatedResume.education = updatedEducation;
            }
            break;

          case "skills":
            if (typeof index === "number") {
              const updatedSkills = [...updatedResume.skills];
              if (typeof subIndex === "number") {
                // Update keyword
                const updatedKeywords = [...updatedSkills[index].keywords];
                updatedKeywords[subIndex] = value;
                updatedSkills[index] = {
                  ...updatedSkills[index],
                  keywords: updatedKeywords,
                };
              } else {
                // Update category
                updatedSkills[index] = {
                  ...updatedSkills[index],
                  [field]: value,
                };
              }
              updatedResume.skills = updatedSkills;
            }
            break;

          case "workExperience":
            if (typeof index === "number") {
              const updatedWork = [...updatedResume.workExperience];
              if (typeof subIndex === "number" && field === "highlights") {
                // Update highlight
                const updatedHighlights = [...updatedWork[index].highlights];
                updatedHighlights[subIndex] = value;
                updatedWork[index] = {
                  ...updatedWork[index],
                  highlights: updatedHighlights,
                };
              } else {
                // Update other fields
                updatedWork[index] = { ...updatedWork[index], [field]: value };
              }
              updatedResume.workExperience = updatedWork;
            }
            break;

          case "projects":
            if (typeof index === "number") {
              const updatedProjects = [...updatedResume.projects];
              if (typeof subIndex === "number" && field === "highlights") {
                // Update highlight
                const updatedHighlights = [
                  ...updatedProjects[index].highlights,
                ];
                updatedHighlights[subIndex] = value;
                updatedProjects[index] = {
                  ...updatedProjects[index],
                  highlights: updatedHighlights,
                };
              } else if (
                typeof subIndex === "number" &&
                field === "technologies"
              ) {
                // Update technology
                const updatedTechnologies = [
                  ...updatedProjects[index].technologies,
                ];
                updatedTechnologies[subIndex] = value;
                updatedProjects[index] = {
                  ...updatedProjects[index],
                  technologies: updatedTechnologies,
                };
              } else {
                // Update other fields
                updatedProjects[index] = {
                  ...updatedProjects[index],
                  [field]: value,
                };
              }
              updatedResume.projects = updatedProjects;
            }
            break;

          case "achievements":
            if (typeof index === "number") {
              const updatedAchievements = [...updatedResume.achievements];
              updatedAchievements[index] = {
                ...updatedAchievements[index],
                [field]: value,
              };
              updatedResume.achievements = updatedAchievements;
            }
            break;

          default:
            // Update top-level fields
            if (field in updatedResume) {
              (updatedResume as any)[field] = value;
            }
            break;
        }

        return updatedResume;
      });
    },
    [editingResume]
  );

  const addSectionData = useCallback(
    (section: string) => {
      if (!editingResume) return;

      setEditingResume((prevResume) => {
        if (!prevResume) return null;

        const updatedResume = { ...prevResume };

        switch (section) {
          case "education":
            updatedResume.education.push({
              institution: "",
              area: "",
              studyType: "",
              startDate: "",
              endDate: "",
              gpa: "",
              courses: [],
            });
            break;

          case "skills":
            updatedResume.skills.push({
              category: "",
              keywords: [""],
            });
            break;

          case "workExperience":
            updatedResume.workExperience.push({
              company: "",
              position: "",
              location: "",
              startDate: "",
              endDate: "",
              highlights: [""],
              summary: "",
              keywords: [],
            });
            break;

          case "projects":
            updatedResume.projects.push({
              name: "",
              summary: "",
              technologies: [""],
              highlights: [""],
              repository: "",
              url: "",
            });
            break;

          case "achievements":
            updatedResume.achievements.push({
              title: "",
              date: "",
              description: "",
              url: "",
            });
            break;

          default:
            break;
        }

        return updatedResume;
      });
    },
    [editingResume]
  );

  const deleteSectionData = useCallback(
    (section: string, index: number) => {
      if (!editingResume) return;

      setEditingResume((prevResume) => {
        if (!prevResume) return null;

        const updatedResume = { ...prevResume };

        switch (section) {
          case "education":
            updatedResume.education = updatedResume.education.filter(
              (_, i) => i !== index
            );
            break;

          case "skills":
            updatedResume.skills = updatedResume.skills.filter(
              (_, i) => i !== index
            );
            break;

          case "workExperience":
            updatedResume.workExperience = updatedResume.workExperience.filter(
              (_, i) => i !== index
            );
            break;

          case "projects":
            updatedResume.projects = updatedResume.projects.filter(
              (_, i) => i !== index
            );
            break;

          case "achievements":
            updatedResume.achievements = updatedResume.achievements.filter(
              (_, i) => i !== index
            );
            break;

          default:
            break;
        }

        return updatedResume;
      });
    },
    [editingResume]
  );

  const addSubSectionData = useCallback(
    (section: string, index: number, field: string) => {
      if (!editingResume) return;

      setEditingResume((prevResume) => {
        if (!prevResume) return null;

        const updatedResume = { ...prevResume };

        switch (section) {
          case "skills":
            if (updatedResume.skills[index]) {
              updatedResume.skills[index].keywords.push("");
            }
            break;

          case "workExperience":
            if (updatedResume.workExperience[index]) {
              updatedResume.workExperience[index].highlights.push("");
            }
            break;

          case "projects":
            if (field === "highlights" && updatedResume.projects[index]) {
              updatedResume.projects[index].highlights.push("");
            } else if (
              field === "technologies" &&
              updatedResume.projects[index]
            ) {
              updatedResume.projects[index].technologies.push("");
            }
            break;

          default:
            break;
        }

        return updatedResume;
      });
    },
    [editingResume]
  );

  const deleteSubSectionData = useCallback(
    (section: string, index: number, subIndex: number, field: string) => {
      if (!editingResume) return;

      setEditingResume((prevResume) => {
        if (!prevResume) return null;

        const updatedResume = { ...prevResume };

        switch (section) {
          case "skills":
            if (updatedResume.skills[index]) {
              updatedResume.skills[index].keywords = updatedResume.skills[
                index
              ].keywords.filter((_, i) => i !== subIndex);
            }
            break;

          case "workExperience":
            if (updatedResume.workExperience[index]) {
              updatedResume.workExperience[index].highlights =
                updatedResume.workExperience[index].highlights.filter(
                  (_, i) => i !== subIndex
                );
            }
            break;

          case "projects":
            if (field === "highlights" && updatedResume.projects[index]) {
              updatedResume.projects[index].highlights = updatedResume.projects[
                index
              ].highlights.filter((_, i) => i !== subIndex);
            } else if (
              field === "technologies" &&
              updatedResume.projects[index]
            ) {
              updatedResume.projects[index].technologies =
                updatedResume.projects[index].technologies.filter(
                  (_, i) => i !== subIndex
                );
            }
            break;

          default:
            break;
        }

        return updatedResume;
      });
    },
    [editingResume]
  );

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setNewResumeName("");
    setNewJobRole("");
    setCreateFromMaster("empty");
  }, []);

  const handleCloseViewDialog = useCallback(() => {
    setViewDialogOpen(false);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingResume(null);
  }, []);

  const handleSelectResume = useCallback((resume: ResumeSchema) => {
    setSelectedResume(resume);
    setEditingResume(null);
  }, []);

  const handleStartEdit = useCallback(
    (resume: ResumeSchema, e: React.MouseEvent) => {
      e.stopPropagation();
      setEditingResume({ ...resume });
    },
    []
  );

  const handleViewResume = useCallback(
    (resume: ResumeSchema, e: React.MouseEvent) => {
      e.stopPropagation();
      setViewDialogOpen(true);
    },
    []
  );

  // Memoize the resume cards to prevent unnecessary re-renders
  const resumeCards = useMemo(
    () =>
      resumes.map((resume: ResumeSchema) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          isSelected={selectedResume?.id === resume.id}
          onSelect={handleSelectResume}
          onEdit={handleStartEdit}
          onView={handleViewResume}
          onDelete={handleDeleteResume}
        />
      )),
    [
      resumes,
      selectedResume,
      handleSelectResume,
      handleStartEdit,
      handleViewResume,
      handleDeleteResume,
    ]
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Resume Management System
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            New Resume
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ py: 2, px: 0 }}>
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Resume saved successfully!
          </Alert>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          {resumeCards}
        </Box>

        {editingResume ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Basic Info" />
              <Tab label="Education" />
              <Tab label="Skills" />
              <Tab label="Experience" />
              <Tab label="Projects" />
              <Tab label="Achievements" />
            </Tabs>

            {activeTab === 0 && (
              <BasicInfoTab
                resume={editingResume}
                onInputChange={handleInputChange}
              />
            )}
            {activeTab === 1 && (
              <EducationTab
                education={editingResume.education}
                onInputChange={handleInputChange}
                onAdd={() => addSectionData("education")}
                onDelete={deleteSectionData}
              />
            )}
            {activeTab === 2 && (
              <SkillsTab
                skills={editingResume.skills}
                onInputChange={handleInputChange}
                onAdd={() => addSectionData("skills")}
                onDelete={deleteSectionData}
                onAddKeyword={addSubSectionData}
                onDeleteKeyword={deleteSubSectionData}
              />
            )}
            {activeTab === 3 && (
              <ExperienceTab
                experiences={editingResume.workExperience}
                onInputChange={handleInputChange}
                onAdd={() => addSectionData("workExperience")}
                onDelete={deleteSectionData}
                onAddHighlight={addSubSectionData}
                onDeleteHighlight={deleteSubSectionData}
              />
            )}
            {activeTab === 4 && (
              <ProjectsTab
                projects={editingResume.projects}
                onInputChange={handleInputChange}
                onAdd={() => addSectionData("projects")}
                onDelete={deleteSectionData}
                onAddHighlight={addSubSectionData}
                onDeleteHighlight={deleteSubSectionData}
                onAddTechnology={addSubSectionData}
                onDeleteTechnology={deleteSubSectionData}
              />
            )}
            {activeTab === 5 && (
              <AchievementsTab
                achievements={editingResume.achievements}
                onInputChange={handleInputChange}
                onAdd={() => addSectionData("achievements")}
                onDelete={deleteSectionData}
              />
            )}

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleEditResume}
              >
                Save Changes
              </Button>
              <Button variant="outlined" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </Box>
          </Paper>
        ) : (
          selectedResume && <ResumeView resume={selectedResume} />
        )}
      </Box>

      {/* Create Resume Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Resume</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            label="Resume Name"
            fullWidth
            variant="outlined"
            value={newResumeName}
            onChange={(e) => setNewResumeName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            size="small"
            margin="dense"
            label="Job Role"
            fullWidth
            variant="outlined"
            value={newJobRole}
            onChange={(e) => setNewJobRole(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth>
            <InputLabel>Template</InputLabel>
            <Select
              size="small"
              value={createFromMaster}
              label="Template"
              onChange={(e) => setCreateFromMaster(e.target.value)}
            >
              <MenuItem value="empty">Start from Scratch</MenuItem>
              {resumes.map((resume) => (
                <MenuItem key={resume.id} value={resume.id}>
                  {resume.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleCreateResume}
            disabled={!newResumeName || !newJobRole}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Resume Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        maxWidth="lg"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          {selectedResume?.name} - {selectedResume?.job_role}
          <IconButton
            onClick={handleCloseViewDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedResume && <ResumeView resume={selectedResume} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

// Resume Card Component
const ResumeCard = React.memo(
  ({
    resume,
    isSelected,
    onSelect,
    onEdit,
    onView,
    onDelete,
  }: {
    resume: ResumeSchema;
    isSelected: boolean;
    onSelect: (resume: ResumeSchema) => void;
    onEdit: (resume: ResumeSchema, e: React.MouseEvent) => void;
    onView: (resume: ResumeSchema, e: React.MouseEvent) => void;
    onDelete: (id: string) => void;
  }) => (
    <Card
      sx={{
        minWidth: 250,
        bgcolor: isSelected ? "action.selected" : "background.paper",
        cursor: "pointer",
      }}
      onClick={() => onSelect(resume)}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {resume.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {resume.job_role}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {resume.basics.name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={(e) => onEdit(resume, e)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={(e) => onView(resume, e)}>
          <ViewIcon />
        </IconButton>
        {resume.id !== "master" && (
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(resume.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
);

ResumeCard.displayName = "ResumeCard";

export default ResumeBuilder;
