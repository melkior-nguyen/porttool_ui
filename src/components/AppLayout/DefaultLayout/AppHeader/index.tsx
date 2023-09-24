import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppNotifications from "../../../AppNotifications";
import AccountMenu from "../AccountMenu";
import PortToolLogo from "@/assets/images/port_tool_dark.png";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/constants";
import appColors from "@/styles/appColor";

type Props = {
  toggleNavCollapsed: () => void;
};
const AppHeader = ({ toggleNavCollapsed }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="relative"
      color="inherit"
      sx={{
        // borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        boxShadow: '0 0 4px 0px #acacac',
        background: appColors.bg.main,
        // background: "linear-gradient(90deg, #0f172a 0%, #1a3052  75%, #0f172a 100%)",
        width: {
          xs: "100%",
        },
      }}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: "border-box",
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Hidden lgUp>
          <Box sx={{ display: "flex" }}>
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              edge="start"
              className="menu-btn"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleNavCollapsed}
              size="large"
            >
              <MenuIcon
                sx={{
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate(paths.dashboard)}
            >
              <img className="h-[60%]" src={PortToolLogo} />
            </Box>
          </Box>
        </Hidden>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Box sx={{ ml: 4 }}>
          <Hidden smDown>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <AppNotifications />
              </Box>
              <AccountMenu />
            </Box>
          </Hidden>

          <Hidden smUp>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              ></Box>
              <AppNotifications isMenu />
              <AccountMenu />
            </Box>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
