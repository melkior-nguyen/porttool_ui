import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { Form, Formik } from "formik";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  ListItem,
  ListItemIcon,
  List,
} from "@mui/material";
import { useIntl } from "react-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getCountryListSelector,
  getUserInfoSelector,
} from "@/store/auth/selectors";
import {
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { alpha, styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Placeholder from "@/assets/images/placeholder_default.jpg";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import AvatarEditor from "react-avatar-editor";
import { FileUploader } from "react-drag-drop-files";
import { useDispatchResolve } from "@/utils/Hooks";
import { formatDate } from "@/utils/Utils";
import { Gender } from "@/graphql/generated";
import { Fonts } from "@/constants/AppEnums";
import AppGridContainer from "@/components/AppGridContainer";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import IntlMessages from "@/helpers/IntlMessages";
import { getCountryList, updateAccount } from "@/store/auth/action";
import { getUserInfo } from "@/store/auth/action";
import MyProfileWrapper from "../MyProfileWrapper";
import { CropRotateOutlined, ZoomInOutlined } from "@mui/icons-material";
import { FaUserCircle } from "react-icons/fa";

const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 42,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "flex",
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

const EditImageControl = styled("div")(() => {
  return {
    marginTop: "20px",
    display: "flex",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    "& .custom-range": {
      width: "100%",
      height: "10px",
      borderRadius: "5px",
      background: "#f0f0f0",
      appearance: "none",
      outline: "none",
      transition: "background 0.2s ease",
      marginLeft: "20px",
    },
  };
});

const currentDate = new Date();
const minYear = currentDate.getFullYear() - 80;
const maxYear = currentDate.getFullYear() - 16;

const minDate = new Date(
  minYear,
  currentDate.getMonth(),
  currentDate.getDate()
);
const maxDate = new Date(
  maxYear,
  currentDate.getMonth(),
  currentDate.getDate()
);

const startOfQ12022 = dayjs(minDate);
const endOfQ12022 = dayjs(maxDate);

const PersonalInfo = () => {
  const { messages } = useIntl();
  const dispatchResolve = useDispatchResolve();
  const userInfo = useSelector(getUserInfoSelector);

  const initialValues = {
    fullName: userInfo ? userInfo.fullName : "",
    username: userInfo ? userInfo.username : "",
    gender: userInfo ? userInfo.gender : "",
    address: userInfo ? userInfo.address?.address : "",
    zipCode: userInfo ? userInfo.address?.zipCode : "",
    city: userInfo ? userInfo.address?.city : "",
    state: userInfo ? userInfo.address?.state : "",
    country: userInfo ? userInfo.address?.country : "",
    photoURL: userInfo ? userInfo.avatar : Placeholder,
    dob: userInfo ? userInfo.dob : "",
  };

  const [selectedDate, setSelectedDate] = useState<any>("");
  const [selectedDateFormat, setSelectedDateFormat] = useState("");
  const [avatarFile, setAvatarFile] = useState<any>("");
  const [avatarFileBlob, setAvatarFileBlob] = useState(initialValues.photoURL);

  const [openModal, setOpenModal] = useState(false);
  const editorRef = useRef<any>(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChangeImage = (file: any) => {
    if (
      file &&
      fileTypes.some((type) => file.name.toUpperCase().endsWith(type))
    ) {
      setAvatarFileBlob(file);
    } else {
      console.log(
        "Invalid file type. Only JPG, PNG, and GIF files are allowed."
      );
    }
  };
  const handleSave = () => {
    if (editorRef.current) {
      try {
        const canvasScaled = editorRef.current.getImageScaledToCanvas();
        canvasScaled.setAttribute("crossOrigin", "anonymous");
        const editedImage = new Image();
        editedImage.src = canvasScaled.toDataURL();
        setAvatarFileBlob(editedImage.src);
        setAvatarFile(editedImage.src);
        setOpenModal(false);
      } catch (error) {
        console.error("Error processing and saving edited image:", error);
      }
    }
  };

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required(String(messages["validation.fullNameRequired"])),
    dob: yup.string().required(String(messages["validation.nameRequired"])),
    address: yup
      .string()
      .required(String(messages["validation.addressRequired"])),
    gender: yup
      .string()
      .required(String(messages["validation.genderRequired"])),
    zipCode: yup
      .string()
      .required(String(messages["validation.addressRequired"])),
    city: yup.string().required(String(messages["validation.addressRequired"])),
    state: yup
      .string()
      .required(String(messages["validation.addressRequired"])),
    country: yup
      .string()
      .required(String(messages["validation.countryRequired"])),
  });

  useEffect(() => {
    if (initialValues.dob) {
      setSelectedDate(dayjs(initialValues.dob));
      setSelectedDateFormat(formatDate(new Date(initialValues.dob)));
    }
    if (initialValues.photoURL) {
      setAvatarFileBlob(initialValues.photoURL);
    }
  }, [userInfo]);

  const [error, setError] = useState<DateValidationError | null>(null);
  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date of birth between 16 and 80 years ago.";
      }
      case "invalidDate": {
        return "Your date is not valid";
      }
      default: {
        return "";
      }
    }
  }, [error]);

  const countryList = useSelector(getCountryListSelector);

  useEffect(() => {
    dispatchResolve(getCountryList());
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setAvatarFile(acceptedFiles[0]);
      setAvatarFileBlob(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleUpdateAccount = useCallback(
    (data: any, setSubmitting: any) => {
      const {
        fullName,
        username,
        gender,
        address,
        zipCode,
        city,
        state,
        country,
      } = data;

      const variables = {
        fullName,
        username,
        ...(selectedDateFormat ? { dob: selectedDateFormat } : {}),
        gender,
        address: {
          address,
          zipCode,
          city,
          state,
          country,
        },
        twoFaViaEmail: true,
        ...(avatarFile ? { avatarBase64: avatarFile } : {}),
      };
      dispatchResolve(updateAccount(variables))
        .then(() => {
          dispatchResolve(getUserInfo());
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [selectedDateFormat, avatarFile]
  );

  return (
    <>
      <MyProfileWrapper>
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(data, { setSubmitting }) => {
            if (avatarFile) {
              setAvatarFile(avatarFile);
            }
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
            setFieldValue,
          }) => {
            return (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: { xs: 5, lg: 6 },
                  }}
                >
                  <AvatarViewWrapper
                    {...getRootProps({ className: "dropzone" })}
                    onClick={handleClickOpen}
                  >
                    <input {...getInputProps()} />
                    <label htmlFor="icon-button-file">
                      <Avatar
                        sx={{
                          width: { xs: 64, lg: 80 },
                          height: { xs: 64, lg: 80 },
                          border: "1px solid rgb(204, 204, 204)",
                          cursor: "pointer",
                        }}
                        src={avatarFileBlob}
                      />
                      <Box className="edit-icon">
                        <EditIcon />
                      </Box>
                    </label>
                  </AvatarViewWrapper>
                  <Dialog open={openModal} onClose={handleClose}>
                    <DialogTitle
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Edit Avatar
                      <FaUserCircle
                        style={{
                          fontSize: "2rem",
                          marginBottom: "5px",
                          marginLeft: "10px",
                          // backgroundColor: "#1976d2",
                          color: "#1976d2",
                        }}
                      />
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon
                        sx={{
                          color: (theme) => theme.palette.grey[500],
                        }}
                      />
                    </IconButton>
                    <DialogContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "500px", // Set the desired width
                      }}
                    >
                      <FileUploader
                        handleChange={handleChangeImage}
                        name="file"
                        accept="image/*"
                        types={fileTypes}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f0f0f0",
                          padding: "20px",
                          borderRadius: "8px",
                          marginBottom: "24px",
                        }}
                      />
                      {avatarFileBlob && (
                        <div
                          style={{
                            position: "relative",
                            width: "250px",
                            height: "250px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "4px solid #ccc",
                            marginTop: "24px",
                          }}
                        >
                          <AvatarEditor
                            crossOrigin="anonymous"
                            ref={editorRef}
                            image={avatarFileBlob}
                            width={258}
                            height={258}
                            border={0}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={scale}
                            rotate={rotate}
                            className="avatar-editor"
                            style={{
                              position: "absolute",
                              top: "-4px",
                              left: "-4px", // Compensate for the border width
                            }}
                          />
                        </div>
                      )}
                      <EditImageControl
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          width: "80%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ZoomInOutlined
                          style={{
                            color: "#1976d2",
                            fontSize: "2rem",
                          }}
                        />
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="0.01"
                          value={scale}
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                          className="custom-range"
                        />
                      </EditImageControl>
                      <EditImageControl style={{ marginTop: "10px" }}>
                        <CropRotateOutlined
                          style={{
                            color: "#1976d2",
                            fontSize: "2rem",
                          }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="1"
                          value={rotate}
                          onChange={(e) =>
                            setRotate(parseFloat(e.target.value))
                          }
                          className="custom-range"
                        />
                      </EditImageControl>

                      {/* </AvatarEditor> */}
                    </DialogContent>
                    <DialogActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{ minWidth: "100px", marginRight: "20px" }}
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{ minWidth: "100px" }}
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Box
                    sx={{
                      ml: 4,
                    }}
                  >
                    <List
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItem
                        sx={{
                          py: 0.5,
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <Typography
                          sx={{
                            fontWeight: Fonts.MEDIUM,
                            textAlign: "left",
                          }}
                        >
                          {values?.fullName}{" "}
                          <span
                            style={{
                              fontWeight: Fonts.REGULAR,
                              color: "gray",
                            }}
                          >
                            ({values?.username})
                          </span>
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{
                          py: 0.5,
                        }}
                      >
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <Typography
                          sx={{
                            textAlign: "left",
                            color: (theme) => theme.palette.text.secondary,
                          }}
                        >
                          {userInfo?.email}
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Box>

                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label={<IntlMessages id="personalInfo.fullName" />}
                        name="fullName"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                      <AppTextField
                        label={<IntlMessages id="personalInfo.userName" />}
                        name="username"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                </AppGridContainer>

                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          sx={{ textAlign: "left" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="gender"
                          value={values.gender}
                          label="Gender"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.gender && touched.gender)}
                        >
                          {(Object.keys(Gender) as (keyof typeof Gender)[]).map(
                            (key, index) => (
                              <MenuItem key={index} value={Gender[key]}>
                                {Object.keys(Gender)[index]}
                              </MenuItem>
                            )
                          )}
                        </Select>
                        {errors.gender && touched.gender && (
                          <FormHelperText error>
                            {errors.gender.toString()}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box sx={{ mb: 1, ml: { xs: 0, md: 1 } }}>
                        <DatePicker
                          sx={{
                            width: "100%",
                          }}
                          value={selectedDate}
                          onChange={(event: any) => {
                            setSelectedDate(event);
                            setSelectedDateFormat(formatDate(new Date(event)));
                            setFieldValue("dob", formatDate(new Date(event)));
                          }}
                          format="YYYY-MM-DD"
                          onError={(newError) => setError(newError)}
                          slotProps={{
                            textField: {
                              helperText: errorMessage,
                            },
                          }}
                          minDate={startOfQ12022}
                          maxDate={endOfQ12022}
                        />
                      </Box>
                    </LocalizationProvider>

                    {!values.dob && (
                      <Box
                        sx={{
                          color: "rgb(211, 47, 47)",
                          textAlign: "left",
                          fontSize: 12,
                          mb: 1,
                          mx: "14px",
                        }}
                      >
                        Please enter day of birth!
                      </Box>
                    )}

                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        textAlign: "left",
                        fontSize: 14,
                      }}
                    >
                      ***
                      <IntlMessages id="personalInfo.fieldIsImportant" />
                    </Box>
                  </Grid>
                </AppGridContainer>

                <AppGridContainer>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label={<IntlMessages id="personalInfo.address" />}
                        name="address"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: { xs: 3, xl: 4 }, ml: { xs: 0, md: 1 } }}>
                      <AppTextField
                        label={<IntlMessages id="personalInfo.zipCode" />}
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
                        label={<IntlMessages id="personalInfo.city" />}
                        name="city"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        ml: { xs: 0, md: 1 },
                      }}
                    >
                      <AppTextField
                        label={<IntlMessages id="personalInfo.state" />}
                        name="state"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                    disabled={isSubmitting}
                    sx={{
                      width: "200px",
                      fontWeight: Fonts.BOLD,
                      textTransform: "capitalize",
                      height: 44,
                    }}
                    type="submit"
                  >
                    <IntlMessages id="personalInfo.updateAccount" />
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </MyProfileWrapper>
    </>
  );
};

export default PersonalInfo;
