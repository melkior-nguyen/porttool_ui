import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Logo from "@/assets/user/login.svg";
import AppLoader from "@/components/AppLoader";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PortToolLogo from "@/assets/images/port_tool_dark.png";
import * as yup from "yup";
import { get } from "lodash";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { grey } from "@mui/material/colors";
import { useCallback, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { env } from "@/types";
import { useDispatchResolve } from "@/utils/Hooks";
import { paths } from "@/routes/constants";
import {
  AccountType,
  SocialProviderType,
  TwoFaType,
} from "@/graphql/generated";
import { keyAuth, send2FA, socialAuth } from "@/store/auth/action";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import AppTextField from "@/components/AppFormComponents/AppTextField";

const Signin = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDownPassword = (event: any) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"]))
      .required(String(messages["validation.emailRequired"])),
    password: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
  });

  const checkUserSignIn = useCallback(
    async (data: any) => {
      const {
        token,
        isEmailVerified,
        isCompleteProfile,
        twoFaViaEmail,
        twoFaViaTotp,
        twoFaViaMobile,
        faTokenExpriesAt,
        otpToken,
        faToken,
        payload,
      } = data;
      if (token) window.localStorage.setItem("jwtToken", token);
      if (payload?.device_id)
        window.localStorage.setItem(
          env.VITE_HEADER_DEVICE_ID.toString().toLowerCase(),
          payload.device_id
        );
      // Case 1: isEmailVerified === false => Direct to verify OTP
      if (!isEmailVerified) {
        navigate(
          `${paths.sendOTPEmail}?email=${data.email}&otpToken=${otpToken}`
        );
        return;
      }

      // Case 2: isCompleteProfile === false => Direct to update account
      if (!isCompleteProfile) {
        navigate(paths.updateAccount);
        return;
      }
      // Case 3: twoFaViaTotp === true or twoFaViaMobile === true => Direct to choose method 2FA
      if (twoFaViaTotp || twoFaViaMobile) {
        let path = `${paths.chooseMethod2FA}?faToken=${faToken}&faTokenExpriesAt=${faTokenExpriesAt}`;
        if (twoFaViaTotp) path = path.concat(`&twoFaViaTotp=true`);
        if (twoFaViaMobile) path = path.concat(`&twoFaViaMobile=true`);
        navigate(path);
        return;
      }
      // Case 4: twoFaViaTotp === false and twoFaViaMobile === false and twoFaViaEmail === true
      // Call send2FA to send OTP to Email => Direct Enter 2FA for Email
      if (twoFaViaEmail) {
        if (!executeRecaptcha) {
          console.error("executeRecaptcha is not defined");
          return;
        }
        const recaptcha = await executeRecaptcha("SubmitForm");
        const variables2FA = {
          recaptchaToken: recaptcha,
          faToken,
          type: TwoFaType.Email,
        };
        setLoading(true);
        dispatchResolve(send2FA(variables2FA))
          .then((res: any) => {
            const token2FA = get(res, ["data", "send2fa", "token", "token"]);
            const expriesAt = get(res, [
              "data",
              "send2fa",
              "token",
              "expriesAt",
            ]);
            setLoading(false);
            navigate(
              `${paths.verify2FA}?token=${token2FA}&faToken=${faToken}&expriesAt=${expriesAt}&faTokenExpriesAt=${faTokenExpriesAt}&type=${variables2FA.type}`
            );
          })
          .catch(() => {
            setLoading(false);
          });
        return;
      }
      // Case 5: isEmailVerified === true and isCompleteProfile === true and twoFaViaTotp === false and twoFaViaMobile === false and twoFaViaEmail === false
      // set localStorage jwt === token (token is tag mark user signed in)
      window.localStorage.setItem("jwt", "token");
      navigate(paths.dashboard);
    },
    [dispatchResolve, navigate, executeRecaptcha]
  );

  const handleSignin = useCallback(
    (data: any, setSubmitting: any) => {
      const variables = {
        loginKey: data.email,
        password: data.password,
        accountType: AccountType.Client,
      };
      setLoading(true);
      dispatchResolve(keyAuth(variables))
        .then((res) => {
          const token = get(res, ["data", "keyAuth", "token"]);
          const user = get(res, ["data", "keyAuth", "user"]);
          const payload = get(res, ["data", "keyAuth", "payload"]);
          setLoading(false);
          checkUserSignIn({ ...user, ...payload, token });
        })
        .catch(() => {
          setLoading(false);
          setSubmitting(false);
        });
    },
    [dispatchResolve, checkUserSignIn]
  );

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const variables = {
        provider: SocialProviderType.GoogleOauth2,
        accessToken: tokenResponse.access_token,
        accountType: AccountType.Client,
      };
      setLoading(true);
      dispatchResolve(socialAuth(variables))
        .then((res: any) => {
          const token = get(res, ["data", "socialAuth", "token"]);
          const data = get(res, ["data", "socialAuth", "user"]);
          const payload = get(res, ["data", "socialAuth", "payload"]);
          setLoading(false);
          checkUserSignIn({ ...data, token, payload });
        })
        .catch(() => {
          setLoading(false);
        });
    },
    onError: (errors) => console.log(errors),
  });

  return (
    <>
      {loading && <AppLoader />}
      <Box
        sx={{
          pb: 6,
          py: { xl: 8 },
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 1024,
            width: "100%",
            padding: 8,
            paddingLeft: { xs: 8, md: 2 },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <img src={PortToolLogo} />
          </Box>
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                "& svg": {
                  width: "100%",
                  height: "100%",
                  display: "inline-block",
                  paddingRight: { xs: 0, lg: 10 },
                },
              }}
            >
              <img src={Logo} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  fontWeight: Fonts.BOLD,
                  fontSize: 20,
                }}
              >
                <IntlMessages id="signin.login" />
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  handleSignin(data, setSubmitting);
                }}
              >
                {({ isSubmitting }) => (
                  <Form noValidate autoComplete="on">
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        placeholder={messages["signin.email"] as string}
                        label={messages["signin.email"] as string}
                        name="email"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 3, xl: 5 } }}>
                      <AppTextField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        sx={{
                          width: "100%",
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={onShowPassword}
                                onMouseDown={onDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label={<IntlMessages id="signin.password" />}
                      />
                    </Box>

                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { sm: "center" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            ml: -3,
                          }}
                        ></Box>
                        <Box
                          component="span"
                          sx={{
                            fontSize: 14,
                          }}
                        ></Box>
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          cursor: "pointer",
                          ml: { xs: 0, sm: "auto" },
                          mt: { xs: 2, sm: 0 },
                          color: "primary.main",
                          fontWeight: Fonts.BOLD,
                          fontSize: 14,
                        }}
                      >
                        <Link to={paths.forgotPassword}>
                          <IntlMessages id="signin.forgetPassword" />
                        </Link>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        width: "100%",
                        height: 44,
                      }}
                    >
                      <IntlMessages id="signin.login" />
                    </Button>
                  </Form>
                )}
              </Formik>

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
                <Box
                  component="span"
                  sx={{
                    color: grey[600],
                    fontSize: 14,
                    mr: 4,
                  }}
                >
                  <IntlMessages id="signin.orLoginWith" />
                </Box>

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

              <Box
                sx={{
                  color: "grey.700",
                  fontSize: 14,
                  fontWeight: Fonts.BOLD,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    mr: 2,
                  }}
                >
                  <IntlMessages id="signin.dontHaveAccount" />
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                >
                  <Link to={paths.signup}>
                    <IntlMessages id="signup.signup" />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default Signin;
