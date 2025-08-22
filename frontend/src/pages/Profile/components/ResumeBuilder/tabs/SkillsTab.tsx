// tabs/SkillsTab.tsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import type { Skill } from "../../../../../schema/types/resume.types";

interface SkillsTabProps {
  skills: Skill[];
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    field: string,
    index?: number,
    subIndex?: number
  ) => void;
  onAdd: () => void;
  onDelete: (section: string, index: number) => void;
  onAddKeyword: (section: string, index: number, field: string) => void;
  onDeleteKeyword: (
    section: string,
    index: number,
    subIndex: number,
    field: string
  ) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
  skills,
  onInputChange,
  onAdd,
  onDelete,
  onAddKeyword,
  onDeleteKeyword,
}) => {
  return (
    <div>
      <Button sx={{ mb: 2 }} onClick={onAdd}>
        Add Skill Category
      </Button>
      {skills.map((skill, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <TextField
              size="small"
              fullWidth
              value={skill.category}
              margin="dense"
              onChange={(e) => onInputChange(e, "skills", "category", index)}
              onClick={(e) => e.stopPropagation()}
            />
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => onDelete("skills", index)}>
                <CloseIcon />
              </IconButton>
            </div>

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
                  value={keyword}
                  margin="dense"
                  onChange={(e) =>
                    onInputChange(e, "skills", "keywords", index, subIndex)
                  }
                />
                <IconButton
                  onClick={() =>
                    onDeleteKeyword("skills", index, subIndex, "keywords")
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() => onAddKeyword("skills", index, "keywords")}
            >
              Add Skill
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default SkillsTab;
