import { AiFillPieChart } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { AiFillProject } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const paths = {
  signin: "/signin",
  signup: "/signup",

  forgotPassword: "/forgot-password",
  chooseMethodSendPasswordCode: "/choose-method-send-code",
  verifyPasswordCodeAndUpdate: "/verify-password",

  sendOTPEmail: "/send-otp-email",
  verifyOTPEmail: "/verify-otp-email",

  updateAccount: "/update-account",
  chooseMethod2FA: "/choose-method-2fa",
  verify2FA: "/verify-2fa",

  dashboard: "/",
  styleGuide: "style-guide",

  profile: "/profile",
  myProfile: "/profile/my-profile",
  security: "/profile/security",
  manageDevices: "/profile/manage-devices",
  billing: "/profile/billing",
  subscription: "/profile/subscription",
  payment: "/profile/payment",

  projects: "/projects",
  project: "/project",

  logsAndAlerts: "/logs-and-alerts",

  inviteMember: "/invite",
  invitesMember: "/invites",
};

export const routesConfig = [
  {
    id: "apps",
    title: "Apps",
    messageId: "sidebar.apps",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        messageId: "sidebar.app.dashboard",
        type: "item",
        icon: <AiFillPieChart style={{
          height: 20,
          width: 20,
          fontSize: 20,
        }} />,
        url: paths.dashboard,
      },
      {
        id: "manageProfile",
        title: "sidebar.app.manageProfile",
        messageId: "sidebar.app.manageProfile",
        type: "collapse",
        icon: <FaUserCog style={{
          height: 20,
          width: 20,
          fontSize: 20,
        }} />,
        children: [
          {
            id: "myProfile",
            title: "sidebar.app.myProfile",
            messageId: "sidebar.app.myProfile",
            type: "item",
            url: paths.myProfile,
            icon: (
              <PersonIcon
                sx={{
                  height: 20,
                  width: 20,
                  fontSize: 20,
                  mb: 2,
                }}
              />
            ),
          },
          {
            id: "security",
            title: "sidebar.app.security",
            messageId: "sidebar.app.security",
            type: "item",
            url: paths.security,
            icon: (
              <SecurityIcon
                sx={{
                  height: 20,
                  width: 20,
                  fontSize: 20,
                  mb: 2,
                }}
              />
            ),
          },
          {
            id: "manageDevices",
            title: "sidebar.app.manageDevices",
            messageId: "sidebar.app.manageDevices",
            type: "item",
            url: paths.manageDevices,
            icon: (
              <ManageAccountsIcon
                sx={{
                  height: 20,
                  width: 20,
                  fontSize: 20,
                  mb: 2,
                }}
              />
            ),
          },
          {
            id: "billing",
            title: "sidebar.app.billing",
            messageId: "sidebar.app.billing",
            type: "item",
            url: paths.billing,
            icon: (
              <ReceiptLongIcon
                sx={{
                  height: 20,
                  width: 20,
                  fontSize: 20,
                  mb: 2,
                }}
              />
            ),
          },
          {
            id: "subscription",
            title: "sidebar.app.subscription",
            messageId: "sidebar.app.subscription",
            type: "item",
            url: paths.subscription,
            icon: (
              <SubscriptionsIcon
                sx={{
                  height: 20,
                  width: 20,
                  fontSize: 20,
                  mb: 2,
                }}
              />
            ),
          },
        ],
      },
      {
        id: "projects",
        title: "sidebar.app.projects",
        messageId: "sidebar.app.projects",
        type: "item",
        url: paths.projects,
        icon: <AiFillProject style={{
          height: 20,
          width: 20,
          fontSize: 20,
        }} />,
        children: [],
      },
      {
        id: "logsAndAlerts",
        title: "sidebar.app.logsAndAlerts",
        messageId: "sidebar.app.logsAndAlerts",
        type: "item",
        icon: <AiFillAlert style={{
          height: 20,
          width: 20,
          fontSize: 20,
        }} />,
        url: paths.logsAndAlerts,
      },
    ],
  },
];
