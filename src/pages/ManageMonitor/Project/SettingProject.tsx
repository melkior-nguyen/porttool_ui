import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  createOrUpdateProject,
  deleteProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";
import { FaUserCircle } from "react-icons/fa";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AddMember from "./AddMember";
import AppLoader from "@/components/AppLoader";
import DynamicForm from "@/components/DynamicForm";
import DeleteIcon from "@mui/icons-material/Delete";
import Placeholder from "@/assets/images/placeholder_default.jpg";
import AppGridContainer from "@/components/AppGridContainer";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AccountTabsWrapper from "@/pages/MyProfile/AccountTabsWrapper";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DialogConfirmDelete from "@/components/DialogConfirmDelete/DialogConfirmDelete";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { clone } from "lodash";
import { useSelector } from "react-redux";
import { newFarmData } from "./newFarmData";
import { Fonts } from "@/constants/AppEnums";
import { alpha, styled } from "@mui/material/styles";
import { useDispatchResolve } from "@/utils/Hooks";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfoMonitorSelector } from "@/store/monitor/selectors";
import { isDisableAction } from "@/utils/CheckPermission";
import { useDropzone } from "react-dropzone";
import EditIcon from "@mui/icons-material/Edit";
import AvatarEditor from "react-avatar-editor";
import { FileUploader } from "react-drag-drop-files";
import {
  CropRotateOutlined,
  Visibility,
  VisibilityOff,
  ZoomInOutlined,
} from "@mui/icons-material";
import { FieldArray, Formik, Form, Field } from "formik";
import AppTextField from "@/components/AppFormComponents/AppTextField";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";

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

