import Logo from "@/assets/user/maintenance.svg";
import AppAnimate from "@/components/AppAnimate";
import DynamicForm from "@/components/DynamicForm";
import { Fonts } from "@/constants/AppEnums";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { newProjectData } from "./newProjectData";
import { useCallback, useState } from "react";
import { useDispatchResolve } from "@/utils/Hooks";
import {
  createOrUpdateProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";

const NoProject = () => {
  const [openNewProject, setOpenNewProject] = useState(false);
  const dispatchResolve = useDispatchResolve();

  const handleClickOpenNewProject = () => {
    setOpenNewProject(true);
  };

  const handleCloseNewProject = () => {
    setOpenNewProject(false);
  };

  const handleSubmit = useCallback(
    (data: any, setSubmitting: any) => {
      const { name, pinOrder } = data;
      const variables = { name, pinOrder };
      dispatchResolve(createOrUpdateProject(variables))
        .then(() => {
          handleCloseNewProject();
          dispatchResolve(getUserInfoMonitor());
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [dispatchResolve]
  );

  return (
    <>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box
          sx={{
            py: { xl: 8 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              mb: { xs: 2, xl: 4 },
              width: "100%",
              maxWidth: { xs: 100, sm: 150, xl: 352 },
              "& svg": {
                width: "100%",
                maxWidth: 400,
              },
            }}
          >
            <img className="logo" src={Logo} alt="crema" />
          </Box>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
            }}
          >
            <Box
              component="h3"
              sx={{
                mb: { xs: 1.5, xl: 2 },
                fontSize: { xs: 20, md: 24 },
                fontWeight: Fonts.MEDIUM,
              }}
            >
              Remain Calm
            </Box>
            <Box
              sx={{
                mb: { xs: 4, xl: 5 },
                color: "#757575",
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
              }}
            >
              <Typography>
                You need at least one project to use this view.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: Fonts.MEDIUM,
                fontSize: 16,
                textTransform: "capitalize",
              }}
              onClick={handleClickOpenNewProject}
            >
              Create Project
            </Button>
          </Box>
        </Box>
      </AppAnimate>
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
    </>
  );
};

export default NoProject;
