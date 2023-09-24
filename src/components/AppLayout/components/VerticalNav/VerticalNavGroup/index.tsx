import React from "react";
import clsx from "clsx";
import VerticalCollapse from "../VerticalCollapse";
import VerticalItem from "../VerticalItem";
import VerticalNavGroupItem from "./VerticalNavGroupItem";
import { RouterConfigData } from "@/models/App";
import IntlMessages from "@/helpers/IntlMessages";
import appColors from "@/styles/appColor";

type VerticalNavGroupProps = {
  item?: RouterConfigData;
  level?: any;
};

const VerticalNavGroup: React.FC<VerticalNavGroupProps> = ({ item, level }) => {
  // const { sidebarTextColor } = { sidebarTextColor: "rgba(0, 0, 0, 0.60)" };
  const { sidebarTextColor } = { sidebarTextColor: appColors.bg.select };

  return (
    <>
      <VerticalNavGroupItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        component="div"
        className={clsx("nav-item nav-item-header")}
      >
        {<IntlMessages id={item?.messageId} />}
      </VerticalNavGroupItem>

      {item?.children?.map((item) => (
        <React.Fragment key={item.id}>
          {(item.type === "collapse" || item.type === "button") && (
            <VerticalCollapse item={item} level={level} />
          )}
          {item.type === "item" && <VerticalItem item={item} level={level} />}
        </React.Fragment>
      ))}
    </>
  );
};

const NavVerticalGroup = VerticalNavGroup;

export default NavVerticalGroup;
