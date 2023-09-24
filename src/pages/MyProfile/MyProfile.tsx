import IntlMessages from "../../helpers/IntlMessages";
// import {
//   BsBank,
//   BsFillCalculatorFill,
//   BsFillPassFill,
//   BsFillPersonFill,
// } from "react-icons/bs";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Fonts } from "../../constants/AppEnums";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { paths } from "@/routes/constants";

// const tabs = [
//   {
//     id: 1,
//     icon: <BsFillPersonFill />,
//     name: <IntlMessages id="common.personalInfo" />,
//   },
//   {
//     id: 2,
//     icon: <BsFillPassFill />,
//     name: <IntlMessages id="common.sercurity" />,
//   },
//   {
//     id: 3,
//     icon: <BsFillCalculatorFill />,
//     name: <IntlMessages id="common.billing" />,
//   },
//   {
//     id: 4,
//     icon: <BsBank />,
//     name: <IntlMessages id="common.subscription" />,
//   },
//   {
//     id: 5,
//     icon: <BsBank />,
//     name: <IntlMessages id="common.payment" />,
//   },
// ];

const MyProfile = () => {
  const pathname = useLocation().pathname;
  const currentPage = useMemo(() => {
    switch (pathname) {
      case paths.myProfile:
        return "My profile";
      case paths.security:
        return "Security";
      case paths.manageDevices:
        return "Manage Devices";
      case paths.billing:
        return "Billing";
      case paths.subscription:
        return "Subscription";
    }
  }, [pathname]);

  return (
    <>
      <Box
        component="h2"
        sx={{
          fontSize: 16,
          color: "text.primary",
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ backgroundColor: "rgba(0, 0, 0, .03)", p: 1 }}
        >
          <Typography color="inherit">
            <IntlMessages id="sidebar.app.manageProfile" />
          </Typography>
          <Typography color="text.primary">{currentPage}</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ display: "block" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MyProfile;
