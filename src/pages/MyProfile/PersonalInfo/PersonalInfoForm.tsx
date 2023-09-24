import React from "react";
import {
  alpha,
  Box,
  Button,
  Typography,
  Avatar,
  styled,
  Grid,
} from "@mui/material";
import { Form } from "formik";
import AppGridContainer from "../../../components/AppGridContainer";
import IntlMessages from "../../../helpers/IntlMessages";
import AppTextField from "../../../components/AppFormComponents/AppTextField";
import { Fonts } from "../../../constants/AppEnums";

type PersonalInfoFormProps = {
  setFieldValue: (field: string, data: any) => void;
  values: any;
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ values }) => {
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
        <IntlMessages id="personalInfo.form.personalInfo" />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 5, lg: 6 },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 50, lg: 64 },
            height: { xs: 50, lg: 64 },
            border: "1px solid rgb(204, 204, 204)",
            cursor: "pointer",
          }}
          src={values.photoURL}
        />
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
            label={<IntlMessages id="personalInfo.form.fullName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            fullWidth
            name="username"
            label={<IntlMessages id="personalInfo.form.userName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="email"
            fullWidth
            label={<IntlMessages id="personalInfo.form.email" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="company"
            fullWidth
            label={<IntlMessages id="personalInfo.form.company" />}
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
              <IntlMessages id="personalInfo.form.saveChanges" />
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
              <IntlMessages id="personalInfo.form.cancel" />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default PersonalInfoForm;
