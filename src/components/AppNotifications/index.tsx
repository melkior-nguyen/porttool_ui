import React, { useState } from "react";
import { IconButton, Theme, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppNotificationContent from "./AppNotificationContent";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { alpha } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { useNavigate } from "react-router-dom";
import appColors from "@/styles/appColor";

type AppNotificationsProps = {
  drawerPosition?: "left" | "top" | "right" | "bottom";
  tooltipPosition?:
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";
  isMenu?: boolean;
  sxNotificationContentStyle?: SxProps<Theme>;
};

const AppNotifications: React.FC<AppNotificationsProps> = ({
  drawerPosition = "right",
  tooltipPosition = "bottom",
  isMenu = false,
  sxNotificationContentStyle = {},
}) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <Tooltip title="Notification" placement={tooltipPosition}>
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Notifications">
            <IconButton
              className="icon-btn"
              sx={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                // color: (theme) => theme.palette.text.secondary,
                color: appColors.button.primary,
                backgroundColor: appColors.bg.box,
                "&:hover": {
                  border: `1px solid ${appColors.button.primary}`,
                  background: '#fff'
                },
              }}
              onClick={() => setShowNotification(true)}
              size="large"
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Tooltip>
      <Drawer
        anchor={drawerPosition}
        open={showNotification}
        onClose={() => setShowNotification(false)}
      >
        <AppNotificationContent
          sxStyle={sxNotificationContentStyle}
          onClose={() => setShowNotification(false)}
        />
      </Drawer>
    </>
  );
};

export default AppNotifications;
