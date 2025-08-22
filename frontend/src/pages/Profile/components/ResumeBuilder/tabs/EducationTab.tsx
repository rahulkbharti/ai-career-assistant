// tabs/EducationTab.tsx
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
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import type { Education } from "../../../../../schema/types/resume.types";

interface EducationTabProps {
  education: Education[];
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    field: string,
    index?: number,
    subIndex?: number
  ) => void;
  onAdd: () => void;
  onDelete: (section: string, index: number) => void;
}

const EducationTab: React.FC<EducationTabProps> = ({
  education,
  onInputChange,
  onAdd,
  onDelete,
}) => {
  return (
    <div>
      <Button sx={{ mb: 2 }} onClick={onAdd}>
        Add Education
      </Button>
      {education.map((edu, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{edu.institution || "New Education"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => onDelete("education", index)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Degree Type"
                  value={edu.studyType}
                  onChange={(e) =>
                    onInputChange(e, "education", "studyType", index)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Area of Study"
                  value={edu.area}
                  onChange={(e) => onInputChange(e, "education", "area", index)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    onInputChange(e, "education", "institution", index)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    onInputChange(e, "education", "startDate", index)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    onInputChange(e, "education", "endDate", index)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="GPA"
                  value={edu.gpa}
                  onChange={(e) => onInputChange(e, "education", "gpa", index)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Courses (comma separated)"
                  value={edu.courses?.join(", ") || ""}
                  onChange={(e) => {
                    const courses = e.target.value
                      .split(",")
                      .map((course) => course.trim());
                    // Create a custom event-like object to pass to onInputChange
                    const customEvent = {
                      target: {
                        value: courses,
                      },
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onInputChange(customEvent, "education", "courses", index);
                  }}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default EducationTab;
