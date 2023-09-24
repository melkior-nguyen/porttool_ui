import AppLoader from "@/components/AppLoader";
import RendererResendOTP from "@/components/RendererResendOTP";
import IntlMessages from "@/helpers/IntlMessages";
import { activateTotp, verifyTotp } from "@/store/auth/action";
import { useDispatchResolve } from "@/utils/Hooks";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import { Box, Button, Card } from "@mui/material";
import { get } from "lodash";
import { useCallback, useState } from "react";
import Countdown from "react-countdown";
import OTPInput from "react-otp-input";
import QRCode from "react-qr-code";

const SetUp2FAAuthenticatorApp = ({
  token,
  otpauth,
  otpToken,
  expriesAt,
  handleCloseSetUp2FA,
  setCheckedAuthencatorApp,
}: {
  token: string;
  otpauth: string;
  otpToken: string;
  expriesAt: number;
  handleCloseSetUp2FA: any;
  setCheckedAuthencatorApp: any;
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabledResend, setIsDisabledResend] = useState(false);
  const [expriesAtCurrent, setExpriesAtCurrent] = useState<any>(expriesAt);
  const dispatchResolve = useDispatchResolve();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const resendOTP = useCallback(async () => {
    if(!executeRecaptcha){
      console.log("Execute recaptcha not yet available");
      return;
    }
    const tokenCaptCha = await executeRecaptcha("SubmitForm");
    const variables = {
      recaptchaToken: tokenCaptCha,
      otpToken,
    };
    setLoading(true);
    setIsDisabledResend(true);
    dispatchResolve(activateTotp(variables))
      .then((res: any) => {
        const expriesAt = get(res, [
          "data",
          "activateTotp",
          "token",
          "expriesAt",
        ]);
        setExpriesAtCurrent(expriesAt);
        setLoading(false);
        setIsDisabledResend(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatchResolve, otpToken]);

  const renderer = useCallback(
    ({ minutes, seconds, completed }: any) => {
      return (
        <RendererResendOTP
          minutes={minutes}
          seconds={seconds}
          completed={completed}
          resendOTP={resendOTP}
          isDisabledResend={isDisabledResend}
        />
      );
    },
    [isDisabledResend, resendOTP]
  );

  const handleVerifyOTP = useCallback(() => {
    if (otp.length < 6) return;
    const variables = {
      code: otp,
      token,
    };
    dispatchResolve(verifyTotp(variables)).then(() => {
      handleCloseSetUp2FA();
      setCheckedAuthencatorApp(true);
    });
  }, [
    otp,
    dispatchResolve,
    handleCloseSetUp2FA,
    setCheckedAuthencatorApp,
    token,
  ]);

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
            {otpauth && (
              <>
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    width: 256,
                    margin: "0 auto",
                    marginBottom: 32,
                  }}
                  value={otpauth}
                  viewBox={`0 0 256 256`}
                />
                <OTPInput
                  containerStyle="justify-between"
                  inputStyle="block w-full text-base font-bold focus:outline-none text-[#666] form-input leading-5 focus:border-primary dark:border-gray-600 focus:shadow-outline-gray dark:focus:border-gray-600 dark:focus:shadow-outline-gray border border-gray-400 rounded !w-14 !h-14"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  shouldAutoFocus
                />
              </>
            )}

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
                <IntlMessages id="setUp2FA.setUp2FAAuthenticatorApp.verify" />
              </Button>
            </div>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default SetUp2FAAuthenticatorApp;
