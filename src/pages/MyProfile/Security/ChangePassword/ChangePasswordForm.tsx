import AppCard from "@/components/AppCard";
import AppGridContainer from "@/components/AppGridContainer";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import IntlMessages from "@/helpers/IntlMessages";
import * as yup from "yup";
import React, { useCallback } from "react";
import { Box, Button, Grid, InputAdornment, IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useIntl } from "react-intl";
import { useDispatchResolve } from "@/utils/Hooks";
import { updateAccount } from "@/store/auth/action";
import { Fonts } from "@/constants/AppEnums";

const ChangePasswordForm = () => {
  const { messages } = useIntl();
  const dispatchResolve = useDispatchResolve();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] =
    React.useState(false);

  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
    newPassword: yup
      .string()
      .required(String(messages["validation.passwordRequired"])),
    retypeNewPassword: yup
      .string()
      .required(String(messages["validation.reTypePassword"]))
      .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const onShowOldPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDownOldPassword = (event: any) => {
    event.preventDefault();
  };

  const onShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const onDownNewPassword = (event: any) => {
    event.preventDefault();
  };

  const onShowRetypeNewPassword = () => {
    setShowRetypeNewPassword(!showRetypeNewPassword);
  };

  const onDownRetypeNewPassword = (event: any) => {
    event.preventDefault();
  };

  const handleChangePassword = useCallback(
    async (data: any, setSubmitting: any, resetForm: any) => {
      const { oldPassword, newPassword: password } = data;
      const variables = { oldPassword, password };
      dispatchResolve(updateAccount(variables))
        .then(() => {
          setSubmitting(false);
          resetForm();
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    []
  );

  return (
    <>
      <AppGridContainer>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
            <IntlMessages id="changePasswordForm.changePassword" />
          </Box>
          <Box sx={{ fontSize: 14 }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                oldPassword: "",
                newPassword: "",
                retypeNewPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setErrors, setSubmitting, resetForm }) => {
                if (data.newPassword !== data.retypeNewPassword) {
                  setErrors({
                    retypeNewPassword: messages[
                      "validation.passwordMisMatch"
                    ] as string,
                  });
                }
                handleChangePassword(data, setSubmitting, resetForm);
              }}
            >
              {({ isSubmitting }) => (
                <Form noValidate autoComplete="off">
                  <AppGridContainer>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                        <AppTextField
                          sx={{ width: "100%" }}
                          type={showPassword ? "text" : "password"}
                          name="oldPassword"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={onShowOldPassword}
                                  onMouseDown={onDownOldPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <BsEyeFill />
                                  ) : (
                                    <BsEyeSlashFill />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          label={<IntlMessages id="changePasswordForm.oldPassword" />}
                        />
                      </Box>
                    </Grid>
                  </AppGridContainer>
                  <AppGridContainer>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                        <AppTextField
                          sx={{ width: "100%" }}
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
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
                                    <BsEyeFill />
                                  ) : (
                                    <BsEyeSlashFill />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          label={<IntlMessages id="changePasswordForm.newPassword" />}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                        <AppTextField
                          sx={{ width: "100%" }}
                          type={showRetypeNewPassword ? "text" : "password"}
                          name="retypeNewPassword"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={onShowRetypeNewPassword}
                                  onMouseDown={onDownRetypeNewPassword}
                                  edge="end"
                                >
                                  {showRetypeNewPassword ? (
                                    <BsEyeFill />
                                  ) : (
                                    <BsEyeSlashFill />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          label={<IntlMessages id="changePasswordForm.retypeNewPassword" />}
                        />
                      </Box>
                    </Grid>
                  </AppGridContainer>

                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        width: "200px",
                        fontWeight: 700,
                        textTransform: "capitalize",
                        height: 44,
                      }}
                    >
                      <IntlMessages id="changePasswordForm.saveChanges" />
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </AppGridContainer>
    </>
  );
};

export default ChangePasswordForm;
