import React, { useCallback, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CardWrapper from "./CardWrapper";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PackageWrapper from "./PackageWrapper";
import { Avatar, Typography } from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import { Fonts } from "@/constants/AppEnums";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { SiConventionalcommits, SiZalo } from "react-icons/si";
import { useDispatchResolve } from "@/utils/Hooks";
import {
  getUserInfoSubscription,
  subscribe,
  verifyPaypalSubscription,
} from "@/store/auth/action";
import { PaymentMethod } from "@/graphql/generated";
import { get } from "lodash";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfoSubscriptionSelector } from "@/store/auth/selectors";

type PackageCardProps = {
  pricing: any;
  isCallingAPI: boolean;
  setIsCallingAPI: (isCallingAPI: boolean) => void;
};

const PackageCard: React.FC<PackageCardProps> = ({
  pricing,
  isCallingAPI,
  setIsCallingAPI,
}) => {
  const dispatchResolve = useDispatchResolve();
  const [searchParams, setSearchParams] = useSearchParams();
  const userInfoSubscription = useSelector(getUserInfoSubscriptionSelector);
  const currentPlanId = get(userInfoSubscription, [
    "subscription",
    "currentPlan",
    "id",
  ]);
  const nextPlanId = get(userInfoSubscription, [
    "subscription",
    "nextPlan",
    "id",
  ]);
  const nextBillingDate = get(userInfoSubscription, [
    "subscription",
    "nextBillingDate",
  ]);
  const { search } = useLocation();
  const paymentSubscriptionId = useMemo(
    () => new URLSearchParams(search),
    [search]
  )?.get("subscription_id");

  const removeQueryParams = useCallback(() => {
    const token = searchParams.get("token");
    const baToken = searchParams.get("ba_token");
    const subscriptionID = searchParams.get("subscription_id");
    if (token) {
      searchParams.delete("token");
      setSearchParams(searchParams);
    }
    if (baToken) {
      searchParams.delete("ba_token");
      setSearchParams(searchParams);
    }
    if (subscriptionID) {
      searchParams.delete("subscription_id");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (paymentSubscriptionId) {
      dispatchResolve(
        verifyPaypalSubscription({
          paymentSubscriptionId,
          paymentMethod: PaymentMethod.Paypal,
        })
      ).then(() => {
        dispatchResolve(getUserInfoSubscription());
        removeQueryParams();
      });
    }
  }, [paymentSubscriptionId]);

  const handleSubscribe = useCallback((planId: number) => {
    setIsCallingAPI(true);
    dispatchResolve(subscribe({ planId, paymentMethod: PaymentMethod.Paypal }))
      .then((data) => {
        setIsCallingAPI(false);
        const paymentUrl = get(data, ["data", "subscribe", "paymentUrl"]);
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          dispatchResolve(getUserInfoSubscription());
        }
      })
      .catch(() => {
        setIsCallingAPI(false);
      });
  }, []);

  return (
    <PackageWrapper>
      <Box
        component="span"
        className="tag"
        sx={{
          backgroundColor: pricing.tagColor,
        }}
      >
        {pricing.code}
      </Box>
      <CardWrapper>
        <Box
          sx={{
            position: "relative",
            pr: 20,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontWeight: Fonts.BOLD,
              fontSize: { xs: 28, md: 32, lg: 36 },
            }}
          >
            {pricing.label}
          </Typography>
          <Typography
            component="h4"
            sx={{
              fontSize: { xs: 20, md: 22, lg: 24 },
              mb: { xs: 5, lg: 7.5 },
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.BOLD,
              }}
            >
              {pricing.price === 0 ? "Free" : `$${pricing.price}`}
            </Box>
            {pricing.price !== 0 && `/${pricing.intervalUnit}`}
          </Typography>
          {pricing.popular ? (
            <Box className="popular">
              <FavoriteOutlinedIcon
                sx={{
                  fontSize: 14,
                  mr: 2.5,
                  mt: 1.25,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: 12, xl: 14 },
                }}
              >
                {pricing.popular}
              </Typography>
            </Box>
          ) : null}
        </Box>
        <Box sx={{ mb: 7.5 }}>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              fontWeight: Fonts.BOLD,
              color: (theme) => theme.palette.text.primary,
              minHeight: 46,
              borderRadius: 7.5,
              boxShadow: "none",
              borderWidth: 2,
              borderColor: pricing.tagColor,
              ...(currentPlanId === pricing.id || nextPlanId === pricing.id
                ? { backgroundColor: "rgb(76, 175, 80)" }
                : {}),
              "&:hover, &:focus": {
                borderColor: pricing.tagColor,
                borderWidth: 2,
              },
            }}
            type="button"
            disabled={
              isCallingAPI ||
              nextPlanId === pricing.id ||
              !userInfoSubscription ||
              !!paymentSubscriptionId
            }
            onClick={() => handleSubscribe(Number(pricing.id))}
          >
            <span className="capitalize">
              {currentPlanId === pricing.id && "Your current plan"}
              {nextPlanId === pricing.id &&
                currentPlanId !== pricing.id &&
                "Your next plan"}
              {currentPlanId !== pricing.id &&
                nextPlanId !== pricing.id &&
                "Start"}
            </span>
          </Button>

          <Box
            sx={{
              height: "14px",
              mt: 2,
              fontSize: "14px",
              color: "rgb(244, 67, 54)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {nextPlanId === pricing.id &&
              currentPlanId !== pricing.id &&
              `* This plan will start ${nextBillingDate}`}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            mb: 6,
          }}
        >
          <div className="text-center border-2 border-gray-400 rounded p-3">
            <Box>Max</Box>
            <Box sx={{ fontWeight: 700 }}>{pricing.maxProject}</Box>
            <Box>Project</Box>
          </div>
          <div className="text-center border-2 border-gray-400 rounded p-3">
            <Box>Max</Box>
            <Box sx={{ fontWeight: 700 }}>{pricing.maxMonitor}</Box>
            <Box>Monitor</Box>
          </div>
        </Box>

        <Box
          sx={{
            fontWeight: 700,
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          Monitor Types Supported:
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {pricing.monitorTypesData.map((data: any, index: number) => (
            <Box sx={{ mb: 2, mx: 3, width: "50px" }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    color: "black",
                    backgroundColor: "rgb(244, 247, 254)",
                    border: "1px solid rgb(204, 204, 204)",
                  }}
                >
                  {data.icon}
                </Avatar>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  mt: 1,
                }}
              >
                {data.value}
              </Box>
            </Box>
          ))}
        </Box>

        <List
          sx={{
            py: 0,
            flexWrap: "wrap",
          }}
        >
          {pricing.pricingList.map((data: any, index: number) => (
            <ListItem
              key={index}
              sx={{
                p: 0,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ minWidth: 10, mr: 3.5 }}>
                {data.status === null ? (
                  <SiConventionalcommits />
                ) : data.status ? (
                  <AiOutlineCheckCircle className="text-2xl text-[#48bb78]" />
                ) : (
                  <TiDeleteOutline className="text-2xl text-[#fb4f67]" />
                )}
              </ListItemIcon>
              <div className="mr-3">{data.icon ?? <SiZalo />}</div>
              <ListItemText
                primary={<span className="text-sm">{data.title}</span>}
              />
            </ListItem>
          ))}
        </List>
        {/* <Box sx={{ fontSize: 14, mb: 1 }}>
          <span className="font-bold">Monitor Types: </span>
          {pricing.monitorTypes}
        </Box> */}
        <Box sx={{ display: "flex", fontSize: 14 }}>
          <Box sx={{ fontWeight: 700 }}>Credit:&nbsp;</Box>
          <Box>{pricing.intervalCredit}</Box>
        </Box>
      </CardWrapper>
    </PackageWrapper>
  );
};

export default PackageCard;
