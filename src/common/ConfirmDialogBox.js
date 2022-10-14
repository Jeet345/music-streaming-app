import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

function ConfirmDialogBox(prop) {
  const { isOpen, msg, handleDialogApprove, handleClose } = prop;

  return (
    <div>
      <Dialog
        className="dialog-container confirm-dialog"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title" className="dialog-title">
          Delete Playlist
          <IconButton
            className="close-btn"
            onClick={handleClose}
            aria-label="close"
          >
            <MdClose size={24} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p style={{ padding: "10px 0px", marginTop: "10px" }}>{msg}</p>
        </DialogContent>
        <DialogActions className="action-btn">
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleDialogApprove} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialogBox;
