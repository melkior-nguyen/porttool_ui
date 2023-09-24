import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Logo from "@/assets/images/port_tool_dark.png";
import { Form, Formik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Grid, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useState } from "react";
import { useDispatchResolve } from "@/utils/Hooks";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/constants";
import { get } from "lodash";
import { requestPassword, sendPasswordCode } from "@/store/auth/action";
import { AccountType, TokenType } from "@/graphql/generated";
import IntlMessages from "@/helpers/IntlMessages";
import { Fonts } from "@/constants/AppEnums";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import { formatDate } from "@/utils/Utils";

const ForgetPassword = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateFormat, setSelectedDateFormat] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validationSchema = yup.object({
    emailOrPhoneNumber: yup
      .string()
      .required(String(messages["validation.emailOrPhoneNumberRequired"])),
  });

  const handleForgetPassword = useCallback(
    (data: any, setSubmitting: any) => {
      if (!data && !selectedDateFormat) return;
      const variables = {
        loginKey: data.emailOrPhoneNumber,
        dob: selectedDateFormat,
        accountType: AccountType.Client,
      };
      setSubmitting(true);
      dispatchResolve(requestPassword(variables))
        .then(async (res: any) => {
          console.log("res: ", res);

          const fpToken = get(res, [
            "data",
            "requestPassword",
            "user",
            "fpToken",
          ]);
          const isEmailVerified = get(res, [
            "data",
            "requestPassword",
            "user",
            "isEmailVerified",
          ]);
          const isMobileVerified = get(res, [
            "data",
            "requestPassword",
            "user",
            "isMobileVerified",
          ]);
          if (isEmailVerified && isMobileVerified) {
            navigate(
              `${paths.chooseMethodSendPasswordCode}?fpToken=${fpToken}`
            );
          }
          if (isEmailVerified && !isMobileVerified) {
            if (!executeRecaptcha) {
              console.log("executeRecaptcha is not defined");
              return;
            }
            const tokenCaptcha = await executeRecaptcha("SubmitForm");
            const variablesSendPasswordCode = {
              recaptchaToken: tokenCaptcha,
              fpToken: fpToken,
              type: TokenType.Email,
            };
            dispatchResolve(sendPasswordCode(variablesSendPasswordCode)).then(
              (res) => {
                const token = get(res, [
                  "data",
                  "sendPasswordCode",
                  "token",
                  "token",
                ]);
                const expriesAt = get(res, [
                  "data",
                  "sendPasswordCode",
                  "token",
                  "expriesAt",
                ]);
                navigate(
                  `${paths.verifyPasswordCodeAndUpdate}?token=${token}&fpToken=${fpToken}&expriesAt=${expriesAt}`
                );
              }
            );
          }
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [selectedDateFormat, dispatchResolve, navigate, executeRecaptcha]
  );

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
            <IntlMessages id="forgetPassword.forgetPassword" />
          </Box>
        </Box>

        <Box
          sx={{
            mb: 5,
            fontSize: 14,
          }}
        >
          <Typography>
            <IntlMessages id="forgetPassword.forgetPasswordTextOne" />
          </Typography>
          <Typography component="p">
            <IntlMessages id="forgetPassword.forgetPasswordTextTwo" />
          </Typography>
        </Box>

        <Formik
          validateOnChange={true}
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            handleForgetPassword(data, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <AppTextField
                  name="emailOrPhoneNumber"
                  label={
                    <IntlMessages id="forgetPassword.emailAddressOrPhoneNumber" />
                  }
                  sx={{
                    width: "100%",
                  }}
                  variant="outlined"
                />
              </Box>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedDate}
                      onChange={(event: any) => {
                        setSelectedDate(event);
                        setSelectedDateFormat(formatDate(new Date(event)));
                      }}
                      format="YYYY-MM-DD"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

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
                <IntlMessages id="forgetPassword.sendNewPassword" />
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default ForgetPassword;
