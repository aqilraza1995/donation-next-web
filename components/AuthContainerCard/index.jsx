"use client"

import Image from "next/image"
import { Suspense } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";


const AuthContainerCard = ({ title, children, imageUrl }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', color: "black", bgcolor: 'background.default', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={0} sx={{ maxWidth: 850, minHeight: "560px", width: '100%', borderRadius: 2, boxShadow: 3 }}>
        <Grid item size={{ xs: 12, md: 6 }} sx={{ p: 4, gap: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "25px", fontWeight: "700" }}>
              {title}
            </Typography>
          </Grid>

          {children}

        </Grid>
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            position: "relative",
            minHeight: { xs: 300, md: "100%" },
            display: "flex",
          }}
        >
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "primary.main" }}
              />
            }
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: { xs: 300, md: "100%" },
              }}
            >
              <Image
                src={imageUrl}
                alt="Login Image"
                fill
                quality={100}
                style={{
                  objectFit: "cover",
                  objectPosition: "center left",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              />
            </Box>
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AuthContainerCard;