import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Logo from "@/assets/images/port_tool_dark.png";
import { Field, Form, Formik } from "formik";
import { useIntl } from "react-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { get } from "lodash";
import OTPInput from "react-otp-input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormHelperText } from "@mui/material";
import Countdown from "react-countdown";
import RendererResendOTP from "@/components/RendererResendOTP";
import { TwoFaType } from "@/graphql/generated";
import AppLoader from "@/components/AppLoader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSystemInfoSelector } from "@/store/auth/selectors";
import clsx from "clsx";
import { useDispatchResolve } from "@/utils/Hooks";
import { paths } from "@/routes/constants";
import { send2FA, verify2FA } from "@/store/auth/action";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";

const Verify2FA = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { messages } = useIntl();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const timeOutIDRef = useRef<any>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const systemInfo = useSelector(getSystemInfoSelector);
  const { search } = useLocation();
  const startDate = useRef(Date.now());

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const token = searchParams.get("token");
  const faToken = searchParams.get("faToken");
  const expriesAt = searchParams.get("expriesAt");
  const faTokenExpriesAt = searchParams.get("faTokenExpriesAt");

  const type = searchParams.get("type");
  const twoFaViaTotp = searchParams.get("twoFaViaTotp");
  const twoFaViaMobile = searchParams.get("twoFaViaMobile");

  const pathChooseMethod = useMemo(() => {
    let path = `${paths.chooseMethod2FA}?token=${token}&faToken=${faToken}&expriesAt=${expriesAt}&faTokenExpriesAt=${faTokenExpriesAt}`;
    if (type) path = path.concat(`&type=${type}`);
    if (twoFaViaTotp) path = path.concat(`&twoFaViaTotp=true`);
    if (twoFaViaMobile) path = path.concat(`&twoFaViaMobile=true`);
    return path;
  }, [
    token,
    faToken,
    expriesAt,
    faTokenExpriesAt,
    type,
    twoFaViaTotp,
    twoFaViaMobile,
  ]);

  const validationSchema = yup.object({
    code: yup.string().required(String(messages["validation.codeRequired"])),
  });

  // Check direct to login when faTokenExpriesAt is expired.
  useEffect(() => {
    if (systemInfo) {
      if (
        faTokenExpriesAt &&
        (Number(faTokenExpriesAt) + systemInfo.porttoolsTokenResendDelta * 5) *
          1000 <
          Number(new Date())
      ) {
        timeOutIDRef.current = setInterval(() => {
          toast("Code is exprired", { type: "error" });
          navigate(paths.signin);
        }, Number(new Date()) - (Number(faTokenExpriesAt) + systemInfo.porttoolsTokenResendDelta * 5) * 1000);
      }
    }
    return () => {
      if (timeOutIDRef.current) clearInterval(timeOutIDRef.current);
    };
  }, [faTokenExpriesAt, navigate, systemInfo]);

  const resendOTP = useCallback(async () => {
    if (faToken && type) {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const tokenCaptcha = await executeRecaptcha("SubmitForm");
      const variables2FA = {
        recaptchaToken: tokenCaptcha,
        faToken,
        type: type as any,
      };
      setLoading(true);
      dispatchResolve(send2FA(variables2FA))
        .then((res) => {
          console.log("res: ", res);
          const token2FA = get(res, ["data", "send2fa", "token", "token"]);
          const expriesAtSend2FA = get(res, [
            "data",
            "send2fa",
            "token",
            "expriesAt",
          ]);
          setLoading(false);
          startDate.current = Date.now();
          let path = `${paths.verify2FA}?token=${token2FA}&faToken=${faToken}&expriesAt=${expriesAtSend2FA}&faTokenExpriesAt=${faTokenExpriesAt}&type=${variables2FA.type}`;
          if (twoFaViaTotp) path = path.concat(`&twoFaViaTotp=true`);
          if (twoFaViaMobile) path = path.concat(`&twoFaViaMobile=true`);
          navigate(path);
        })
        .catch(() => {
          setLoading(false);
          navigate(`${paths.signin}`);
        });
    }
  }, [
    dispatchResolve,
    navigate,
    faToken,
    executeRecaptcha,
    type,
    faTokenExpriesAt,
    twoFaViaTotp,
    twoFaViaMobile,
  ]);

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
      if (!data || !token) return;
      const variables = {
        token,
        code: data.code,
      };
      dispatchResolve(verify2FA(variables))
        .then((res: any) => {
          const jwtToken = get(res, ["data", "verify2fa", "token"]);
          window.localStorage.setItem("jwtToken", jwtToken);
          window.localStorage.setItem("jwt", "token");
          navigate(paths.dashboard);
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
              <IntlMessages id="verify2FA.verify2FA" />
            </Box>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{ code: "" }}
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
                        Enter 2FA
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

                {(twoFaViaTotp || twoFaViaMobile) && (
                  <Box
                    sx={{
                      my: { xs: 3, xl: 4 },
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "center" },
                    }}
                  >
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
                      <Link to={pathChooseMethod}>
                        Return Choose Method 2FA
                      </Link>
                    </Box>
                  </Box>
                )}

                <div
                  className={clsx("grid gap-0 mt-4", {
                    "md:grid-cols-2 md:gap-6":
                      type === TwoFaType.Email || type === TwoFaType.Sms,
                  })}
                >
                  {expriesAt &&
                    (type === TwoFaType.Email || type === TwoFaType.Sms) && (
                      <Countdown
                        date={
                          Number(startDate.current) +
                          systemInfo?.porttoolsTokenResendDelta * 1000
                        }
                        renderer={renderer}
                        key={Math.random()}
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
                    <IntlMessages id="verify2FA.verify2FA" />
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

export default Verify2FA;
