// tabs/ProjectsTab.tsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import type { Project } from "../../../../../schema/types/resume.types";

interface ProjectsTabProps {
  projects: Project[];
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    field: string,
    index?: number,
    subIndex?: number
  ) => void;
  onAdd: () => void;
  onDelete: (section: string, index: number) => void;
  onAddHighlight: (section: string, index: number, field: string) => void;
  onDeleteHighlight: (
    section: string,
    index: number,
    subIndex: number,
    field: string
  ) => void;
  onAddTechnology: (section: string, index: number, field: string) => void;
  onDeleteTechnology: (
    section: string,
    index: number,
    subIndex: number,
    field: string
  ) => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  onInputChange,
  onAdd,
  onDelete,
  onAddHighlight,
  onDeleteHighlight,
  onAddTechnology,
  onDeleteTechnology,
}) => {
  return (
    <div>
      <Button sx={{ mb: 2 }} onClick={onAdd}>
        Add Project
      </Button>
      {projects.map((project, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{project.name || "New Project"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => onDelete("projects", index)}>
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
                  onChange={(e) => onInputChange(e, "projects", "name", index)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Repository URL"
                  value={project.repository}
                  margin="normal"
                  onChange={(e) =>
                    onInputChange(e, "projects", "repository", index)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Live URL"
                  value={project.url}
                  margin="normal"
                  onChange={(e) => onInputChange(e, "projects", "url", index)}
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
              onChange={(e) => onInputChange(e, "projects", "summary", index)}
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Technologies
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 1 }}>
              {project.technologies.map((tech, subIndex) => (
                <Chip
                  key={subIndex}
                  label={tech}
                  onDelete={() =>
                    onDeleteTechnology(
                      "projects",
                      index,
                      subIndex,
                      "technologies"
                    )
                  }
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                size="small"
                placeholder="Add technology"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAddTechnology("projects", index, "technologies");
                    e.preventDefault();
                  }
                }}
              />
              <Button
                startIcon={<AddIcon />}
                onClick={() =>
                  onAddTechnology("projects", index, "technologies")
                }
                sx={{ ml: 1 }}
              >
                Add
              </Button>
            </Box>

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
                    onInputChange(e, "projects", "highlights", index, subIndex)
                  }
                />
                <IconButton
                  onClick={() =>
                    onDeleteHighlight("projects", index, subIndex, "highlights")
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() => onAddHighlight("projects", index, "highlights")}
            >
              Add Highlight
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ProjectsTab;
