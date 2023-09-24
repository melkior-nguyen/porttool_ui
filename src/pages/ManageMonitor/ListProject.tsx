import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fonts } from "@/constants/AppEnums";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newProjectData } from "./newProjectData";
import { useDispatchResolve } from "@/utils/Hooks";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  createOrUpdateProject,
  deleteProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";
import AppLoader from "@/components/AppLoader";
import DynamicForm from "@/components/DynamicForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AppGridContainer from "@/components/AppGridContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DialogConfirmDelete from "@/components/DialogConfirmDelete/DialogConfirmDelete";
import { isDisableAction } from "@/utils/CheckPermission";
import Placeholder from "@/assets/images/placeholder_default.jpg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ListProject = ({ projects, canCreateProject, type }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatchResolve = useDispatchResolve();
  const [openNewProject, setOpenNewProject] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState("");

  const handleClickOpenNewProject = () => {
    setOpenNewProject(true);
  };

  const handleCloseNewProject = () => {
    setOpenNewProject(false);
  };

  const handleClickOpenDeleteProject = (id: string) => {
    setOpenDeleteProject(id);
  };

  const handleCloseDeleteProject = () => {
    setOpenDeleteProject("");
  };

  const handleSubmit = useCallback(
    (data: any, setSubmitting: any) => {
      const { name, pinOrder } = data;
      const variables = { name, pinOrder };
      setLoading(false);
      dispatchResolve(createOrUpdateProject(variables))
        .then(async () => {
          handleCloseNewProject();
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
    [dispatchResolve]
  );

  const handleDeleteProject = useCallback(
    (id: string) => {
      const variables = { id };
      setOpenDeleteProject("");
      setLoading(true);
      dispatchResolve(deleteProject(variables))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [dispatchResolve]
  );

  const handlePinOrderProject = useCallback(
    (data: any) => {
      const variables = {
        id: data.id,
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
    [dispatchResolve]
  );

  return (
    <>
      {loading && <AppLoader />}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          pb: 4,
        }}
      >
        <Box>
          <Typography
            component="h3"
            sx={{
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 18, sm: 20 },
            }}
          >
            {type === "JOINED" ? " Projects Joined" : " Projects Owned"}
          </Typography>
        </Box>

        {type === "OWNED" && (
          <Box sx={{ height: 40 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "capitalize" }}
              onClick={handleClickOpenNewProject}
              disabled={isDisableAction(canCreateProject)}
            >
              <AddCircleOutlineIcon className="mr-1" />
              Create Project
            </Button>
          </Box>
        )}
      </Box>

      <AppGridContainer>
        {projects?.map((item: any, index: number) => (
          <Grid key={index} item xs={12} md={4}>
            <Box
              sx={{
                mb: { xs: 3, xl: 4 },
                ml: { xs: 0, md: 1 },
              }}
            >
              <Box
                className="item-hover"
                sx={{
                  border: 1,
                  px: 2,
                  py: 2,
                  mb: 4,
                  borderColor: "#D9DBE3",
                  backgroundColor: "rgba(0, 0, 0, .03)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
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
                          src={item.logo || Placeholder}
                        />
                      </IconButton>
                      <Box sx={{ fontSize: 16 }}>{item.name} </Box>
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
                      {item.owner?.avatar && (
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
                            src={item.owner?.avatar}
                          />
                        </IconButton>
                      )}
                      <span className="ml-1 text-[13px] font-light">
                        {type === "JOINED" ? item.owner?.name : "Owned"}
                      </span>
                    </Box>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Tooltip title="Remove this Project">
                      <span>
                        <IconButton
                          disabled={isDisableAction(item.canDeleteProject)}
                          color="error"
                          aria-label="add to shopping cart"
                          onClick={() => handleClickOpenDeleteProject(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip
                      title={
                        Number(item?.pinOrder) > 0
                          ? "Unpin this Project"
                          : "Pin this Project"
                      }
                    >
                      <span>
                        <Checkbox
                          {...label}
                          disabled={isDisableAction(item.canUpdateProject)}
                          icon={<TbPin className="text-2xl" />}
                          checkedIcon={<TbPinnedOff className="text-2xl" />}
                          checked={Number(item?.pinOrder) > 0}
                          onChange={() => {
                            handlePinOrderProject(item);
                          }}
                        />
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{ height: 40, mx: 1, mt: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => navigate(`/project/${item.id}`)}
                  >
                    <KeyboardDoubleArrowRightIcon className="mr-1" />
                    Go to Project
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </AppGridContainer>
      {/* Dialog New Project */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openNewProject}
        onClose={handleCloseNewProject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">Create New Project</DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseNewProject}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DynamicForm formsData={newProjectData} handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      {/* Dialog Confirm delete Project */}
      <DialogConfirmDelete
        open={openDeleteProject}
        handleClose={handleCloseDeleteProject}
        handleSubmit={() => handleDeleteProject(openDeleteProject) as any}
      />
    </>
  );
};

export default ListProject;
