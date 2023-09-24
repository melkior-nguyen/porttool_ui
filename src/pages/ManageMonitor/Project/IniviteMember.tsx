import AppLoader from "@/components/AppLoader";
import Logo from "@/assets/images/port_tool_dark.png";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { paths } from "@/routes/constants";
import { Fonts } from "@/constants/AppEnums";
import { Box, Button, Card } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { getUserInfoInvitationSelector } from "@/store/monitor/selectors";
import { useDispatchResolve } from "@/utils/Hooks";
import {
  getUserInfoInvitation,
  getUserInfoMonitor,
  setUserInfoInvitation,
} from "@/store/monitor/action";

const QUERY_INVITATION = gql`
  query Invitation($uuid: String) {
    invitation(uuid: $uuid) {
      uuid
      inviterName
      projectName
      status
      expiresIn
      expiresAt
      isExpired
      role
      id
      email
    }
  }
`;

const MUTATION_REPLY_PROJECT_INVITATION = gql`
  mutation Mutation($reply: ReplyInvitationInput) {
    replyProjectInviation(reply: $reply) {
      ok
      message
    }
  }
`;

const InviteMember = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatchResolve = useDispatchResolve();
  const [loading, setLoading] = useState(false);
  const userInfoInvitation = useSelector(getUserInfoInvitationSelector);

  const [fetchData, { data }] = useLazyQuery(QUERY_INVITATION);

  const [mutationReplyProjectInviation] = useMutation(
    MUTATION_REPLY_PROJECT_INVITATION,
    {
      onError(err) {
        toast(err?.message, { type: "error" });
      },
      onCompleted(data) {
        data && toast("Request successfully", { type: "success" });
        dispatchResolve(getUserInfoMonitor()).then(() => {
          dispatchResolve(setUserInfoInvitation(null as any));
          dispatchResolve(getUserInfoInvitation()).then((data: any) => {
            if (data.inviations.length > 0) navigate(paths.projects);
          });
        });
      },
    }
  );

  useEffect(() => {
    if (params?.uuid && pathname.includes(`${paths.inviteMember}/`)) {
      fetchData({
        variables: { uuid: params.uuid },
      });
    }
  }, [params, fetchData, pathname]);

  useEffect(() => {
    if (data?.invitation === null) navigate(paths.dashboard);
  }, [data, navigate]);

  useEffect(() => {
    if (
      userInfoInvitation &&
      userInfoInvitation.inviations.length === 0 &&
      pathname.includes(`${paths.invitesMember}`)
    ) {
      navigate(`${paths.projects}`);
    }
  }, [userInfoInvitation, navigate, pathname]);

  const handleReplyProjectInvitation = useCallback(
    async (type: "ACCEPT" | "DENY", uuid?: string) => {
      const jwtToken = window.localStorage.getItem("jwtToken");
      const jwt = window.localStorage.getItem("jwt");
      if (!jwtToken && !jwt) {
        navigate(`${paths.signin}`);
        return;
      }
      const variables = {
        reply: {
          uuid: uuid ? uuid : params.uuid,
          status: type,
        },
      };
      setLoading(true);
      await mutationReplyProjectInviation({
        variables,
      });
      setLoading(false);
    },
    [params, mutationReplyProjectInviation, navigate]
  );

  return (
    <>
      {loading && <AppLoader />}
      <Box
        sx={{
          pd: 6,
          py: { xl: 8 },
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.invitation ? (
          <Card
            sx={{
              maxWidth: 550,
              width: "100%",
              textAlign: "center",
              padding: { xs: 8, lg: 12, xl: "48px 64px" },
              overflow: "hidden",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box
              sx={{
                mb: { xs: 1, xl: 2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mr: 2, ".logo": { height: 44 } }}>
                <img className="logo" src={Logo} alt="crema" />
              </Box>
            </Box>
            <Box
              sx={{
                mb: { xs: 3, xl: 4 },
              }}
            >
              <Box sx={{ mb: 1, fontWeight: Fonts.BOLD, fontSize: 20 }}>
                <GroupWorkIcon /> {"-->"} <GroupWorkIcon />
              </Box>
              <Box sx={{ mb: 1, fontSize: 16 }}>
                You&apos;ve been invited to the&nbsp;
                <span className="font-bold">
                  {data?.invitation?.projectName}
                </span>
              </Box>
              <Box sx={{ mb: 1, fontSize: 14 }}>
                invited by&nbsp;
                <span className="font-bold">
                  {data?.invitation?.inviterName}
                </span>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  width: "150px",
                  fontWeight: Fonts.BOLD,
                  textTransform: "capitalize",
                  height: 44,
                  mt: 4,
                }}
                type="button"
                onClick={() => handleReplyProjectInvitation("DENY")}
              >
                Deny
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "150px",
                  fontWeight: Fonts.BOLD,
                  textTransform: "capitalize",
                  height: 44,
                  mt: 4,
                }}
                type="button"
                onClick={() => handleReplyProjectInvitation("ACCEPT")}
              >
                Accept
              </Button>
            </Box>
          </Card>
        ) : (
          <>
            {userInfoInvitation?.inviations.map(
              (invitation: any, index: number) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: 550,
                    width: "100%",
                    mt: index > 0 ? 4 : 0,
                    textAlign: "center",
                    padding: { xs: 8, lg: 12, xl: "48px 64px" },
                    overflow: "hidden",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Box
                    sx={{
                      mb: { xs: 1, xl: 2 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ mr: 2, ".logo": { height: 44 } }}>
                      <img className="logo" src={Logo} alt="crema" />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mb: { xs: 3, xl: 4 },
                    }}
                  >
                    <Box sx={{ mb: 1, fontWeight: Fonts.BOLD, fontSize: 20 }}>
                      <GroupWorkIcon /> {"-->"} <GroupWorkIcon />
                    </Box>
                    <Box sx={{ mb: 1, fontSize: 16 }}>
                      You&apos;ve been invited to the&nbsp;
                      <span className="font-bold">
                        {invitation.projectName}
                      </span>
                    </Box>
                    <Box sx={{ mb: 1, fontSize: 14 }}>
                      invited by&nbsp;
                      <span className="font-bold">
                        {invitation.inviterName}
                      </span>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        width: "150px",
                        fontWeight: Fonts.BOLD,
                        textTransform: "capitalize",
                        height: 44,
                        mt: 4,
                      }}
                      type="button"
                      onClick={() =>
                        handleReplyProjectInvitation("DENY", invitation.uuid)
                      }
                    >
                      Deny
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "150px",
                        fontWeight: Fonts.BOLD,
                        textTransform: "capitalize",
                        height: 44,
                        mt: 4,
                      }}
                      type="button"
                      onClick={() =>
                        handleReplyProjectInvitation("ACCEPT", invitation.uuid)
                      }
                    >
                      Accept
                    </Button>
                  </Box>
                </Card>
              )
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default InviteMember;
