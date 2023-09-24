import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import VerticalItem from "../VerticalItem";
import IntlMessages from "@/helpers/IntlMessages";
import VerticalCollapseItem from "./VerticalCollapseItem";
import { useSelector } from "react-redux";
import { RouterConfigData } from "@/models/App";
import { useDispatchResolve } from "@/utils/Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfoMonitor } from "@/store/monitor/action";
import { MdExpandMore, MdOutlineChevronRight } from "react-icons/md";
import { getUserInfoMonitorSelector } from "@/store/monitor/selectors";
import {
  Avatar,
  Collapse,
  Icon,
  IconButton,
  ListItemText,
  alpha,
} from "@mui/material";
import Placeholder from "@/assets/images/placeholder_default.jpg";
import appColors from "@/styles/appColor";

const needsToBeOpened = (pathname: string, item: RouterConfigData): boolean => {
  return !!(pathname && isUrlInChildren(item, pathname));
};

const isUrlInChildren = (parent: RouterConfigData, url: string): boolean => {
  if (!parent.children) {
    return false;
  }
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }
    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url || "")
    ) {
      return true;
    }
  }
  return false;
};

type VerticalCollapseProps = {
  item: RouterConfigData;
  level: number;
};

const VerticalCollapse: React.FC<VerticalCollapseProps> = ({ item, level }) => {
  // const { sidebarTextColor } = { sidebarTextColor: "rgba(0, 0, 0, 0.60)" };
  const { sidebarTextColor, sidebarIconColor } = { sidebarTextColor: appColors.text.black, sidebarIconColor: appColors.text.black };
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<any[]>([]);
  const dispatchResolve = useDispatchResolve();
  const userInfoMonitor = useSelector(getUserInfoMonitorSelector);

  useEffect(() => {
    if (userInfoMonitor?.joinedProjects && userInfoMonitor?.ownedProjects) {
      const newMenuItem = [
        ...userInfoMonitor.joinedProjects,
        ...userInfoMonitor.ownedProjects,
      ].map((item) => ({
        id: item.id,
        pinOrder: item.pinOrder,
        title: item.name,
        messageId: item.name,
        type: "item",
        noTranslate: true,
        url: `/project/${item.id}`,
        iconDynamic: (
          <IconButton size="small" sx={{ pl: 0, pr: 2 }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                border: "1px solid rgb(204, 204, 204)",
              }}
              src={item?.logo || Placeholder}
            />
          </IconButton>
        ),
      }));
      setMenuItem(newMenuItem);
    }
  }, [userInfoMonitor]);

  useEffect(() => {
    dispatchResolve(getUserInfoMonitor());
  }, [dispatchResolve]);

  const [open, setOpen] = useState<boolean>(() =>
    needsToBeOpened(pathname, item)
  );

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    }
    if (item.type === "button") setOpen(true);
  }, [pathname, item]);

  const handleClick = () => {
    if (item.type === "collapse") setOpen(!open);
    if (item.type === "button" && item.url) navigate(item.url);
  };

  return (
    <>
      <VerticalCollapseItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        button
        component="div"
        className={clsx("menu-vertical-collapse", open && "open")}
        onClick={handleClick}
      >
        {item.icon && (
          <Box component="span">
            <Icon
              sx={{ mr: 2, color: sidebarIconColor }}
            // className={clsx("nav-item-icon")}
            >
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
          }}
          className="nav-item-content"
          classes={{
            primary: clsx("nav-item-text !text-sm text-[rgba(0, 0, 0, 0.7)]"),
          }}
          primary={<IntlMessages id={item.messageId} />}
        />
        {item.type === "collapse" && (
          <IconButton
            className="nav-item-icon-arrow-btn"
            sx={{ p: 0, mr: 0.75 }}
            disableRipple
            size="large"
          >
            <Icon className="nav-item-icon-arrow" color="inherit">
              {open ? <MdOutlineChevronRight /> : <MdExpandMore />}
            </Icon>
          </IconButton>
        )}
      </VerticalCollapseItem>

      {item.type === "collapse" && item.children && (
        <Collapse in={open} className="collapse-children">
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "item" && (
                <VerticalItem item={item} level={level + 2} />
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}

      {item.type === "button" && menuItem && (
        <Collapse in={open} className="collapse-children">
          {menuItem.map((item) => {
            if (Number(item.pinOrder) > 0) {
              return (
                <React.Fragment key={item.id}>
                  {item.type === "item" && (
                    <VerticalItem item={item} level={level + 2} />
                  )}
                </React.Fragment>
              );
            }
          })}
        </Collapse>
      )}
    </>
  );
};

export default React.memo(VerticalCollapse);
