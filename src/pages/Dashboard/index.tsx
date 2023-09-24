
import { Box, Breadcrumbs, } from "@mui/material";


import { CusMainContent, CusTypography } from "@/styles/cusMUI";
import appColors from "@/styles/appColor";
import { AiFillPieChart } from "react-icons/ai";
import { useState } from "react";
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";

const Dashboard = () => {


  return (
    <CusMainContent sx={{ backgroundColor: 'transparent' }}>

      {/* title */}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ backgroundColor: 'transparent', mb: '24px' }}
      >
        <CusTypography ><AiFillPieChart />Dashboard</CusTypography>
      </Breadcrumbs>

      {/* content */}
      <Box sx={{
        display: 'flex',
        gap: '24px',
        height: '100%'
      }}>
        <DashboardLeft />
        <DashboardRight />
      </Box>

    </CusMainContent >
  );
};

export default Dashboard;
