import PackageOne from "./PackageOne";
import AppGridContainer from "@/components/AppGridContainer";
import { Grid } from "@mui/material";
import { useDispatchResolve } from "@/utils/Hooks";
import { useEffect, useState } from "react";
import { getUserInfoSubscription } from "@/store/auth/action";
import { getUserInfoSubscriptionSelector } from "@/store/auth/selectors";
import { useSelector } from "react-redux";
import { get, set } from "lodash";
import { PRICE_DATA } from "./constant";
import MyProfileWrapper from "../MyProfileWrapper";

const Subscription = () => {
  const dispatchResolve = useDispatchResolve();
  const [pricingData, setPricingData] = useState(PRICE_DATA);

  useEffect(() => {
    dispatchResolve(getUserInfoSubscription())
      .then()
      .catch(() => {});
  }, [dispatchResolve]);

  const userInfoSubscription = useSelector(getUserInfoSubscriptionSelector);

  useEffect(() => {
    if (userInfoSubscription) {
      const availblePlans = get(userInfoSubscription, ["availblePlans"]);
      setPricingData(
        pricingData.map((item: any, index: number) => {
          item.pricingList.map((itemPricing: any) =>
            set(itemPricing, "status", availblePlans[index][itemPricing.id])
          );
          return {
            ...item,
            ...availblePlans[index],
          };
        })
      );
    }
  }, [userInfoSubscription]);

  return (
    <MyProfileWrapper>
      <AppGridContainer>
        <Grid item xs={12}>
          <PackageOne pricing={pricingData} />
        </Grid>
      </AppGridContainer>
    </MyProfileWrapper>
  );
};

export default Subscription;
