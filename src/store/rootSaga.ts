import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import monitorSaga from "./monitor/saga";

export function* rootSaga() {
  yield all([fork(monitorSaga), fork(authSaga)]);
}
