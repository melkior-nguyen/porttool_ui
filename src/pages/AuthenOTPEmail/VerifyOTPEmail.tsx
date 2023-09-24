import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Countdown from "react-countdown";
import Logo from "@/assets/images/port_tool_dark.png";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { useIntl } from "react-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import OTPInput from "react-otp-input";
import { FormHelperText } from "@mui/material";
import RendererResendOTP from "@/components/RendererResendOTP";
import { useSelector } from "react-redux";
import { getSystemInfoSelector } from "@/store/auth/selectors";
import { toast } from "react-toastify";
import { useDispatchResolve } from "@/utils/Hooks";
import { paths } from "@/routes/constants";
import { sendOTPEmail, verifyOTPEmail } from "@/store/auth/action";
import IntlMessages from "@/helpers/IntlMessages";
import { Fonts } from "@/constants/AppEnums";

const VerifyOTPEmail = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const systemInfo = useSelector(getSystemInfoSelector);
  const [otp, setOtp] = useState("");
  const { search } = useLocation();
  const token = useMemo(() => new URLSearchParams(search), [search])?.get(
    "token"
  );
  const expriesAt = useMemo(() => new URLSearchParams(search), [search])?.get(
    "expriesAt"
  );
  const otpToken = useMemo(() => new URLSearchParams(search), [search])?.get(
    "otpToken"
  );
  const email = useMemo(() => new URLSearchParams(search), [search])?.get(
    "email"
  );
  const validationSchema = yup.object({
    code: yup.string().required(String(messages["validation.codeRequired"])),
  });

  useEffect(() => {
    if (expriesAt && Number(expriesAt) * 1000 < Number(new Date())) {
      toast("Code is exprired", { type: "error" });
      navigate(paths.signin);
    }
  }, [expriesAt, navigate]);

  const handleVerifyOTPEmail = useCallback(
    (data: any, setSubmitting: any) => {
      if (!data || !token) return;
      const variables = {
        token,
        code: data.code,
      };
      dispatchResolve(verifyOTPEmail(variables))
        .then(() => {
          navigate(paths.updateAccount);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [token, dispatchResolve, navigate]
  );

  const resendOTP = useCallback(async () => {
    if (!otpToken || !email) return;
    if (!executeRecaptcha) {
      console.log("executeRecaptcha is not defined");
      return;
    }
    const tokenRecaptcha = await executeRecaptcha("SubmitForm");
    const variables = {
      recaptchaToken: tokenRecaptcha,
      otpToken,
      email,
    };
    dispatchResolve(sendOTPEmail(variables))
      .then((res: any) => {
        navigate(
          `${paths.verifyOTPEmail}?token=${res.data.sendOtpEmail.token.token}&expriesAt=${res.data.sendOtpEmail.token.expriesAt}&otpToken=${otpToken}&email=${email}`
        );
      })
      .catch(() => {
        navigate(`${paths.signup}`);
      });
  }, [dispatchResolve, navigate, otpToken, email, executeRecaptcha]);

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
            <IntlMessages id="verifyOTPEmail.verifyOTPEmail" />
          </Box>
        </Box>

        <Formik
          validateOnChange={true}
          initialValues={{ code: "" }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            handleVerifyOTPEmail(data, setSubmitting);
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
                      inputStyle="block w-full text-base font-bold focus:outline-none text-[#666] form-input leading-5 focus:border-primary dark:border-gray-600 focus:shadow-outline-gray dark:focus:border-gray-600 dark:focus:shadow-outline-gray border border-gray-400 rounded !w-14 !h-14"
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
                <FormHelperText sx={{ mt: 1, fontSize: 12 }} error>
                  {errors.code}
                </FormHelperText>
              )}

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
                  <IntlMessages id="verifyOTPEmail.verifyOTPEmail" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default VerifyOTPEmail;
