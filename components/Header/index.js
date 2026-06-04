import { Box, Stack, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";


const Header = () => {
  return (
    <Box sx={{ px: 3, py: 5, color: "#070707", width: "100%", display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: "500", fontFamily: "cursive" }}>Dashbaord</Typography>
      </Box>
      <Stack direction={"row"} sx={{ gap: 4 }}>
        <Typography variant="body1" sx={{ fontFamily: "cursive" }}>Aqil Raza</Typography>
        <Logout sx={{ height: "20px", width: "20px", mt: 0.5 }} />
      </Stack>
    </Box>
  )
}

export default Header