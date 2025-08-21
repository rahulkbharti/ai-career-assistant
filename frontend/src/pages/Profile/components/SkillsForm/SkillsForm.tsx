import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  Chip,
  Slider,
  MenuItem,
  Divider,
  Alert,
} from "@mui/material";
import { Add as AddIcon, Cancel as CancelIcon } from "@mui/icons-material";

interface SkillsFormProps {
  skills: string[];
  experience: number;
  preferredRoles: string[];
  onUpdateSkills: (skills: string[]) => void;
  onUpdateExperience: (experience: number) => void;
  onUpdatePreferredRoles: (roles: string[]) => void;
}

const roleOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "QA Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Mobile Developer",
];

const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  experience,
  preferredRoles,
  onUpdateSkills,
  onUpdateExperience,
  onUpdatePreferredRoles,
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onUpdateSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddRole = () => {
    if (newRole && !preferredRoles.includes(newRole)) {
      onUpdatePreferredRoles([...preferredRoles, newRole]);
      setNewRole("");
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    onUpdatePreferredRoles(
      preferredRoles.filter((role) => role !== roleToRemove)
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Skills & Preferences
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Years of Professional Experience
        </Typography>
        <Slider
          value={experience}
          onChange={(_, newValue) => onUpdateExperience(newValue as number)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={20}
          sx={{ maxWidth: 400, mt: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Technical Skills
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add your technical skills and proficiencies
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill (e.g., React, Python, AWS)"
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddSkill();
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              deleteIcon={<CancelIcon />}
              variant="outlined"
            />
          ))}
        </Box>

        {skills.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Add your skills to get better job matches.
          </Alert>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Preferred Roles
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select roles you're interested in pursuing
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            label="Select a role"
            size="small"
            sx={{ minWidth: 200, mr: 1 }}
          >
            {roleOptions.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={handleAddRole}
            disabled={!newRole}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {preferredRoles.map((role) => (
            <Chip
              key={role}
              label={role}
              onDelete={() => handleRemoveRole(role)}
              deleteIcon={<CancelIcon />}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>

        {preferredRoles.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Add your preferred roles to get relevant job recommendations.
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default SkillsForm;
