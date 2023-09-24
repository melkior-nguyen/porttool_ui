import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Logo from "@/assets/images/port_tool_dark.png";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TwoFaType } from "@/graphql/generated";
import { send2FA } from "@/store/auth/action";
import { get } from "lodash";
import { paths } from "@/routes/constants";
import { toast } from "react-toastify";
import { getSystemInfoSelector } from "@/store/auth/selectors";
import { useSelector } from "react-redux";
import { useDispatchResolve } from "@/utils/Hooks";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import Countdown from "react-countdown";

const ChooseMethod2FA = () => {
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const { search } = useLocation();
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
  const [isDisabledChooseMethod, setIsDisabledChooseMethod] = useState(true);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const timeOutIDRef = useRef<any>(null);
  const intervalIDIsDisabledChooseMethodRef = useRef<any>(false);
  const systemInfo = useSelector(getSystemInfoSelector);

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const token = searchParams.get("token");
  const faToken = searchParams.get("faToken");
  const expriesAt = searchParams.get("expriesAt");
  const faTokenExpriesAt = searchParams.get("faTokenExpriesAt");

  const type = searchParams.get("type");
  const twoFaViaTotp = searchParams.get("twoFaViaTotp");
  const twoFaViaMobile = searchParams.get("twoFaViaMobile");

  const [method2FA, setMethod2FA] = useState(type ?? "");

  // Check direct to login when faTokenExpriesAt is expired.
  useEffect(() => {
    if (
      faTokenExpriesAt &&
      Number(faTokenExpriesAt) * 1000 < Number(new Date())
    ) {
      timeOutIDRef.current = setTimeout(() => {
        toast("FA Token is exprired", { type: "error" });
        navigate(paths.signin);
      }, Number(new Date()) - Number(faTokenExpriesAt) * 1000);
    }
    return () => {
      if (timeOutIDRef.current) clearTimeout(timeOutIDRef.current);
    };
  }, [faTokenExpriesAt, navigate]);

  // Check to not press button 2 times too fast
  useEffect(() => {
    intervalIDIsDisabledChooseMethodRef.current = setInterval(() => {
      if (
        (Number(expriesAt) - systemInfo.porttoolsTokenResendDelta * 4) * 1000 >
          Date.now() &&
        type !== method2FA
      ) {
        setIsDisabledChooseMethod(true);
      } else {
        setIsDisabledChooseMethod(false);
        if (intervalIDIsDisabledChooseMethodRef.current)
          clearInterval(intervalIDIsDisabledChooseMethodRef.current);
      }
    }, 200);
    return () => {
      if (intervalIDIsDisabledChooseMethodRef.current)
        clearInterval(intervalIDIsDisabledChooseMethodRef.current);
    };
  }, [expriesAt, systemInfo, type, method2FA]);

  const handleChange = useCallback((event: any) => {
    setMethod2FA(event.target.value);
  }, []);

  const renderer = useCallback(({ minutes, seconds, completed }: any) => {
    if (completed) return;
    return (
      <div>
        <Box
          sx={{
            fontSize: 14,
            mb: 2,
            color: "#d32f2f",
          }}
        >
          <span className="font-bold">
            ({minutes}:{seconds})
          </span>
          <IntlMessages id="chooseMethod2FA.2falimited" />
        </Box>
      </div>
    );
  }, []);

  const handleSend2FA = useCallback(async () => {
    if (!method2FA || !faToken) return;
    setIsDisabledSubmit(true);
    if (!executeRecaptcha) {
      console.error("executeRecaptcha is not defined");
      setIsDisabledSubmit(false);
      return;
    }
    try {
      const tokenCaptcha = await executeRecaptcha("SubmitForm");
      // If called send 2FA for Authenticator if call again just direct to 2FA page whit old params (token, expriesAt)
      if (
        (expriesAt && method2FA === TwoFaType.Totp) ||
        ((Number(expriesAt) - systemInfo.porttoolsTokenResendDelta * 4) * 1000 >
          Date.now() &&
          type === method2FA)
      ) {
        setIsDisabledSubmit(false);
        let path = `${paths.verify2FA}?token=${token}&faToken=${faToken}&expriesAt=${expriesAt}&faTokenExpriesAt=${faTokenExpriesAt}&type=${method2FA}`;
        if (twoFaViaTotp) path = path.concat(`&twoFaViaTotp=true`);
        if (twoFaViaMobile) path = path.concat(`&twoFaViaMobile=true`);
        navigate(path);
      } else {
        const variables2FA = {
          recaptchaToken: tokenCaptcha,
          faToken,
          type:
            method2FA === TwoFaType.Email
              ? TwoFaType.Email
              : method2FA === TwoFaType.Totp
              ? TwoFaType.Totp
              : TwoFaType.Sms,
        };
        dispatchResolve(send2FA(variables2FA))
          .then((res) => {
            setIsDisabledSubmit(false);
            const token2FA = get(res, ["data", "send2fa", "token", "token"]);
            const expriesAt2FA = get(res, [
              "data",
              "send2fa",
              "token",
              "expriesAt",
            ]);
            let path = `${paths.verify2FA}?token=${token2FA}&faToken=${faToken}&expriesAt=${expriesAt2FA}&faTokenExpriesAt=${faTokenExpriesAt}&type=${variables2FA.type}`;
            if (twoFaViaTotp) path = path.concat(`&twoFaViaTotp=true`);
            if (twoFaViaMobile) path = path.concat(`&twoFaViaMobile=true`);
            navigate(path);
          })
          .catch((error) => {
            setIsDisabledSubmit(false);
            if (
              error ===
                "The sender 2FA token provided is expired. Please sign in again." ||
              error ===
                "The sender 2FA token FA provided is invalid or does not existed."
            )
              navigate(paths.signin);
          });
      }
    } catch (error) {
      setIsDisabledSubmit(false);
      // Handle the error as needed
      console.error("An error occurred:", error);
    }
  }, [
    method2FA,
    token,
    faToken,
    expriesAt,
    faTokenExpriesAt,
    type,
    twoFaViaTotp,
    twoFaViaMobile,
    systemInfo,
    dispatchResolve,
    navigate,
    executeRecaptcha,
  ]);

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
            <IntlMessages id="chooseMethod2FA.chooseMethod2FA" />
          </Box>
        </Box>

        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="controlled-radio-buttons-group"
            value={method2FA}
            onChange={handleChange}
            sx={{ mb: 4 }}
          >
            <FormControlLabel
              value={TwoFaType.Email}
              control={<Radio />}
              label={<IntlMessages id="chooseMethod2FA.emailVerification" />}
            />
            <Box
              sx={{
                textAlign: "left",
                fontSize: 12,
                mb: 2,
              }}
            >
              <IntlMessages id="chooseMethod2FA.emailVerificationDes" />
            </Box>

            {twoFaViaTotp && (
              <>
                <FormControlLabel
                  value={TwoFaType.Totp}
                  control={<Radio />}
                  label={<IntlMessages id="userProfile.authenticatorApp" />}
                />
                <Box
                  sx={{
                    textAlign: "left",
                    fontSize: 12,
                    mb: 2,
                  }}
                >
                  <IntlMessages id="chooseMethod2FA.authenticatorApp" />
                </Box>
              </>
            )}

            {twoFaViaMobile && (
              <FormControlLabel
                value={TwoFaType.Sms}
                control={<Radio />}
                label={<IntlMessages id="userProfile.codeByTextSMS" />}
              />
            )}
          </RadioGroup>
        </FormControl>

        {isDisabledChooseMethod && method2FA !== TwoFaType.Totp && (
          <Countdown
            date={
              (Number(expriesAt) - systemInfo.porttoolsTokenResendDelta * 4) *
              1000
            }
            renderer={renderer}
            key={Math.random()}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            fontWeight: Fonts.BOLD,
            textTransform: "capitalize",
            height: 44,
          }}
          disabled={
            (isDisabledSubmit || isDisabledChooseMethod) &&
            method2FA !== TwoFaType.Totp
          }
          type="button"
          onClick={handleSend2FA}
        >
          <IntlMessages id="button.next" />
        </Button>
      </Card>
    </Box>
  );
};

export default ChooseMethod2FA;
