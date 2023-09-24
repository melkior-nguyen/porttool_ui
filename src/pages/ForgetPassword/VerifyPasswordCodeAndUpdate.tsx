import AppTextField from "@/components/AppFormComponents/AppTextField";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import {
  Box,
  Button,
  Card,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/port_tool_dark.png";
import * as yup from "yup";
import { useIntl } from "react-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatchResolve } from "@/utils/Hooks";
import {
  sendPasswordCode,
  verifyPasswordCodeAndUpdate,
} from "@/store/auth/action";
import { paths } from "@/routes/constants";
import OTPInput from "react-otp-input";
import Countdown from "react-countdown";
import RendererResendOTP from "@/components/RendererResendOTP";
import AppLoader from "@/components/AppLoader";
import { TokenType } from "@/graphql/generated";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { getSystemInfoSelector } from "@/store/auth/selectors";
import { toast } from "react-toastify";

const VerifyPasswordCodeAndUpdate = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatchResolve = useDispatchResolve();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const systemInfo = useSelector(getSystemInfoSelector);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);

  const token = useMemo(() => new URLSearchParams(search), [search])?.get(
    "token"
  );
  const fpToken = useMemo(() => new URLSearchParams(search), [search])?.get(
    "fpToken"
  );
  const expriesAt = useMemo(() => new URLSearchParams(search), [search])?.get(
    "expriesAt"
  );

  useEffect(() => {
    if (expriesAt && Number(expriesAt) * 1000 < Number(new Date())) {
      toast("Code is exprired", { type: "error" });
      navigate(paths.forgotPassword);
    }
  }, [expriesAt, navigate]);

  const onShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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

  const validationSchema = yup.object({
    code: yup.string().required(String(messages["validation.codeRequired"])),
    password: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
    confirmPassword: yup
      .string()
      .required(String(messages["validation.reTypePassword"]))
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

  const resendOTP = useCallback(async () => {
    if (fpToken) {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const tokenCaptcha = await executeRecaptcha("SubmitForm");
      const variablesSendPasswordCode = {
        recaptchaToken: tokenCaptcha,
        fpToken,
        type: TokenType.Email,
      };
      setLoading(true);
      dispatchResolve(sendPasswordCode(variablesSendPasswordCode))
        .then((res) => {
          setLoading(false);
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
        })
        .catch(() => {
          setLoading(false);
          navigate(`${paths.forgotPassword}`);
        });
    }
  }, [dispatchResolve, navigate, fpToken]);

  const renderer = useCallback(
    ({ minutes, seconds, completed }: any) => {
      return (
        <RendererResendOTP
          minutes={minutes}
          seconds={seconds}
          completed={completed}
          resendOTP={resendOTP}
        />
      );
    },
    [resendOTP]
  );

  const handleVerify2FA = useCallback(
    (data: any, setSubmitting: any) => {
      if (!data) return;
      const { code, password } = data;
      const variables = {
        token,
        code: code,
        newPassword: password,
      };
      dispatchResolve(verifyPasswordCodeAndUpdate(variables))
        .then(() => {
          navigate(paths.signin);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [dispatchResolve, navigate, token]
  );

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
              <IntlMessages id="verifyPasswordCodeAndUpdate.verifyPasswordCodeAndUpdate" />
            </Box>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{ code: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              handleVerify2FA(data, setSubmitting);
            }}
          >
            {({ isSubmitting, errors, touched, setFieldValue }) => (
              <Form>
                <Field name="code">
                  {({ field }: any) => (
                    <div>
                      <Box sx={{ mb: 1, textAlign: "left", color: "#666666" }}>
                        Enter OTP
                      </Box>
                      <OTPInput
                        {...field}
                        containerStyle="justify-between"
                        inputStyle="block w-full text-base font-bold focus:outline-none text-[#666]
                                    form-input leading-5 focus:border-primary dark:border-gray-600
                                    focus:shadow-outline-gray dark:focus:border-gray-600 
                                    dark:focus:shadow-outline-gray border border-gray-400 rounded !w-14 !h-14"
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                          if (value.length === 6) {
                            setFieldValue("code", value);
                          } else {
                            setFieldValue("code", "");
                          }
                        }}
                        numInputs={6}
                        separator={<span>-</span>}
                        isInputNum
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                  )}
                </Field>
                {errors.code && touched.code && (
                  <FormHelperText sx={{ mt: 1, ml: 2, fontSize: 12 }} error>
                    {errors.code}
                  </FormHelperText>
                )}

                <Box sx={{ mb: { xs: 3, xl: 4 }, mt: 4 }}>
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
                    label={
                      <IntlMessages id="verifyPasswordCodeAndUpdate.newPassword" />
                    }
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
                    label={
                      <IntlMessages id="verifyPasswordCodeAndUpdate.retypeNewPassword" />
                    }
                  />
                </Box>

                <div className="grid gap-0 md:grid-cols-2 md:gap-6 mt-4">
                  {expriesAt && (
                    <Countdown
                      date={
                        Number(new Date()) +
                        systemInfo?.porttoolsTokenResendDelta * 1000
                      }
                      renderer={renderer}
                      key={token}
                    />
                  )}
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
                    <IntlMessages id="verifyPasswordCodeAndUpdate.update" />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </>
  );
};

export default VerifyPasswordCodeAndUpdate;
