import AppLoader from "@/components/AppLoader";
import MyProfileWrapper from "../MyProfileWrapper";
import LogoutIcon from "@mui/icons-material/Logout";
import AppGridContainer from "@/components/AppGridContainer";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/Utils";
import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { get } from "lodash";
import WindowIcon from "@mui/icons-material/Window";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import DevicesIcon from "@mui/icons-material/Devices";

const QUERY_GET_USER_INFO_DEVICES = gql`
  {
    userInfo {
      __typename
      ... on AccountObjectType {
        devices {
          id
          ip
          lastRequest
          city
          country
          region
          browserFamily
          browserVersion
          continent
          deviceFamily
          deviceId
          deviceVersion
          ipHost
          isActive
          osFamily
          osVersion
          postalCode
          created
        }
      }
    }
  }
`;

const MUTATION_LOGOUT_DEVICES = gql`
  mutation LogoutDevices($logout: LogoutDevicesInput!) {
    logoutDevices(logout: $logout) {
      ok
      message
    }
  }
`;

const ManageDevices = () => {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [fetchUserInfoDevices, { data, refetch }] = useLazyQuery(
    QUERY_GET_USER_INFO_DEVICES
  );
  const [mutationLogoutDevices] = useMutation(MUTATION_LOGOUT_DEVICES, {
    onError(err) {
      toast(err?.message, { type: "error" });
      setLoading(false);
    },
    onCompleted(data) {
      data && toast("Logout successfully", { type: "success" });
      setLoading(false);
      refetch();
    },
  });

  useEffect(() => {
    fetchUserInfoDevices();
  }, [fetchUserInfoDevices]);

  useEffect(() => {
    if (!data) return;
    const devices = get(data, ["userInfo", "devices"]);
    const devicesCanLogout = devices.filter((item: any) => !item.isActive);
    const convertDevicesCanLogout = devicesCanLogout.map((item: any) => ({
      id: item.id,
    }));
    setDevices(convertDevicesCanLogout);
  }, [data]);

  const handleLogouDevices = useCallback(
    (id: string | null) => {
      const devicesLogout = id ? [{ id }] : devices;
      const variables = {
        logout: {
          devices: devicesLogout,
        },
      };
      setLoading(true);
      mutationLogoutDevices({ variables });
    },
    [mutationLogoutDevices, devices]
  );

  const renderIcon = useCallback((osFamily: string) => {
    if (osFamily.includes("windows")) {
      return <WindowIcon />;
    } else if (osFamily.includes("mac")) {
      return <AppleIcon />;
    } else if (osFamily.includes("android")) {
      return <AndroidIcon />;
    } else if (osFamily.includes("ios")) {
      return <DesktopMacIcon />;
    } else {
      return <DevicesIcon />;
    }
  }, []);

  return (
    <>
      {loading && <AppLoader />}
      <MyProfileWrapper>
        <AppGridContainer>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ fontSize: 16, fontWeight: 700, mb: 1 }}>
              Manage Devices
            </Box>
            {data?.userInfo.devices.map((item: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: 1,
                }}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <IconButton aria-label="PhonelinkIcon">
                      {renderIcon(item.osFamily?.toLowerCase())}
                    </IconButton>
                    <Box sx={{ ml: 1 }}>
                      <Box
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          msTextCombineHorizontal: 4,
                          mb: 0.5,
                          display: "flex",
                        }}
                      >
                        {item.deviceFamily} {item.deviceVersion} ·{" "}
                        <Tooltip title={`IP: ${item.ip}`}>
                          <Box>
                            {item.city}, {item.country}
                          </Box>
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          {item.browserFamily} {item.browserVersion} for{" "}
                          {item.osFamily} ·{" "}
                        </Box>
                        {item.isActive ? (
                          <Box
                            sx={{
                              color: "rgb(76, 175, 80)",
                              fontWeight: 700,
                              fontSize: 16,
                              ml: 0.25,
                            }}
                          >
                            Active now
                          </Box>
                        ) : (
                          formatDate(item.lastRequest, true)
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {!item.isActive && (
                    <Tooltip title="Logout this Device">
                      <span>
                        <IconButton onClick={() => handleLogouDevices(item.id)}>
                          <LogoutIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
              <Button
                disabled={devices.length === 0}
                variant="outlined"
                onClick={() => handleLogouDevices(null)}
                sx={{ textTransform: "capitalize" }}
              >
                <LogoutIcon className="mr-1" />
                Log out of all sessions
              </Button>
            </Box>
          </Box>
        </AppGridContainer>
      </MyProfileWrapper>
    </>
  );
};

export default ManageDevices;
