/**
 * mutationCall
 * queryCall
 */
import Global from "../utils/Global";
import ToastLib from "../utils/Toast";
import LocalStorage from "../utils/LocalStorage";
import { isArray, isEmpty, isNil } from "lodash";
import { call, take } from "redux-saga/effects";
import { mutate, query } from "./apolloGraphql";
import { GET_ACCESS_TOKEN_SUCCESS } from "./auth/actionTypes";
import { getAccessTokenSaga, resetToLoginSaga } from "./auth/saga";

let hasCheckGetAccessToken = false;

function* _handleTokenExpired(options: any): any {
  try {
    const refreshToken = yield call(LocalStorage.RefreshToken.get);
    if (!refreshToken) return;
    if (!hasCheckGetAccessToken) {
      hasCheckGetAccessToken = true;
      yield call(getAccessTokenSaga, { refreshToken });
    } else {
      yield take(GET_ACCESS_TOKEN_SUCCESS);
    }
  } catch (error: any) {
    if (hasCheckGetAccessToken) {
      if (!isEmpty(error?.message) && !options?.noExpiredMessage) {
        ToastLib.toastError(error?.message);
      }
      yield resetToLoginSaga();
    }
    throw error;
  } finally {
    hasCheckGetAccessToken = false;
  }
}

function _hanldeGraphQLError(error: any, i18nScope = "errorMsg") {
  const messages: any = [];
  const errors: any = [];
  if (isArray(error)) {
    error.forEach(({ message, extensions }: any) => {
      errors.push({
        message,
        messageCode: extensions?.code,
        extensions: !isEmpty(extensions)
          ? { code: extensions.code, exception: extensions?.exception }
          : extensions,
      });
      messages.push(message);
    });
  }

  const formatError = messages.length
    ? { errors, message: messages.join("\r\n") }
    : error;
  throw formatError;
}

function* generateNewOption(option: any): any {
  const defaultNetworkCallOption = {
    skipAuthorization: false,
    headers: {},
  };

  const newOption = Object.assign({}, defaultNetworkCallOption, option);
  if (!newOption.skipAuthorization) {
    const token = newOption.jwtToken
      ? newOption.jwtToken
      : yield call(LocalStorage.JwtToken.get);
    if (!isNil(token) && !isEmpty(token) && !option.noHeader) {
      newOption.headers.Authorization = `JWT ${token}`;
    }
  }
  return newOption;
}

function* makeRequestGraphQL(
  type: any,
  queryEndpoint: any,
  variables: any,
  option: { loading: boolean }
): any {
  let data;
  const newOption = yield generateNewOption(option);
  const loadingView = Global.Loading.get();
  const queryString = queryEndpoint.query || queryEndpoint;
  const noExpireMessage = newOption?.noExpiredMessage;
  try {
    // option.loading && loadingView?.show();
    if (type === "query") {
      data = yield call(query, queryString, variables, newOption.headers);
    } else {
      data = yield call(mutate, queryString, variables, newOption.headers);
    }
  } catch (error) {
    // const { accessExpired, isUserDeleted, isUserBlocked } =
    //   getInvalidAuthCode(error);
    // if (isUserDeleted || isUserBlocked) {
    //   yield resetToLoginSaga();
    //   return _hanldeGraphQLError(error, newOption.i18nScope);
    // }
    // if (accessExpired) {
    // call request again
    // yield call(_handleTokenExpired, { noExpireMessage });
    // const newOption2 = yield generateNewOption(option);
    // try {
    //   if (type === "query") {
    //     data = yield call(query, queryString, variables, newOption.headers);
    //   } else {
    //     data = yield call(mutate, queryString, variables, newOption.headers);
    //   }
    //   return data;
    // } catch (error2) {
    //   yield resetToLoginSaga();
    //   return _hanldeGraphQLError(error2, newOption2.i18nScope);
    // }
    return _hanldeGraphQLError(error, newOption.i18nScope);
  } finally {
    option?.loading && loadingView?.hide();
  }
  return data;
}

export function* mutationCall(
  queryEndpoint: any,
  variables: any,
  option: any
): any {
  return yield makeRequestGraphQL("mutation", queryEndpoint, variables, option);
}

export function* queryCall(
  queryEndpoint: any,
  variables: any,
  option?: any
): any {
  return yield makeRequestGraphQL("query", queryEndpoint, variables, option);
}

export const getInvalidAuthCode = (error: any) => {
  const accessExpired = !!error?.find((e: any) =>
    e.extensions?.code?.includes("ACCESS_TOKEN_EXPIRED")
  );
  const accessInvalid = !!error?.find((e: any) =>
    e.extensions?.code?.includes("ACCESS_TOKEN_INVALID")
  );
  const refreshInvalid = !!error?.find((e: any) =>
    e.extensions?.code?.includes("REFRESH_TOKEN_INVALID")
  );
  const refreshExpired = !!error?.find((e: any) =>
    e.extensions?.code?.includes("REFRESH_TOKEN_EXPIRED")
  );
  const refreshNotFound = !!error?.find((e: any) =>
    e.extensions?.code?.includes("REFRESH_TOKEN_NOT_FOUND")
  );
  const isUserDeleted = !!error?.find((e: any) =>
    e.extensions?.code?.includes("USER_DELETED")
  );
  const isUserBlocked = !!error?.find((e: any) =>
    e.extensions?.code?.includes("BLOCKED_USER")
  );
  return {
    accessExpired,
    accessInvalid,
    refreshInvalid,
    refreshExpired,
    refreshNotFound,
    isUserDeleted,
    isUserBlocked,
  };
};

export default { mutationCall, queryCall };
