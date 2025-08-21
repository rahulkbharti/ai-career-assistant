import React from "react";
import {
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useTheme as ThemContext } from "../../../themes/theme";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AssistantIcon from "@mui/icons-material/Assistant";
interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleTheme, isDark } = ThemContext();

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        mb: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box
        component="span"
        sx={{ mr: 1, display: "flex", alignItems: "center" }}
      >
        <AssistantIcon />
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        AI Career Assistant
      </Typography>
      <IconButton color="inherit" onClick={toggleTheme}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      {isMobile && (
        <IconButton color="inherit" onClick={onMenuToggle}>
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Header;
