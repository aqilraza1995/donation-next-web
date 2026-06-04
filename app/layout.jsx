import theme from "@/theme/theme";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";

import LayoutWrapper from "@/components/LayoutWrapper";


const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
});

export const metadata = {
  title: "Donation App",
  description: "Donation Management System",
};

export default function RootLayout({
  children,
}) {


  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body>
        <ThemeProvider theme={theme}>
          <LayoutWrapper>
          {children}
          </LayoutWrapper>
          {/* <Box sx={{ backgroundColor: "#fff4ea", minHeight: "100vh" }}>
            <Stack direction="row" alignItems="center" gap={2} mb={4}>

              
                <Box sx={{ m: "32px", maxWidth: "278px", width: "278px" }}>
                  <Sidebar route={route} />
                </Box>
              <Box sx={{ width: "100%" }}>
               <Header />

                <Box sx={{ px: 2 }}>
                  {children}
                </Box>
                
              </Box>
            </Stack>
          </Box> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
