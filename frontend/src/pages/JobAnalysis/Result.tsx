import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  TextField,
  Button,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ExpandMore,
  CheckCircle,
  Cancel,
  Warning,
  EmojiObjects,
  Edit,
  Add,
  Psychology,
  AutoAwesome,
} from "@mui/icons-material";
import type { ResumeSchema } from "../../../../schema/types/resume.types";

interface ResumeAnalysisProps {
  resume: ResumeSchema;
}

interface AnalysisResult {
  section: string;
  score: number;
  maxScore: number;
  originalContent: string | React.ReactNode;
  suggestedContent: string | React.ReactNode;
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

interface KeywordSuggestion {
  keyword: string;
  context: string;
  suggestedLine: string;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ resume }) => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [tabValue, setTabValue] = useState<number>(0);
  const [topSkills, setTopSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [keywordSuggestions, setKeywordSuggestions] = useState<
    KeywordSuggestion[]
  >([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null
  );
  const [aiDialogOpen, setAiDialogOpen] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Mock job description analysis
  const analyzeResume = () => {
    // Extract keywords from job description (simplified)
    const keywords = jobDescription.toLowerCase().match(/\b(\w+)\b/g) || [];
    const uniqueKeywords = [...new Set(keywords)].filter(
      (word) => word.length > 4
    );

    // Generate keyword suggestions
    const suggestions: KeywordSuggestion[] = uniqueKeywords
      .slice(0, 8)
      .map((keyword, i) => {
        const contexts = [
          "Implemented secure authentication using JWT + Google OAuth 2.0 with redux-persist for session management",
          "Developed responsive web applications using React and TypeScript",
          "Optimized application performance reducing load time by 30%",
          "Led a team of 5 developers in an Agile environment",
          "Built RESTful APIs with Node.js and Express",
          "Managed database systems including MongoDB and PostgreSQL",
          "Deployed applications using Docker and AWS",
          "Created comprehensive test suites with Jest and Cypress",
        ];

        return {
          keyword,
          context: contexts[i % contexts.length],
          suggestedLine: `${
            contexts[i % contexts.length]
          }, incorporating ${keyword} to enhance security and user experience`,
        };
      });

    setKeywordSuggestions(suggestions);

    // Mock analysis results
    const results: AnalysisResult[] = [
      {
        section: "Summary",
        score: 7,
        maxScore: 10,
        originalContent: resume.summary,
        suggestedContent: (
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {resume.summary}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
              {resume.summary} With extensive experience in{" "}
              {uniqueKeywords.slice(0, 3).join(", ")} and proven track record in
              achieving measurable results. Successfully implemented solutions
              that increased efficiency by 25% and reduced costs by 15%.
            </Typography>
          </Box>
        ),
        suggestions: [
          "Include more keywords from the job description: " +
            uniqueKeywords.slice(0, 3).join(", "),
          "Quantify achievements with metrics (e.g., 'increased efficiency by 25%')",
          "Highlight most relevant experience upfront",
          "Add a sentence about your career objectives related to this specific role",
        ],
        matchedKeywords: ["experience", "development", "projects"],
        missingKeywords: uniqueKeywords.slice(0, 5),
      },
      {
        section: "Skills",
        score: 8,
        maxScore: 10,
        originalContent: (
          <Box>
            {resume.skills.map((skill, index) => (
              <Chip
                key={index}
                label={`${skill.category}: ${skill.keywords.join(", ")}`}
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        ),
        suggestedContent: (
          <Box>
            {resume.skills.map((skill, index) => (
              <Chip
                key={index}
                label={`${skill.category}: ${skill.keywords.join(", ")}`}
                variant="outlined"
                sx={{ m: 0.5 }}
                color={
                  skill.keywords.some((k) =>
                    uniqueKeywords.includes(k.toLowerCase())
                  )
                    ? "success"
                    : "default"
                }
              />
            ))}
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Add these missing skills:
              </Typography>
              {uniqueKeywords.slice(0, 3).map((skill, index) => (
                <Chip
                  key={`missing-${index}`}
                  label={skill}
                  variant="filled"
                  color="warning"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        ),
        suggestions: [
          `Add missing skills: ${uniqueKeywords.slice(0, 3).join(", ")}`,
          "Reorder skills to put most relevant first",
          "Group skills by proficiency level (Advanced, Intermediate, Beginner)",
          "Add percentages to indicate skill level",
        ],
        matchedKeywords: resume.skills.flatMap((skill) =>
          skill.keywords.filter((k) => uniqueKeywords.includes(k.toLowerCase()))
        ),
        missingKeywords: uniqueKeywords
          .filter(
            (keyword) =>
              !resume.skills.some((skill) =>
                skill.keywords.some(
                  (k) => k.toLowerCase() === keyword.toLowerCase()
                )
              )
          )
          .slice(0, 5),
      },
      {
        section: "Experience",
        score: 6,
        maxScore: 10,
        originalContent: (
          <Box>
            {resume.workExperience.slice(0, 2).map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{exp.company}</strong> - {exp.position}
                </Typography>
                <Typography variant="body2">
                  {exp.startDate} to {exp.endDate}
                </Typography>
                <Typography variant="body2">{exp.location}</Typography>
                <List dense>
                  {exp.highlights.map((highlight, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: 0,
                        ml: 2,
                      }}
                    >
                      <Typography variant="body2">{highlight}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        ),
        suggestedContent: (
          <Box>
            {resume.workExperience.slice(0, 2).map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{exp.company}</strong> - {exp.position}
                </Typography>
                <Typography variant="body2">
                  {exp.startDate} to {exp.endDate}
                </Typography>
                <Typography variant="body2">{exp.location}</Typography>
                <List dense>
                  {exp.highlights.map((highlight, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: 0,
                        ml: 2,
                      }}
                    >
                      <Typography variant="body2">
                        {highlight}{" "}
                        {i === 0 && (
                          <Chip
                            label="+ metrics"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </Typography>
                    </ListItem>
                  ))}
                  {index === 0 && (
                    <ListItem
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: 0,
                        ml: 2,
                      }}
                    >
                      <Typography variant="body2" color="success.main">
                        Implemented {uniqueKeywords[0] || "key technology"} to
                        improve efficiency by 25% and reduce costs by 15%
                      </Typography>
                    </ListItem>
                  )}
                </List>
              </Box>
            ))}
          </Box>
        ),
        suggestions: [
          "Add quantifiable achievements with numbers and percentages",
          "Include more keywords from job description in bullet points",
          "Focus on results rather than responsibilities",
          "Use action verbs like 'Implemented', 'Developed', 'Led', 'Optimized'",
        ],
        matchedKeywords: ["management", "development", "implementation"],
        missingKeywords: uniqueKeywords.slice(3, 6),
      },
      {
        section: "Projects",
        score: 5,
        maxScore: 10,
        originalContent: (
          <Box>
            {resume.projects.slice(0, 2).map((project, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{project.name}</strong>
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, my: 1 }}
                >
                  {project.technologies.map((tech, i) => (
                    <Chip
                      key={i}
                      label={tech}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ),
        suggestedContent: (
          <Box>
            {resume.projects.slice(0, 2).map((project, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{project.name}</strong> -{" "}
                  <Chip
                    label="Enhanced"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </Typography>
                <Typography variant="body2">
                  {project.description}{" "}
                  {index === 0 &&
                    `using ${
                      uniqueKeywords[1] || "relevant technology"
                    } to achieve ${
                      uniqueKeywords[2] || "desired outcome"
                    }, resulting in a 30% improvement in performance`}
                </Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, my: 1 }}
                >
                  {project.technologies.map((tech, i) => (
                    <Chip
                      key={i}
                      label={tech}
                      size="small"
                      variant="outlined"
                      color={
                        uniqueKeywords.includes(tech.toLowerCase())
                          ? "success"
                          : "default"
                      }
                    />
                  ))}
                  {uniqueKeywords.slice(4, 6).map((tech, i) => (
                    <Chip
                      key={`missing-${i}`}
                      label={tech}
                      size="small"
                      variant="filled"
                      color="warning"
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ),
        suggestions: [
          "Add more technologies from the job description",
          "Include project outcomes and impacts with metrics",
          "Highlight projects most relevant to the target job",
          "Add links to live demos or GitHub repositories",
          "Mention team size and your specific role in projects",
        ],
        matchedKeywords: resume.projects.flatMap((project) =>
          project.technologies.filter((tech) =>
            uniqueKeywords.includes(tech.toLowerCase())
          )
        ),
        missingKeywords: uniqueKeywords
          .filter(
            (keyword) =>
              !resume.projects.some((project) =>
                project.technologies.some(
                  (tech) => tech.toLowerCase() === keyword.toLowerCase()
                )
              )
          )
          .slice(0, 3),
      },
    ];

    // Calculate overall score
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const maxTotalScore = results.reduce(
      (sum, result) => sum + result.maxScore,
      0
    );
    const calculatedOverallScore = Math.round(
      (totalScore / maxTotalScore) * 100
    );

    // Extract top skills and missing skills
    const allMatchedKeywords = results.flatMap((r) => r.matchedKeywords);
    const allMissingKeywords = results.flatMap((r) => r.missingKeywords);

    setTopSkills([...new Set(allMatchedKeywords)].slice(0, 5));
    setMissingSkills([...new Set(allMissingKeywords)].slice(0, 5));
    setAnalysisResults(results);
    setOverallScore(calculatedOverallScore);
    setTabValue(0);

    // Generate AI suggestions
    setAiSuggestions([
      "Add more metrics to quantify your achievements - numbers stand out to recruiters",
      "Incorporate keywords from the job description like " +
        uniqueKeywords.slice(0, 3).join(", "),
      "Reorder your experience to highlight the most relevant roles first",
      "Add a projects section that directly mirrors the technologies mentioned in the job description",
      "Include a technical skills matrix with proficiency levels",
    ]);
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "error";
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSuggestionClick = (index: number) => {
    setSelectedSuggestion(selectedSuggestion === index ? null : index);
  };

  const handleAiDialogOpen = () => {
    setAiDialogOpen(true);
  };

  const handleAiDialogClose = () => {
    setAiDialogOpen(false);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Resume Job Fit Analysis
          </Typography>
          <Tooltip title="Get AI-powered suggestions">
            <Button
              variant="outlined"
              startIcon={<Psychology />}
              onClick={handleAiDialogOpen}
            >
              AI Suggestions
            </Button>
          </Tooltip>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Paste Job Description Here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={analyzeResume}
          disabled={jobDescription.length < 50}
          sx={{ mb: 3 }}
          startIcon={<AutoAwesome />}
        >
          Analyze Resume Fit
        </Button>

        {analysisResults.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Overall Resume Score: {overallScore}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={overallScore}
              sx={{ height: 10, mb: 2 }}
              color={
                overallScore >= 80
                  ? "success"
                  : overallScore >= 60
                  ? "warning"
                  : "error"
              }
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      Top Matching Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {topSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Warning color="warning" sx={{ mr: 1 }} />
                      Missing Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {missingSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="warning"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Keyword Implementation Suggestions
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {keywordSuggestions.map((suggestion, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      backgroundColor:
                        selectedSuggestion === index
                          ? "action.selected"
                          : "background.paper",
                      borderColor:
                        selectedSuggestion === index
                          ? "primary.main"
                          : "divider",
                    }}
                    onClick={() => handleSuggestionClick(index)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Add keyword:
                        </Typography>
                        <Chip
                          label={suggestion.keyword}
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {suggestion.context}
                        </Typography>
                        {selectedSuggestion === index && (
                          <Typography variant="body2" color="success.main">
                            {suggestion.suggestedLine}
                          </Typography>
                        )}
                      </Box>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Detailed Analysis" />
              <Tab label="Tailored Resume View" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                {analysisResults.map((result, index) => (
                  <Accordion key={index} defaultExpanded={index === 0}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ mr: 2 }}>
                          {result.section}
                        </Typography>
                        <Chip
                          label={`${result.score}/${result.maxScore}`}
                          color={getScoreColor(result.score, result.maxScore)}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2" gutterBottom>
                        Original Content:
                      </Typography>
                      <Box
                        sx={{
                          mb: 2,
                          p: 1,
                          bgcolor: "#f9f9f9",
                          borderRadius: 1,
                        }}
                      >
                        {result.originalContent}
                      </Box>

                      <Typography variant="subtitle2" gutterBottom>
                        Suggested Improvement:
                      </Typography>
                      <Box
                        sx={{
                          mb: 2,
                          p: 1,
                          bgcolor: "#e8f5e9",
                          borderRadius: 1,
                        }}
                      >
                        {result.suggestedContent}
                      </Box>

                      <Alert severity="info" icon={<EmojiObjects />}>
                        <Typography variant="subtitle2" gutterBottom>
                          Suggestions:
                        </Typography>
                        <ul>
                          {result.suggestions.map((suggestion, i) => (
                            <li key={i}>
                              <Typography variant="body2">
                                {suggestion}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Alert>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {tabValue === 1 && (
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">{resume.basics.name}</Typography>
                  <Chip label={resume.job_role} color="primary" />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Chip
                    label="9/10"
                    color="success"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography>
                      <strong>Address:</strong> {resume.basics.location.city},{" "}
                      {resume.basics.location.region},{" "}
                      {resume.basics.location.countryCode},{" "}
                      {resume.basics.location.postalCode}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography>
                      <strong>Phone:</strong> {resume.basics.phone}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography>
                      <strong>Email:</strong> {resume.basics.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography>
                      <strong>LinkedIn:</strong>{" "}
                      {
                        resume.basics.profiles.find(
                          (profile) =>
                            profile.network.toLowerCase() === "linkedin"
                        )?.url
                      }
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography>
                      <strong>GitHub:</strong>{" "}
                      {
                        resume.basics.profiles.find(
                          (profile) =>
                            profile.network.toLowerCase() === "github"
                        )?.url
                      }
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Summary
                  </Typography>
                  <Chip
                    label="7/10"
                    color="warning"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Typography paragraph sx={{ mb: 2 }}>
                  {resume.summary}
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Suggestion:</strong> Add keywords from job description
                  and quantify achievements. Target score: 10/10
                </Alert>
                <Box sx={{ p: 1, bgcolor: "#e8f5e9", borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" color="success.main">
                    {resume.summary} With extensive experience in{" "}
                    {jobDescription.split(" ").slice(0, 3).join(" ")} and proven
                    track record in achieving measurable results. Successfully
                    implemented solutions that increased efficiency by 25% and
                    reduced costs by 15%.
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Education
                  </Typography>
                  <Chip
                    label="9/10"
                    color="success"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                {resume.education.length === 0 && (
                  <Typography>No education details available</Typography>
                )}
                {resume.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography>
                      <strong>{edu.institution}</strong>
                    </Typography>
                    <Typography>
                      {edu.area} {edu.studyType && `- ${edu.studyType}`}
                    </Typography>
                    <Typography>GPA: {edu.gpa}</Typography>
                    <Typography>Graduation: {edu.endDate}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Technical Skills
                  </Typography>
                  <Chip
                    label="8/10"
                    color="success"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Grid container spacing={2}>
                  {resume.skills.map((skill, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Typography>
                        <strong>{skill.category}:</strong>{" "}
                        {skill.keywords.map((keyword, i) => (
                          <Chip
                            sx={{ mx: 0.5, mb: 0.5 }}
                            key={i}
                            label={keyword}
                            size="small"
                            variant="outlined"
                            color={
                              jobDescription
                                .toLowerCase()
                                .includes(keyword.toLowerCase())
                                ? "success"
                                : "default"
                            }
                          />
                        ))}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Suggestion:</strong> Add missing skills from job
                  description. Target score: 10/10
                </Alert>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Experiences
                  </Typography>
                  <Chip
                    label="6/10"
                    color="warning"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                {resume.workExperience.map((exp, index) => (
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
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Suggestion:</strong> Add quantifiable achievements and
                  align with job requirements. Target score: 9/10
                </Alert>
                <Box sx={{ p: 1, bgcolor: "#e8f5e9", borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" color="success.main">
                    • Implemented{" "}
                    {jobDescription.split(" ").slice(4, 6).join(" ")} to improve
                    efficiency by 25% and reduce costs by 15%
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Projects
                  </Typography>
                  <Chip
                    label="5/10"
                    color="error"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                {resume.projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography>
                      {index + 1}. <strong>{project.name}</strong>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        my: 1,
                      }}
                    >
                      {project.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          variant="outlined"
                          color={
                            jobDescription
                              .toLowerCase()
                              .includes(tech.toLowerCase())
                              ? "success"
                              : "default"
                          }
                        />
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
                    </Typography>
                    <Typography variant="body2">
                      <strong>Live Demo:</strong> {project.url}
                    </Typography>
                  </Box>
                ))}
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Suggestion:</strong> Highlight projects most relevant
                  to the job and add technologies from job description. Target
                  score: 8/10
                </Alert>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Achievements
                  </Typography>
                  <Chip
                    label="7/10"
                    color="warning"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <List dense>
                  {resume.achievements.map((achievement, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        pl: 0,
                        ml: 2,
                      }}
                    >
                      <Typography variant="body2">
                        <strong>{achievement.title}</strong> ({achievement.date}
                        ): {achievement.description}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Suggestion:</strong> Include more achievements related
                  to the target role. Target score: 8/10
                </Alert>
              </Paper>
            )}
          </Box>
        )}
      </Paper>

      <Dialog
        open={aiDialogOpen}
        onClose={handleAiDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Psychology sx={{ mr: 1 }} />
            AI-Powered Resume Suggestions
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Based on our analysis of your resume and the job description, here
            are our top AI-generated suggestions to improve your resume:
          </Typography>
          <List>
            {aiSuggestions.map((suggestion, index) => (
              <ListItem key={index} sx={{ display: "list-item", pl: 1 }}>
                <Typography variant="body2">{suggestion}</Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAiDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResumeAnalysis;
