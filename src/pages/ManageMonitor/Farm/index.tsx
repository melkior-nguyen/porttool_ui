import Monitor from "../Monitor";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import DynamicForm from "@/components/DynamicForm";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateMonitor from "../Monitor/CreateMonitor";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DialogConfirmDelete from "@/components/DialogConfirmDelete/DialogConfirmDelete";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { clone, find } from "lodash";
import { useParams } from "react-router-dom";
import { Fonts } from "@/constants/AppEnums";
import { styled } from "@mui/material/styles";
import { useDispatchResolve } from "@/utils/Hooks";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { newFarmData } from "../Project/newFarmData";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import {
  createOrUpdateProject,
  deleteProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";
import AppLoader from "@/components/AppLoader";
import { isDisableAction } from "@/utils/CheckPermission";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
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

function Farm({ project }: any) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatchResolve = useDispatchResolve();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }[]>([]);
  const [openCreateMonitor, setOpenCreateMonitor] = useState(false);
  const [openEditFarm, setOpenEditFarm] = useState(false);
  const [formData, setFormData] = useState(newFarmData);
  const [idFarmOpenMonitor, setIDFarmOpenMonitor] = useState(null);
  const [openDeleteFarm, setOpenDeleteFarm] = useState("");

  useEffect(() => {
    if (!project) return;
    let arrayExpanded = clone(project.farms);
    arrayExpanded = arrayExpanded.map((item: any) => ({
      id: item.id,
      expanded: Number(item.pinOrder) > 0,
    }));
    setExpanded(arrayExpanded);
  }, [project]);

  const handleClickOpenDeleteFarm = (e: any, id: string) => {
    e.stopPropagation();
    setOpenDeleteFarm(id);
  };

  const handleCloseDeleteFarm = () => {
    setOpenDeleteFarm("");
  };

  const handleClickOpenEditFarm = (e: any, id: string) => {
    if (project) {
      const currentFarm = project.farms.find((item: any) => item.id === id);
      if (currentFarm) {
        const newFormData = clone(newFarmData);
        if (newFormData.initialValues) {
          newFormData.initialValues.name = currentFarm.name;
          newFormData.initialValues.id = currentFarm.id;
          setFormData(newFormData);
        }
      }
    }
    e.stopPropagation();
    setOpenEditFarm(true);
  };

  const handleCloseEditFarm = () => {
    setOpenEditFarm(false);
  };

  const handleClickOpenCreateMonitor = (e: any, id: any) => {
    e.stopPropagation();
    setIDFarmOpenMonitor(id);
    setOpenCreateMonitor(true);
  };

  const handleCloseCreateMonitor = () => {
    setIDFarmOpenMonitor(null);
    setOpenCreateMonitor(false);
  };

  const handleChange = useCallback(
    (id: string) => {
      const cloneExpanded = clone(expanded);
      const itemExpanded = find(cloneExpanded, { id });
      if (itemExpanded) {
        (itemExpanded as any).expanded = !(itemExpanded as any).expanded;
        setExpanded(cloneExpanded);
      }
    },
    [expanded]
  );

  const handleSubmitEditFarm = useCallback(
    (data: any, setSubmitting: any) => {
      const { id, name, pinOrder } = data;
      const variables = { id: params.id, farms: [{ id, name, pinOrder }] };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables))
        .then(async () => {
          handleCloseEditFarm();
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
    [dispatchResolve, params]
  );

  const handleDeleteFarm = useCallback(
    (id: string) => {
      if (!params.id) return;
      const variables = {
        id: params.id,
        farms: [{ id }],
      };
      setOpenDeleteFarm("");
      setLoading(true);
      dispatchResolve(deleteProject(variables))
        .then(async () => {
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [dispatchResolve, params]
  );

  const handlePinOrderFarm = useCallback(
    (e: any, data: any) => {
      e.stopPropagation();
      const variables = {
        id: params.id,
        farms: [
          {
            id: data.id,
            pinOrder: !data.pinOrder,
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

  return (
    <div>
      {loading && <AppLoader />}
      {project &&
        project.farms.map((item: any, index: number) => (
          <Box key={index} sx={{ mx: 3, mb: 2 }}>
            <Accordion
              expanded={
                Boolean(find(expanded, { id: item.id })?.expanded) &&
                item.monitors.length > 0
              }
              onChange={() => handleChange(item.id) as any}
            >
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
                      {item.name}
                      <Tooltip
                        title={
                          Number(item.pinOrder) > 0
                            ? "Unpin this Farm"
                            : "Pin this Farm"
                        }
                      >
                        <span>
                          <Checkbox
                            sx={{ pt: 0.75, ml: 0.5 }}
                            disabled={isDisableAction(project?.canUpdateFarm)}
                            {...label}
                            icon={<TbPin className="text-2xl" />}
                            checkedIcon={<TbPinnedOff className="text-2xl" />}
                            checked={Number(item.pinOrder) > 0}
                            onChange={(e) => {
                              handlePinOrderFarm(e, item);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </span>
                      </Tooltip>
                      {item.monitors.length === 0 && (
                        <Chip label="No Monitor" />
                      )}
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
                      disabled={isDisableAction(project?.canCreateMonitor)}
                      onClick={(e) => handleClickOpenCreateMonitor(e, item.id)}
                    >
                      <AddCircleOutlineIcon className="mr-1" />
                      Create Monitor
                    </Button>
                    <Button
                      color="primary"
                      sx={{ textTransform: "capitalize", mr: 2 }}
                      disabled={isDisableAction(project?.canUpdateFarm)}
                      onClick={(e) => handleClickOpenEditFarm(e, item.id)}
                    >
                      <EditIcon className="mr-1" />
                      Edit Farm
                    </Button>
                    <Button
                      color="error"
                      sx={{ textTransform: "capitalize" }}
                      disabled={isDisableAction(project?.canDeleteFarm)}
                      onClick={(e) => handleClickOpenDeleteFarm(e, item.id)}
                    >
                      <DeleteIcon className="mr-1" />
                      Remove Farm
                    </Button>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {/* Monitor */}
                {item.monitors.length > 0 ? (
                  <Monitor
                    project={project}
                    farm={item}
                    monitors={item.monitors}
                  />
                ) : null}
              </AccordionDetails>
            </Accordion>
            {idFarmOpenMonitor === item.id && (
              <CreateMonitor
                farm={item}
                openCreateMonitor={openCreateMonitor}
                handleCloseCreateMonitor={handleCloseCreateMonitor}
              />
            )}
          </Box>
        ))}
      {/* Dialog Edit Project */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openEditFarm}
        onClose={handleCloseEditFarm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">Edit Farm</DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseEditFarm}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DynamicForm
            formsData={formData}
            handleSubmit={handleSubmitEditFarm}
            txtSubmit="Update"
          />
        </DialogContent>
      </Dialog>
      {/* Dialog Confirm delete Farm */}
      <DialogConfirmDelete
        open={openDeleteFarm}
        handleClose={handleCloseDeleteFarm}
        handleSubmit={() => handleDeleteFarm(openDeleteFarm) as any}
      />
    </div>
  );
}

export default Farm;
