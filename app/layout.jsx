import theme from "@/theme/theme";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";

import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import ReduxProvider from "@/store/ReduxProvider"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
});

export const metadata = {
  title: "Donation App",
  description: "Donation Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
