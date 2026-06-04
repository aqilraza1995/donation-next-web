

"use client";

import { usePathname } from "next/navigation";
import Header from "../Header"
import Sidebar from "../Sidebar";
import { Box, Stack } from "@mui/material";
import { Group, Paid, DashboardCustomize } from "@mui/icons-material";

const authRoutes = ["/login", "/register"];

const route = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardCustomize sx={{ height: "22px", width: "22px" }} /> },
  { name: "Donation", path: "/donation", icon: <Group sx={{ height: "22px", width: "22px" }} /> },
  { name: "User", path: "/user", icon: <Paid sx={{ height: "22px", width: "22px" }} /> },
];

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = authRoutes.includes(pathname);
  return (
    <Box sx={{ backgroundColor: "#fff4ea", minHeight: "100vh" }}>
      <Stack direction="row" alignItems="center" gap={2} mb={4}>

        {!isAuthPage && (
          <Box sx={{ m: "32px", maxWidth: "278px", width: "278px" }}>
            <Sidebar route={route} />
          </Box>
        )}
        <Box sx={{ width: "100%" }}>
          {isAuthPage ? null : <Header />}

          <Box sx={{ px: 2 }}>
            {children}
          </Box>

        </Box>
      </Stack>
    </Box>
  )
}

export default LayoutWrapper;
