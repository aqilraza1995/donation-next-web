import { People } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";

const DashbaordCard = ({ iconBackground = "#27d095", icon }) => {
  return (
    <Paper sx={{ backgroundColor: "#fff", borderRadius: "8px", p: 2, mt: 2, color: "#070707" }}>
      <Stack direction={"row"} alignItems={"center"} sx={{ gap: 1 }}>
        <Box sx={{ backgroundColor: iconBackground || "#fcefe3", p: 2, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon || <People sx={{ height: "32px", width: "32px", color: "#fff" }} />}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, justifyContent: "center" }}>
          <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: "400", }}>Total Users</Typography>
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400",  }}>1000</Typography>
        </Box>
      </Stack>
    </Paper>
  )
}

export default DashbaordCard;