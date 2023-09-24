import Global from "@/utils/Global";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { paths } from "@/routes/constants";
import { useDispatchResolve } from "@/utils/Hooks";
import { getUserInfoInvitation } from "@/store/monitor/action";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserInfoInvitationSelector } from "@/store/monitor/selectors";
import { getSystemInfo } from "@/store/auth/action";

const Root = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const userInfoInvitation = useSelector(getUserInfoInvitationSelector);

  useEffect(() => {
    dispatchResolve(getSystemInfo());
  }, [dispatchResolve]);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwtToken");
    const jwt = window.localStorage.getItem("jwt");
    if (!pathname.includes(`${paths.inviteMember}/`) && jwtToken && jwt)
      dispatchResolve(getUserInfoInvitation());
  }, [dispatchResolve, pathname]);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwtToken");
    const jwt = window.localStorage.getItem("jwt");
    if (
      userInfoInvitation &&
      userInfoInvitation.inviations?.length > 0 &&
      !pathname.includes(`${paths.inviteMember}/`) &&
      jwtToken &&
      jwt
    ) {
      navigate(`${paths.invitesMember}`);
    }
  }, [userInfoInvitation, navigate, pathname]);

  useEffect(() => {
    Global.UseNavigate.set(navigate);
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
