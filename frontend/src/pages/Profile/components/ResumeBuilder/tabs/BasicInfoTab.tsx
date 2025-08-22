// tabs/BasicInfoTab.tsx
import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import type { ResumeSchema } from "../../../../../schema/types/resume.types";
interface BasicInfoTabProps {
  resume: ResumeSchema;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    field: string,
    index?: number,
    subIndex?: number
  ) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  resume,
  onInputChange,
}) => {
  return (
    <div>
      <TextField
        size="small"
        fullWidth
        label="Resume Name"
        value={resume.name}
        onChange={(e) => onInputChange(e, "top", "name")}
        margin="normal"
      />
      <TextField
        size="small"
        fullWidth
        label="Job Role"
        value={resume.job_role}
        onChange={(e) => onInputChange(e, "top", "job_role")}
        margin="normal"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Summary"
        fullWidth
        value={resume.summary}
        size="small"
        multiline
        maxRows={4}
        margin="normal"
        onChange={(e) => onInputChange(e, "top", "summary")}
      />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            label="Name"
            value={resume.basics.name}
            onChange={(e) => onInputChange(e, "basics", "name")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            label="Email"
            value={resume.basics.email}
            onChange={(e) => onInputChange(e, "basics", "email")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            label="Phone"
            value={resume.basics.phone}
            onChange={(e) => onInputChange(e, "basics", "phone")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            label="Label"
            value={resume.basics.label}
            onChange={(e) => onInputChange(e, "basics", "label")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            label="Website"
            value={resume.basics.website}
            onChange={(e) => onInputChange(e, "basics", "website")}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Social Profiles
      </Typography>
      <Grid container spacing={2}>
        {resume.basics.profiles.map((profile, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <TextField
              size="small"
              fullWidth
              label={profile.network}
              value={profile.url}
              onChange={(e) => onInputChange(e, "basics", "profiles", index)}
              margin="normal"
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            fullWidth
            label="City"
            value={resume.basics.location.city}
            onChange={(e) => onInputChange(e, "basics", "location.city")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            fullWidth
            label="Region"
            value={resume.basics.location.region}
            onChange={(e) => onInputChange(e, "basics", "location.region")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            fullWidth
            label="Country Code"
            value={resume.basics.location.countryCode}
            onChange={(e) => onInputChange(e, "basics", "location.countryCode")}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            fullWidth
            label="Postal Code"
            value={resume.basics.location.postalCode}
            onChange={(e) => onInputChange(e, "basics", "location.postalCode")}
            margin="normal"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BasicInfoTab;
