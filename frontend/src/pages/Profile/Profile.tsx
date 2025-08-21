import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ResumeUploader from "./components/ResumeUploader/ResumeUploader";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import ProfileOverview from "./components/ProfileOverview/ProfileOverview";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

import SkillsForm from "./components/SkillsForm/SkillsForm";
import useProfileData from "./hooks/useProfileData";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const {
    profileData,
    loading,
    addResume,
    removeResume,
    updateSocialLinks,
    updateSkills,
    updateExperience,
    updatePreferredRoles,
  } = useProfileData();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Complete your profile to get better job recommendations and tailored
        resume suggestions.
      </Alert>

      <Paper sx={{ width: "100%", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          variant="fullWidth"
        >
          <Tab icon={<PersonIcon />} label="Overview" />
          <Tab icon={<DocumentScannerIcon />} label="Resumes" />
          <Tab icon={<SettingsIcon />} label="Settings" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <ProfileOverview data={profileData} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ResumeBuilder />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ResumeUploader
          resumes={profileData.resumes}
          onAddResume={addResume}
          onRemoveResume={removeResume}
        />

        <SocialLinks
          socialLinks={profileData.socialLinks}
          onUpdate={updateSocialLinks}
        />

        <SkillsForm
          skills={profileData.skills}
          experience={profileData.experience}
          preferredRoles={profileData.preferredRoles}
          onUpdateSkills={updateSkills}
          onUpdateExperience={updateExperience}
          onUpdatePreferredRoles={updatePreferredRoles}
        />
      </TabPanel>
    </Box>
  );
};

export default Profile;
