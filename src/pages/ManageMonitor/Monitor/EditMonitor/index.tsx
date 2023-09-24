import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  createOrUpdateProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";
import pick from "lodash/pick";
import clone from "lodash/clone";
import DynamicForm from "@/components/DynamicForm";
import { useParams } from "react-router-dom";
import { useDispatchResolve } from "@/utils/Hooks";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { MONITOR_TYPES } from "../MonitorUtils";
import { useSelector } from "react-redux";
import { getUserInfoMonitorSelector } from "@/store/monitor/selectors";
import { find, get } from "lodash";
import AppLoader from "@/components/AppLoader";

const EditMonitor = ({
  farm,
  monitor,
  openEditMonitor,
  handleCloseEditMonitor,
}: {
  farm: any;
  monitor: any;
  openEditMonitor: boolean;
  handleCloseEditMonitor: () => void;
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatchResolve = useDispatchResolve();
  const [formData, setFormData] = useState(MONITOR_TYPES[0].formData);
  const userInfoMonitor = useSelector(getUserInfoMonitorSelector);

  const handleSetFormData = useCallback(
    (userInfoMonitor: any, isNewForm?: typeof formData) => {
      if (userInfoMonitor) {
        const currentProject = [
          ...userInfoMonitor.joinedProjects,
          ...userInfoMonitor.ownedProjects,
        ].find((item) => item.id === params.id);
        setFormData((formData) => {
          const cloneFormData = clone(
            isNewForm ??
              find(MONITOR_TYPES, { value: monitor.type })?.formData ??
              formData
          );
          if (monitor.isUriConnection) {
            cloneFormData.fields = cloneFormData.fields.filter(
              (item) =>
                !["host", "port", "database", "user", "password"].includes(
                  item.name
                )
            );
            cloneFormData.fields.splice(4, 0, {
              columnWidth: 7,
              type: "text",
              name: "uri",
              label: "URI",
              validate: { message: "URI is required" },
            });
          }
          cloneFormData.fields.map((field) => {
            if (field.name === "typeMonitor") {
              field.options = get(currentProject, [
                "listAvailableMonitorTypes",
              ]);
            }

            // dropdown
            if (field.name === "method") {
              field.options = get(currentProject, ["listAvailableMethods"]);
              field.options = field.options?.map((item) => ({
                name: item,
                value: item,
              }));
              if (
                cloneFormData.initialValues &&
                field.options &&
                field.options.length > 0
              )
                cloneFormData.initialValues.method = field.options[0];
            }
            if (field.name === "interval") {
              field.options = get(currentProject, ["listAvailableIntervals"]);
              field.options = field.options?.map((item) => ({
                name:
                  item / 60 >= 5 ? `${item / 60} Minutes` : `${item} Seconds`,
                value: item,
              }));
            }
            if (field.name === "timeout") {
              field.options = get(currentProject, ["listAvailableTimeouts"]);
              field.options = field.options?.map((item) => ({
                name:
                  item / 60 >= 5 ? `${item / 60} Minutes` : `${item} Seconds`,
                value: item,
              }));
            }
            if (field.name === "retries") {
              field.options = get(currentProject, ["listAvailableRetries"]);
              field.options = field.options?.map((item) => ({
                name: item === 1 ? `${item} Time` : `${item} Times`,
                value: item,
              }));
            }

            // multiSelect
            if (field.name === "expectedCodes") {
              field.options = get(currentProject, [
                "listAvailableExceptionCodes",
              ]);
            }
            if (field.name === "assignZones") {
              field.options = get(currentProject, ["listAvailableZones"]);
            }
          });
          const typeMonitorField = find(cloneFormData.fields, {
            name: "typeMonitor",
          });
          if (typeMonitorField) typeMonitorField.disabled = true;
          if (monitor && cloneFormData?.initialValues) {
            cloneFormData.initialValues = pick(
              monitor,
              Object.keys(cloneFormData.initialValues)
            );
            cloneFormData.initialValues.id = monitor.id;
            cloneFormData.initialValues.typeMonitor = monitor.type;
            cloneFormData.initialValues.pinOrder =
              Number(cloneFormData.initialValues.pinOrder) > 0;
            if (monitor.query && cloneFormData.initialValues.query) {
              cloneFormData.initialValues.query = JSON.parse(
                cloneFormData.initialValues.query as string
              );
            }
            if (
              monitor.requestPayload &&
              cloneFormData.initialValues.requestPayload
            ) {
              cloneFormData.initialValues.requestPayload = JSON.parse(
                cloneFormData.initialValues.requestPayload as string
              );
            }
            if (monitor.sslCheck) {
              const notifySslNearlyExpriesInDaysField = find(
                cloneFormData.fields,
                {
                  name: "notifySslNearlyExpriesInDays",
                }
              );
              if (notifySslNearlyExpriesInDaysField) {
                notifySslNearlyExpriesInDaysField.hidden = false;
              }
            }
            if (monitor.isUriConnection) {
              cloneFormData.initialValues.connection = {
                value: "uri",
                name: "URI",
              };
            } else {
              cloneFormData.initialValues.connection = {
                value: "common",
                name: "Common",
              };
            }
            Object.keys(cloneFormData.initialValues).forEach((item) => {
              if (["method", "interval", "timeout", "retries"].includes(item)) {
                const optionsField = find(cloneFormData.fields, {
                  name: item,
                });
                if (optionsField?.options && cloneFormData.initialValues) {
                  cloneFormData.initialValues[item] = find(
                    optionsField.options,
                    {
                      value: monitor[item],
                    }
                  );
                }
              }
            });
          }
          return cloneFormData;
        });
      }
    },
    [params, monitor]
  );

  useEffect(() => {
    handleSetFormData(userInfoMonitor);
  }, [userInfoMonitor, handleSetFormData]);

  const handleChangeFormData = useCallback(
    (value: any) => {
      if (value) {
        handleSetFormData(
          userInfoMonitor,
          find(MONITOR_TYPES, { value })?.formData
        );
      }
    },
    [handleSetFormData, userInfoMonitor]
  );

  const handleFieldChangeValue = useCallback(
    (formsData: any, field: string, value: any) => {
      if (field === "connection") {
        setFormData((form) => {
          const cloneFormData = clone(form);
          if (value.value === "uri") {
            cloneFormData.fields = cloneFormData.fields.filter(
              (item) =>
                !["host", "port", "database", "user", "password"].includes(
                  item.name
                )
            );
            cloneFormData.fields.splice(4, 0, {
              columnWidth: 7,
              type: "text",
              name: "uri",
              label: "URI",
              validate: { message: "URI is required" },
            });
          } else {
            cloneFormData.fields = cloneFormData.fields.filter(
              (item) => !["uri"].includes(item.name)
            );
            cloneFormData.fields.splice(
              4,
              0,
              {
                columnWidth: 5,
                type: "text",
                name: "host",
                label: "Host",
                validate: { message: "Host is required" },
              },
              {
                columnWidth: 2,
                type: "text",
                name: "port",
                label: "Port",
                validate: { message: "Port is required" },
              },
              {
                columnWidth: 4,
                type: "text",
                name: "database",
                label: "Database",
                validate: { message: "Database is required" },
              },
              {
                columnWidth: 4,
                type: "text",
                name: "user",
                label: "User",
              },
              {
                columnWidth: 4,
                type: "password",
                name: "password",
                label: "Password",
              }
            );
          }
          return cloneFormData;
        });
      }
      if (field === "notifySslNearlyExpriesInDays") {
        const cloneFormData = clone(formsData);
        const notifySslNearlyExpriesInDaysField = find(cloneFormData.fields, {
          name: "notifySslNearlyExpriesInDays",
        });
        if (notifySslNearlyExpriesInDaysField) {
          notifySslNearlyExpriesInDaysField.hidden = !value;
          notifySslNearlyExpriesInDaysField.validate = value ? {} : null;
          cloneFormData.initialValues.notifySslNearlyExpriesInDays = undefined;
        }
        setFormData(cloneFormData);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (data: any, setSubmitting: any) => {
      const cloneData = clone(data);
      if (cloneData) delete cloneData.typeMonitor;
      if (cloneData?.connection?.value === "uri") {
        delete cloneData.host;
        delete cloneData.port;
        delete cloneData.database;
        delete cloneData.user;
        delete cloneData.password;
        cloneData.isUriConnection = true;
      }
      if (cloneData?.connection?.value === "common") {
        delete cloneData.uri;
        cloneData.isUriConnection = false;
      }
      if (cloneData) delete cloneData.connection;
      const variables = {
        id: params.id,
        farms: [
          {
            monitors: {
              ...cloneData,
              type: formData.id,
              ...(cloneData.port ? { port: Number(cloneData.port) } : {}),
              ...(cloneData.method ? { method: cloneData.method.value } : {}),
              ...(cloneData.interval
                ? { interval: Number(cloneData.interval.value) }
                : {}),
              ...(cloneData.timeout
                ? { timeout: Number(cloneData.timeout.value) }
                : {}),
              ...(cloneData.retries
                ? { retries: Number(cloneData.retries.value) }
                : {}),
              ...(cloneData.requestPayload
                ? { requestPayload: JSON.stringify(cloneData.requestPayload) }
                : {}),
              ...(cloneData.query
                ? { query: JSON.stringify(cloneData.query) }
                : {}),
            },
            id: farm.id,
          },
        ],
      };
      setLoading(true);
      dispatchResolve(createOrUpdateProject(variables))
        .then(async () => {
          handleCloseEditMonitor();
          await dispatchResolve(getUserInfoMonitor());
          setLoading(false);
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
    [formData, dispatchResolve, handleCloseEditMonitor, farm, params]
  );

  return (
    <>
      {loading && <AppLoader />}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openEditMonitor}
        onClose={handleCloseEditMonitor}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">Edit Monitor</DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleCloseEditMonitor}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DynamicForm
            formsData={formData}
            handleSubmit={handleSubmit}
            handleChangeFormData={handleChangeFormData}
            handleFieldChangeValue={handleFieldChangeValue}
            txtSubmit="Update"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditMonitor;
