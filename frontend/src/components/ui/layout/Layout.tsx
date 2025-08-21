import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";

interface LayoutProps {
  children: React.ReactNode;
}
const drawerWidth: number = 320;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          paddingTop: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.background.default,
        }}
      >
        <Header onMenuToggle={handleDrawerToggle} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
