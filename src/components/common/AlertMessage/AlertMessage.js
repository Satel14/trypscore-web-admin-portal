import React from "react";
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertMessage = ({ alert, setAlert, hideClose }) => {
  const [open, setOpen] = React.useState(true);

  const collapseStyle = {
    position: "absolute",
    zIndex: 1,
    top: "0.5rem",
  };
  const alertStyle = {
    alignItems: "center",
  };

  return (
    <Collapse in={open} sx={collapseStyle}>
      <Alert
        severity={alert.type}
        sx={alertStyle}
        action={
          <IconButton
            style={{ visibility: !hideClose ? "visible" : "hidden" }}
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              setAlert(null);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alert.msg}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
