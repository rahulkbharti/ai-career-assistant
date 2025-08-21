import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  //   Description as DescriptionIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import AssistantIcon from "@mui/icons-material/Assistant";

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Job Analysis", icon: <AnalyticsIcon />, path: "/analyze" },
  { text: "Job Tracker", icon: <WorkIcon />, path: "/jobs" },
  { text: "Profile", icon: <PersonIcon />, path: "/profile" },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
  const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  const LogoSection = () => (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 1,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[4],
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: 1,
        }}
      >
        <AssistantIcon
          sx={{
            fontSize: 32,
            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            ml: 1,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            background: theme.palette.primary.main,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI Career Assistant
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          px: 0.5,
          color: theme.palette.text.secondary,
          fontWeight: 500,
          letterSpacing: "0.5px",
          alignSelf: "center",
          borderTop: `1px solid ${theme.palette.divider}`,
          width: "92%",
          textAlign: "center",
          pt: 0.5,
        }}
      >
        Your smart job search partner
      </Typography>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <LogoSection />
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
        open
      >
        <LogoSection />
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
