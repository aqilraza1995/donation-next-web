

"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { Box, Stack, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { Group, Paid, DashboardCustomize } from "@mui/icons-material";

import Header from "../Header"
import Sidebar from "../Sidebar";

const authRoutes = ["/login", "/sign-up", "/forgot-password", "/reset-password"];

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = authRoutes.includes(0);
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { role = "" } = useSelector(state => state?.auth?.loggedUser)

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menu = useMemo(() => {
    const dashboard = {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardCustomize sx={{ height: 22, width: 22, color: "#fff" }} />,
    };

    const donation = {
      name: "Donation",
      path: "/donation",
      icon: <Paid sx={{ height: 22, width: 22, color: "#fff" }} />,
    };

    const users = {
      name: "User",
      path: "/users",
      icon: <Group sx={{ height: 22, width: 22, color: "#fff" }} />,
    };

    return role === "admin"
      ? [dashboard, users]
      : [dashboard, donation];
  }, [role]);

  return (
    <Box sx={{ backgroundColor: "#fff4ea", minHeight: "100vh" }}>
      <Stack direction="row" alignItems="center" gap={2} >

        {!isAuthPage && !isMobile && (
          <Box sx={{ m: "32px", maxWidth: "278px", width: "278px", position: "sticky", top: "32px", height: "calc(100vh - 64px)", }}  >
            <Sidebar route={menu} />
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
              <Sidebar route={menu} />
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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </Box>
  )
}

export default LayoutWrapper;
