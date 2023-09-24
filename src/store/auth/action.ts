import {
  AccountInput,
  AccountQueryUnionType,
  CreateAccountInput,
  KeyAuthInput,
  PasswordResetTokenInputType,
  RemoveSocialInput,
  RequestOtpInput,
  RequestPasswordResetInput,
  RequestTotpInput,
  Send2FaInput,
  SendOtpEmailInput,
  SendOtpMobileInput,
  SocialAuthInput,
  SubscriptionInput,
  Verify2FaInput,
  VerifyOtpInput,
  VerifyPasswordResetCodeAndUpdateInput,
  VerifySubscriptionInput,
} from "@/graphql/generated";
import {
  ACTIVATE_TOTP,
  CREATE_ACCOUNT,
  GET_COUNTRY_LIST,
  GET_SYSTEM_INFO,
  GET_USER_INFO,
  GET_USER_INFO_BILLING,
  GET_USER_INFO_SOCIAL_CONNECTION,
  GET_USER_INFO_SUBSCRIPTION,
  KEY_AUTH,
  REMOVE_SOCIAL,
  REQUEST_OTP,
  REQUEST_PASSWORD,
  SEND_2FA,
  SEND_OTP_EMAIL,
  SEND_OTP_MOBILE,
  SEND_PASSWORD_CODE,
  SET_COUNTRY_LIST,
  SET_SYSTEM_INFO,
  SET_USER_INFO,
  SET_USER_INFO_BILLING,
  SET_USER_INFO_SOCIAL_CONNECTION,
  SET_USER_INFO_SUBSCRIPTION,
  SOCIAL_AUTH,
  SOCIAL_CONNECTION,
  SUBSCRIBE,
  UPDATE_ACCOUNT,
  VERIFY_2FA,
  VERIFY_OTP_EMAIL,
  VERIFY_OTP_MOBILE,
  VERIFY_PASSWORD_CODE_AND_UPDATE,
  VERIFY_PAYPAL_SUBSCRIPTION,
  VERIFY_TOTP,
} from "./actionTypes";

export const getCountryList = (): any => ({
  type: GET_COUNTRY_LIST,
});

export const setCountryList = (data: any): any => ({
  type: SET_COUNTRY_LIST,
  payload: data,
});

export const getUserInfo = (): any => ({
  type: GET_USER_INFO,
});

export const setUserInfo = (data: AccountQueryUnionType): any => ({
  type: SET_USER_INFO,
  payload: data,
});

export const getUserInfoSocialConnection = (): any => ({
  type: GET_USER_INFO_SOCIAL_CONNECTION,
});

export const setUserInfoSocialConnection = (
  data: AccountQueryUnionType
): any => ({
  type: SET_USER_INFO_SOCIAL_CONNECTION,
  payload: data,
});

export const getUserInfoSubscription = (): any => ({
  type: GET_USER_INFO_SUBSCRIPTION,
});

export const setUserInfoSubscription = (data: AccountQueryUnionType): any => ({
  type: SET_USER_INFO_SUBSCRIPTION,
  payload: data,
});

export const getUserInfoBilling = (): any => ({
  type: GET_USER_INFO_BILLING,
});

export const setUserInfoBilling = (data: AccountQueryUnionType): any => ({
  type: SET_USER_INFO_BILLING,
  payload: data,
});

export const createAccount = (data: CreateAccountInput): any => ({
  type: CREATE_ACCOUNT,
  payload: data,
});

export const sendOTPEmail = (data: SendOtpEmailInput): any => ({
  type: SEND_OTP_EMAIL,
  payload: data,
});

export const verifyOTPEmail = (data: VerifyOtpInput): any => ({
  type: VERIFY_OTP_EMAIL,
  payload: data,
});

export const updateAccount = (data: AccountInput): any => ({
  type: UPDATE_ACCOUNT,
  payload: data,
});

export const keyAuth = (data: KeyAuthInput): any => ({
  type: KEY_AUTH,
  payload: data,
});

export const send2FA = (data: Send2FaInput): any => ({
  type: SEND_2FA,
  payload: data,
});

export const verify2FA = (data: Verify2FaInput): any => ({
  type: VERIFY_2FA,
  payload: data,
});

export const requestOTP = (data: RequestOtpInput): any => ({
  type: REQUEST_OTP,
  payload: data,
});

export const activateTotp = (data: RequestTotpInput): any => ({
  type: ACTIVATE_TOTP,
  payload: data,
});

export const verifyTotp = (data: VerifyOtpInput): any => ({
  type: VERIFY_TOTP,
  payload: data,
});

export const sendOTPMobile = (data: SendOtpMobileInput): any => ({
  type: SEND_OTP_MOBILE,
  payload: data,
});

export const verifyOTPMobile = (data: VerifyOtpInput): any => ({
  type: VERIFY_OTP_MOBILE,
  payload: data,
});

export const socialAuth = (data: SocialAuthInput): any => ({
  type: SOCIAL_AUTH,
  payload: data,
});

export const requestPassword = (data: RequestPasswordResetInput): any => ({
  type: REQUEST_PASSWORD,
  payload: data,
});

export const sendPasswordCode = (data: PasswordResetTokenInputType): any => ({
  type: SEND_PASSWORD_CODE,
  payload: data,
});

export const verifyPasswordCodeAndUpdate = (
  data: VerifyPasswordResetCodeAndUpdateInput
): any => ({
  type: VERIFY_PASSWORD_CODE_AND_UPDATE,
  payload: data,
});

export const subscribe = (data: SubscriptionInput): any => ({
  type: SUBSCRIBE,
  payload: data,
});

export const verifyPaypalSubscription = (
  data: VerifySubscriptionInput
): any => ({
  type: VERIFY_PAYPAL_SUBSCRIPTION,
  payload: data,
});

export const socialConnection = (data: SocialAuthInput): any => ({
  type: SOCIAL_CONNECTION,
  payload: data,
});

export const removeConnection = (data: RemoveSocialInput): any => ({
  type: REMOVE_SOCIAL,
  payload: data,
});

export const getSystemInfo = (): any => ({
  type: GET_SYSTEM_INFO,
});

export const setSystemInfo = (data: any): any => ({
  type: SET_SYSTEM_INFO,
  payload: data,
});
