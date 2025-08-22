import React, { useState, useEffect } from "react";
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
import type { ResumeDataCreate } from "../../../../store/schema/resume.schema";

const emptyResume: ResumeDataCreate = {
  id: "",
  name: "",
  job_role: "",
  personal_info: {
    name: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  },
  education: {
    institution: "",
    degree: "",
    gpa: "",
    graduation_date: "",
    location: "",
  },
  technical_skills: {
    programming_languages: [],
    frontend: [],
    backend: [],
    databases: [],
    cloud_platforms: [],
    tools: [],
  },
  experiences: [],
  projects: [],
  achievements: [],
};

const ResumeBuilder = () => {
  const resumes = useSelector(
    (state: RootState) => state.resumes.resumes || []
  );
  const dispatch = useDispatch();

  // console.log(resumes);
  // const [resumes, setResumes] = useState<Resume[]>([]);

  const [selectedResume, setSelectedResume] = useState<ResumeDataCreate | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [newJobRole, setNewJobRole] = useState("");
  const [editingResume, setEditingResume] = useState<ResumeDataCreate | null>(
    null
  );
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [createFromMaster, setCreateFromMaster] = useState("empty");

  // Initialize with master resume
  // useEffect(() => {
  //   setResumes([masterResume]);
  //   setSelectedResume(masterResume);
  // }, []);

  useEffect(() => {
    if (resumes.length > 0) {
      const body = { ...resumes[0] };
      body.id = "master";
      setSelectedResume(body);
    }
  }, []);

  const handleCreateResume = () => {
    if (!newResumeName || !newJobRole) return;

    const baseResume =
      resumes.find((r) => r.id === createFromMaster) || emptyResume;

    const _newResume: ResumeDataCreate = {
      ...baseResume,
      id: Date.now().toString(),
      name: newResumeName,
      job_role: newJobRole,
    };

    dispatch(addResume(_newResume));
    // setResumes([...resumes, newResume]);
    // setSelectedResume(newResume);
    // setEditingResume(newResume);
    setNewResumeName("");
    setNewJobRole("");
    setDialogOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditResume = () => {
    if (!editingResume) return;

    // setResumes(
    //   resumes.map((r) => (r.id === editingResume.id ? editingResume : r))
    // );
    setSelectedResume(editingResume);
    dispatch(updateResume(editingResume));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    console.log(resumes);
  };

  const handleDeleteResume = (id: string) => {
    if (id === "master") {
      alert("Cannot delete master resume");
      return;
    }
    alert(id);
    dispatch(removeResume(id));
    // setResumes(resumes.filter((r) => r.id !== id));
    if (selectedResume?.id === id) {
      // setSelectedResume(
      //   resumes.find((r) => r.id !== id && r.id !== "master") || masterResume
      // );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    field: string,
    index?: number,
    subField?: string
  ) => {
    if (!editingResume) return;
    const value = e.target.value;
    const updatedResume = { ...editingResume };
    if (section === "personal_info") {
      updatedResume.personal_info = {
        ...updatedResume.personal_info,
        [field]: value,
      };
    } else if (section === "education") {
      updatedResume.education = { ...updatedResume.education, [field]: value };
    } else if (section === "experience" && index !== undefined) {
      const updatedExperience = [...updatedResume.experience];
      if (subField === "responsibilities") {
        // For responsibility editing, we need a separate handler
        return;
      }
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      updatedResume.experience = updatedExperience;
    } else if (section === "projects" && index !== undefined) {
      const updatedProjects = [...updatedResume.projects];
      if (subField === "description" || subField === "technologies") {
        // For description/technologies editing, we need a separate handler
        return;
      }
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      updatedResume.projects = updatedProjects;
    } else if (section === "achievements" && index !== undefined) {
      const updatedAchievements = [...updatedResume.achievements];
      updatedAchievements[index] = value;
      updatedResume.achievements = updatedAchievements;
    } else if (
      section === "technical_skills" &&
      index !== undefined &&
      subField
    ) {
      const updatedSkills = { ...updatedResume.technical_skills };
      const skillArray = [...updatedSkills[subField as keyof TechnicalSkills]];
      skillArray[index] = value;
      updatedSkills[subField as keyof TechnicalSkills] = skillArray;
      updatedResume.technical_skills = updatedSkills;
    }
    setEditingResume(updatedResume);
  };

  const handleArrayItemChange = (
    section: string,
    field: string,
    index: number,
    value: string,
    subIndex?: number
  ) => {
    if (!editingResume) return;

    const updatedResume = { ...editingResume };

    if (section === "experience" && subIndex !== undefined) {
      const updatedExperience = [...updatedResume.experiences];
      const updatedResponsibilities = [
        ...updatedExperience[index].responsibilities,
      ];
      updatedResponsibilities[subIndex] = value;
      updatedExperience[index].responsibilities = updatedResponsibilities;
      updatedResume.experiences = updatedExperience;
    } else if (section === "projects" && subIndex !== undefined) {
      const updatedProjects = [...updatedResume.projects];
      if (field === "description") {
        const updatedDescription = [...updatedProjects[index].description];
        updatedDescription[subIndex] = value;
        updatedProjects[index].description = updatedDescription;
      } else if (field === "technologies") {
        const updatedTechnologies = [...updatedProjects[index].technologies];
        updatedTechnologies[subIndex] = value;
        updatedProjects[index].technologies = updatedTechnologies;
      }
      updatedResume.projects = updatedProjects;
    }

    setEditingResume(updatedResume);
  };

  const addArrayItem = (section: string, field: string, index?: number) => {
    if (!editingResume) return;

    const updatedResume = { ...editingResume };

    if (section === "experience" && index !== undefined) {
      const updatedExperience = [...updatedResume.experience];
      updatedExperience[index].responsibilities.push("");
      updatedResume.experience = updatedExperience;
    } else if (section === "projects" && index !== undefined) {
      const updatedProjects = [...updatedResume.projects];
      if (field === "description") {
        updatedProjects[index].description.push("");
      } else if (field === "technologies") {
        updatedProjects[index].technologies.push("");
      }
      updatedResume.projects = updatedProjects;
    } else if (section === "achievements") {
      updatedResume.achievements.push("");
    } else if (section === "technical_skills" && field) {
      const updatedSkills = { ...updatedResume.technical_skills };
      updatedSkills[field as keyof TechnicalSkills] = [
        ...updatedSkills[field as keyof TechnicalSkills],
        "",
      ];
      updatedResume.technical_skills = updatedSkills;
    }

    setEditingResume(updatedResume);
  };

  const removeArrayItem = (
    section: string,
    field: string,
    index: number,
    subIndex: number
  ) => {
    if (!editingResume) return;

    const updatedResume = { ...editingResume };

    if (section === "experiences" && subIndex !== undefined) {
      const updatedExperience = [...updatedResume.experiences];
      updatedExperience[index].responsibilities = updatedExperience[
        index
      ].responsibilities.filter((_, i) => i !== subIndex);
      updatedResume.experiences = updatedExperience;
    } else if (section === "projects" && subIndex !== undefined) {
      const updatedProjects = [...updatedResume.projects];
      if (field === "description") {
        updatedProjects[index].description = updatedProjects[
          index
        ].description.filter((_, i) => i !== subIndex);
      } else if (field === "technologies") {
        updatedProjects[index].technologies = updatedProjects[
          index
        ].technologies.filter((_, i) => i !== subIndex);
      }
      updatedResume.projects = updatedProjects;
    } else if (section === "achievements") {
      updatedResume.achievements = updatedResume.achievements.filter(
        (_, i) => i !== index
      );
    } else if (section === "technical_skills" && field) {
      const updatedSkills = { ...updatedResume.technical_skills };
      updatedSkills[field as keyof TechnicalSkills] = updatedSkills[
        field as keyof TechnicalSkills
      ].filter((_, i) => i !== index);
      updatedResume.technical_skills = updatedSkills;
    }

    setEditingResume(updatedResume);
  };

  const addExperience = () => {
    if (!editingResume) return;

    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      location: "",
      responsibilities: [""],
    };

    setEditingResume({
      ...editingResume,
      experiences: [...editingResume.experiences, newExperience],
    });
  };

  const removeExperience = (index: number) => {
    if (!editingResume) return;

    setEditingResume({
      ...editingResume,
      experiences: editingResume.experiences.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    if (!editingResume) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      technologies: [""],
      date: "",
      description: [""],
      github: "",
    };

    setEditingResume({
      ...editingResume,
      projects: [...editingResume.projects, newProject],
    });
  };

  const removeProject = (index: number) => {
    if (!editingResume) return;

    setEditingResume({
      ...editingResume,
      projects: editingResume.projects.filter((_, i) => i !== index),
    });
  };

  const renderResumeView = () => {
    if (!selectedResume)
      return <Typography>Select or create a resume</Typography>;

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
          <Typography variant="h4">
            {selectedResume.personal_info.name}
          </Typography>
          <Chip label={selectedResume.job_role} color="primary" />
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Contact Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Address:</strong> {selectedResume.personal_info.address}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Phone:</strong> {selectedResume.personal_info.phone}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Email:</strong> {selectedResume.personal_info.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>LinkedIn:</strong> {selectedResume.personal_info.linkedin}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>GitHub:</strong> {selectedResume.personal_info.github}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        <Typography>
          <strong>{selectedResume.education.institution}</strong>
        </Typography>
        <Typography>{selectedResume.education.degree}</Typography>
        <Typography>GPA: {selectedResume.education.gpa}</Typography>
        <Typography>
          Graduation: {selectedResume.education.graduation_date}
        </Typography>
        <Typography>{selectedResume.education.location}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Technical Skills
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Programming Languages:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedResume.technical_skills.programming_languages.map(
                (skill, index) => (
                  <Chip key={index} label={skill} size="small" />
                )
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Frontend:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedResume.technical_skills.frontend.map((skill, index) => (
                <Chip key={index} label={skill} size="small" />
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Backend:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedResume.technical_skills.backend.map((skill, index) => (
                <Chip key={index} label={skill} size="small" />
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Databases:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedResume.technical_skills.databases.map((skill, index) => (
                <Chip key={index} label={skill} size="small" />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Experience
        </Typography>
        {selectedResume.experiences.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography>
              <strong>{exp.company}</strong> - {exp.position}
            </Typography>
            <Typography>
              {exp.start_date} to {exp.end_date} | {exp.location}
            </Typography>
            <List dense>
              {exp.responsibilities.map((resp, i) => (
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
        {selectedResume.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography>
              <strong>{project.name}</strong> ({project.date})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, my: 1 }}>
              {project.technologies.map((tech, i) => (
                <Chip key={i} label={tech} size="small" variant="outlined" />
              ))}
            </Box>
            <List dense>
              {project.description.map((desc, i) => (
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
              <strong>GitHub:</strong> {project.github}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Achievements
        </Typography>
        <List dense>
          {selectedResume.achievements.map((achievement, index) => (
            <ListItem
              key={index}
              sx={{ display: "list-item", listStyleType: "disc", pl: 0, ml: 2 }}
            >
              <Typography variant="body2">{achievement}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  };

  const renderEditForm = () => {
    if (!editingResume) return null;

    return (
      <Box>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Basic Info" />
          <Tab label="Skills" />
          <Tab label="Experience" />
          <Tab label="Projects" />
          <Tab label="Achievements" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <TextField
              size="small"
              fullWidth
              label="Resume Name"
              value={editingResume.name}
              onChange={(e) =>
                setEditingResume({ ...editingResume, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              size="small"
              fullWidth
              label="Job Role"
              value={editingResume.job_role}
              onChange={(e) =>
                setEditingResume({ ...editingResume, job_role: e.target.value })
              }
              margin="normal"
            />

            <Typography variant="h6" sx={{ mt: 3 }}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Name"
                  value={editingResume.personal_info.name}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "name")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  value={editingResume.personal_info.email}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "email")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Phone"
                  value={editingResume.personal_info.phone}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "phone")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Address"
                  value={editingResume.personal_info.address}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "address")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="LinkedIn"
                  value={editingResume.personal_info.linkedin}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "linkedin")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="GitHub"
                  value={editingResume.personal_info.github}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "github")
                  }
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Education
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Institution"
                  value={editingResume.education.institution}
                  onChange={(e) =>
                    handleInputChange(e, "education", "institution")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Degree"
                  value={editingResume.education.degree}
                  onChange={(e) => handleInputChange(e, "education", "degree")}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="GPA"
                  value={editingResume.education.gpa}
                  onChange={(e) => handleInputChange(e, "education", "gpa")}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Graduation Date"
                  value={editingResume.education.graduation_date}
                  onChange={(e) =>
                    handleInputChange(e, "education", "graduation_date")
                  }
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Location"
                  value={editingResume.education.location}
                  onChange={(e) =>
                    handleInputChange(e, "education", "location")
                  }
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            {Object.entries(editingResume.technical_skills).map(
              ([category, skills]) => (
                <Accordion key={category} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      {category.replace(/_/g, " ").toUpperCase()}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {skills.map((skill: string, index: number) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          value={skill}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "technical_skills",
                              "",
                              index,
                              category
                            )
                          }
                          margin="dense"
                        />
                        <IconButton
                          onClick={() =>
                            removeArrayItem(
                              "technical_skills",
                              category,
                              index,
                              0
                            )
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      onClick={() => addArrayItem("technical_skills", category)}
                    >
                      Add Skill
                    </Button>
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Button onClick={addExperience} sx={{ mb: 2 }}>
              Add Experience
            </Button>

            {editingResume.experiences.map((exp, index) => (
              <Accordion key={exp.id} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{exp.company || "New Experience"}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => removeExperience(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Company"
                        value={exp.company}
                        onChange={(e) =>
                          handleInputChange(e, "experience", "company", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Position"
                        value={exp.position}
                        onChange={(e) =>
                          handleInputChange(e, "experience", "position", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Start Date"
                        value={exp.start_date}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "experience",
                            "start_date",
                            index
                          )
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="End Date"
                        value={exp.end_date}
                        onChange={(e) =>
                          handleInputChange(e, "experience", "end_date", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Location"
                        value={exp.location}
                        onChange={(e) =>
                          handleInputChange(e, "experience", "location", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Responsibilities
                  </Typography>
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <Box
                      key={respIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        value={responsibility}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "experience",
                            "responsibilities",
                            index,
                            e.target.value,
                            respIndex
                          )
                        }
                        margin="dense"
                      />
                      <IconButton
                        onClick={() =>
                          removeArrayItem(
                            "experience",
                            "responsibilities",
                            index,
                            respIndex
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      addArrayItem("experience", "responsibilities", index)
                    }
                  >
                    Add Responsibility
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Button onClick={addProject} sx={{ mb: 2 }}>
              Add Project
            </Button>

            {editingResume.projects.map((project, index) => (
              <Accordion key={project.id} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{project.name || "New Project"}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => removeProject(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Project Name"
                        value={project.name}
                        onChange={(e) =>
                          handleInputChange(e, "projects", "name", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Date"
                        value={project.date}
                        onChange={(e) =>
                          handleInputChange(e, "projects", "date", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="GitHub URL"
                        value={project.github}
                        onChange={(e) =>
                          handleInputChange(e, "projects", "github", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Technologies
                  </Typography>
                  {project.technologies.map((technology, techIndex) => (
                    <Box
                      key={techIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        value={technology}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "projects",
                            "technologies",
                            index,
                            e.target.value,
                            techIndex
                          )
                        }
                        margin="dense"
                      />
                      <IconButton
                        onClick={() =>
                          removeArrayItem(
                            "projects",
                            "technologies",
                            index,
                            techIndex
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      addArrayItem("projects", "technologies", index)
                    }
                  >
                    Add Technology
                  </Button>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Description
                  </Typography>
                  {project.description.map((desc, descIndex) => (
                    <Box
                      key={descIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        value={desc}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "projects",
                            "description",
                            index,
                            e.target.value,
                            descIndex
                          )
                        }
                        margin="dense"
                      />
                      <IconButton
                        onClick={() =>
                          removeArrayItem(
                            "projects",
                            "description",
                            index,
                            descIndex
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      addArrayItem("projects", "description", index)
                    }
                  >
                    Add Description Point
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Achievements
            </Typography>
            {editingResume.achievements.map((achievement, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  value={achievement}
                  onChange={(e) =>
                    handleInputChange(e, "achievements", "", index)
                  }
                  margin="dense"
                />
                <IconButton
                  onClick={() => removeArrayItem("achievements", "", index, 0)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => addArrayItem("achievements", "")}>
              Add Achievement
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleEditResume}
          >
            Save Changes
          </Button>
          <Button variant="outlined" onClick={() => setEditingResume(null)}>
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

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
          {resumes &&
            resumes.map((resume: ResumeDataCreate) => (
              <Card
                key={resume.id}
                sx={{
                  minWidth: 250,
                  bgcolor:
                    selectedResume?.id === resume.id
                      ? "action.selected"
                      : "background.paper",
                }}
                onClick={() => {
                  setSelectedResume(resume);
                  setEditingResume(null);
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {resume.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resume.job_role}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {resume.personal_info.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingResume({ ...resume });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      // setSelectedResume(resume);
                      setViewDialogOpen(true);
                    }}
                  >
                    <ViewIcon />
                  </IconButton>
                  {resume.id !== "master" && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteResume(resume.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            ))}
        </Box>

        {editingResume ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            {renderEditForm()}
          </Paper>
        ) : (
          selectedResume && renderResumeView()
          // <>
          //   <Typography variant="h6">Resume Details</Typography>
          // </>
        )}
      </Box>

      {/* Create Resume Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
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
              size={"small"}
              value={createFromMaster}
              label="Template"
              onChange={(e) => setCreateFromMaster(e.target.value)}
            >
              <MenuItem value="empty">Start from Scratch</MenuItem>
              {resumes &&
                resumes.map((resume) => (
                  <MenuItem key={resume.id} value={resume.id}>
                    {resume.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
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
        onClose={() => setViewDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          {selectedResume?.name} - {selectedResume?.job_role}
          <Button
            onClick={() => setViewDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            Close
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          {selectedResume && renderResumeView()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ResumeBuilder;
