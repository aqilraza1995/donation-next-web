import { Box, Stack, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";

const Header = ({ handleDrawerOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box sx={{ px: 3, py: 5, color: "#070707", width: "100%", display: "flex", justifyContent: "space-between" }}>
      <Box>
        {isMobile ?
          <IconButton onClick={handleDrawerOpen} sx={{ mr: 2 }}><Menu /></IconButton>
          : <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: "500", fontFamily: "cursive" }}>Dashbaord</Typography>
        }
      </Box>
      <Stack direction={"row"} sx={{ gap: 4 }}>
        <Typography variant="body1" sx={{ fontFamily: "cursive" }}>Aqil Raza</Typography>
        <Logout sx={{ height: "20px", width: "20px", mt: 0.5 }} />
      </Stack>
    </Box>
  )
}

export default Header