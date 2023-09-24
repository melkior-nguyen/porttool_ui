import NoProject from "./NoProject";
import ListProject from "./ListProject";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getUserInfoMonitorSelector } from "@/store/monitor/selectors";

const ManageMonitor = () => {
  const userInfoMonitor = useSelector(getUserInfoMonitorSelector);

  return (
    <>
      <Box>
        {userInfoMonitor?.joinedProjects?.length === 0 &&
        userInfoMonitor?.ownedProjects?.length === 0 ? (
          <NoProject />
        ) : (
          <ListProject
            projects={userInfoMonitor?.ownedProjects}
            canCreateProject={userInfoMonitor?.canCreateProject}
            type={"OWNED"}
          />
        )}
        {userInfoMonitor?.joinedProjects &&
        userInfoMonitor?.joinedProjects.length !== 0 ? (
          <Box sx={{ mb: 4 }}>
            <ListProject
              projects={userInfoMonitor.joinedProjects}
              canCreateProject={false}
              type={"JOINED"}
            />
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default ManageMonitor;
