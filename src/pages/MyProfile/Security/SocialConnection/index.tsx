import get from "lodash/get";
import AppGridContainer from "@/components/AppGridContainer";
import IntlMessages from "@/helpers/IntlMessages";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Fonts } from "@/constants/AppEnums";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import { AccountType, SocialProviderType } from "@/graphql/generated";
import { useDispatchResolve } from "@/utils/Hooks";
import {
  getUserInfoSocialConnection,
  removeConnection,
  socialConnection,
} from "@/store/auth/action";
import { useSelector } from "react-redux";
import { getUserInfoSocialConnectionSelector } from "@/store/auth/selectors";

const SocialConnection = () => {
  const dispatchResolve = useDispatchResolve();
  const [open, setOpen] = useState(false);
  const [valueRadio, setValueRadio] = useState("");
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
  const userInfoSocialConnection = useSelector(
    getUserInfoSocialConnectionSelector
  );

  useEffect(() => {
    dispatchResolve(getUserInfoSocialConnection());
  }, [dispatchResolve]);

  const handleChange = useCallback(
    (event: any) => {
      setValueRadio(event.target.value);
    },
    [setValueRadio]
  );

  const handleRemoveConnection = useCallback(() => {
    const uid = valueRadio.split(",")[1];
    const variables = {
      provider: SocialProviderType.GoogleOauth2,
      uid,
    };
    setIsDisabledSubmit(true);
    dispatchResolve(removeConnection(variables))
      .then(() => {
        setIsDisabledSubmit(false);
        dispatchResolve(getUserInfoSocialConnection());
      })
      .catch(() => {
        setIsDisabledSubmit(false);
      });
  }, [valueRadio, setIsDisabledSubmit, dispatchResolve]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const variables = {
        provider: SocialProviderType.GoogleOauth2,
        accessToken: tokenResponse.access_token,
        accountType: AccountType.Client,
      };
      dispatchResolve(socialConnection(variables)).then(() => {
        handleClose();
        dispatchResolve(getUserInfoSocialConnection());
      });
    },
    onError: (errors) => console.log(errors),
  });

  return (
    <>
      <AppGridContainer>
        <Box sx={{ width: "100%", mb: 4 }}>
          <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
            <IntlMessages id="userProfile.socialConnections" />
          </Box>
          <Box sx={{ fontSize: 14 }}>
            <IntlMessages id="userProfile.socialConnectionsDes" />
          </Box>
          {get(userInfoSocialConnection, ["socials"])?.length !== 0 && (
            <FormControl component="fieldset" sx={{ width: "100%", mt: 3 }}>
              <RadioGroup
                aria-label="social"
                name="controlled-radio-buttons-group"
                value={valueRadio}
                onChange={handleChange}
              >
                {get(userInfoSocialConnection, ["socials"])?.map(
                  (item: any, index: number) => (
                    <FormControlLabel
                      key={index}
                      value={`${item.provider},${item.uid}`}
                      control={<Radio />}
                      label={
                        item.provider === "google-oauth2"
                          ? `Google - ${item.uid}`
                          : "Github"
                      }
                    />
                  )
                )}
              </RadioGroup>
            </FormControl>
          )}
          {get(userInfoSocialConnection, ["socials"])?.length !== 0 && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "250px",
                fontWeight: Fonts.BOLD,
                textTransform: "capitalize",
                height: 44,
                mt: 2,
              }}
              disabled={!valueRadio || isDisabledSubmit}
              type="button"
              onClick={handleRemoveConnection}
            >
              Remove Connection
            </Button>
          )}
        </Box>
      </AppGridContainer>

      <AppGridContainer>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
            <IntlMessages id="userProfile.addA3rdPartyAccount" />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "250px",
              fontWeight: Fonts.BOLD,
              textTransform: "capitalize",
              height: 44,
            }}
            type="button"
            onClick={handleClickOpen}
          >
            Add Account
          </Button>
        </Box>
      </AppGridContainer>

      {/* Dialog Edit Address */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">
            <IntlMessages id="userProfile.addA3rdPartyAccount" />
          </DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleClose}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                mt: { xs: 3, xl: 4 },
                mb: 3,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { sm: "center" },
                alignItems: { sm: "center" },
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  padding: "8px 28px",
                  borderRadius: 30,
                  "& .MuiSvgIcon-root": {
                    fontSize: 26,
                  },
                  marginRight: 2,
                }}
                startIcon={<GoogleIcon sx={{ color: "text.primary" }} />}
                onClick={() => login()}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  padding: "8px 28px",
                  borderRadius: 30,
                  "& .MuiSvgIcon-root": {
                    fontSize: 26,
                  },
                }}
                startIcon={<GitHubIcon sx={{ color: "text.primary" }} />}
              >
                GitHub
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialConnection;
