import React from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import VerticalNavItem from "./VerticalNavItem";
import IntlMessages from "@/helpers/IntlMessages";
import AppNavLink from "@/components/AppNavLink";
import { Icon, ListItemText, alpha } from "@mui/material";
import { RouterConfigData } from "@/models/App";

type VerticalItemProps = {
  item: RouterConfigData;
  level: number;
};

const VerticalItem: React.FC<VerticalItemProps> = ({ level, item }) => {
  return (
    <VerticalNavItem
      button
      level={level}
      component={AppNavLink}
      to={item.url}
      exact={item.exact}
      activeClassName="active"
    >
      <Box component="span">
        {item.iconDynamic ? (
          item.iconDynamic
        ) : (
          <Icon
        className="nav-item-icon"
            sx={{
              fontSize: 20,
              display: "block",
              mr: 2
            }}
          >
            {item.icon}
          </Icon>
        )}
      </Box>
      <ListItemText
        className="nav-item-content"
        primary={
          item.noTranslate ? (
            item.messageId
          ) : (
            <IntlMessages id={item.messageId} />
          )
        }
      />
    </VerticalNavItem>
  );
};

export default React.memo(VerticalItem);
