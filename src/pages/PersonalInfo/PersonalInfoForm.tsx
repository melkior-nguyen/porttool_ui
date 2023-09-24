import { styled } from "@mui/material/styles";
import { alpha, Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import IntlMessages from "@/helpers/IntlMessages";
import { Fonts } from "@/constants/AppEnums";
import EditIcon from "@mui/icons-material/Edit";
import AppGridContainer from "@/components/AppGridContainer";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import { Form } from "formik";

const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      cursor: "pointer",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },
    "&.dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex",
      },
    },
  };
});

type PersonalInfoFormProps = {
  setFieldValue: (field: string, data: any) => void;
  values: any;
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  values,
  setFieldValue,
}: any) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue("photoURL", URL.createObjectURL(acceptedFiles[0]));
      setFieldValue("file", acceptedFiles[0]);
    },
  });

  return (
    <Form noValidate autoComplete="off">
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id="personalInfoForm.personalInfo" />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 5, lg: 6 },
        }}
      >dadad
        <AvatarViewWrapper {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <label htmlFor="icon-button-file">
            <Avatar
              sx={{
                width: { xs: 50, lg: 64 },
                height: { xs: 50, lg: 64 },
                border: "1px solid rgb(204, 204, 204)",
                cursor: "pointer",
              }}
              src={values.photoURL}
            />
            <Box className="edit-icon">
              <EditIcon />
            </Box>
          </label>
        </AvatarViewWrapper>
        <Box
          sx={{
            ml: 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {values.displayName}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {values.email}
          </Typography>
        </Box>
      </Box>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="displayName"
            fullWidth
            label={<IntlMessages id="personalInfoForm.fullName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            fullWidth
            name="username"
            label={<IntlMessages id="personalInfoForm.userName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="email"
            fullWidth
            label={<IntlMessages id="personalInfoForm.email" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="company"
            fullWidth
            label={<IntlMessages id="personalInfoForm.company" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                position: "relative",
                minWidth: 100,
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              <IntlMessages id="personalInfoForm.saveChanges" />
            </Button>
            <Button
              sx={{
                position: "relative",
                minWidth: 100,
                ml: 2.5,
              }}
              color="primary"
              variant="outlined"
            >
              <IntlMessages id="personalInfoForm.cancel" />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default PersonalInfoForm;
