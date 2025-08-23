import React, { useState } from "react";
import { Box, Typography, Button, Paper, Grid, Divider } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ResumeSuggestion: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const suggestionText =
    "Developed a responsive admin dashboard using React, Redux, and Node.js, translating Figma designs into pixel-perfect UI components with 95% design fidelity, and integrating REST APIs for seamless data flow.";

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 4,
        fontFamily: "Arial, sans-serif",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Suggestion #1
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          Missing Keyword
        </Typography>
      </Box>

      <Typography variant="subtitle1" mt={1} fontWeight="bold">
        Add "React, Redux, REST, Node.js"
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={1}>
        Given your experience at Ekalsutra, highlighting your proficiency in
        React, Redux, REST APIs, and Node.js will resonate strongly with the
        hiring manager. These are all key skills mentioned in the job
        description.
      </Typography>

      {/* Current Line */}
      <Box mt={3}>
        <Typography fontWeight="bold">Your current line</Typography>
        <Paper
          variant="outlined"
          sx={{
            borderColor: "#f28b82",
            backgroundColor: "#fff",
            p: 2,
            mt: 1,
            fontStyle: "italic",
            color: "#d32f2f",
          }}
        >
          Developed a responsive admin dashboard using React.js, Material UI,
          and Redux Toolkit, translating Figma designs into pixel-perfect UI
          components with 95% design fidelity.
        </Paper>
      </Box>

      {/* Suggestion */}
      <Box mt={3}>
        <Typography fontWeight="bold">Suggestion</Typography>
        <Paper
          variant="outlined"
          sx={{
            borderColor: "#a8d5a2",
            backgroundColor: "#f1f8f4",
            p: 2,
            mt: 1,
          }}
        >
          <Typography component="span" sx={{ color: "#333" }}>
            Developed a responsive admin dashboard using{" "}
            <Box component="span" sx={{ backgroundColor: "#d0f0d0" }}>
              React
            </Box>
            ,{" "}
            <Box component="span" sx={{ backgroundColor: "#d0f0d0" }}>
              Redux
            </Box>
            , and{" "}
            <Box component="span" sx={{ backgroundColor: "#d0f0d0" }}>
              Node.js
            </Box>
            , translating Figma designs into pixel-perfect UI components with
            95% design fidelity, and integrating{" "}
            <Box component="span" sx={{ backgroundColor: "#d0f0d0" }}>
              REST
            </Box>{" "}
            APIs for seamless data flow.
          </Typography>

          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopyIcon />}
            sx={{ mt: 1 }}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </Paper>
      </Box>

      {/* Footer */}
      <Divider sx={{ my: 3 }} />
      <Typography fontSize={14} color="text.secondary" mb={2}>
        Apply this change in{" "}
        <strong>Experience &gt; Ekalsutra Edtech Pvt. Ltd.</strong>
      </Typography>

      <Grid container spacing={2}>
        <Grid>
          <Button variant="outlined" color="primary">
            Generate Alternative
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary">
            Mark as Done
          </Button>
        </Grid>
        <Grid>
          <Button variant="text" color="inherit">
            Skip
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResumeSuggestion;
