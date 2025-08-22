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
// import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import {
  addResume,
  updateResume,
  removeResume,
} from "../../../../store/features/resumeSlice";
import type { RootState } from "../../../../store/store";
// import type { ResumeDataCreate } from "../../../../store/schema/resume.schema";
import type { ResumeSchema } from "../../../../schema/types/resume.types";

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
  console.log(resumes);

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
    // dispatch(removeResume(id));
    // setResumes(resumes.filter((r) => r.id !== id));
    if (selectedResume?.id === id) {
      // setSelectedResume(
      //   resumes.find((r) => r.id !== id && r.id !== "master") || masterResume
      // );
    }
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
          <Typography variant="h4">{selectedResume.basics.name}</Typography>
          <Chip label={selectedResume.job_role} color="primary" />
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Contact Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Address:</strong> {selectedResume.basics.location.city},{" "}
              {selectedResume.basics.location.region},{" "}
              {selectedResume.basics.location.countryCode},{" "}
              {selectedResume.basics.location.postalCode}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Phone:</strong> {selectedResume.basics.phone}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>Email:</strong> {selectedResume.basics.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>LinkedIn:</strong>{" "}
              {
                selectedResume.basics.profiles.find(
                  (profile) => profile.network === "linkedin"
                )?.url
              }
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              <strong>GitHub:</strong>{" "}
              {
                selectedResume.basics.profiles.find(
                  (profile) => profile.network === "github"
                )?.url
              }
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        {selectedResume.education.length === 0 && (
          <Typography>No education details available</Typography>
        )}
        {selectedResume.education.length > 0 && (
          <>
            {selectedResume.education.map((edu, index) => (
              <React.Fragment key={index}>
                <Typography>
                  <strong>{edu.institution}</strong>
                </Typography>
                <Typography>{edu.area}</Typography>
                <Typography>GPA: {edu.gpa}</Typography>
                <Typography>Graduation: {edu.endDate}</Typography>
                <Typography>{edu.institution}</Typography>
              </React.Fragment>
            ))}
          </>
        )}
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Technical Skills
        </Typography>
        {/*
        <Grid container spacing={2}> */}
        {selectedResume.skills.map((skill, index) => (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography>
              {skill.category}:{" "}
              {skill.keywords.map((keyword, i) => (
                <Chip
                  sx={{ mx: 0.5 }}
                  key={i}
                  label={keyword}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Typography>
          </Grid>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Experiences
        </Typography>
        {selectedResume.workExperience.map((exp, index) => (
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
        {selectedResume.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography>
              {index + 1}. <strong>{project.name}</strong> ({"Ongoing"})
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
              <strong>Live Demo:</strong> {project.url}
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
              <Typography variant="body2">{achievement.description}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  };

  // Handles input changes for nested resume fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    name: string,
    index?: number,
    subIndex?: number
  ) => {
    if (!editingResume) return;
    const value = e.target.value;
    let updatedResume = { ...editingResume };

    switch (section) {
      case "basics":
        if (name === "name" || name === "email" || name === "phone") {
          updatedResume.basics = {
            ...updatedResume.basics,
            [name]: value,
          };
        } else if (name === "profiles") {
          if (typeof index === "number")
            updatedResume.basics.profiles[index].url = value;
        }
        break;
      case "education":
        if (typeof index === "number")
          updatedResume.education[index] = {
            ...updatedResume.education[index],
            [name]: value,
          };
        break;
      case "skills":
        if (typeof index === "number" && typeof subIndex === "number") {
          updatedResume.skills[index].keywords[subIndex] = value;
        } else if (typeof index === "number") {
          updatedResume.skills[index].category = value;
        }
        break;
      case "workExperience":
        if (typeof index === "number" && typeof subIndex === "number") {
          updatedResume.workExperience[index].highlights[subIndex] = value;
        } else if (typeof index === "number") {
          // console.log("woek");
          updatedResume.workExperience[index] = {
            ...updatedResume.workExperience[index],
            [name]: value,
          };
        }
        break;
      case "projects":
        if (typeof index === "number" && typeof subIndex === "number") {
          updatedResume.projects[index].highlights[subIndex] = value;
        } else if (typeof index === "number") {
          // console.log("woek");
          updatedResume.projects[index] = {
            ...updatedResume.projects[index],
            [name]: value,
          };
        }
        break;
      case "achievements":
        if (typeof index === "number")
          updatedResume.achievements[index].description = value;
        break;
      default:
        break;
    }
    setEditingResume(updatedResume);
  };

  const addSectionData = (section: string) => {
    if (!editingResume) return;
    let updatedResume = { ...editingResume };
    switch (section) {
      case "education":
        updatedResume.education.push({
          institution: "",
          area: "",
          studyType: "",
          startDate: "",
          endDate: "",
          gpa: "",
          courses: [""],
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
          highlights: [],
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
    setEditingResume(updatedResume);
  };

  const deleteSectionData = (section: string, index: number) => {
    if (!editingResume) return;
    let updatedResume = { ...editingResume };
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
    setEditingResume(updatedResume);
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
          <Tab label="Edcuation" />
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
            <TextField
              id="outlined-multiline-flexible"
              label="Summary"
              fullWidth
              value={editingResume.summary}
              size="small"
              multiline
              maxRows={4}
              margin="normal"
              onChange={(e) => {
                setEditingResume({ ...editingResume, summary: e.target.value });
              }}
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
                  value={editingResume.basics.name}
                  onChange={(e) => handleInputChange(e, "basics", "name")}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  value={editingResume.basics.email}
                  onChange={(e) => handleInputChange(e, "basics", "email")}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Phone"
                  value={editingResume.basics.phone}
                  onChange={(e) => handleInputChange(e, "basics", "phone")}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Social Profiles
            </Typography>
            <Grid container spacing={2}>
              {editingResume.basics.profiles.map((profile, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label={profile.network}
                    value={profile.url}
                    onChange={(e) =>
                      handleInputChange(e, "basics", "profiles", index)
                    }
                    margin="normal"
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="City"
                  value={editingResume.basics.location.city}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Region"
                  value={editingResume.basics.location.region}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Contry Code"
                  value={editingResume.basics.location.countryCode}
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Postal Code"
                  value={editingResume.basics.location.postalCode}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            <Box>
              <Button
                sx={{ mb: 2 }}
                onClick={() => addSectionData("education")}
              >
                Add Education
              </Button>
            </Box>
            {editingResume.education.map((education, index) => (
              <Accordion>
                <AccordionSummary>
                  {education.studyType || "New Education"}{" "}
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      onClick={() => deleteSectionData("education", index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Grid key={index} container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Degree Type"
                        value={education.studyType}
                        onChange={(e) =>
                          handleInputChange(e, "education", "studyType", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Area of Study"
                        value={education.area}
                        onChange={(e) =>
                          handleInputChange(e, "education", "area", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Institution"
                        value={education.institution}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "education",
                            "institution",
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
                        label="GPA"
                        value={education.gpa}
                        onChange={(e) =>
                          handleInputChange(e, "education", "gpa", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Graduation Date"
                        value={education.endDate}
                        onChange={(e) =>
                          handleInputChange(e, "education", "endDate", index)
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            <Box>
              <Button sx={{ mb: 2 }} onClick={() => addSectionData("skills")}>
                Add Skill Category
              </Button>
            </Box>
            {editingResume.skills.map((skill, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TextField
                    size="small"
                    fullWidth
                    value={skill.category}
                    margin="dense"
                    onChange={(e) =>
                      handleInputChange(e, "skills", "category", index)
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      onClick={() => deleteSectionData("skills", index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Skills
                  </Typography>
                  {skill.keywords.map((keyword, subIndex) => (
                    <Box
                      key={subIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        value={keyword}
                        margin="dense"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "skills",
                            skill.category,
                            index,
                            subIndex
                          )
                        }
                      />
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button>Add Skill</Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        {activeTab === 3 && (
          <Box>
            <Box>
              <Button
                sx={{ mb: 2 }}
                onClick={() => addSectionData("workExperience")}
              >
                Add Experience
              </Button>
            </Box>
            {editingResume.workExperience.map((experience, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {experience.company || "New Experience"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      onClick={() => deleteSectionData("workExperience", index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Company"
                        value={experience.company}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "workExperience",
                            "company",
                            index
                          )
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Position"
                        value={experience.position}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "workExperience",
                            "position",
                            index
                          )
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Start Date"
                        value={experience.startDate}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "workExperience",
                            "startDate",
                            index
                          )
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="End Date"
                        value={experience.endDate}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "workExperience",
                            "endDate",
                            index
                          )
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Location"
                        value={experience.location}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "workExperience",
                            "location",
                            index
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Highlights
                  </Typography>
                  {experience.highlights.map((highlight, subIndex) => (
                    <Box
                      key={subIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        value={highlight}
                        margin="dense"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "workExperience",
                            "location",
                            index,
                            subIndex
                          )
                        }
                      />
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button>Add Responsibility</Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        {activeTab === 4 && (
          <Box>
            <Box>
              <Button sx={{ mb: 2 }} onClick={() => addSectionData("projects")}>
                Add Project
              </Button>
            </Box>
            {editingResume.projects.map((project, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{project.name || "New Experience"}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      onClick={() => deleteSectionData("projects", index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Title"
                        value={project.name}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(e, "projects", "name", index)
                        }
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Repositry Url"
                        value={project.url}
                        margin="normal"
                        onChange={(e) =>
                          handleInputChange(e, "projects", "url", index)
                        }
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Summary"
                    fullWidth
                    value={project.summary}
                    size="small"
                    multiline
                    maxRows={4}
                    margin="normal"
                    onChange={(e) =>
                      handleInputChange(e, "projects", "summary", index)
                    }
                  />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Highlights
                  </Typography>
                  {project.highlights.map((highlight, subIndex) => (
                    <Box
                      key={subIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        value={highlight}
                        margin="dense"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "projects",
                            "highlights",
                            index,
                            subIndex
                          )
                        }
                      />
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button>Add Responsibility</Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        {activeTab === 5 && (
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
                  value={achievement.description}
                  onChange={(e) =>
                    handleInputChange(e, "achievements", "discrption", index)
                  }
                  margin="dense"
                />
                <IconButton
                  onClick={() => deleteSectionData("achievements", index)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => addSectionData("achievements")}>
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
            resumes.map((resume: ResumeSchema) => (
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
                    {resume.basics.name}
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
