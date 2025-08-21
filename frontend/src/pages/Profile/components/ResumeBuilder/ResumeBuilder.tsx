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

// Define TypeScript interfaces
interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

interface Education {
  institution: string;
  degree: string;
  gpa: string;
  graduation_date: string;
  location: string;
}

interface TechnicalSkills {
  programming_languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud_platforms: string[];
  testing_tools: string[];
}

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  location: string;
  responsibilities: string[];
}

interface Project {
  id: string;
  name: string;
  technologies: string[];
  date: string;
  description: string[];
  github: string;
}

interface Resume {
  id: string;
  name: string;
  personal_info: PersonalInfo;
  education: Education;
  technical_skills: TechnicalSkills;
  experience: Experience[];
  projects: Project[];
  achievements: string[];
  job_role: string;
}

// Master resume data
const masterResume: Resume = {
  id: "master",
  name: "Master Resume",
  personal_info: {
    name: "RAHUL KUMAR BHARTI",
    address: "Ghazipur, Uttar Pradesh 233300",
    phone: "+91 7618805084",
    email: "rahul.kbharti2002@gmail.com",
    linkedin: "linkedin.com/in/rahul-kbharti",
    github: "github.com/rahulkbharti",
  },
  education: {
    institution: "Rajkiya Engineering College, Ambedkar Nagar",
    degree: "Bachelor of Technology in Information Technology",
    gpa: "7.8 / 10",
    graduation_date: "Expected June 2025",
    location: "Akabarpur, Uttar Pradesh",
  },
  technical_skills: {
    programming_languages: ["C/C++", "JavaScript (ES6+)", "Python"],
    frontend: ["React.js", "Redux", "Tailwind CSS", "HTML5/CSS3"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT/OAuth"],
    databases: ["NoSQL (MongoDB)", "SQL(MySQL)"],
    cloud_platforms: [
      "Google Cloud",
      "Mircosoft Azure (Basics)",
      "Docker",
      "GitHub Actions",
      "Git",
    ],
    testing_tools: ["Vitest (Jest-compatible)", "Postman", "VS Code", "Figma"],
  },
  experience: [
    {
      id: "exp1",
      company: "Ekalsutra Edtech Pvt. Ltd.",
      position: "Web App Development Intern",
      start_date: "October 2023",
      end_date: "December 2023",
      location: "Akbarpur, Uttar Pradesh",
      responsibilities: [
        "Developed a responsive admin dashboard using React.js, Material UI, and Redux Toolkit, translating Figma designs into pixel-perfect Ul components with 95% design fidelity.",
        "Optimized data flow by integrating REST APIs with React Query, reducing unnecessary re-renders by 30% through intelligent caching strategies.",
        "Implemented 15+ form workflows using Formik & Yup, decreasing validation errors by 25% and improving form completion rates.",
        "Secured application routes with JWT authentication, implementing token validation and protected routing.",
        "Conducted comprehensive API testing with Postman (50+ endpoints) and wrote unit tests (Vitest) covering 80%+ of critical components.",
        "Collaborated in Agile team using Git/GitHub, maintaining 100% code review compliance.",
      ],
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Library Management ERP Solution",
      technologies: [
        "Node.js",
        "Express",
        "MySQL",
        "JWT",
        "OAuth 2.0",
        "RBAC",
        "Reactjs",
      ],
      date: "July 2025",
      description: [
        "Architected a full-stack solution with React.js + Material UI frontend and Node.js/Express backend serving 3 user roles (Admin/Staff/Member).",
        "Implemented secure authentication using JWT + Google OAuth 2.0 with redux-persist for session management.",
        "Designed normalized MySQL database with organization-based isolation and 40+ RBAC permissions controlled via admin dashboard.",
        "Developed 15+ Formik forms with Yup validation and Axios interceptors, improving data submission accuracy.",
        "Optimized state management using Redux Toolkit, encrypted and stored in local Storage",
        "Established CI/CD pipeline with Vitest testing (85% coverage) and Winston logging for production monitoring.",
      ],
      github: "https://github.com/rahulkbharti/library_system-v2_backend.git",
    },
    {
      id: "proj2",
      name: "Real Time Video Chat App",
      technologies: [
        "WebRTC",
        "Socket.io",
        "Custom Hooks (useMedia + useWebRTC)",
      ],
      date: "January 2023",
      description: [
        "Built an Omegle-like video chat app using React, Node.js, and WebRTC, enabling real-time peer-to-peer connections with Socket.io for secure SDP exchange.",
        "Implemented interest-based matching with a queue system and semaphore locks to prevent duplicate connections and ensure 1:1 pairing.",
        "Developed custom hooks (useWebRTC, useMedia) to streamline WebRTC setup, media handling, and error management.",
      ],
      github: "https://github.com/rahulkbharti/real-time-video-chat.git",
    },
    {
      id: "proj3",
      name: "M3U8 Video Streaming App",
      technologies: [
        "FFmpeg",
        "Azure Blob Storage",
        "MongoDB",
        "HLS.js",
        "Nodejs(Child Process)",
      ],
      date: "August 2024",
      description: [
        "Developed an textbfadaptive M3u8 streaming service using Node.js, FFmpeg, and Azure Blob Storage, leveraging child processes for non-blocking video transcoding into multiple resolutions.",
        "Implemented dynamic M3u8 playlist generation with signed URLs and expiry times, MongoDB for metadata storage, and Socket.io for real-time encoding status updates.",
        "Designed a responsive frontend with HLS.js and Plyr.js for seamless playback, including video preview thumbnails and adaptive bitrate switching.",
        "Automated CI/CD on Render with Github Action and Docker, slashing deployment time by 60%.",
      ],
      github: "https://github.com/rahulkbharti/m3u8-video-streaming.git",
    },
  ],
  achievements: [
    "Ranked 1961st in TCS CodeVita Season 12, an international competitive programming contest.",
    "Completed 87+ hands-on labs, 27 courses, 23 quizzes, 7 gamified learning modules, and 3 structured learning paths on Google Cloud.",
  ],
  job_role: "Master",
};

// Empty resume template
const emptyResume: Resume = {
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
    testing_tools: [],
  },
  experience: [],
  projects: [],
  achievements: [],
};

