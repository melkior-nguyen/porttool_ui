import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Logo from "@/assets/images/port_tool_dark.png";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Form, Formik } from "formik";
import { Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatchResolve } from "@/utils/Hooks";
import { sendOTPEmail } from "@/store/auth/action";
import { paths } from "@/routes/constants";
import IntlMessages from "@/helpers/IntlMessages";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import { Fonts } from "@/constants/AppEnums";

const SendOTPEmail = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { search } = useLocation();
  const email = useMemo(() => new URLSearchParams(search), [search])?.get(
    "email"
  );
  const otpToken = useMemo(() => new URLSearchParams(search), [search])?.get(
    "otpToken"
  );

  const handleSendOTPEmail = useCallback(
    async (data: any, setSubmitting: any) => {
      if (!data || !otpToken) return;
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const tokenCaptcha = await executeRecaptcha("SubmitForm");
      const variables = {
        recaptchaToken: tokenCaptcha,
        otpToken: otpToken,
        email: data.email,
      };
      dispatchResolve(sendOTPEmail(variables))
        .then((res: any) => {
          navigate(
            `${paths.verifyOTPEmail}?token=${res.data.sendOtpEmail.token.token}&expriesAt=${res.data.sendOtpEmail.token.expriesAt}&otpToken=${otpToken}&email=${data.email}`
          );
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [dispatchResolve, navigate, otpToken, executeRecaptcha]
  );

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"]))
      .required(String(messages["validation.emailRequired"])),
  });

  return (
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
            <IntlMessages id="sendOTPEmail.sendOTPEmail" />
          </Box>
        </Box>

        <Box
          sx={{
            mb: 5,
            fontSize: 14,
          }}
        >
          <Typography>
            <IntlMessages id="sendOTPEmail.forgetPasswordTextOne" />
          </Typography>
          <Typography component="p">
            <IntlMessages id="sendOTPEmail.forgetPasswordTextTwo" />
          </Typography>
        </Box>

        <Formik
          validateOnChange={true}
          initialValues={{
            email: email ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            handleSendOTPEmail(data, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  mb: { xs: 4, xl: 5 },
                }}
              >
                <AppTextField
                  name="email"
                  label={<IntlMessages id="sendOTPEmail.emailAddress" />}
                  sx={{
                    width: "100%",
                  }}
                  variant="outlined"
                />
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
                }}
                type="submit"
              >
                <IntlMessages id="sendOTPEmail.sendOTPEmail" />
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default SendOTPEmail;
