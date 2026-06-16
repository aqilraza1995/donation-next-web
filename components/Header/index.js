"use client"

import { Box, Stack, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "@/slice/authSlice";
import { persistor } from "@/store";

const Header = ({ handleDrawerOpen }) => {
  const theme = useTheme();
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  const word = pathname?.split("/")
  const heading = word[1]?.charAt(0).toUpperCase() + word[1]?.slice(1) || ""
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { name = "" } = useSelector(state => state?.auth?.loggedUser)

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap()
      await persistor.purge();
      router.push("/login")
      toast.success(res?.message)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <Box sx={{ px: 3, py: 5, color: "#070707", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        {isMobile ?
          <IconButton onClick={handleDrawerOpen} sx={{ mr: 2 }}><Menu /></IconButton>
          :
          <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: "500", }}>{heading || ""}</Typography>
        }
      </Box>
      <Stack direction={"row"} sx={{ gap: 2, alignItems: "center" }}>
        <Typography variant="body1">{name || ""}</Typography>
        <IconButton sx={{ mt: 0.5, color: "black" }} onClick={handleLogout}>
          <Logout sx={{ height: "20px", width: "20px" }} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default Header