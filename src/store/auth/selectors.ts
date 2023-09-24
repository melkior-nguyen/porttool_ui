import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const getUserInfo = (state: AppState) => state.auth.userInfo;
export const getUserInfoSelector = createSelector(
  getUserInfo,
  (userInfo) => userInfo
);

const getUserInfoSocialConnection = (state: AppState) =>
  state.auth.userInfoSocialConnection;
export const getUserInfoSocialConnectionSelector = createSelector(
  getUserInfoSocialConnection,
  (userInfoSocialConnection) => userInfoSocialConnection
);

const getUserInfoSubscription = (state: AppState) =>
  state.auth.userInfoSubscription;
export const getUserInfoSubscriptionSelector = createSelector(
  getUserInfoSubscription,
  (userInfoSubscription) => userInfoSubscription
);

const getUserInfoBilling = (state: AppState) => state.auth.userInfoBilling;
export const getUserInfoBillingSelector = createSelector(
  getUserInfoBilling,
  (userInfoBilling) => userInfoBilling
);

const getCountryList = (state: AppState) => state.auth.countryList;
export const getCountryListSelector = createSelector(
  getCountryList,
  (countryList) => countryList
);

const getSystemInfo = (state: AppState) => state.auth.systemInfo;
export const getSystemInfoSelector = createSelector(
  getSystemInfo,
  (systemInfo) => systemInfo
);
