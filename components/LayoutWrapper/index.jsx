

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header"
import Sidebar from "../Sidebar";
import { Box, Stack, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { Group, Paid, DashboardCustomize } from "@mui/icons-material";

const authRoutes = ["/login", "/sign-up", "/forgot-password", "/reset-password"];

const route = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardCustomize sx={{ height: "22px", width: "22px", color:"#ffff" }} /> },
  { name: "Donation", path: "/donation", icon: <Group sx={{ height: "22px", width: "22px", color:"#ffff" }} /> },
  { name: "User", path: "/users", icon: <Paid sx={{ height: "22px", width: "22px", color:"#ffff" }} /> },
];

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = authRoutes.includes(pathname);
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "#fff4ea", minHeight: "100vh" }}>
      <Stack direction="row" alignItems="center" gap={2} >

        {!isAuthPage && !isMobile && (
          <Box sx={{ m: "32px", maxWidth: "278px", width: "278px" }}  >
            <Sidebar route={route} />
          </Box>
        )}

         {!isAuthPage && (
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <Box
              sx={{
                width: 280,
                backgroundColor: "#fff",
              }}
            >
              <Sidebar route={route} />
            </Box>
          </Drawer>
        )}

        <Box sx={{ width: "100%" }}>
          {isAuthPage ? null : <Header handleDrawerOpen={() => setOpenDrawer(true)} />}

          <Box sx={{ px: 2 }}>
            {children}
          </Box>

        </Box>
      </Stack>
    </Box>
  )
}

export default LayoutWrapper;
