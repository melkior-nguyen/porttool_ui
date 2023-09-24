import { Box } from "@mui/material";
import { RouterConfigData } from "@/models/App";
import clsx from "clsx";
import React from "react";
import MainSidebar from "./MainSidebar";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import VerticalNav from "../components/VerticalNav";
import AppScrollbar from "@/components/AppScrollbar";
import PortToolLogo from "@/assets/images/port_tool_dark.png";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/constants";

type AppSidebarProps = {
  position?: "left" | "top" | "right" | "bottom";
  variant?: string;
  routesConfig: RouterConfigData[];
  isNavCollapsed: boolean;
  toggleNavCollapsed: () => void;
};

const AppSidebar: React.FC<AppSidebarProps> = ({
  variant = "",
  position = "left",
  toggleNavCollapsed,
  isNavCollapsed,
  routesConfig,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor={position}
          open={isNavCollapsed}
          onClose={() => toggleNavCollapsed()}
          classes={{
            root: clsx(variant),
            paper: clsx(variant),
          }}
          style={{ position: "absolute" }}
        >
          <MainSidebar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 1.7,
                cursor: "pointer",
              }}
              onClick={() => navigate(paths.dashboard)}
            >
              <img src={PortToolLogo} />
            </Box>
            <AppScrollbar
              sx={{
                py: 2,
                height: "calc(100vh - 70px) !important",
                borderTop: (theme: { palette: { divider: string } }) =>
                  `solid 1px ${theme.palette.divider}`,
                mt: 0.5,

              }}
            >
              <VerticalNav routesConfig={routesConfig} />
            </AppScrollbar>
          </MainSidebar>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <MainSidebar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 1.7,
              cursor: "pointer",
            }}
            onClick={() => navigate(paths.dashboard)}
          >
            <img src={PortToolLogo} />
          </Box>
          <AppScrollbar
            className="has-footer-fixed"
            sx={{
              py: '24px',
              height: "calc(100vh - 70px) !important",
              borderTop: `solid 1px #fff`,
              "&.has-footer-fixed": {
                height: {
                  xs: "calc(100vh - 117px) !important",
                  xl: "calc(100vh - 127px) !important",
                },
              },
            }}
          >
            <VerticalNav routesConfig={routesConfig} />
          </AppScrollbar>
        </MainSidebar>
      </Hidden>
    </>
  );
};

export default AppSidebar;
