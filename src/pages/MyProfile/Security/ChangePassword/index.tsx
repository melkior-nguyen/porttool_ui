import { Box } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  newPassword: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
});

const ChangePassword = () => {
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={true}
      initialValues={{
        oldPassword: "",
        newPassword: "",
        retypeNewPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log("data: ", data);
        setSubmitting(false);
      }}
    >
      {() => <ChangePasswordForm />}
    </Formik>
  );
};

export default ChangePassword;
