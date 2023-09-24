import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AppAnimate from "@/components/AppAnimate";
import IntlMessages from "@/helpers/IntlMessages";
import Logo from "@/assets/images/port_tool_dark.png";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { IconButton, InputAdornment } from "@mui/material";
import { useCallback, useState } from "react";
import { Fonts } from "@/constants/AppEnums";
import { useDispatchResolve } from "@/utils/Hooks";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { activateTotp, requestOTP } from "@/store/auth/action";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { paths } from "@/routes/constants";

const RequestOTP = ({ handleCloseRequestOTP, requestOTPBy }: any) => {
  const { messages } = useIntl();
  const dispatchResolve = useDispatchResolve();
  const [showPassword, setShowPassword] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleRequestOTP = useCallback(
    (data: any, setSubmitting: any) => {
      dispatchResolve(requestOTP({ password: data.password }))
        .then(async (res: any) => {
          const otpToken = get(res, ["data", "requestOtp", "user", "otpToken"]);
        
          if (requestOTPBy === "AUTHENTICATOR_APP") {
            if(!executeRecaptcha){
              console.log("Execute recaptcha not yet available");
              return;
            }
            const tokenCaptCha = await executeRecaptcha("SubmitForm");
            const variables = {
              recaptchaToken: tokenCaptCha,
              otpToken,
            };
            dispatchResolve(activateTotp(variables)).then((res: any) => {
              const otpauth = get(res, [
                "data",
                "activateTotp",
                "token",
                "otpauth",
              ]);
              const token = get(res, [
                "data",
                "activateTotp",
                "token",
                "token",
              ]);
              const expriesAt = get(res, [
                "data",
                "activateTotp",
                "token",
                "expriesAt",
              ]);
              handleCloseRequestOTP({ otpauth, token, otpToken, expriesAt });
            });
          } else {
            handleCloseRequestOTP({ otpToken });
          }
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [dispatchResolve, handleCloseRequestOTP, requestOTPBy]
  );

  const validationSchema = yup.object({
    password: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
  });

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
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
            maxWidth: 576,
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
            <Box
              sx={{
                mr: 2,
                ".logo": {
                  height: 44,
                },
              }}
            >
              <img className="logo" src={Logo} alt="crema" />
            </Box>
          </Box>
          <Box
            sx={{
              mb: { xs: 3, xl: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mb: 1,
                fontWeight: Fonts.BOLD,
                fontSize: 20,
              }}
            >
              <IntlMessages id="setUp2FA.requestOTP.requestOTP" />
            </Box>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              handleRequestOTP(data, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ mb: 4 }}>
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label={<IntlMessages id="setUp2FA.requestOTP.password" />}
                  />
                </Box>

                <Box
                  component="span"
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: Fonts.BOLD,
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Link to={paths.forgotPassword}>
                    <IntlMessages id="setUp2FA.requestOTP.forgetPassword" />
                  </Link>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    fontWeight: Fonts.BOLD,
                    textTransform: "capitalize",
                    height: 44,
                    mt: 4,
                  }}
                  type="submit"
                >
                  <IntlMessages id="setUp2FA.requestOTP.requestOTP" />
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default RequestOTP;
