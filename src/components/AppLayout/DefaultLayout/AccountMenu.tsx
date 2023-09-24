import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { getUserInfoSelector } from "@/store/auth/selectors";
import Placeholder from "@/assets/images/placeholder_default.jpg";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/constants";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function AccountMenu() {
  const navigate = useNavigate();
  const userInfo = useSelector(getUserInfoSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = React.useCallback(() => {
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem("jwt");
    navigate(paths.signin);
  }, [navigate]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="My Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={anchorEl === null ? {
                width: 40,
                height: 40,
                transition: 'all 0.25s ease',
                "&:hover": {
                  boxShadow: '0 0 2px 0 #0f172a , 0 0 6px 2px #00bfd8 '
                }
              } :
                {
                  width: 40,
                  height: 40,
                  transition: 'all 0.25s ease',
                  boxShadow: '0 0 2px 0 #0f172a , 0 0 6px 2px #00bfd8 '
                }
              }
              src={userInfo?.avatar || Placeholder}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem> */}
        <MenuItem onClick={() => navigate(paths.myProfile)}>
          <PersonIcon sx={{ mr: 1.5, color: "rgba(0, 0, 0, 0.54)" }} /> My
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate(paths.security)}>
          <SecurityIcon sx={{ mr: 1.5, color: "rgba(0, 0, 0, 0.54)" }} />
          Security
        </MenuItem>
        <MenuItem onClick={() => navigate(paths.manageDevices)}>
          <ManageAccountsIcon sx={{ mr: 1.5, color: "rgba(0, 0, 0, 0.54)" }} />
          Manage Devices
        </MenuItem>
        <MenuItem onClick={() => navigate(paths.billing)}>
          <ReceiptLongIcon sx={{ mr: 1.5, color: "rgba(0, 0, 0, 0.54)" }} />
          Billing
        </MenuItem>
        <MenuItem onClick={() => navigate(paths.subscription)}>
          <SubscriptionsIcon sx={{ mr: 1.5, color: "rgba(0, 0, 0, 0.54)" }} />
          Subscription
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
