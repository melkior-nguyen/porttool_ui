import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PackageCard from "./PackageCard";
import AppGridContainer from "@/components/AppGridContainer";
import { Box, ThemeProvider, createTheme } from "@mui/material";

type PackageOneProps = {
  pricing: any[];
};

const PackageOne: React.FC<PackageOneProps> = ({ pricing }) => {
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const theme = createTheme({
    spacing: 4,
  });
  theme.spacing(2);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ alignItems: "center" }}>
        <AppGridContainer
          sx={{
            maxWidth: 1000,
          }}
        >
          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {pricing.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PackageCard
                  pricing={data}
                  isCallingAPI={isCallingAPI}
                  setIsCallingAPI={setIsCallingAPI}
                />
              </Grid>
            ))}
          </Grid>
        </AppGridContainer>
      </Box>
    </ThemeProvider>
  );
};

export default PackageOne;
