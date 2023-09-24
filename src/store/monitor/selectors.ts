import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const getUserInfoMonitor = (state: AppState) => state.monitor.userInfoMonitor;
export const getUserInfoMonitorSelector = createSelector(
  getUserInfoMonitor,
  (userInfoMonitor) => userInfoMonitor
);

const getUserInfoInvitation = (state: AppState) =>
  state.monitor.userInfoInvitation;
export const getUserInfoInvitationSelector = createSelector(
  getUserInfoInvitation,
  (userInfoInvitation) => userInfoInvitation
);
