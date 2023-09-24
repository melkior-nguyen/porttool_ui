import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import EditMonitor from "./EditMonitor";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import DialogConfirmDelete from "@/components/DialogConfirmDelete/DialogConfirmDelete";
import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatchResolve } from "@/utils/Hooks";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { Box, Button, Checkbox, Tooltip } from "@mui/material";
import {
  createOrUpdateProject,
  deleteProject,
  getUserInfoMonitor,
} from "@/store/monitor/action";
import AppLoader from "@/components/AppLoader";
import { isDisableAction } from "@/utils/CheckPermission";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Monitor({ project, farm, monitors }: any) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatchResolve = useDispatchResolve();
  const [openDeleteMonitor, setOpenDeleteMonitor] = useState("");
  const [openEditMonitor, setOpenEditMonitor] = useState(false);
  const [idFarmOpenMonitor, setIDFarmOpenMonitor] = useState<null | string>(
    null
  );

  const handleClickOpenDeleteMonitor = (id: string) => {
    setOpenDeleteMonitor(id);
  };

  const handleCloseDeleteMonitor = () => {
    setOpenDeleteMonitor("");
  };

  const handleClickOpenEditMonitor = (id: string) => {
    setIDFarmOpenMonitor(id);
    setOpenEditMonitor(true);
  };

  const handleCloseEditMonitor = () => {
    setIDFarmOpenMonitor(null);
    setOpenEditMonitor(false);
  };

  const handleDeleteMonitor = useCallback(
    (id: string) => {
      if (!params.id || !farm) return;
      const variables = {
        id: params.id,
        farms: [
          {
            id: farm.id,
            monitors: [{ id }],
          },
        ],
      };
      setOpenDeleteMonitor("");
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
    [dispatchResolve, farm, params]
  );

  const handlePinOrderMonitor = useCallback(
    (data: any) => {
      const variables = {
        id: params.id,
        farms: [
          {
            id: farm.id,
            monitors: {
              id: data.id,
              type: data.type,
              pinOrder: !data.pinOrder,
            },
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
    [params, farm, dispatchResolve]
  );

  return (
    <>
      {loading && <AppLoader />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* Type, Name, Host:Port, Status, Last Run, actions */}
              <TableCell>Type</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Host:Port or URI</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Last Run</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monitors.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 1 }}> {row.type}</Box>
                    <Tooltip
                      title={
                        Number(row.pinOrder) > 0
                          ? "Unpin this Monitor"
                          : "Pin this Monitor"
                      }
                    >
                      <span>
                        <Checkbox
                          {...label}
                          disabled={isDisableAction(project?.canUpdateMonitor)}
                          icon={<TbPin className="text-xl" />}
                          checkedIcon={<TbPinnedOff className="text-xl" />}
                          checked={Number(row.pinOrder) > 0}
                          onChange={() => {
                            handlePinOrderMonitor(row);
                          }}
                        />
                      </span>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell align="left" style={{ whiteSpace: "nowrap" }}>
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.isUriConnection ? row.uri : `${row.host}:${row.port}`}
                </TableCell>
                <TableCell align="right">
                  {row.pause ? "Stop" : "Active"}
                </TableCell>
                <TableCell align="right">{row.timeout}</TableCell>
                <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                  <Box>
                    <Tooltip title="Edit this Monitor">
                      <span>
                        <Button
                          color="primary"
                          sx={{ textTransform: "capitalize" }}
                          disabled={isDisableAction(project?.canUpdateMonitor)}
                          onClick={() => handleClickOpenEditMonitor(row.id)}
                        >
                          <EditIcon className="!text-base h-[12px] w-[12px]" />
                        </Button>
                      </span>
                    </Tooltip>

                    <Tooltip title="Remove this Monitor">
                      <span>
                        <Button
                          color="error"
                          sx={{ textTransform: "capitalize" }}
                          disabled={isDisableAction(project?.canDeleteMonitor)}
                          onClick={() => handleClickOpenDeleteMonitor(row.id)}
                        >
                          <DeleteIcon className="!text-base h-[12px] w-[12px]" />
                        </Button>
                      </span>
                    </Tooltip>
                  </Box>
                </TableCell>
                {idFarmOpenMonitor === row.id && (
                  <EditMonitor
                    farm={farm}
                    monitor={row}
                    openEditMonitor={openEditMonitor}
                    handleCloseEditMonitor={handleCloseEditMonitor}
                  />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dialog Confirm delete Farm */}
      <DialogConfirmDelete
        open={openDeleteMonitor}
        handleClose={handleCloseDeleteMonitor}
        handleSubmit={() => handleDeleteMonitor(openDeleteMonitor) as any}
      />
    </>
  );
}
