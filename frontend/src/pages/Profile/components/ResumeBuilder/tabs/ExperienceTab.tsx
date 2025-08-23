// tabs/ExperienceTab.tsx
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
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import type { WorkExperience } from "../../../../../schema/types/resume.types";

interface ExperienceTabProps {
  experiences: WorkExperience[];
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
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({
  experiences,
  onInputChange,
  onAdd,
  onDelete,
  onAddHighlight,
  onDeleteHighlight,
}) => {
  return (
    <div>
      <Button sx={{ mb: 2 }} onClick={onAdd}>
        Add Experience
      </Button>
      {experiences.map((experience, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{experience.company || "New Experience"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => onDelete("workExperience", index)}>
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
                    onInputChange(e, "workExperience", "company", index)
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
                    onInputChange(e, "workExperience", "position", index)
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
                    onInputChange(e, "workExperience", "startDate", index)
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
                    onInputChange(e, "workExperience", "endDate", index)
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
                    onInputChange(e, "workExperience", "location", index)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Summary"
                  value={experience.summary}
                  margin="normal"
                  multiline
                  rows={2}
                  onChange={(e) =>
                    onInputChange(e, "workExperience", "summary", index)
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
                    onInputChange(
                      e,
                      "workExperience",
                      "highlights",
                      index,
                      subIndex
                    )
                  }
                />
                <IconButton
                  onClick={() =>
                    onDeleteHighlight(
                      "workExperience",
                      index,
                      subIndex,
                      "highlights"
                    )
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() =>
                onAddHighlight("workExperience", index, "highlights")
              }
            >
              Add Responsibility
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ExperienceTab;
