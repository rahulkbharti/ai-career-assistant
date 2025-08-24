// tabs/AchievementsTab.tsx
import React from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import type { Achievement } from "../../../../../schema/types/resume.types";

interface AchievementsTabProps {
  achievements: Achievement[];
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

const AchievementsTab: React.FC<AchievementsTabProps> = ({
  achievements,
  onInputChange,
  onAdd,
  onDelete,
}) => {
  return (
    <div>
      <Button sx={{ mb: 2 }} onClick={onAdd}>
        Add Achievement
      </Button>
      {achievements.map((achievement, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{achievement.title || "New Achievement"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => onDelete("achievements", index)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                size="small"
                fullWidth
                label="Title"
                value={achievement.title}
                onChange={(e) =>
                  onInputChange(e, "achievements", "title", index)
                }
              />
              <TextField
                size="small"
                fullWidth
                label="Date"
                value={achievement.date}
                onChange={(e) =>
                  onInputChange(e, "achievements", "date", index)
                }
              />
              <TextField
                size="small"
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={achievement.description}
                onChange={(e) =>
                  onInputChange(e, "achievements", "description", index)
                }
              />
              <TextField
                size="small"
                fullWidth
                label="URL"
                value={achievement.url}
                onChange={(e) => onInputChange(e, "achievements", "url", index)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AchievementsTab;
