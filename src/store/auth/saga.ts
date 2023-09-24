import SagaLib from "../saga";
import Toast from "../../utils/Toast";
import Global from "../../utils/Global";
import { all, putResolve, takeLatest, takeLeading } from "redux-saga/effects";
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
import {
  ACTIVATE_TOTP_MUTATION,
  CREATE_ACCOUNT_MUTATION,
  GET_COUNTRY_LIST_QUERY,
  GET_SYSTEM_INFO_QUERY,
  GET_USER_INFO_BILLING_QUERY,
  GET_USER_INFO_QUERY,
  GET_USER_INFO_SOCIAL_CONNECTION_QUERY,
  GET_USER_INFO_SUBSCRIPTION_QUERY,
  KEY_AUTH_MUTATION,
  REMOVE_SOCIAL_MUTATION,
  REQUEST_OTP_MUTATION,
  REQUEST_PASSWORD_MUTATION,
  SEND_OTP_EMAIL_MUTATION,
  SEND_OTP_MOBILE_MUTATION,
  SEND_PASSWORD_CODE_MUTATION,
  SOCIAL_AUTH_MUTATION,
  SOCIAL_CONNECTION_MUTATION,
  SUBSCRIBE_MUTATION,
  UPDATE_ACCOUNT_MUTATION,
  VERIFY_2FA_MUTATION,
  VERIFY_OTP_EMAIL_MUTATION,
  VERIFY_OTP_MOBILE_MUTATION,
  VERIFY_PASSWORD_CODE_AND_UPDATE_MUTATION,
  VERIFY_PAYPAL_SUBSCRIPTION_MUTATION,
  VERIFY_TOTP_MUTATION,
} from "./query";
import { get } from "lodash";
import { SEND_2FA_MUTATION } from "./query";
import {
  setCountryList,
  setSystemInfo,
  setUserInfo,
  setUserInfoBilling,
  setUserInfoSocialConnection,
  setUserInfoSubscription,
} from "./action";

export function* getAccessTokenSaga({ refreshToken, accessToken }: any) {
  yield "";
}

export function* resetToLoginSaga() {
  Global.Loading.get()?.hide();
  yield all([]);
}

function* getCountryListSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const geCountryListResponse = yield SagaLib.queryCall(
      GET_COUNTRY_LIST_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const countryList =
      get(geCountryListResponse, ["data", "countryList"]) || [];
    yield putResolve(setCountryList(countryList));
    typeof resolver?.resolve === "function" && resolver?.resolve();
  } catch (error: any) {
    // Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* getUserInfoSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const getUseInfoResponse = yield SagaLib.queryCall(
      GET_USER_INFO_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const userInfo = get(getUseInfoResponse, ["data", "userInfo"]) || [];
    yield putResolve(setUserInfo(userInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve(userInfo);
  } catch (error: any) {
    // Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* getUserInfoSubscriptionSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const getUseInfoResponse = yield SagaLib.queryCall(
      GET_USER_INFO_SUBSCRIPTION_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const userInfo = get(getUseInfoResponse, ["data", "userInfo"]) || [];
    yield putResolve(setUserInfoSubscription(userInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve();
  } catch (error: any) {
    // Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* getUserInfoBillingSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const getUseInfoResponse = yield SagaLib.queryCall(
      GET_USER_INFO_BILLING_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const userInfo = get(getUseInfoResponse, ["data", "userInfo"]) || [];
    yield putResolve(setUserInfoBilling(userInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve();
  } catch (error: any) {
    // Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* getUserInfoSocialConnectionSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const getUseInfoResponse = yield SagaLib.queryCall(
      GET_USER_INFO_SOCIAL_CONNECTION_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const userInfo = get(getUseInfoResponse, ["data", "userInfo"]) || [];
    yield putResolve(setUserInfoSocialConnection(userInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve();
  } catch (error: any) {
    // Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* createAccountSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const userInforResponse = yield SagaLib.mutationCall(
      CREATE_ACCOUNT_MUTATION,
      {
        user: payload,
      },
      { loading: false, noHeader: true }
    );
    if (userInforResponse) {
      const message = get(userInforResponse, [
        "data",
        "createAccount",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(userInforResponse);
      const token = get(userInforResponse, ["data", "createAccount", "token"]);
      window.localStorage.setItem("jwtToken", token);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* sendOTPEmailSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const sendOTPEmailResponse = yield SagaLib.mutationCall(
      SEND_OTP_EMAIL_MUTATION,
      {
        send: payload,
      },
      { loading: false }
    );
    if (sendOTPEmailResponse) {
      const message = get(sendOTPEmailResponse, [
        "data",
        "sendOtpEmail",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(sendOTPEmailResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* verifyOTPEmailSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const verifyOTPEmailResponse = yield SagaLib.mutationCall(
      VERIFY_OTP_EMAIL_MUTATION,
      {
        token: payload,
      },
      { loading: false }
    );
    if (verifyOTPEmailResponse) {
      const message = get(verifyOTPEmailResponse, [
        "data",
        "verifyOtpEmail",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(verifyOTPEmailResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* updateAccountSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const updateAccountResponse = yield SagaLib.mutationCall(
      UPDATE_ACCOUNT_MUTATION,
      {
        user: payload,
      },
      { loading: false }
    );
    if (updateAccountResponse) {
      const message = get(updateAccountResponse, [
        "data",
        "updateAccount",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(updateAccountResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* keyAuthSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const keyAuthenResponse = yield SagaLib.mutationCall(
      KEY_AUTH_MUTATION,
      {
        credential: payload,
      },
      { loading: false, noHeader: true }
    );
    if (keyAuthenResponse) {
      const message = get(keyAuthenResponse, ["data", "keyAuth", "message"]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(keyAuthenResponse);
      const token = get(keyAuthenResponse, ["data", "keyAuth", "token"]);
      if (token) window.localStorage.setItem("jwtToken", token);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* send2FASaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const send2FAResponse = yield SagaLib.mutationCall(
      SEND_2FA_MUTATION,
      {
        send: payload,
      },
      { loading: false, noHeader: true }
    );
    if (send2FAResponse) {
      const message = get(send2FAResponse, ["data", "send2fa", "message"]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(send2FAResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* verify2FASaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const verify2FAResponse = yield SagaLib.mutationCall(
      VERIFY_2FA_MUTATION,
      {
        token: payload,
      },
      { loading: false, noHeader: true }
    );
    if (verify2FAResponse) {
      const message = get(verify2FAResponse, ["data", "verify2fa", "message"]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(verify2FAResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* requestOTPSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const requestOTPResponse = yield SagaLib.mutationCall(
      REQUEST_OTP_MUTATION,
      {
        credential: payload,
      },
      { loading: false }
    );
    if (requestOTPResponse) {
      const message = get(requestOTPResponse, [
        "data",
        "requestOtp",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(requestOTPResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* activateTotpSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const activateTotpResponse = yield SagaLib.mutationCall(
      ACTIVATE_TOTP_MUTATION,
      {
        send: payload,
      },
      { loading: false }
    );
    if (activateTotpResponse) {
      const message = get(activateTotpResponse, [
        "data",
        "activateTotp",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(activateTotpResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* verifyTotpSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const verifyTotpResponse = yield SagaLib.mutationCall(
      VERIFY_TOTP_MUTATION,
      {
        token: payload,
      },
      { loading: false }
    );
    if (verifyTotpResponse) {
      const message = get(verifyTotpResponse, [
        "data",
        "verifyTotp",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(verifyTotpResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* sendOTPMobileSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const sendOTPMobileResponse = yield SagaLib.mutationCall(
      SEND_OTP_MOBILE_MUTATION,
      {
        send: payload,
      },
      { loading: false }
    );
    if (sendOTPMobileResponse) {
      const message = get(sendOTPMobileResponse, [
        "data",
        "sendOtpMobile",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(sendOTPMobileResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* verifyOTPMobileSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const verifyOTPMobileResponse = yield SagaLib.mutationCall(
      VERIFY_OTP_MOBILE_MUTATION,
      {
        token: payload,
      },
      { loading: false }
    );
    if (verifyOTPMobileResponse) {
      const message = get(verifyOTPMobileResponse, [
        "data",
        "verifyOtpMobile",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(verifyOTPMobileResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* socialAuthSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const socialAuthResponse = yield SagaLib.mutationCall(
      SOCIAL_AUTH_MUTATION,
      {
        token: payload,
      },
      { loading: false }
    );
    if (socialAuthResponse) {
      const message = get(socialAuthResponse, [
        "data",
        "socialAuth",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(socialAuthResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* requestPasswordSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const requestPasswordResponse = yield SagaLib.mutationCall(
      REQUEST_PASSWORD_MUTATION,
      {
        forgot: payload,
      },
      { loading: false }
    );
    if (requestPasswordResponse) {
      const message = get(requestPasswordResponse, [
        "data",
        "requestPassword",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(requestPasswordResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* sendPasswordCodeSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const sendPasswordCodeResponse = yield SagaLib.mutationCall(
      SEND_PASSWORD_CODE_MUTATION,
      {
        send: payload,
      },
      { loading: false }
    );
    if (sendPasswordCodeResponse) {
      const message = get(sendPasswordCodeResponse, [
        "data",
        "sendPasswordCode",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(sendPasswordCodeResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* verifyPasswordCodeAndUpdateSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const verifyPasswordCodeAndUpdateResponse = yield SagaLib.mutationCall(
      VERIFY_PASSWORD_CODE_AND_UPDATE_MUTATION,
      {
        token: payload,
      },
      { loading: false }
    );
    if (verifyPasswordCodeAndUpdateResponse) {
      const message = get(verifyPasswordCodeAndUpdateResponse, [
        "data",
        "verifyPasswordCodeAndUpdate",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(verifyPasswordCodeAndUpdateResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* subscribeSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const subscribeResponse = yield SagaLib.mutationCall(
      SUBSCRIBE_MUTATION,
      {
        subscribe: payload,
      },
      { loading: false }
    );
    if (subscribeResponse) {
      const message = get(subscribeResponse, ["data", "subscribe", "message"]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(subscribeResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* verifyPaypalSubscriptionSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const verifyPaypalSubscriptionResponse = yield SagaLib.mutationCall(
      VERIFY_PAYPAL_SUBSCRIPTION_MUTATION,
      {
        subscribe: payload,
      },
      { loading: false }
    );
    if (verifyPaypalSubscriptionResponse) {
      const message = get(verifyPaypalSubscriptionResponse, [
        "data",
        "verifyPaypalSubscription",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(verifyPaypalSubscriptionResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* socialConnectionSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const socialConnectionResponse = yield SagaLib.mutationCall(
      SOCIAL_CONNECTION_MUTATION,
      {
        token: payload,
      },
      { loading: false }
    );
    if (socialConnectionResponse) {
      const message = get(socialConnectionResponse, [
        "data",
        "socialAuth",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(socialConnectionResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* removeSocialSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const removeSocialResponse = yield SagaLib.mutationCall(
      REMOVE_SOCIAL_MUTATION,
      {
        remove: payload,
      },
      { loading: false }
    );
    if (removeSocialResponse) {
      const message = get(removeSocialResponse, [
        "data",
        "removeSocial",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(removeSocialResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* getSystemInfoSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const geSystemInfoResponse = yield SagaLib.queryCall(
      GET_SYSTEM_INFO_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const systemInfo = get(geSystemInfoResponse, ["data", "systemInfo"]) || [];
    yield putResolve(setSystemInfo(systemInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve();
  } catch (error: any) {
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* authSaga() {
  yield all([
    takeLatest(GET_COUNTRY_LIST, getCountryListSaga),
    takeLatest(GET_USER_INFO, getUserInfoSaga),
    takeLatest(
      GET_USER_INFO_SOCIAL_CONNECTION,
      getUserInfoSocialConnectionSaga
    ),
    takeLatest(GET_USER_INFO_SUBSCRIPTION, getUserInfoSubscriptionSaga),
    takeLatest(GET_USER_INFO_BILLING, getUserInfoBillingSaga),
    takeLeading(CREATE_ACCOUNT, createAccountSaga),
    takeLeading(SEND_OTP_EMAIL, sendOTPEmailSaga),
    takeLeading(VERIFY_OTP_EMAIL, verifyOTPEmailSaga),
    takeLeading(UPDATE_ACCOUNT, updateAccountSaga),
    takeLeading(KEY_AUTH, keyAuthSaga),
    takeLeading(SEND_2FA, send2FASaga),
    takeLeading(VERIFY_2FA, verify2FASaga),
    takeLeading(REQUEST_OTP, requestOTPSaga),
    takeLeading(ACTIVATE_TOTP, activateTotpSaga),
    takeLeading(VERIFY_TOTP, verifyTotpSaga),
    takeLeading(SEND_OTP_MOBILE, sendOTPMobileSaga),
    takeLeading(VERIFY_OTP_MOBILE, verifyOTPMobileSaga),
    takeLeading(SOCIAL_AUTH, socialAuthSaga),
    takeLeading(REQUEST_PASSWORD, requestPasswordSaga),
    takeLeading(SEND_PASSWORD_CODE, sendPasswordCodeSaga),
    takeLeading(
      VERIFY_PASSWORD_CODE_AND_UPDATE,
      verifyPasswordCodeAndUpdateSaga
    ),
    takeLeading(SUBSCRIBE, subscribeSaga),
    takeLeading(VERIFY_PAYPAL_SUBSCRIPTION, verifyPaypalSubscriptionSaga),
    takeLeading(SOCIAL_CONNECTION, socialConnectionSaga),
    takeLeading(REMOVE_SOCIAL, removeSocialSaga),
    takeLatest(GET_SYSTEM_INFO, getSystemInfoSaga),
  ]);
}

export default authSaga;
