import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Button,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserMgmtDialog from "../UserMgmtDialog";
import * as constants from "../constants";
import GlobalContext from "../../Context";
import LoadingWheel from "../../LoadingWheel";

const UserMgmtMenu = ({ variant, setVariant, selectedUser, onChange }) => {
  const { authUser, firebaseState } = useContext(GlobalContext);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const dialogStyle = {
    "& .MuiPaper-root": {
      minWidth: "400px",
    },
  };
  const closeButtonStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    m: 1,
    fontSize: "1.5rem",
  };
  const dialogContentStyle = {
    display: "flex",
    flexDirection: "column",
    px: 7,
    py: 4,
  };
  const linkStyle = {
    my: 1,
    p: 1,
  };
  const textContentWrapper = {
    justifyContent: "center",
    overflowY: "revert",
    pb: 2,
  };
  const textContent = {
    textAlign: "center",
    textOverflow: "ellipsis",
    overflowX: "hidden",
  };
  const actionsStyle = {
    justifyContent: "center",
    pt: 2,
    px: 8,
    pb: 4,
  };
  const buttonStyle = {
    width: "50%",
  };

  const handleClose = () => {
    setConfirmOpen(false);
    setIsConfirmed(false);
    setVariant(null);
  };
  const handleSubClose = () => {
    setConfirmOpen(false);
    setIsConfirmed(false);
  };
  const handleClick = (type) => (e) => {
    setVariant(type);
    switch (type) {
      case "edit":
        break;
      default:
        setConfirmOpen(true);
        break;
    }
  };
  const handleConfirm = async () => {
    setIsDisabled(true);
    switch (variant) {
      case "passreset":
        await firebaseState.sendPassReset(selectedUser.email);
        break;
      case "remove":
        await firebaseState.deleteDashboardUser(selectedUser.id);
        onChange();
        break;
      case "inv":
        await firebaseState.inviteUser(selectedUser.email);
        break;
      default:
        break;
    }
    setIsConfirmed(true);
    setIsDisabled(false);
  };

  return (
    <>
      <Dialog
        sx={dialogStyle}
        open={variant !== null && variant !== "add"}
        onClose={confirmOpen ? handleSubClose : handleClose}
      >
        <IconButton
          aria-label="close"
          onClick={confirmOpen ? handleSubClose : handleClose}
          sx={closeButtonStyle}
        >
          <CloseIcon />
        </IconButton>
        {!confirmOpen ? (
          <DialogContent sx={dialogContentStyle}>
            {(authUser?.profile.perms.isDDAdmin ||
              authUser?.authUser.uid === selectedUser?.id) && (
              <Link
                sx={linkStyle}
                onClick={handleClick("edit")}
                underline="none"
                variant="h5"
                fontWeight="bold"
              >
                {constants.CP_USRMGMT_EDIT}
              </Link>
            )}
            <Link
              sx={linkStyle}
              onClick={handleClick("passreset")}
              underline="none"
              variant="h5"
              fontWeight="bold"
            >
              {constants.CP_USRMGMT_PASS}
            </Link>
            <Link
              sx={linkStyle}
              onClick={handleClick("inv")}
              underline="none"
              variant="h5"
              fontWeight="bold"
            >
              {constants.CP_RESEND_INV}
            </Link>
            {authUser?.profile.perms.isDDAdmin && (
              <>
                <Link
                  sx={linkStyle}
                  onClick={handleClick("remove")}
                  underline="none"
                  variant="h5"
                  fontWeight="bold"
                >
                  {constants.CP_USRMGMT_REMOVE}
                </Link>
              </>
            )}
          </DialogContent>
        ) : (
          <>
            <DialogContent
              sx={{ ...dialogContentStyle, ...textContentWrapper }}
            >
              <DialogContentText sx={textContent} color="primary">
                {!isConfirmed
                  ? variant === "passreset"
                    ? `${constants.CP_USRMGMT_PASS_CONFIRM} ${selectedUser.email}?`
                    : variant === "inv"
                    ? `${constants.CP_USRMGMT_RESEND_CONFIRM} ${selectedUser.email}?`
                    : constants.CP_USRMGMT_REMOVE_CONFIRM
                  : variant === "passreset"
                  ? constants.CP_USRMGMT_PASS_SUCCESS
                  : variant === "inv"
                  ? constants.CP_USRMGMT_RESEND_SUCCESS
                  : constants.CP_USRMGMT_REMOVE_SUCCESS}
              </DialogContentText>
              {isDisabled && <LoadingWheel width={3} />}
            </DialogContent>
            <DialogActions sx={actionsStyle}>
              {!isConfirmed ? (
                <>
                  <Button
                    sx={buttonStyle}
                    variant="outlined"
                    color="info"
                    onClick={handleSubClose}
                    disabled={isDisabled}
                  >
                    {constants.BUTTON_NO}
                  </Button>
                  <Button
                    sx={buttonStyle}
                    variant="contained"
                    color="info"
                    onClick={handleConfirm}
                    disabled={isDisabled}
                  >
                    {constants.BUTTON_YES}
                  </Button>
                </>
              ) : (
                <Button
                  sx={buttonStyle}
                  variant="outlined"
                  color="info"
                  onClick={variant === "remove" ? handleClose : handleSubClose}
                >
                  {constants.BUTTON_OK}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      <UserMgmtDialog
        variant={variant}
        onClose={() =>
          variant === "add" ? setVariant(null) : setVariant("userMgmt")
        }
        selectedUser={variant === "add" ? null : selectedUser}
        onChange={onChange}
      />
    </>
  );
};

export default UserMgmtMenu;
