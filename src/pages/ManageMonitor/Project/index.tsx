import Farm from "../Farm";
import NoFarm from "./NoFarm";
import AppLoader from "@/components/AppLoader";
import DynamicForm from "@/components/DynamicForm";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  createOrUpdateProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";
import { useSelector } from "react-redux";
import { newFarmData } from "./newFarmData";
import { Fonts } from "@/constants/AppEnums";
import { useDispatchResolve } from "@/utils/Hooks";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfoMonitorSelector } from "@/store/monitor/selectors";
import { isDisableAction } from "@/utils/CheckPermission";
import Placeholder from "@/assets/images/placeholder_default.jpg";

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [openNewFarm, setOpenNewFarm] = useState(false);
  const userInfoMonitor = useSelector(getUserInfoMonitorSelector);

  const handleClickOpenNewFarm = () => {
    setOpenNewFarm(true);
  };

  const handleCloseNewFarm = () => {
    setOpenNewFarm(false);
  };

  useEffect(() => {
    if (userInfoMonitor) {
      const currentProject = [
        ...userInfoMonitor.joinedProjects,
        ...userInfoMonitor.ownedProjects,
      ].find((item) => item.id === params.id);
      if (currentProject) {
        setProject(currentProject);
      } else {
        navigate("/projects");
      }
    }
  }, [userInfoMonitor, navigate, params]);

  const handleSubmitNewFarm = useCallback(
    (data: any, setSubmitting: any) => {
      const { name, pinOrder } = data;
      const variables = { id: params.id, farms: [{ name, pinOrder }] };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables))
        .then(async () => {
          handleCloseNewFarm();
          await dispatchResolve(getUserInfoMonitor());
          setSubmitting(false);
          setLoading(false);
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
    [dispatchResolve, params]
  );

  const handlePinOrderProject = useCallback(
    (e: any, data: any) => {
      e.stopPropagation();
      const variables = {
        id: params.id,
        pinOrder: !data.pinOrder,
      };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables as any))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [params, dispatchResolve]
  );

  return (
    <>
      {loading && <AppLoader />}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { sm: "space-between" },
          }}
        >
          <Box
            sx={{
              mb: 4,
              pr: { sm: 3 },
              flex: { sm: 1 },
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: (theme) => theme.palette.text.primary,
                fontWeight: Fonts.MEDIUM,
                fontSize: { xs: 18, sm: 20 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {project && (
                  <Box
                    sx={{
                      mx: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => {}}
                        size="small"
                        aria-haspopup="true"
                      >
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            border: "1px solid rgb(204, 204, 204)",
                          }}
                          src={project.logo || Placeholder}
                        />
                      </IconButton>
                      <Box sx={{ fontSize: 16 }}>{project.name} </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        ml: 1,
                        borderRadius: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        p: 0.25,
                        pr: 1,
                      }}
                    >
                      {project.owner?.avatar && (
                        <IconButton
                          onClick={() => {}}
                          size="small"
                          aria-haspopup="true"
                        >
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              border: "1px solid rgb(204, 204, 204)",
                            }}
                            src={project.owner?.avatar}
                          />
                        </IconButton>
                      )}
                      <span className="ml-1 text-[13px] font-light">
                        {project.owner?.name ? project.owner?.name : "Owned"}
                      </span>
                    </Box>
                  </Box>
                )}
                <Tooltip
                  title={
                    Number(project?.pinOrder) > 0
                      ? "Unpin this Project"
                      : "Pin this Project"
                  }
                >
                  <span>
                    <Checkbox
                      sx={{ pt: 0.75, ml: 0.5 }}
                      {...{ inputProps: { "aria-label": "Checkbox demo" } }}
                      disabled={isDisableAction(project?.canUpdateProject)}
                      icon={
                        Number(project?.pinOrder) === 0 ? (
                          <TbPin className="text-2xl" />
                        ) : (
                          <></>
                        )
                      }
                      checkedIcon={<TbPinnedOff className="text-2xl" />}
                      checked={Number(project?.pinOrder) > 0}
                      onChange={(e) => {
                        handlePinOrderProject(e, project);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </span>
                </Tooltip>
              </Box>
            </Typography>
          </Box>
          {userInfoMonitor && (
            <Box sx={{ height: 40 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "capitalize", mr: 2, width: 160 }}
                disabled={isDisableAction(project?.canCreateFarm)}
                onClick={handleClickOpenNewFarm}
              >
                <AddCircleOutlineIcon className="mr-1" />
                Create Farm
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "capitalize", width: 160 }}
                onClick={() => {
                  navigate(`/project/${params.id}/setting`);
                }}
              >
                <SettingsIcon className="mr-1" />
                Setting Project
              </Button>
            </Box>
          )}
        </Box>
        {project?.farms.length > 0 ? (
          <Farm project={project} />
        ) : (
          project && <NoFarm project={project} />
        )}
      </Box>

      {/* Dialog New Farm */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openNewFarm}
        onClose={handleCloseNewFarm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">Create New Farm</DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseNewFarm}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DynamicForm
            formsData={newFarmData}
            handleSubmit={handleSubmitNewFarm}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Project;
