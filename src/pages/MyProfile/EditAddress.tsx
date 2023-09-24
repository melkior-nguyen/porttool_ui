import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import IntlMessages from "../../helpers/IntlMessages";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import AppAnimate from "../../components/AppAnimate";
import AppTextField from "../../components/AppFormComponents/AppTextField";
import AppGridContainer from "../../components/AppGridContainer";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getCountryListSelector } from "@/store/auth/selectors";
import { useCallback, useEffect } from "react";
import {
  getCountryList,
  getUserInfoBilling,
  updateAccount,
} from "@/store/auth/action";
import { useDispatchResolve } from "@/utils/Hooks";
import { paths } from "@/routes/constants";

const EditAddress = ({ billing, handleClose }: any) => {
  const { messages } = useIntl();
  const dispatchResolve = useDispatchResolve();
  const countryList = useSelector(getCountryListSelector);

  useEffect(() => {
    dispatchResolve(getCountryList());
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(String(messages["validation.companyNameRequired"])),
    taxId: yup.string().required(String(messages["validation.taxIDRequired"])),
    phone: yup
      .string()
      .required(String(messages["validation.phoneNumberRequired"])),
    zipCode: yup
      .string()
      .required(String(messages["validation.zipCodeRequired"])),
    address: yup
      .string()
      .required(String(messages["validation.addressRequired"])),
    city: yup.string().required(String(messages["validation.cityRequired"])),
    state: yup.string().required(String(messages["validation.stateRequired"])),
    country: yup
      .string()
      .required(String(messages["validation.countryRequired"])),
  });

  const initialValues = billing
    ? {
        name: billing.name,
        taxId: billing.taxId,
        phone: billing.phone,
        zipCode: billing.zipCode,
        address: billing.address,
        city: billing.city,
        state: billing.state,
        country: billing.country,
      }
    : {
        name: "",
        taxId: "",
        phone: "",
        zipCode: "",
        address: "",
        city: "",
        state: "",
        country: "",
      };

  const handleUpdateAccount = useCallback((data: any, setSubmitting: any) => {
    const { name, taxId, phone, zipCode, address, city, state, country } = data;
    const variables = {
      billing: { name, taxId, phone, zipCode, address, city, state, country },
    };
    dispatchResolve(updateAccount(variables))
      .then(() => {
        setSubmitting(false);
        handleClose();
        dispatchResolve(getUserInfoBilling());
      })
      .catch(() => {
        setSubmitting(false);
      });
  }, []);

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
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
        <Box
          sx={{
            maxWidth: 1024,
            width: "100%",
            py: 2,
            paddingLeft: { xs: 8, md: 2 },
            overflow: "hidden",
          }}
        >
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              handleUpdateAccount(data, setSubmitting);
            }}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }) => (
              <Form noValidate autoComplete="off">
                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label="Company Name"
                        name="name"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                      <AppTextField
                        label="Tax ID"
                        name="taxId"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                </AppGridContainer>

                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                      <AppTextField
                        label="ZIP Code"
                        name="zipCode"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                </AppGridContainer>

                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label="Address"
                        name="address"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                      <AppTextField
                        label="City"
                        name="city"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                </AppGridContainer>

                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label="State"
                        name="state"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Country
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="country"
                          value={values.country}
                          label="Country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.country && touched.country)}
                          className="text-left"
                        >
                          {countryList &&
                            countryList.map((item: any, index: number) => (
                              <MenuItem key={index} value={item.name}>
                                {item.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.country && touched.country && (
                          <FormHelperText error>
                            {errors.country.toString()}
                          </FormHelperText>
                        )}
                      </FormControl>
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
                    <IntlMessages id="billing.saveAddress" />
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default EditAddress;
