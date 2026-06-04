import { Stack, Box, Typography } from "@mui/material"
import { Logout } from "@mui/icons-material"


const Sidebar = ({ route }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        height: "calc(100vh - 64px)",
        p: 2,
        borderRadius: 5,
      }}
    >

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "center", my: 3 }}>
        <Typography variant="h6" sx={{ color: "#070707", fontWeight: "600", fontFamily: "cursive", }}>
          Donation
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", overflow: "auto", }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "center", my: 3, }}>
          {route.map((item) => (
            <Stack
              key={item?.name}
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor: "#ff8e29",
                px: 1,
                py: 0.5,
                borderRadius: 3,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: "#ffb36b", },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", p: 1, alignItems: "center", }}>
                {item?.icon}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "#ffffff", fontWeight: "500", fontFamily: "cursive", }}>
                  {item.name}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: "#ff8e29",
            px: 1,
            py: 0.5,
            mt: 6,
            borderRadius: 3,
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": { backgroundColor: "#ffb36b", },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", p: 0.8, alignItems: "center" }}>
            <Logout sx={{ height: "22px", width: "20px", color: "#ffffff" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1" sx={{ color: "#ffffff", fontWeight: "500", fontFamily: "cursive", }}>
              Log out
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Sidebar