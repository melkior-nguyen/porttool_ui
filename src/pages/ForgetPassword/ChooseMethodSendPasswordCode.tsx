import AppAnimate from "@/components/AppAnimate";
import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import Logo from "@/assets/images/port_tool_dark.png";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatchResolve } from "@/utils/Hooks";
import { get } from "lodash";
import { sendPasswordCode } from "@/store/auth/action";
import { TokenType } from "@/graphql/generated";
import { paths } from "@/routes/constants";

const ChooseMethodSendPasswordCode = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [value, setValue] = useState("");
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const fpToken = useMemo(() => new URLSearchParams(search), [search])?.get(
    "fpToken"
  );

  const handleSend2FA = useCallback(async () => {
    if (!value || !fpToken) return;
    setIsDisabledSubmit(true);
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      setIsDisabledSubmit(false);
      return;
    }
    const tokenCaptCha = await executeRecaptcha("SubmitForm");
    const variables = {
      recaptchaToken: tokenCaptCha,
      fpToken,
      type: value === "email" ? TokenType.Email : TokenType.Sms,
    };
    dispatchResolve(sendPasswordCode(variables))
      .then((res) => {
        const token = get(res, ["data", "sendPasswordCode", "token", "token"]);
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
        setIsDisabledSubmit(false);
      });
  }, [value, fpToken, dispatchResolve, navigate]);

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
              <IntlMessages id="chooseMethodSendPasswordCode.chooseMethodSendPasswordCode" />
            </Box>
          </Box>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={<IntlMessages id="chooseMethodSendPasswordCode.email" />}
              />

              <FormControlLabel
                value="sms"
                control={<Radio />}
                label={<IntlMessages id="userProfile.2FAtitleSMS" />}
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              fontWeight: Fonts.BOLD,
              textTransform: "capitalize",
              height: 44,
              mt: 6,
            }}
            disabled={isDisabledSubmit}
            type="button"
            onClick={handleSend2FA}
          >
            <IntlMessages id="button.next" />
          </Button>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ChooseMethodSendPasswordCode;
