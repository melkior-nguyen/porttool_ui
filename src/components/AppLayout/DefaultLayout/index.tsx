import clsx from "clsx";
import DefaultLayoutWrapper from "./DefaultLayoutWrapper";
import MainContent from "./MainContent";
import AppSidebar from "./AppSidebar";
import DefaultLayoutContainer from "./DefaultLayoutContainer";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterConfigData } from "@/models/App";
import { getUserInfo } from "@/store/auth/action";
import { useDispatchResolve } from "@/utils/Hooks";
import { useCallback, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import SocialPassword from "@/pages/SocialPassword";
import appColors from "@/styles/appColor";

type Props = {
  children: any;
  routesConfig: RouterConfigData[];
};

const DefaultLayout = ({ routesConfig, children }: Props) => {
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const [openSocialPassword, setOpenSocialPassword] = useState(false);

  const handleClickOpenSocialPassword = () => {
    setOpenSocialPassword(true);
  };

  const handleCloseSocialPassword = (event: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setOpenSocialPassword(false);
  };

  const closeSocialPassword = useCallback(() => {
    setOpenSocialPassword(false);
  }, []);

  useEffect(() => {
    dispatchResolve(getUserInfo())
      .then((data: any) => {
        if (data && data.id === undefined) handleClickOpenSocialPassword();
      })
      .catch(() => {});
  }, [dispatchResolve, navigate]);

  const { footer, layoutType, headerType, footerType } = {
    footer: false,
    layoutType: "full-width",
    headerType: "fixed",
    footerType: "fluid",
  };

  const [isNavCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = useCallback(() => {
    setNavCollapsed(!isNavCollapsed);
  }, [isNavCollapsed]);

  return (
    <>
      <DefaultLayoutContainer
        className={clsx({
          boxedLayout: layoutType === "boxed",
          framedLayout: layoutType === "framed",
        })}
      >
        <DefaultLayoutWrapper
          className={clsx("defaultLayoutWrapper", {
            appMainFooter: footer && footerType === "fluid",
            appMainFixedFooter: footer && footerType === "fixed",
            appMainFixedHeader: headerType === "fixed",
          })}
        >
          <AppSidebar
            routesConfig={routesConfig}
            isNavCollapsed={isNavCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
          />

          <MainContent>
            <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
            <Box
              sx={{
                p: '34px 24px 24px',
                backgroundColor: appColors.bg.main,
                height: "100%",
              }}
            >
              {children}
            </Box>
          </MainContent>
        </DefaultLayoutWrapper>
      </DefaultLayoutContainer>

      {/* Social Password */}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openSocialPassword}
        onClose={handleCloseSocialPassword}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <SocialPassword closeSocialPassword={closeSocialPassword} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DefaultLayout;
