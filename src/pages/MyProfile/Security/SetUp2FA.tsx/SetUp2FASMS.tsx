import AppTextField from "@/components/AppFormComponents/AppTextField";
import AppLoader from "@/components/AppLoader";
import RendererResendOTP from "@/components/RendererResendOTP";
import { Fonts } from "@/constants/AppEnums";
import { OtpType } from "@/graphql/generated";
import IntlMessages from "@/helpers/IntlMessages";
import { verifyOTPMobile } from "@/store/auth/action";
import { sendOTPMobile } from "@/store/auth/action";
import { useDispatchResolve } from "@/utils/Hooks";
import { Box, Button, Card } from "@mui/material";
import { Form, Formik } from "formik";
import { get } from "lodash";
import { useCallback, useState } from "react";
import Countdown from "react-countdown";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useIntl } from "react-intl";
import OTPInput from "react-otp-input";
import * as yup from "yup";

const SetUp2FASMS = ({
  otpToken,
  handleCloseSetUp2FA,
  setCheckedSMS,
}: {
  otpToken: string;
  handleCloseSetUp2FA: any;
  setCheckedSMS: any;
}) => {
  const { messages } = useIntl();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileCurrent, setMobileCurrent] = useState(false);
  const [tokenMobile, setTokenMobile] = useState("");
  const [expriesAtCurrent, setExpriesAtCurrent] = useState<any>();
  const [isDisabledResend, setIsDisabledResend] = useState(false);
  const dispatchResolve = useDispatchResolve();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validationSchema = yup.object({
    mobile: yup.string().required(String(messages["validation.nameRequired"])),
  });

  const handleSendOTPMobile = useCallback(
    async (data: any, setSubmitting: any) => {
      if (!data) return;
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const token = await executeRecaptcha("SubmitForm");
      const { mobile } = data;
      if (mobile) setMobileCurrent(mobile);
      const variables = {
        recaptchaToken: token,
        otpToken: otpToken,
        mobile: mobile || mobileCurrent,
        otpType: OtpType.Sms,
      };
      setLoading(true);
      setIsDisabledResend(true);
      dispatchResolve(sendOTPMobile(variables))
        .then((res) => {
          setIsDisabledResend(false);
          const token = get(res, ["data", "sendOtpMobile", "token", "token"]);
          const expriesAt = get(res, [
            "data",
            "sendOtpMobile",
            "token",
            "expriesAt",
          ]);
          setExpriesAtCurrent(expriesAt);
          setLoading(false);
          setTokenMobile(token);
        })
        .catch(() => {
          setLoading(false);
          setSubmitting(false);
        });
    },
    [otpToken, dispatchResolve, mobileCurrent]
  );

  const renderer = useCallback(
    ({ minutes, seconds, completed }: any) => {
      return (
        <RendererResendOTP
          minutes={minutes}
          seconds={seconds}
          completed={completed}
          resendOTP={handleSendOTPMobile}
          isDisabledResend={isDisabledResend}
        />
      );
    },
    [isDisabledResend, handleSendOTPMobile]
  );

  const handleVerifyOTP = useCallback(() => {
    if (otp.length < 6) return;
    const variables = {
      code: otp,
      token: tokenMobile,
    };
    dispatchResolve(verifyOTPMobile(variables)).then(() => {
      handleCloseSetUp2FA();
      setCheckedSMS(true);
    });
  }, [otp, tokenMobile, dispatchResolve, handleCloseSetUp2FA, setCheckedSMS]);

  return (
    <>
      {loading && <AppLoader />}
      <Box
        sx={{
          pb: 2,
          py: 2,
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
          <Box
            sx={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 400,
              width: "100%",
            }}
          >
            {tokenMobile ? (
              <>
                <OTPInput
                  containerStyle="justify-between"
                  inputStyle="block w-full text-base font-bold focus:outline-none text-[#666] form-input leading-5 focus:border-primary dark:border-gray-600 focus:shadow-outline-gray dark:focus:border-gray-600 dark:focus:shadow-outline-gray border border-gray-400 rounded !w-14 !h-14"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  shouldAutoFocus
                />
                <div className="grid gap-0 md:grid-cols-2 md:gap-6 mt-4">
                  {expriesAtCurrent && (
                    <Countdown
                      date={Number(expriesAtCurrent) * 1000}
                      renderer={renderer}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={otp.length < 6}
                    sx={{
                      width: "100%",
                      height: 44,
                    }}
                    type="button"
                    onClick={handleVerifyOTP}
                  >
                    <IntlMessages id="setUp2FA.setUp2FASMS.verify" />
                  </Button>
                </div>
              </>
            ) : (
              <Formik
                validateOnChange={true}
                initialValues={{ code: "" }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  handleSendOTPMobile(data, setSubmitting);
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
                        name="mobile"
                        label="Enter Your Mobile"
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
                      <IntlMessages id="setUp2FA.setUp2FASMS.verify2FA" />
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default SetUp2FASMS;
