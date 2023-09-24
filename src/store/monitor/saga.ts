import SagaLib from "../saga";
import Toast from "@/utils/Toast";
import { get } from "lodash";
import { setUserInfoInvitation, setUserInfoMonitor } from "./action";
import {
  CREATE_OR_UPDATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  GET_USER_INFO_INVITATION_QUERY,
  GET_USER_INFO_MONITOR_QUERY,
} from "./query";
import { all, putResolve, takeLatest, takeLeading } from "redux-saga/effects";
import {
  CREATE_OR_UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_USER_INFO_INVITATION,
  GET_USER_INFO_MONITOR,
} from "./actionTypes";

function* getUserInfoMonitorSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const getUseInfoResponse = yield SagaLib.queryCall(
      GET_USER_INFO_MONITOR_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const userInfo = get(getUseInfoResponse, ["data", "userInfo"]) || [];
    yield putResolve(setUserInfoMonitor(userInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve();
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* getUserInfoInvitationSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const getUseInfoResponse = yield SagaLib.queryCall(
      GET_USER_INFO_INVITATION_QUERY,
      payload,
      {
        loading: false,
      }
    );
    const userInfo = get(getUseInfoResponse, ["data", "userInfo"]) || [];
    yield putResolve(setUserInfoInvitation(userInfo));
    typeof resolver?.resolve === "function" && resolver?.resolve(userInfo);
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* createOrUpdateProjectSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const createOrUpdateProjectResponse = yield SagaLib.mutationCall(
      CREATE_OR_UPDATE_PROJECT_MUTATION,
      {
        project: payload,
      },
      { loading: false }
    );
    if (createOrUpdateProjectResponse) {
      const message = get(createOrUpdateProjectResponse, [
        "data",
        "createOrUpdateProject",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(createOrUpdateProjectResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* deleteProjectSaga(action: any): any {
  const { payload, resolver } = action;
  try {
    const deleteProjectResponse = yield SagaLib.mutationCall(
      DELETE_PROJECT_MUTATION,
      {
        project: payload,
      },
      { loading: false }
    );
    if (deleteProjectResponse) {
      const message = get(deleteProjectResponse, [
        "data",
        "deleteProject",
        "message",
      ]);
      Toast.toastSuccess(message);
      typeof resolver?.resolve === "function" &&
        resolver?.resolve(deleteProjectResponse);
    }
  } catch (error: any) {
    Toast.toastError(error.message);
    typeof resolver?.reject === "function" && resolver?.reject(error.message);
  }
}

function* monitorSaga() {
  yield all([
    takeLatest(GET_USER_INFO_MONITOR, getUserInfoMonitorSaga),
    takeLatest(GET_USER_INFO_INVITATION, getUserInfoInvitationSaga),
    takeLeading(CREATE_OR_UPDATE_PROJECT, createOrUpdateProjectSaga),
    takeLeading(DELETE_PROJECT, deleteProjectSaga),
  ]);
}

export default monitorSaga;
