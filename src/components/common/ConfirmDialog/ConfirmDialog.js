import {
  Dialog,
  Typography,
  Box,
  Button,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingWheel from "../LoadingWheel";
import * as constants from "./constants";

const ConfirmDialog = ({
  title,
  message,
  onClickConfirm,
  onClickCancel,
  isLoading,
  isOpen,
}) => {
  const titleStyle = {
    textAlign: "center",
    p: 4,
    pb: 0,
  };
  const buttonBox = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    mt: 4,
  };
  const confirmWheel = {
    top: "0",
    left: "0",
  };
  const buttonStyle = {
    width: "45%",
  };

  return (
    <Dialog open={isOpen} onClose={onClickCancel}>
      <Typography variant="h4" color="primary" sx={titleStyle}>
        {title}
      </Typography>
      <DialogContent>
        <Typography variant="body1" color="primary">
          {isLoading ? constants.LOADING : message}
        </Typography>
        <Box sx={buttonBox}>
          {isLoading ? (
            <>
              <LoadingWheel style={confirmWheel} width={4} />
            </>
          ) : (
            <>
              <Button
                sx={buttonStyle}
                onClick={onClickCancel}
                variant="outlined"
                color="info"
              >
                {constants.CANCEL}
              </Button>
              <Button
                sx={buttonStyle}
                onClick={onClickConfirm}
                variant="contained"
                color="info"
              >
                {constants.CONFIRM}
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDialog;
