import React, { useCallback, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Description as DocumentIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import type { Resume } from "../../hooks/useProfileData";

interface ResumeUploaderProps {
  resumes: Resume[];
  onAddResume: (resume: Omit<Resume, "id">) => void;
  onRemoveResume: (id: string) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  resumes,
  onAddResume,
  onRemoveResume,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      acceptedFiles.forEach((file) => {
        if (file.type !== "application/pdf") {
          setError("Only PDF files are supported");
          return;
        }

        // Extract text from PDF (this would be a placeholder in a real app)
        // In a real app, you'd use a PDF parsing library or service
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target?.result as string;

          // Simple role extraction (placeholder logic)
          let role = "General";
          if (content.includes("frontend") || content.includes("react"))
            role = "Frontend Developer";
          if (content.includes("backend") || content.includes("node"))
            role = "Backend Developer";
          if (content.includes("machine learning") || content.includes("ai"))
            role = "ML Engineer";

          onAddResume({
            name: file.name,
            role,
            uploadDate: new Date(),
            file,
            content,
          });
        };
        reader.readAsText(file);
      });
    },
    [onAddResume]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Resume Management
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Upload multiple resumes tailored for different roles. The system will
        automatically categorize them based on content.
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.300",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          mb: 2,
          backgroundColor: isDragActive ? "action.hover" : "background.default",
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
        <Typography>
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop PDF files here, or click to select files"}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Your Resumes ({resumes.length})
      </Typography>

      {resumes.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", py: 3 }}
        >
          No resumes uploaded yet
        </Typography>
      ) : (
        <List>
          {resumes.map((resume) => (
            <ListItem key={resume.id}>
              <DocumentIcon color="primary" sx={{ mr: 2 }} />
              <ListItemText
                primary={resume.name}
                secondary={`Uploaded: ${resume.uploadDate.toLocaleDateString()} • Role: ${
                  resume.role
                }`}
              />
              <ListItemSecondaryAction>
                <Chip label={resume.role} size="small" sx={{ mr: 1 }} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemoveResume(resume.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ResumeUploader;
