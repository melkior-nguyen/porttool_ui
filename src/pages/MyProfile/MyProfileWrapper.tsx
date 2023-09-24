import { Box } from "@mui/system";
import AccountTabsWrapper from "./AccountTabsWrapper";

const MyProfileWrapper = ({ children }: any) => {
  return (
    <AccountTabsWrapper key="2">
      <Box className="account-tabs-content" sx={{ mr: 3, borderRadius: 1 }}>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 1024,
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </AccountTabsWrapper>
  );
};

export default MyProfileWrapper;
