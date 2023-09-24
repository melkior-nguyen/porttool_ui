import AppLoader from "@/components/AppLoader";
import Layout from "../components/Sidebar/Layout";
import Background from "../components/Sidebar/Background";
import DefaultLayout from "@/components/AppLayout/DefaultLayout";
import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import { paths, routesConfig } from "../routes/constants";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

export const loadable = ({ factory, fallback, ...rest }: any) => {
  const LazyComponent = lazy(factory);
  return () => (
    <Suspense fallback={fallback ?? <AppLoader />}>
      <LazyComponent {...rest} />
    </Suspense>
  );
};

const Root = loadable({ factory: () => import("../pages/Root") });
const Error = loadable({ factory: () => import("../components/AppError") });
const Dashboard = loadable({
  factory: () => import("../pages/Dashboard"),
});

const InviteMember = loadable({
  factory: () => import("../pages/ManageMonitor/Project/IniviteMember"),
});
const Signin = loadable({ factory: () => import("../pages/Signin") });
const Signup = loadable({ factory: () => import("../pages/Signup") });
const ForgetPassword = loadable({
  factory: () => import("../pages/ForgetPassword"),
});

const ChooseMethodSendPasswordCode = loadable({
  factory: () => import("@/pages/ForgetPassword/ChooseMethodSendPasswordCode"),
});
const VerifyPasswordCodeAndUpdate = loadable({
  factory: () => import("@/pages/ForgetPassword/VerifyPasswordCodeAndUpdate"),
});
const SendOTPEmail = loadable({
  factory: () => import("../pages/AuthenOTPEmail/SendOTPEmail"),
});
const VerifyOTPEmail = loadable({
  factory: () => import("../pages/AuthenOTPEmail/VerifyOTPEmail"),
});
const UpdateAccount = loadable({
  factory: () => import("../pages/UpdateAccount"),
});
const ChooseMethod2FA = loadable({
  factory: () => import("../pages/Authen2FA/ChooseMethod2FA"),
});
const Verify2FA = loadable({
  factory: () => import("../pages/Authen2FA/Verify2FA"),
});
const MyProfile = loadable({
  factory: () => import("../pages/MyProfile/MyProfile"),
});

const PersonalInfo = loadable({
  factory: () => import("../pages/MyProfile/PersonalInfo"),
});
const Security = loadable({
  factory: () => import("../pages/MyProfile/Security"),
});
const Billing = loadable({
  factory: () => import("../pages/MyProfile/Billing"),
});
const Subscription = loadable({
  factory: () => import("../pages/MyProfile/Subscription"),
});

const ManageMonitor = loadable({
  factory: () => import("../pages/ManageMonitor"),
});
const Project = loadable({
  factory: () => import("../pages/ManageMonitor/Project"),
});
const SettingProject = loadable({
  factory: () => import("../pages/ManageMonitor/Project/SettingProject"),
});
const ManageDevices = loadable({
  factory: () => import("../pages/MyProfile/ManageDevices"),
});
const LogsAndAlerts = loadable({
  factory: () => import("../pages/LogsAndAlerts"),
});

const Private = () => {
  const { pathname } = useLocation();
  const isSignedIn = window.localStorage.getItem("jwt");
  return isSignedIn ? (
    <Background>
      <DefaultLayout routesConfig={routesConfig}>
        <Outlet />
      </DefaultLayout>
    </Background>
  ) : (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
        <Navigate
          to={{
            pathname: pathname.includes(`${paths.inviteMember}/`)
              ? pathname
              : paths.signin,
          }}
        />
      </Box>
    </Box>
  );
};

const Public = () => {
  const isSignedIn = window.localStorage.getItem("jwt");
  return isSignedIn ? (
    <Background>
      <Layout>
        <Navigate to={{ pathname: paths.dashboard }} />
      </Layout>
    </Background>
  ) : (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const Common = () => {
  const isSignedIn = window.localStorage.getItem("jwt");
  console.log("isSignedIn: ", isSignedIn);
  return isSignedIn ? (
    <Background>
      <DefaultLayout routesConfig={routesConfig}>
        <Outlet />
      </DefaultLayout>
    </Background>
  ) : (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        element: <Private />,
        children: [
          {
            path: paths.dashboard,
            element: <Outlet />,
            children: [
              { path: paths.dashboard, element: <Dashboard /> },
              {
                path: paths.profile,
                element: <MyProfile />,
                children: [
                  {
                    path: paths.myProfile,
                    element: <PersonalInfo />,
                  },
                  {
                    path: paths.security,
                    element: <Security />,
                  },
                  {
                    path: `${paths.manageDevices}`,
                    element: <ManageDevices />,
                  },
                  {
                    path: paths.billing,
                    element: <Billing />,
                  },
                  {
                    path: paths.subscription,
                    element: <Subscription />,
                  },
                ],
              },
              {
                path: paths.projects,
                element: <ManageMonitor />,
              },
              {
                path: `${paths.project}/:id`,
                element: <Project />,
              },
              {
                path: `${paths.project}/:id/setting`,
                element: <SettingProject />,
              },
              {
                path: paths.logsAndAlerts,
                element: <LogsAndAlerts />,
              },
              {
                path: paths.styleGuide,
                element: <div>Style Guide</div>,
              },
              {
                path: `${paths.invitesMember}`,
                element: <InviteMember />,
              },
            ],
          },
        ],
      },
      {
        element: <Public />,
        children: [
          {
            path: paths.signin,
            element: <Signin />,
          },
          {
            path: paths.signup,
            element: <Signup />,
          },
          {
            path: paths.chooseMethodSendPasswordCode,
            element: <ChooseMethodSendPasswordCode />,
          },

          {
            path: paths.sendOTPEmail,
            element: <SendOTPEmail />,
          },
          {
            path: paths.verifyOTPEmail,
            element: <VerifyOTPEmail />,
          },
          {
            path: paths.updateAccount,
            element: <UpdateAccount />,
          },
          {
            path: paths.chooseMethod2FA,
            element: <ChooseMethod2FA />,
          },
          {
            path: paths.verify2FA,
            element: <Verify2FA />,
          },
        ],
      },
      {
        element: <Common />,
        children: [
          {
            path: `${paths.inviteMember}/:uuid`,
            element: <InviteMember />,
          },
          {
            path: paths.forgotPassword,
            element: <ForgetPassword />,
          },
          {
            path: paths.verifyPasswordCodeAndUpdate,
            element: <VerifyPasswordCodeAndUpdate />,
          },
        ],
      },
    ],
  },
]);
