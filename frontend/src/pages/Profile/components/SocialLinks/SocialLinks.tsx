import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Code as LeetCodeIcon,
  Computer as HackerRankIcon,
  Language as PortfolioIcon,
  CheckCircle as ValidIcon,
  Cancel as InvalidIcon,
} from "@mui/icons-material";
import type { SocialLink } from "../../hooks/useProfileData";

interface SocialLinksProps {
  socialLinks: SocialLink[];
  onUpdate: (links: SocialLink[]) => void;
}

const platformConfig = {
  linkedin: {
    icon: <LinkedInIcon color="primary" />,
    placeholder: "https://linkedin.com/in/username",
    baseUrl: "https://linkedin.com/in/",
  },
  github: {
    icon: <GitHubIcon />,
    placeholder: "https://github.com/username",
    baseUrl: "https://github.com/",
  },
  leetcode: {
    icon: <LeetCodeIcon sx={{ color: "#FFA116" }} />,
    placeholder: "https://leetcode.com/username/",
    baseUrl: "https://leetcode.com/",
  },
  hackerrank: {
    icon: <HackerRankIcon sx={{ color: "#2EC866" }} />,
    placeholder: "https://hackerrank.com/username",
    baseUrl: "https://hackerrank.com/",
  },
  portfolio: {
    icon: <PortfolioIcon color="secondary" />,
    placeholder: "https://yourportfolio.com",
    baseUrl: "",
  },
};

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks, onUpdate }) => {
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [validating, setValidating] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLinks(socialLinks);
  }, [socialLinks]);

  const handleUrlChange = (platform: SocialLink["platform"], value: string) => {
    const updatedLinks = links.filter((link) => link.platform !== platform);

    if (value.trim()) {
      // Extract username from URL
      let username = value;
      const baseUrl = platformConfig[platform].baseUrl;
      if (baseUrl && value.includes(baseUrl)) {
        username = value.replace(baseUrl, "").replace(/\/$/, "");
      }

      updatedLinks.push({
        platform,
        url: value,
        username,
        validated: false,
      });
    }

    setLinks(updatedLinks);
  };

  const validateUrl = async (
    platform: SocialLink["platform"],
    _url: string
  ) => {
    setValidating((prev) => ({ ...prev, [platform]: true }));

    // In a real app, this would be an API call to validate the URL
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedLinks = links.map((link) =>
      link.platform === platform
        ? { ...link, validated: Math.random() > 0.3 } // Random validation for demo
        : link
    );

    setLinks(updatedLinks);
    onUpdate(updatedLinks);
    setValidating((prev) => ({ ...prev, [platform]: false }));
  };

  const getValidationState = (platform: SocialLink["platform"]) => {
    const link = links.find((l) => l.platform === platform);
    if (!link) return null;

    if (validating[platform]) return "validating";
    return link.validated ? "valid" : "invalid";
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Professional Profiles
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Connect your professional profiles to enhance your career assistant
        experience.
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(platformConfig).map(([platform, config]) => {
          const key = platform as SocialLink["platform"];
          const link = links.find((l) => l.platform === key);
          const validationState = getValidationState(key);

          return (
            <Grid size={{ xs: 12, md: 6 }} key={platform}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {config.icon}
                <Typography
                  variant="subtitle2"
                  sx={{ ml: 1, textTransform: "capitalize" }}
                >
                  {platform}
                </Typography>
              </Box>

              <TextField
                fullWidth
                placeholder={config.placeholder}
                value={link?.url || ""}
                onChange={(e) => handleUrlChange(key, e.target.value)}
                onBlur={() => link?.url && validateUrl(key, link.url)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {validationState === "validating" && (
                        <CircularProgress size={20} />
                      )}
                      {validationState === "valid" && (
                        <ValidIcon color="success" />
                      )}
                      {validationState === "invalid" && link?.url && (
                        <InvalidIcon color="error" />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              {validationState === "invalid" && link?.url && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  Could not validate this profile. Please check the URL.
                </Alert>
              )}
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => onUpdate(links)}
          disabled={links.some((link) => !link.validated)}
        >
          Save Profiles
        </Button>
      </Box>
    </Paper>
  );
};

export default SocialLinks;
