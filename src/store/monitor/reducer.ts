import { SET_USER_INFO_INVITATION, SET_USER_INFO_MONITOR } from "./actionTypes";

const initialState = {
  userInfoMonitor: null,
  userInfoInvitation: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_INFO_MONITOR:
      return { ...state, userInfoMonitor: action.payload };
    case SET_USER_INFO_INVITATION:
      return { ...state, userInfoInvitation: action.payload };
    default:
      return {
        ...state,
      };
  }
};
