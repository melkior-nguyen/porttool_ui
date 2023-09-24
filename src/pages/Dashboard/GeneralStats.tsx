import React from "react";
import Box from "@mui/material/Box";

import { FcGraduationCap, FcReading } from "react-icons/fc";
import { CiMoneyBill } from "react-icons/ci";
import AppCard from "@/components/AppCard";
import { Fonts } from "@/constants/AppEnums";
import appColors from "@/styles/appColor";
import { MdOutlineBorderColor } from "react-icons/md";
import { AiOutlineLineChart, AiOutlineUsergroupAdd } from "react-icons/ai";

const getIcon: React.FC<any> = (iconType) => {
  switch (iconType) {
    case "CiMoneyBill":
      return <CiMoneyBill className="icon" style={{ width: '100%', fontSize: '30px', color: 'rgba(255,255,255,0.5)' }} />;
    case "MdOutlineBorderColor":
      return <MdOutlineBorderColor className="icon" style={{ width: '100%', fontSize: '30px', color: 'rgba(255,255,255,0.5)' }} />;
    case "AiOutlineUsergroupAdd":
      return <AiOutlineUsergroupAdd className="icon" style={{ width: '100%', fontSize: '30px', color: 'rgba(255,255,255,0.5)' }} />;
    case "AiOutlineLineChart":
      return <AiOutlineLineChart className="icon" style={{ width: '100%', fontSize: '30px', color: 'rgba(255,255,255,0.5)' }} />;
    default:
      return <AiOutlineLineChart className="icon" style={{ width: '100%', fontSize: '30px', color: 'rgba(255,255,255,0.5)' }} />;
  }
};

type GeneralStatsProps = {
  stats: any;
};

const GeneralStats: React.FC<GeneralStatsProps> = ({ stats }) => {
  return (
    <Box className="card-hover" sx={{
      height: '100%',
      width: '100%',
      p: '12px',
      display: 'flex',
      background: `linear-gradient(90deg, ${stats.bgcolor} 0%, ${stats.grColor} 100% )`
    }}>
      {/* stat info */}
      <Box sx={{
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h3 style={{ color: 'rgba(255, 255, 255, 0.7)' }} className="font-bold text-sm">{stats.title}</h3>
        <strong style={{ color: 'rgba(255, 255, 255, 1)' }} className="font-extrabold text-3xl">{stats.count}</strong>
        <small style={{ color: 'rgba(255, 255, 255, 0.7)' }} className="font-sm">{stats.new}</small>
      </Box>
      {/* stat avatar */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {getIcon(stats.icon)}
      </Box>


    </Box>
  );
};

export default GeneralStats;

{/* <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            mr: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: { xs: 42, lg: 36 },
              height: { xs: 42, lg: 36 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: stats.bgcolor,
              padding: '0',
              border: `1px solid ${appColors.bg.select}`
            }}
          >
            {getIcon(stats.icon)}
          </Avatar>
          <Box
            component="p"
            sx={{
              flex: '1',
              textAlign: 'center',
              color: "text.secondary",
              fontSize: 14,
              fontWeight: '800',
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {stats.title}
          </Box>
        </Box>
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: '100%'
          }}
        >
          <Box sx={{ overflow: "hidden" }}>
            <Box component="h3" sx={{ color: appColors.button.primary, fontSize: '18px' }}>{stats.count}</Box>
          </Box>
          <Box
            component="span"
            sx={{
              backgroundColor: stats.bgcolor,
              borderRadius: 30,
              color: stats.badgeColor,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: Fonts.MEDIUM,
              display: "inline-block",
              minWidth: 75,
              textAlign: "center",
              "@media only screen and (max-width: 1580px) and (min-width: 1200px)":
              {
                display: "none",
              },
            }}
          >
            {stats.new}
          </Box>
        </Box>
      </Box> */}