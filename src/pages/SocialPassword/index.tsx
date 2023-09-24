import * as yup from "yup";
import IntlMessages from "@/helpers/IntlMessages";
import Logo from "@/assets/images/port_tool_dark.png";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, IconButton, InputAdornment } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import AppLoader from "@/components/AppLoader";
import { useDispatchResolve } from "@/utils/Hooks";
import { getUserInfo } from "@/store/auth/action";

const MUTATION_SET_PASS_SOCIAL = gql`
  mutation SetPassSocial($update: SocialPasswordUpdateInput!) {
    setPassSocial(update: $update) {
      ok
      token
      refreshToken
      message
      payload
      user {
        ... on AccountObjectType {
          id
        }
      }
    }
  }
`;

const SocialPassword = ({ closeSocialPassword }: any) => {
  const { messages } = useIntl();
  const dispatchResolve = useDispatchResolve();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);

  const [mutationSetPassSocial] = useMutation(MUTATION_SET_PASS_SOCIAL, {
    onError(err) {
      toast(err?.message, { type: "error" });
    },
    onCompleted(data) {
      data && toast("Request successfully", { type: "success" });
      dispatchResolve(getUserInfo()).then(() => {
        closeSocialPassword();
      });
    },
  });

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
    password: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
    confirmPassword: yup
      .string()
      .required(String(messages["validation.reTypePassword"]))
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

  const handleSocialPassword = useCallback(
    async (data: any, setSubmitting: any) => {
      const variables = {
        update: {
          password: data.password,
        },
      };
      setLoading(true);
      setSubmitting(true);
      await mutationSetPassSocial({
        variables,
      });
      setLoading(false);
      setSubmitting(false);
    },
    [mutationSetPassSocial]
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
          {" "}
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
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              Enter Password
            </Box>
          </Box>
          <Formik
            validateOnChange={true}
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              handleSocialPassword(data, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ mb: 4 }}>
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
                    label={<IntlMessages id="social.password" />}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
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
                    label={<IntlMessages id="social.retypePassword" />}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    height: 44,
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </>
  );
};

export default SocialPassword;
