"use client"

import { Box, Stack, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation"

const Header = ({ handleDrawerOpen }) => {
  const theme = useTheme();
  const pathname = usePathname()
  const word = pathname?.split("/")
  const heading = word[1]?.charAt(0).toUpperCase() + word[1]?.slice(1) || ""
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  
  return (
    <Box sx={{ px: 3, py: 5, color: "#070707", width: "100%", display: "flex", justifyContent: "space-between" }}>
      <Box>
        {isMobile ?
          <IconButton onClick={handleDrawerOpen} sx={{ mr: 2 }}><Menu /></IconButton>
          : <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: "500",  }}>{heading }</Typography>
        }
      </Box>
      <Stack direction={"row"} sx={{ gap: 4 }}>
        <Typography variant="body1">Aqil Raza</Typography>
        <Logout sx={{ height: "20px", width: "20px", mt: 0.5 }} />
      </Stack>
    </Box>
  )
}

export default Header