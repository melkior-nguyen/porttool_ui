import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DialogConfirmDelete = ({
  open,
  handleClose,
  handleSubmit,
}: {
  open: string;
  handleClose: () => void;
  handleSubmit: () => void;
}) => {
  return (
    <Dialog
      open={open !== ""}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogActions sx={{ display: "flex", alignItems: "start" }}>
          <Button
            sx={{ height: "48px", borderRadius: "50%" }}
            onClick={handleClose}
            autoFocus
          >
            <AiOutlineCloseCircle className="w-6 text-2xl" />
          </Button>
        </DialogActions>
      </Box>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmDelete;
