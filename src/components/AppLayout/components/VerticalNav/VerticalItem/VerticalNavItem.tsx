import React, { ReactNode } from "react";
import ListItem from "@mui/material/ListItem";
import { alpha } from "@mui/material";
import { Fonts } from "@/constants/AppEnums";
import appColors from "@/styles/appColor";

type VerticalNavItemProps = {
  children: ReactNode;
  level: number;
  [x: string]: any;
};

const VerticalNavItem: React.FC<VerticalNavItemProps> = ({
  children,
  level,
  ...rest
}) => {
  const {
    sidebarTextColor,
    sidebarIconColor,
    sidebarMenuSelectedBgColor,
    sidebarMenuSelectedTextColor,
  } = {
    sidebarTextColor: appColors.text.black,
    sidebarIconColor: appColors.text.black,
    sidebarMenuSelectedBgColor: appColors.bg.select,
    sidebarMenuSelectedTextColor: appColors.text.white,
  };

  return (
    <ListItem
      className="standard-menu"
      sx={{
        border: '1px solid transparent',
        height: 40,
        my: 0.25,
        cursor: "pointer",
        textDecoration: "none !important",
        mx: 2,
        width: "calc(100% - 16px)",
        pl: 22 + 33 * level + "px",
        pr: 3,
        // borderRadius: '12px',
        overflow: 'hidden',
        position: "relative",
        transition: "all 0.4s ease",
        whiteSpace: "nowrap",
        "& .nav-item-content": {
          color: 'sidebarTextColor',
        },
        "& .nav-item-icon": {
          color: sidebarIconColor,
          fontSize: 20,
          display: "block",
        },
        "& .nav-item-text": {
          color: sidebarTextColor,
          fontWeight: Fonts.MEDIUM,
          fontSize: 14,
        },

        "& .MuiTouchRipple-root": {
          zIndex: 1,
        },
        "&.nav-item-header": {
          textTransform: "uppercase",
        },
        "&:hover, &:focus": {
          border: `1px solid ${sidebarMenuSelectedBgColor}`,
          backgroundColor: 'transparent'
        },
        "&.active": {
          border: `1px solid ${sidebarMenuSelectedBgColor}`,
          pointerEvents: "none",
          // "& .nav-item-text,.nav-item-content": {
          //   color: sidebarMenuSelectedTextColor + "!important",
          //   fontWeight: Fonts.MEDIUM,
          // },
          // "& .nav-item-icon": {
          //   color: sidebarMenuSelectedTextColor + "!important",
          // },
        },
        "&.rounded-menu": {
          mr: 4,
          ml: 0,
          width: "calc(100% - 16px)",
          pl: 30 + 33 * level + "px",
          pr: 3,
          borderRadius: "0 30px 30px 0",
        },
        "&.rounded-menu-reverse": {
          ml: 4,
          mr: 0,
          width: "calc(100% - 16px)",
          pl: 14 + 33 * level + "px",
          pr: 3,
          borderRadius: "30px 0 0 30px",
        },
        "&.standard-menu": {
          mx: 0,
          width: "100%",
          pl: 30 + 15 * level + "px",
          pr: 3,
          borderRadius: '8px',
          position: "relative",
          // "&:after": {
          //   content: '""',
          //   position: "absolute",
          //   right: 0,
          //   top: 0,
          //   height: "100%",
          //   width: 4,
          //   backgroundColor: "transparent",
          // },
          "&.active:after": {
            backgroundColor: (theme) => theme.palette.primary.main,
          },
        },
        "&.curved-menu": {
          ml: 4,
          mr: 0,
          width: "calc(100% - 16px)",
          pl: 14 + 33 * level + "px",
          pr: 3,
          borderRadius: "30px 0 0 30px",
          position: "relative",
          transition: "none",
          "&:before, &:after": {
            content: '""',
            position: "absolute",
            right: 0,
            zIndex: 1,
            height: 40,
            width: 40,
            backgroundColor: "transparent",
            borderRadius: "50%",
            opacity: 0,
          },
          "&:before": {
            top: -40,
            boxShadow: `30px 30px 0 10px transparent`,
          },
          "&:after": {
            bottom: -40,
            boxShadow: `30px -30px 0 10px transparent`,
          },
          "&:hover, &.active": {
            backgroundColor: sidebarMenuSelectedBgColor,
            "& .nav-item-text, & .nav-item-icon": {
              color: sidebarMenuSelectedTextColor + "!important",
            },
            "&:before": {
              boxShadow: `30px 30px 0 10px ${sidebarMenuSelectedBgColor}`,
              opacity: 1,
            },
            "&:after": {
              boxShadow: `30px -30px 0 10px ${sidebarMenuSelectedBgColor}`,
              opacity: 1,
            },
          },
          "& .MuiTouchRipple-root": {
            display: "none",
          },
        },
      }}
      {...rest}
    >
      {children}
    </ListItem>
  );
};

export default VerticalNavItem;
