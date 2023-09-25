import { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Logo from "@/assets/user/signup.svg";
import PortToolLogo from "@/assets/images/port_tool_dark.png";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import * as yup from "yup";
import { useDispatchResolve } from "@/utils/Hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import { AccountType } from "@/graphql/generated";
import { createAccount } from "@/store/auth/action";
import { paths } from "@/routes/constants";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import { formatDate } from "@/utils/Utils";

const currentDate = new Date();
const minYear = currentDate.getFullYear() - 80;
const maxYear = currentDate.getFullYear() - 16;

const minDate = new Date(
  minYear,
  currentDate.getMonth(),
  currentDate.getDate()
);
const maxDate = new Date(
  maxYear,
  currentDate.getMonth(),
  currentDate.getDate()
);

const startOfQ12022 = dayjs(minDate);
const endOfQ12022 = dayjs(maxDate);

const Signup = () => {
  const [error, setError] = useState<DateValidationError | null>(null);
  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date of birth between 16 and 80 years ago.";
      }
      case "invalidDate": {
        return "Your date is not valid";
      }
      default: {
        return "";
      }
    }
  }, [error]);

  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const { messages } = useIntl();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateFormat, setSelectedDateFormat] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);

  const onShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
    console.log('12')
  };

  const onDownNewPassword = (event: any) => {
    event.preventDefault();
  };

  const onShowConfirmPassword = () => {
    setShowRetypeNewPassword(!showRetypeNewPassword);
  };

  const onDownConfirmPassword = (event: any) => {
    event.preventDefault();
  };

  const handleSignUp = useCallback(
    async (data: any, setSubmitting: any) => {
      if (!executeRecaptcha) return;
      const token = await executeRecaptcha("SubmitForm");
      const { fullName, email, password } = data;
      const variables = {
        recaptchaToken: token,
        fullName,
        email,
        password,
        dob: selectedDateFormat,
        accountType: AccountType["Client"],
      };
      dispatchResolve(createAccount(variables))
        .then((res: any) => {
          navigate(
            `${paths.sendOTPEmail}?email=${email}&otpToken=${res.data.createAccount.user.otpToken}`
          );
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [selectedDateFormat, dispatchResolve, navigate, executeRecaptcha]
  );

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required(String(messages["validation.nameRequired"])),
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"]))
      .required(String(messages["validation.emailRequired"])),
    dob: yup.string().required(String(messages["validation.nameRequired"])),
    password: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
    confirmPassword: yup
      .string()
      .required(String(messages["validation.reTypePassword"]))
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
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
          maxWidth: 1024,
          width: "100%",
          padding: 8,
          paddingLeft: { xs: 8, md: 2 },
          overflow: "hidden",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={PortToolLogo} />
        </Box>
        <Grid
          container
          spacing={5}
          sx={{
            alignItems: { lg: "center" },
          }}
        >
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              textAlign: "center",
              "& svg": {
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
            lg={6}
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
              <IntlMessages id="signup.signup" />
            </Box>

            <Formik
              validateOnChange={true}
              initialValues={{
                fullName: "",
                email: "",
                dob: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setErrors, setSubmitting }) => {
                if (data.password !== data.confirmPassword) {
                  setErrors({
                    confirmPassword: messages[
                      "validation.passwordMisMatch"
                    ] as string,
                  });
                }
                handleSignUp(data, setSubmitting);
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form noValidate autoComplete="off">
                  <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                    <AppTextField
                      label={<IntlMessages id="signup.fullname" />}
                      name="fullName"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                    <AppTextField
                      placeholder={messages["signup.email"] as string}
                      label={messages["signup.email"] as string}
                      name="email"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ mb: 1 }}>
                      <DatePicker
                        sx={{
                          width: "100%",
                        }}
                        value={selectedDate}
                        onChange={(event: any) => {
                          setSelectedDate(event);
                          setSelectedDateFormat(formatDate(new Date(event)));
                          setFieldValue("dob", formatDate(new Date(event)));
                        }}
                        format="YYYY-MM-DD"
                        onError={(newError) => setError(newError)}
                        slotProps={{
                          textField: {
                            helperText: errorMessage,
                          },
                        }}
                        minDate={startOfQ12022}
                        maxDate={endOfQ12022}
                      />
                    </Box>
                  </LocalizationProvider>

                  {!values.dob && (
                    <Box
                      sx={{
                        color: "rgb(211, 47, 47)",
                        textAlign: "left",
                        fontSize: 12,
                        mb: 1,
                        mx: "14px",
                      }}
                    >
                      Please enter day of birth!
                    </Box>
                  )}

                  <Box
                    sx={{
                      mb: { xs: 3, xl: 4 },
                      textAlign: "left",
                      fontSize: 14,
                    }}
                  >
                    ***
                    <IntlMessages id="signup.fieldIsImportant" />
                  </Box>

                  <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                    <AppTextField
                      type={showNewPassword ? "text" : "password"}
                      name="password"
                      sx={{
                        width: "100%",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={onShowNewPassword}
                              onMouseDown={onDownNewPassword}
                              edge="end"
                            >
                              {showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label={<IntlMessages id="signup.password" />}
                    />
                  </Box>

                  <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                    <AppTextField
                      type={showRetypeNewPassword ? "text" : "password"}
                      name="confirmPassword"
                      sx={{
                        width: "100%",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={onShowConfirmPassword}
                              onMouseDown={onDownConfirmPassword}
                              edge="end"
                            >
                              {showRetypeNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label={<IntlMessages id="signup.retypePassword" />}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                      width: "100%",
                      height: 44,
                    }}
                    type="submit"
                  >
                    <IntlMessages id="signup.signup" />
                  </Button>
                </Form>
              )}
            </Formik>

            <Box
              sx={{
                textAlign: "center",
                color: "grey.700",
                fontSize: 14,
                fontWeight: Fonts.BOLD,
                mt: { xs: 3, xl: 4 },
              }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                <IntlMessages id="signup.alreadyHaveAccount" />
              </Box>
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  fontWeight: Fonts.MEDIUM,
                  cursor: "pointer",
                }}
              >
                <Link to={paths.signin}>
                  <IntlMessages id="signup.signInHere" />
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Signup;