const STATUSES = [
  { value: "WAIT_RESPONSE", label: "Wait Response" },
  { value: "ACCEPT", label: "Accept" },
  { value: "DENY", label: "Deny" },
];

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const SettingProject = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatchResolve = useDispatchResolve();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(newFarmData);
  const [openDeleteMember, setOpenDeleteMember] = useState("");
  const [openDeleteEnvironment, setOpenDeleteEnvironment] = useState("");
  const [currentProject, setCurrentProject] = useState<any>();
  const [openEditProject, setOpenEditProject] = useState(false);
  const [avatarFile, setAvatarFile] = useState<any>("");
  const userInfoMonitor = useSelector(getUserInfoMonitorSelector);
  const [avatarFileBlob, setAvatarFileBlob] = useState("");

  // [HUYEN] Edit avatar
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
    // Ensure the dropped file is an image
    if (
      file &&
      fileTypes.some((type) => file.name.toUpperCase().endsWith(type))
    ) {
      setAvatarFileBlob(file);
      console.log("file", file);
    } else {
      console.log(
        "Invalid file type. Only JPG, PNG, and GIF files are allowed."
      );
    }
  };
  //editor
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

  const handleClickOpenEditProject = () => {
    setOpenEditProject(true);
  };

  const handleCloseEditProject = () => {
    setOpenEditProject(false);
  };

  const handleClickOpenDeleteMember = (id: string) => {
    setOpenDeleteMember(id);
  };

  const handleCloseDeleteMember = () => {
    setOpenDeleteMember("");
  };

  const handleClickOpenDeleteEnvironment = (id: string) => {
    setOpenDeleteEnvironment(id);
  };

  const handleCloseDeleteEnvironment = () => {
    setOpenDeleteEnvironment("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setAvatarFile(acceptedFiles[0]);
      setAvatarFileBlob(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  useEffect(() => {
    if (userInfoMonitor) {
      setLoading(false);
      const currentProject = [
        ...userInfoMonitor.joinedProjects,
        ...userInfoMonitor.ownedProjects,
      ].find((item) => item.id === params.id);
      if (currentProject) {
        setCurrentProject(currentProject);
        setAvatarFileBlob(currentProject.logo);
        const newFormData = clone(newFarmData);
        if (newFormData.initialValues) {
          newFormData.initialValues.name = currentProject.name;
          newFormData.initialValues.pinOrder =
            Number(currentProject.pinOrder) > 0;
          setFormData(newFormData);
        }
      } else {
        navigate("/projects");
      }
    } else {
      setLoading(true);
    }
  }, [userInfoMonitor, navigate, params]);

  const handleSubmitEditProject = useCallback(
    (data: any, setSubmitting: any) => {
      const { name, pinOrder } = data;
      const variables = {
        id: params.id,
        name,
        pinOrder,
        logoBase64: avatarFile,
      };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setSubmitting(false);
          setLoading(false);
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
    [dispatchResolve, params, avatarFile]
  );

  const handlePinOrderProject = useCallback(
    (e: any) => {
      e.stopPropagation();
      const variables = {
        id: params.id,
        pinOrder: !currentProject?.pinOrder,
      };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables as any))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [params, dispatchResolve, currentProject]
  );

  const handleChangeRoleMember = useCallback(
    (id: string, role: string) => {
      const variables = {
        id: params.id,
        members: [
          {
            id,
            role,
          },
        ],
      };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables as any))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [params, dispatchResolve]
  );

  const handleDeleteMember = useCallback(
    (id: string) => {
      if (!params.id) return;
      const variables = {
        id: params.id,
        members: [{ id }],
      };
      setLoading(true);
      dispatchResolve(deleteProject(variables))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
          handleCloseDeleteMember();
        })
        .catch(() => {
          setLoading(false);
          handleCloseDeleteMember();
        });
    },
    [params, dispatchResolve]
  );

  const initialValues = {
    environments: currentProject?.environments,
  };
  const validateSchema: { [k: string]: any } = {};
  validateSchema["environments"] = yup
    .array()
    .of(
      yup.object().shape({
        key: yup.string().required("Name is required"),
        value: yup.string().required("Value is required"),
      })
    )
    .min(1, "Please add at least one field");
  const validationSchema = yup.object(validateSchema);

  const handleSubmitEnvironment = useCallback(
    (data: any, setSubmitting: any) => {
      const { environments } = data;
      const variables = {
        id: params.id,
        environments: environments
          .filter((environment: any) => !environment?.id)
          .map((item: any) => ({
            key: item.key,
            value: item.value,
            isSecret: item.isSecret,
          })),
      };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setSubmitting(false);
          setLoading(false);
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
    [dispatchResolve, params]
  );

  const handleDeleteEnvironment = useCallback(
    (id: string) => {
      if (!params.id) return;
      const variables = {
        id: params.id,
        environments: [{ id }],
      };
      setLoading(true);
      dispatchResolve(deleteProject(variables))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
          handleCloseDeleteEnvironment();
        })
        .catch(() => {
          setLoading(false);
          handleCloseDeleteEnvironment();
        });
    },
    [params, dispatchResolve]
  );

  return (
    <>
      {loading && <AppLoader />}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { sm: "space-between" },
          }}
        >
          <Box
            sx={{
              mb: 4,
              pr: { sm: 3 },
              flex: { sm: 1 },
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: (theme) => theme.palette.text.primary,
                fontWeight: Fonts.MEDIUM,
                fontSize: { xs: 18, sm: 20 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {currentProject && (
                  <Box
                    sx={{
                      mx: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => {}}
                        size="small"
                        aria-haspopup="true"
                      >
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            border: "1px solid rgb(204, 204, 204)",
                            "&:hover": {
                              border: "1px solid rgb(159, 159, 159)",
                            },
                          }}
                          src={currentProject.logo || Placeholder}
                        />
                      </IconButton>
                      <Box sx={{ fontSize: 16 }}>{currentProject.name} </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        ml: 1,
                        borderRadius: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        p: 0.25,
                        pr: 1,
                      }}
                    >
                      {currentProject.owner?.avatar && (
                        <IconButton
                          onClick={() => {}}
                          size="small"
                          aria-haspopup="true"
                        >
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              border: "1px solid rgb(204, 204, 204)",
                            }}
                            src={currentProject.owner?.avatar}
                          />
                        </IconButton>
                      )}
                      <span className="ml-1 text-[13px] font-light">
                        {currentProject.owner?.name
                          ? currentProject.owner?.name
                          : "Owned"}
                      </span>
                    </Box>
                  </Box>
                )}
                <Tooltip
                  title={
                    Number(currentProject?.pinOrder) > 0
                      ? "Unpin this Project"
                      : "Pin this Project"
                  }
                >
                  <span>
                    <Checkbox
                      sx={{ pt: 0.75, ml: 0.5 }}
                      {...{ inputProps: { "aria-label": "Checkbox demo" } }}
                      disabled={isDisableAction(
                        currentProject?.canUpdateProject
                      )}
                      icon={
                        Number(currentProject?.pinOrder) === 0 ? (
                          <TbPin className="text-2xl" />
                        ) : (
                          <></>
                        )
                      }
                      checkedIcon={<TbPinnedOff className="text-2xl" />}
                      checked={Number(currentProject?.pinOrder) > 0}
                      onChange={(e) => {
                        handlePinOrderProject(e);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </span>
                </Tooltip>
              </Box>
            </Typography>
          </Box>
          <Box sx={{ height: 40 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "capitalize", width: 200 }}
              onClick={() => {
                navigate(`/project/${params.id}`);
              }}
            >
              <KeyboardDoubleArrowLeftIcon className="mr-1" />
              Back Project
            </Button>
          </Box>
        </Box>
        <AccountTabsWrapper key="2">
          <Box className="account-tabs-content" sx={{ borderRadius: 1 }}>
            <Box
              sx={{
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
                }}
              >
                <AppGridContainer sx={{ mb: 4 }}>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
                      Project Setting
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 4,
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
                          <Box sx={{ ml: 5 }}>Edit</Box>
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
                          Edit Image
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
                              onChange={(e) =>
                                setScale(parseFloat(e.target.value))
                              }
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
                    </Box>
                    <DynamicForm
                      formsData={formData}
                      handleSubmit={handleSubmitEditProject}
                      isDisableFields={isDisableAction(
                        currentProject?.canUpdateProject
                      )}
                      isDisableSubmit={isDisableAction(
                        currentProject?.canUpdateProject
                      )}
                      txtSubmit="Update"
                    />
                  </Box>
                </AppGridContainer>

                <Accordion expanded={true} sx={{ mb: 4 }}>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ whiteSpace: "nowrap" }}>
                        <Typography
                          component="h3"
                          sx={{
                            color: (theme) => theme.palette.text.primary,
                            fontWeight: Fonts.MEDIUM,
                            fontSize: { xs: 18, sm: 20 },
                          }}
                        >
                          Manage Access
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 40,
                          display: "flex",
                        }}
                      >
                        <Button
                          color="primary"
                          sx={{ textTransform: "capitalize", mr: 2 }}
                          disabled={isDisableAction(
                            currentProject?.canInviteProject
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickOpenEditProject();
                          }}
                        >
                          <AddCircleOutlineIcon className="mr-1" />
                          Add Member
                        </Button>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ borderBottom: "1px solid rgba(0, 0, 0, .125)" }}
                  >
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentProject?.members?.map((row: any) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row?.account ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      sx={{ mr: 1 }}
                                      aria-haspopup="true"
                                    >
                                      <Avatar
                                        sx={{
                                          width: 32,
                                          height: 32,
                                          border:
                                            "1px solid rgb(204, 204, 204)",
                                        }}
                                        src={
                                          row?.account?.avatar || Placeholder
                                        }
                                      />
                                    </IconButton>
                                    <Box sx={{ textAlign: "left" }}>
                                      <Box>{row?.account.username}</Box>
                                      <Box sx={{ fontSize: "16px" }}>
                                        {row?.account.fullName}
                                      </Box>
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      sx={{ mr: 1 }}
                                      aria-haspopup="true"
                                    >
                                      <Avatar
                                        sx={{
                                          width: 32,
                                          height: 32,
                                          border:
                                            "1px solid rgb(204, 204, 204)",
                                        }}
                                        src={row?.avatar || Placeholder}
                                      />
                                    </IconButton>
                                    <Box>{row?.email}</Box>
                                  </Box>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <FormControl fullWidth size="small" sx={{}}>
                                  <InputLabel id="demo-simple-select-label">
                                    Role
                                  </InputLabel>
                                  <Select
                                    sx={{ textAlign: "left" }}
                                    disabled={isDisableAction(
                                      currentProject?.canInviteProject
                                    )}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Role"
                                    value={row.role}
                                    onChange={(value) =>
                                      handleChangeRoleMember(
                                        row.id,
                                        value.target.value
                                      )
                                    }
                                  >
                                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                                    <MenuItem value={"MODIFY"}>Modify</MenuItem>
                                    <MenuItem value={"READ"}>Read</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell align="right">
                                {
                                  STATUSES.find(
                                    (status) => status.value === row.status
                                  )?.label
                                }
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                <Box>
                                  <Button
                                    color="error"
                                    sx={{ textTransform: "capitalize" }}
                                    disabled={isDisableAction(
                                      currentProject?.canInviteProject
                                    )}
                                    onClick={() => {
                                      handleClickOpenDeleteMember(row.id);
                                    }}
                                  >
                                    <DeleteIcon className="!text-base h-[12px] w-[12px]" />
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Box>
                  <Formik
                    validateOnChange={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={(data, { setSubmitting }) => {
                      handleSubmitEnvironment(data as any, setSubmitting);
                    }}
                  >
                    {({ values, isSubmitting, setFieldValue }) => (
                      <Form>
                        <FieldArray name="environments">
                          {({ push, remove }) => (
                            <Accordion expanded={true}>
                              <AccordionSummary
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                >
                                  <Box sx={{ whiteSpace: "nowrap" }}>
                                    <Typography
                                      component="h3"
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.text.primary,
                                        fontWeight: Fonts.MEDIUM,
                                        fontSize: { xs: 18, sm: 20 },
                                      }}
                                    >
                                      Environment variables
                                    </Typography>
                                  </Box>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <FormControl fullWidth>
                                  <AppGridContainer sx={{ width: "100%" }}>
                                    <Grid
                                      container
                                      rowSpacing={1}
                                      columnSpacing={2}
                                      sx={{ my: 1 }}
                                    >
                                      <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                                      >
                                        Name
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={8}
                                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                                      >
                                        Value
                                      </Grid>
                                    </Grid>
                                    {(values as any)["environments"]?.map(
                                      (item: any, index: number) => (
                                        <Grid
                                          key={index}
                                          container
                                          rowSpacing={1}
                                          columnSpacing={2}
                                          sx={{ my: 1 }}
                                        >
                                          <Grid item xs={12} md={4}>
                                            <AppTextField
                                              label="Name"
                                              name={`${"environments"}[${index}].key`}
                                              variant="outlined"
                                              sx={{ width: "100%" }}
                                              disabled={item?.id}
                                            />
                                          </Grid>
                                          <Grid item xs={12} md={4}>
                                            <AppTextField
                                              type={
                                                (values as any)["environments"][
                                                  index
                                                ].show ||
                                                !(values as any)[
                                                  "environments"
                                                ][index].isSecret
                                                  ? "text"
                                                  : "password"
                                              }
                                              name={`${"environments"}[${index}].value`}
                                              sx={{
                                                width: "100%",
                                              }}
                                              InputProps={{
                                                endAdornment: (
                                                  <>
                                                    {!item?.id &&
                                                      (values as any)[
                                                        "environments"
                                                      ][index].isSecret && (
                                                        <InputAdornment position="end">
                                                          <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => {
                                                              setFieldValue(
                                                                `${"environments"}[${index}].show`,
                                                                !(
                                                                  values as any
                                                                )[
                                                                  "environments"
                                                                ][index].show
                                                              );
                                                            }}
                                                            edge="end"
                                                          >
                                                            {(values as any)[
                                                              "environments"
                                                            ][index].show ? (
                                                              <Visibility />
                                                            ) : (
                                                              <VisibilityOff />
                                                            )}
                                                          </IconButton>
                                                        </InputAdornment>
                                                      )}
                                                  </>
                                                ),
                                              }}
                                              label="Value"
                                              disabled={item?.id}
                                            />
                                          </Grid>
                                          <Grid item xs={12} md={3}>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                mt: 1,
                                              }}
                                            >
                                              <FormControl>
                                                <Field
                                                  name={`${"environments"}[${index}].isSecret`}
                                                >
                                                  {({ field, form }: any) => (
                                                    <FormControlLabel
                                                      control={
                                                        <Checkbox
                                                          {...field}
                                                          checked={field.value}
                                                          onChange={(e) => {
                                                            form.setFieldValue(
                                                              field.name,
                                                              e.target.checked
                                                            );
                                                          }}
                                                          inputProps={{
                                                            "aria-label":
                                                              "controlled",
                                                          }}
                                                          disabled={item?.id}
                                                        />
                                                      }
                                                      label="Secret"
                                                    />
                                                  )}
                                                </Field>
                                              </FormControl>
                                            </Box>
                                          </Grid>
                                          <Grid item xs={12} md={1}>
                                            <Box
                                              sx={{
                                                mt: 0.75,
                                                display: "flex",
                                                justifyContent: "end",
                                              }}
                                            >
                                              <IconButton
                                                aria-label="delete"
                                                disabled={isDisableAction(
                                                  currentProject?.canDeleteEnvironment
                                                )}
                                                onClick={() => {
                                                  if (item?.id) {
                                                    handleClickOpenDeleteEnvironment(
                                                      item.id
                                                    );
                                                  } else {
                                                    remove(index);
                                                  }
                                                }}
                                              >
                                                <DeleteIcon />
                                              </IconButton>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      )
                                    )}
                                  </AppGridContainer>
                                  <Box sx={{ display: "block" }}>
                                    <Button
                                      sx={{ textTransform: "capitalize" }}
                                      variant="outlined"
                                      startIcon={<AddIcon />}
                                      onClick={() => {
                                        push({
                                          key: "",
                                          value: "",
                                          isSecret: false,
                                        });
                                      }}
                                      disabled={isDisableAction(
                                        currentProject?.canCreateEnvironment
                                      )}
                                    >
                                      Add variable
                                    </Button>
                                  </Box>
                                </FormControl>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={
                                      isSubmitting ||
                                      isDisableAction(
                                        currentProject?.canCreateEnvironment
                                      )
                                    }
                                    sx={{
                                      mt: 4,
                                      width: "200px",
                                      fontWeight: 700,
                                      textTransform: "capitalize",
                                      height: 44,
                                    }}
                                  >
                                    Update
                                  </Button>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          )}
                        </FieldArray>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Box>
        </AccountTabsWrapper>
      </Box>

      {/* Dialog Edit Project */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openEditProject}
        onClose={handleCloseEditProject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">Add Member</DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseEditProject}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <AddMember
            currentProject={currentProject}
            handleCloseEditProject={handleCloseEditProject}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog Confirm delete Member */}
      <DialogConfirmDelete
        open={openDeleteMember}
        handleClose={handleCloseDeleteMember}
        handleSubmit={() => handleDeleteMember(openDeleteMember) as any}
      />

      {/* Dialog Confirm delete Member */}
      <DialogConfirmDelete
        open={openDeleteEnvironment}
        handleClose={handleCloseDeleteEnvironment}
        handleSubmit={() =>
          handleDeleteEnvironment(openDeleteEnvironment) as any
        }
      />
    </>
  );
};

export default SettingProject;
