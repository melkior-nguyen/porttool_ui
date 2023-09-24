import AppGridContainer from "@/components/AppGridContainer";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
} from "@mui/material";
import RequestOTP from "./RequestOTP";
import SetUp2FAAuthenticatorApp from "./SetUp2FAAuthenticatorApp";
import SetUp2FASMS from "./SetUp2FASMS";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfoSelector } from "@/store/auth/selectors";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const SetUp2FA = () => {
  const userInfo = useSelector(getUserInfoSelector);
  const [token, setToken] = useState("");
  const [otpauth, setOTPauth] = useState("");
  const [otpToken, setOTPToken] = useState("");
  const [expriesAt, setExpriesAt] = useState<any>();
  const [openRequestOTP, setOpenRequestOTP] = useState(false);
  const [openSetUp2FAAuthenticatorApp, setOpenSetUp2FAAuthenticatorApp] =
    useState(false);
  const [openSetUp2FASMS, setOpenSetUp2FASMS] = useState(false);
  const [checkedAuthencatorApp, setCheckedAuthencatorApp] = useState(false);
  const [checkedSMS, setCheckedSMS] = useState(false);
  const [requestOTPBy, setRequestOTPBy] = useState("");

  useEffect(() => {
    if (userInfo) {
      setCheckedAuthencatorApp(userInfo.twoFaViaTotp);
      setCheckedSMS(userInfo.twoFaViaMobile);
    }
  }, [userInfo]);

  const handleClickOpenRequestOTP = () => {
    setOpenRequestOTP(true);
  };

  const handleCloseRequestOTP = () => {
    setOpenRequestOTP(false);
  };

  const handleChangeRequestOTP = useCallback(
    (event: any, type: string) => {
      setRequestOTPBy(type);
      if (event.target.checked) handleClickOpenRequestOTP();
    },
    [handleClickOpenRequestOTP, open]
  );

  const handleClickOpenSetUp2FAAuthenticatorApp = () => {
    setOpenSetUp2FAAuthenticatorApp(true);
  };

  const handleCloseSetUp2FAAuthenticatorApp = () => {
    setOpenSetUp2FAAuthenticatorApp(false);
  };

  const handleClickOpenSetUp2FASMS = () => {
    setOpenSetUp2FASMS(true);
  };

  const handleCloseSetUp2FASMS = () => {
    setOpenSetUp2FASMS(false);
  };

  return (
    <>
      <AppGridContainer>
        <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
          <IntlMessages id="userProfile.2FAtitle" />
        </Box>
        <Box sx={{ fontSize: 14 }}>
          <IntlMessages id="userProfile.2FADescription" />
          {/* Authenticator App */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
            <Box sx={{ fontSize: 14, fontWeight: Fonts.MEDIUM }}>
              <IntlMessages id="userProfile.authenticatorApp" />
            </Box>
            <Switch
              sx={{ ml: 4 }}
              checked={checkedAuthencatorApp}
              onChange={(event: any) =>
                handleChangeRequestOTP(event, "AUTHENTICATOR_APP")
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          {/* Code by Text (SMS) */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box sx={{ fontSize: 14, fontWeight: Fonts.MEDIUM }}>
              <IntlMessages id="userProfile.codeByTextSMS" />
            </Box>
            <Switch
              sx={{ ml: 4 }}
              checked={checkedSMS}
              onChange={(event: any) => handleChangeRequestOTP(event, "SMS")}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </Box>
      </AppGridContainer>
      {/* RequestOTP */}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openRequestOTP}
        onClose={handleCloseRequestOTP}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseRequestOTP}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <RequestOTP
              handleCloseRequestOTP={(data: any) => {
                const { token, otpauth, otpToken, expriesAt } = data;
                setToken(token);
                setOTPauth(otpauth);
                setOTPToken(otpToken);
                setExpriesAt(expriesAt);
                handleCloseRequestOTP();
                if (requestOTPBy === "AUTHENTICATOR_APP") {
                  handleClickOpenSetUp2FAAuthenticatorApp();
                } else {
                  handleClickOpenSetUp2FASMS();
                }
              }}
              requestOTPBy={requestOTPBy}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* SetUp2FA Authencator app */}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openSetUp2FAAuthenticatorApp}
        onClose={handleCloseSetUp2FAAuthenticatorApp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 2 }}>
                <IntlMessages id="userProfile.2FAtitle" />
              </Box>
              <Box sx={{ fontSize: 14, mb: 2 }}>
                <IntlMessages id="userProfile.2FADescription" />
              </Box>
            </Box>
            <DialogActions sx={{ display: "flex", alignItems: "start" }}>
              <Button
                sx={{ height: "48px", borderRadius: "50%" }}
                onClick={handleCloseSetUp2FAAuthenticatorApp}
                autoFocus
              >
                <AiOutlineCloseCircle className="w-6 text-2xl" />
              </Button>
            </DialogActions>
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <SetUp2FAAuthenticatorApp
              token={token}
              otpauth={otpauth}
              otpToken={otpToken}
              expriesAt={expriesAt}
              handleCloseSetUp2FA={handleCloseSetUp2FAAuthenticatorApp}
              setCheckedAuthencatorApp={setCheckedAuthencatorApp}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* SetUp2FA SMS */}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openSetUp2FASMS}
        onClose={handleCloseSetUp2FASMS}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">
            <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 2 }}>
              <IntlMessages id="userProfile.2FAtitleSMS" />
            </Box>
          </DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseSetUp2FASMS}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <SetUp2FASMS
              otpToken={otpToken}
              handleCloseSetUp2FA={handleCloseSetUp2FASMS}
              setCheckedSMS={setCheckedSMS}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SetUp2FA;
