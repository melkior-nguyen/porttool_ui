import { Fonts } from "@/constants/AppEnums";
import IntlMessages from "@/helpers/IntlMessages";
import { Button } from "@mui/material";

const RendererResendOTP = ({ minutes, seconds, completed, resendOTP }: any) => {
  return (
    <>
      {completed ? (
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            fontWeight: Fonts.BOLD,
            textTransform: "capitalize",
            height: 44,
          }}
          type="button"
          onClick={resendOTP}
        >
          <IntlMessages id="rendererResendOTP.resend" />
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            fontWeight: Fonts.BOLD,
            textTransform: "capitalize",
            height: 44,
          }}
          type="button"
          disabled={true}
        >
          <IntlMessages id="rendererResendOTP.resend" />
          <span className="ml-2 text-black">
            ({minutes}:{seconds})
          </span>
        </Button>
      )}
    </>
  );
};

export default RendererResendOTP;
