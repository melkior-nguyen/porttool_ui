import { Box } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import Placeholder from "@/assets/images/placeholder_default.jpg";
import { useCallback } from "react";
import { useDispatchResolve } from "@/utils/Hooks";
import { updateAccount } from "@/store/auth/action";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
});

const PersonalInfo = () => {
  const dispatchResolve = useDispatchResolve();

  const handleUpdateAccount = useCallback(
    (data: any, setSubmitting: any) => {
      const { file } = data;
      const variables = {
        avatar: file,
      };
      dispatchResolve(updateAccount(variables))
        .then((data) => {
          console.log("data: ", data);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [dispatchResolve]
  );

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          displayName: "",
          username: "",
          email: "",
          company: "",
          photoURL: Placeholder,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("data: ", data);
          //TODO Api Call here to save user info
          handleUpdateAccount(data, setSubmitting);
          // setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
          );
        }}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;
