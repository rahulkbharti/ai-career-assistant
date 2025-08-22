// src/pages/JobAnalysis/components/SuggestionList/SuggestionList.tsx
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
} from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  PriorityHigh as PriorityHighIcon,
  LowPriority as LowPriorityIcon,
} from "@mui/icons-material";

import type { Suggestion } from "../../../../store/schema/result.schema";

interface SuggestionListProps {
  suggestions: Suggestion[];
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <PriorityHighIcon color="error" />;
      case "medium":
        return <PriorityHighIcon color="warning" />;
      case "low":
        return <LowPriorityIcon color="info" />;
      default:
        return <LightbulbIcon color="info" />;
    }
  };

  // const getPriorityColor = (priority: string) => {
  //   switch (priority) {
  //     case "high":
  //       return "error";
  //     case "medium":
  //       return "warning";
  //     case "low":
  //       return "info";
  //     default:
  //       return "default";
  //   }
  // };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <LightbulbIcon sx={{ mr: 1 }} /> Resume Suggestions
      </Typography>

      <List>
        {suggestions.map((suggestion: any, index: number) => (
          <ListItem key={index}>
            <ListItemIcon>{getPriorityIcon(suggestion.priority)}</ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    label={suggestion.actual}
                    size="small"
                    sx={{ mr: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                  {suggestion.actual} - {suggestion.suggestion}
                </Box>
              }
              secondary={`Priority: ${suggestion}`}
            />
          </ListItem>
        ))}
      </List>

      {/* {suggestions.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Recommended Actions
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <List dense>
              {suggestions.map((action: any, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <LightbulbIcon color="info" />
                  </ListItemIcon>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </>
      )} */}
    </Box>
  );
};

export default SuggestionList;
