import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as constants from "../constants";
import UserForm from "../UserForm";

const UserMgmtDialog = ({ variant, onClose, onChange, selectedUser }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const closeButtonStyle = {
    position: "absolute",
    right: 0,
    top: 0,
    m: 1,
    fontSize: "1.5rem",
  };
  const titleStyle = {
    pt: 6,
    px: 8,
    pb: 4,
    textTransform: "none",
  };
  const contentStyle = {
    px: 8,
    pb: 6,
    pt: 0,
  };

  return (
    <Dialog open={variant === "add" || variant === "edit"} onClose={onClose}>
      <Box sx={containerStyle}>
        <IconButton aria-label="close" onClick={onClose} sx={closeButtonStyle}>
          <CloseIcon />
        </IconButton>
        <Typography sx={titleStyle} variant="h3" color="primary">
          {variant === "edit"
            ? constants.CP_EU_MODAL_TITLE
            : constants.CP_INVITE_USER}
        </Typography>
        <DialogContent sx={contentStyle}>
          <UserForm
            selectedUser={selectedUser}
            variant={variant}
            onClose={onClose}
            onChange={onChange}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default UserMgmtDialog;
