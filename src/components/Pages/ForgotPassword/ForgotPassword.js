import { React, useState, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
} from "@mui/material";
import * as constants from "../../../constants";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../common/Context";
import LoadingWheel from "../../common/LoadingWheel";

const ForgotPassword = () => {
  const global = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error: unexpected error, see logs");
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: global.mobileView ? "100%" : "40rem",
  };
  const questionIStyle = {
    color: "#c41bf3",
    fontSize: "2.5rem",
    transform: "translate(50%, 0%)",
  };
  const lockIStyle = {
    fontSize: "3rem",
  };
  const iconBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "8rem",
    width: "8rem",
    borderRadius: "5px",
    boxShadow: "0px 2px 8px #bfbcc3",
    my: 4,
  };
  const inputStyle = {
    mb: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const buttonStyle = {
    mt: 3,
    width: global.mobileView ? "100%" : "50%",
  };
  const dialogStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const checkIStyle = {
    mb: 1,
    fontSize: "3rem",
  };

  const handleClick = async (data) => {
    setIsDisabled(true);
    try {
      const result = await global.firebaseState.sendPassReset(data.email);
      result === true ? setSent(true) : setErrorMsg(result);
    } catch (e) {
      console.error(e);
    }
    setIsOpen(true);
  };
  const handleCloseClick = () => {
    setIsOpen(false);
    history.push(constants.SIGNIN_LINK);
  };

  return (
    <Container>
      <Box sx={iconBoxStyle}>
        <QuestionMarkIcon sx={questionIStyle} />
        <LockIcon sx={lockIStyle} />
      </Box>
      <Box sx={boxStyle}>
        <Typography variant="h2" color="primary" mb={4}>
          {constants.RESET_PASS_TITLE}
        </Typography>
        <Typography variant="body2" color="primary" mb={3}>
          {constants.FORGOT_PASS_TEXT}
        </Typography>
        <Box sx={inputStyle}>
          <TextField
            fullWidth
            label="Email"
            disabled={isDisabled}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            {...register("email", {
              required: constants.FRM_EMAIL_REQUIRED,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: constants.FRM_EMAIL_INVALID,
              },
            })}
          />
          {errors.email && (
            <Typography variant="body2" color="#CE0C14" mt={1}>
              {errors.email.message}
            </Typography>
          )}
        </Box>
        {isDisabled && <LoadingWheel width={3} style={{ mb: 3 }} />}
        <Button
          disabled={isDisabled}
          onClick={handleSubmit(handleClick)}
          sx={buttonStyle}
          variant="contained"
          color="info"
        >
          {constants.RESET_PASS_TITLE}
        </Button>
      </Box>
      <Dialog open={isOpen}>
        <DialogContent sx={dialogStyle}>
          {sent ? (
            <>
              <CheckIcon sx={checkIStyle} color="success" />
              <Typography variant="body1" color="primary" mb={3}>
                {constants.RESET_CONFIRM}
              </Typography>
            </>
          ) : (
            <>
              <ClearIcon sx={checkIStyle} color="error" />
              <Typography variant="body1" color="primary" mb={2}>
                {errorMsg}
              </Typography>
              <Typography variant="body2" color="primary" mb={3}>
                {constants.RESET_TRY_AGAIN}
              </Typography>
            </>
          )}
          <Button variant="contained" color="info" onClick={handleCloseClick}>
            {constants.SIGN_UP_MODAL_BTN}
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ForgotPassword;
