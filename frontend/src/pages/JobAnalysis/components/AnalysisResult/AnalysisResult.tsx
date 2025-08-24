import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";

import type {
  ActionItem,
  KeywordAnalysis,
  ResumeAnalysisOutput,
  SectionFeedback,
  SkillAnalysis,
} from "../../../../schema/types/result.types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
// --- Sample Data ---

// --- Reusable Components ---

const StyledCard = styled(Card)({
  height: "100%",
});

const OverallScoreCard: React.FC<{ score: number; summary: string }> = ({
  score,
  summary,
}) => (
  <StyledCard>
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Overall Match Score
      </Typography>
      <Box sx={{ position: "relative", display: "inline-flex", my: 2 }}>
        <CircularProgress
          variant="determinate"
          value={score}
          size={100}
          thickness={4}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            color="text.secondary"
          >{`${score}%`}</Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "left" }}
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ node, ...props }) => (
              <table
                border={1}
                style={{ borderCollapse: "collapse", width: "100%" }}
                {...props}
              />
            ),
            th: ({ node, ...props }) => (
              <th
                style={{
                  textAlign: "left",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                style={{
                  textAlign: "left",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
                {...props}
              />
            ),
          }}
        >
          {summary}
        </Markdown>
      </Typography>
    </CardContent>
  </StyledCard>
);

const KeywordAnalysisCard: React.FC<{ analysis: KeywordAnalysis }> = ({
  analysis,
}) => (
  <StyledCard>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Keyword Analysis
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Matched Keywords
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {analysis.matchedKeywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            color="success"
            icon={<CheckCircleOutlineIcon />}
          />
        ))}
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Missing Keywords
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {analysis.missingKeywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            color="error"
            icon={<HighlightOffIcon />}
            variant="outlined"
          />
        ))}
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Suggestion
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {analysis.suggestions}
      </Typography>
    </CardContent>
  </StyledCard>
);
const SkillAnalysisCard: React.FC<{ analysis: SkillAnalysis }> = ({
  analysis,
}) => (
  <StyledCard>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Skill Analysis
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Matched Skills
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {analysis.matchedSkills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            color="success"
            icon={<CheckCircleOutlineIcon />}
          />
        ))}
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Missing Skills
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {analysis.missingSkills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            color="error"
            icon={<HighlightOffIcon />}
            variant="outlined"
          />
        ))}
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Suggestion
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {analysis.suggestions}
      </Typography>
    </CardContent>
  </StyledCard>
);

const SectionBreakdownAccordion: React.FC<{ sections: SectionFeedback[] }> = ({
  sections,
}) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Section-by-Section Feedback
    </Typography>
    {sections.map((section, index) => (
      <Accordion key={index} sx={{ my: 1 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{section.sectionName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            <b>Analysis:</b>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {section.analysis}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <b>Suggestions:</b>
          </Typography>
          <List dense>
            {section.suggestions.map((suggestion, i) => (
              <ListItem key={i}>
                <ListItemIcon sx={{ minWidth: "32px" }}>
                  <EditIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
);

const ActionPlanList: React.FC<{ plan: ActionItem[] }> = ({ plan }) => {
  const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
    if (priority === "High") return "error";
    if (priority === "Medium") return "warning";
    return "info";
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Your Action Plan
        </Typography>
        <List>
          {plan.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <FlagIcon color={getPriorityColor(item.priority)} />
              </ListItemIcon>
              <ListItemText
                primary={item.action}
                secondary={`Priority: ${item.priority}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// --- Main App Component ---

interface AnalysisResultProps {
  result: ResumeAnalysisOutput;
}

const AnlysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  // console.log(result);
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Resume Analysis Report
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <OverallScoreCard
            score={result.overallMatchScore}
            summary={result.analysisSummary}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SkillAnalysisCard analysis={result.skillAnalysis} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <KeywordAnalysisCard analysis={result.keywordAnalysis} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionBreakdownAccordion sections={result.sectionBreakdown} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ActionPlanList plan={result.actionPlan} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnlysisResult;