const ResumeBuilder = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [newJobRole, setNewJobRole] = useState("");
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [createFromMaster, setCreateFromMaster] = useState(true);

  // Initialize with master resume
  useEffect(() => {
    setResumes([masterResume]);
    setSelectedResume(masterResume);
  }, []);

  const handleCreateResume = () => {
    if (!newResumeName || !newJobRole) return;

    const baseResume = createFromMaster
      ? JSON.parse(JSON.stringify(masterResume))
      : JSON.parse(JSON.stringify(emptyResume));

    const newResume: Resume = {
      ...baseResume,
      id: Date.now().toString(),
      name: newResumeName,
      job_role: newJobRole,
    };

    setResumes([...resumes, newResume]);
    setSelectedResume(newResume);
    setEditingResume(newResume);
    setNewResumeName("");
    setNewJobRole("");
    setDialogOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditResume = () => {
    if (!editingResume) return;

    setResumes(
      resumes.map((r) => (r.id === editingResume.id ? editingResume : r))
    );
    setSelectedResume(editingResume);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    console.log(resumes);
  };

  const handleDeleteResume = (id: string) => {
    if (id === "master") {
      alert("Cannot delete master resume");
      return;
    }

    setResumes(resumes.filter((r) => r.id !== id));
    if (selectedResume?.id === id) {
      setSelectedResume(
        resumes.find((r) => r.id !== id && r.id !== "master") || masterResume
      );
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
      const updatedExperience = [...updatedResume.experience];
      const updatedResponsibilities = [
        ...updatedExperience[index].responsibilities,
      ];
      updatedResponsibilities[subIndex] = value;
      updatedExperience[index].responsibilities = updatedResponsibilities;
      updatedResume.experience = updatedExperience;
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

    if (section === "experience" && subIndex !== undefined) {
      const updatedExperience = [...updatedResume.experience];
      updatedExperience[index].responsibilities = updatedExperience[
        index
      ].responsibilities.filter((_, i) => i !== subIndex);
      updatedResume.experience = updatedExperience;
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
      experience: [...editingResume.experience, newExperience],
    });
  };

  const removeExperience = (index: number) => {
    if (!editingResume) return;

    setEditingResume({
      ...editingResume,
      experience: editingResume.experience.filter((_, i) => i !== index),
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
        {selectedResume.experience.map((exp, index) => (
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

            {editingResume.experience.map((exp, index) => (
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
          {resumes.map((resume) => (
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
                    setSelectedResume(resume);
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
              value={createFromMaster ? "master" : "empty"}
              label="Template"
              onChange={(e) => setCreateFromMaster(e.target.value === "master")}
            >
              <MenuItem value="master">Based on Master Resume</MenuItem>
              <MenuItem value="empty">Start from Scratch</MenuItem>
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
