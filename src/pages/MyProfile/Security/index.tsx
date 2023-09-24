import { Box } from "@mui/material";
import SetUp2FA from "./SetUp2FA.tsx";
import ChangePassword from "./ChangePassword";
import MyProfileWrapper from "../MyProfileWrapper";
import SocialConnection from "./SocialConnection";

const Security = () => {
  return (
    <>
      <MyProfileWrapper>
        <ChangePassword />
      </MyProfileWrapper>
      <Box sx={{ mt: 2 }}>
        <MyProfileWrapper>
          <SetUp2FA />
        </MyProfileWrapper>
      </Box>
      <Box sx={{ mt: 2 }}>
        <MyProfileWrapper>
          <SocialConnection />
        </MyProfileWrapper>
      </Box>
    </>
  );
};

export default Security;
