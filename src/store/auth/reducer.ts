import {
  SET_COUNTRY_LIST,
  SET_SYSTEM_INFO,
  SET_USER_INFO,
  SET_USER_INFO_BILLING,
  SET_USER_INFO_SOCIAL_CONNECTION,
  SET_USER_INFO_SUBSCRIPTION,
} from "./actionTypes";

const initialState = {
  countryList: null,
  userInfo: null,
  userInfoSocialConnection: null,
  userInfoSubscription: null,
  userInfoBilling: null,
  systemInfo: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_COUNTRY_LIST:
      return { ...state, countryList: action.payload };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SET_USER_INFO_SOCIAL_CONNECTION:
      return {
        ...state,
        userInfoSocialConnection: action.payload,
      };
    case SET_USER_INFO_SUBSCRIPTION:
      return {
        ...state,
        userInfoSubscription: action.payload,
      };
    case SET_USER_INFO_BILLING:
      return {
        ...state,
        userInfoBilling: action.payload,
      };
    case SET_SYSTEM_INFO:
      return {
        ...state,
        systemInfo: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
