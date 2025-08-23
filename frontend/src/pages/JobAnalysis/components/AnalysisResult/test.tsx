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
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import BuildIcon from "@mui/icons-material/Build";

// --- TypeScript Interfaces (from your schema) ---

interface KeywordAnalysis {
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string;
}

interface SectionFeedback {
  sectionName:
    | "Professional Summary"
    | "Work Experience"
    | "Skills"
    | "Education"
    | "Projects";
  analysis: string;
  suggestions: string[];
}

interface ActionItem {
  priority: "High" | "Medium" | "Low";
  action: string;
}

interface ResumeAnalysisOutput {
  overallMatchScore: number;
  analysisSummary: string;
  keywordAnalysis: KeywordAnalysis;
  sectionBreakdown: SectionFeedback[];
  actionPlan: ActionItem[];
}

// --- Sample Data ---

const exampleAnalysis: ResumeAnalysisOutput = {
  overallMatchScore: 65,
  analysisSummary:
    "Your resume shows strong foundational experience but needs to be more closely aligned with the specific requirements of the Senior Product Manager role. Key areas for improvement include quantifying achievements and integrating specific keywords from the job description.",
  keywordAnalysis: {
    matchedKeywords: ["Product Management", "Agile", "Roadmap"],
    missingKeywords: [
      "B2B SaaS",
      "Stakeholder Management",
      "Market Analysis",
      "JIRA",
    ],
    suggestions:
      "Integrate missing keywords like 'B2B SaaS' and 'Stakeholder Management' into your work experience bullet points. For example, 'Led a cross-functional team to launch a new B2B SaaS product...'.",
  },
  sectionBreakdown: [
    {
      sectionName: "Professional Summary",
      analysis:
        "The summary is a bit generic. It should be tailored to highlight your most relevant qualifications for this specific role.",
      suggestions: [
        "Rewrite the summary to mention '5+ years of experience in B2B SaaS product management'.",
        "Include a key achievement that demonstrates your ability to lead product development from conception to launch.",
      ],
    },
    {
      sectionName: "Work Experience",
      analysis:
        "Your responsibilities are well-listed, but they read more like a list of duties than impactful achievements.",
      suggestions: [
        "For each bullet point, quantify your results. Instead of 'Managed product backlog,' try 'Managed and prioritized a product backlog of over 200 user stories, leading to a 15% increase in development velocity'.",
        "Incorporate keywords like 'JIRA' and 'Agile' to describe your process, e.g., 'Utilized JIRA to manage sprints within an Agile framework...'",
      ],
    },
  ],
  actionPlan: [
    {
      priority: "High",
      action:
        "Rewrite the Professional Summary to align with the job description's core requirements.",
    },
    {
      priority: "High",
      action:
        "Revise at least 3-4 bullet points in your most recent role to include quantifiable metrics and missing keywords.",
    },
    {
      priority: "Medium",
      action:
        "Add a 'Technical Skills' subsection to your Skills section to explicitly list 'JIRA' and 'Confluence'.",
    },
  ],
};

// --- Material You Inspired Theme ---
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4A55A2",
    },
    secondary: {
      main: "#7895CB",
    },
    background: {
      default: "#F0F0F0",
      paper: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
    },
    error: {
      main: "#F44336",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "8px 0",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

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
      <Typography variant="body1" color="text.secondary">
        {summary}
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

export default function Result() {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Resume Analysis Report
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <OverallScoreCard
            score={exampleAnalysis.overallMatchScore}
            summary={exampleAnalysis.analysisSummary}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <KeywordAnalysisCard analysis={exampleAnalysis.keywordAnalysis} />
        </Grid>
        <Grid item xs={12}>
          <SectionBreakdownAccordion
            sections={exampleAnalysis.sectionBreakdown}
          />
        </Grid>
        <Grid item xs={12}>
          <ActionPlanList plan={exampleAnalysis.actionPlan} />
        </Grid>
      </Grid>
    </Box>
  );
}
