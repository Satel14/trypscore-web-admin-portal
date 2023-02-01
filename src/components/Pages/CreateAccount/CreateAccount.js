import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Container,
  InputAdornment,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import * as constants from "../../../constants";
import { useHistory, useLocation } from "react-router-dom";
import PassReqDialog from "../../common/PassReqDialog";
import GlobalContext from "../../common/Context";
import LoadingWheel from "../../common/LoadingWheel";
import LoginGraphic from "../../common/LoginGraphic";

const CreateAccount = () => {
  const global = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();
  const location = useLocation();
  const email = location.state?.email;
  const inviteId = location.state?.inviteId;
  const [alert, setAlert] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [textType, setTextType] = useState("password");
  const [isOpen, setIsOpen] = useState(false);
  const [isDOpen, setIsDOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const history = useHistory();

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: global.mobileView ? "100%" : "40rem",
  };
  const inputBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    mb: 3,
  };
  const titleBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };
  const titleStyle = {
    mb: 4,
    mt: 2,
    textAlign: "center",
  };
  const inputStyle = {
    width: "100%",
  };
  const buttonStyle = {
    mt: 3,
    width: global.mobileView ? "100%" : "50%",
  };
  const modalTitleStyle = {
    mb: 2,
  };
  const modalBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const helpIconStyle = {
    opacity: "0.5",
  };

  if (email) {
    global.setSignUp(true);
    global.firebaseState.doSignOut();
  } else {
    history.push(constants.SIGNIN_LINK);
  }

  const handleHelpClick = () => {
    setIsDOpen((prev) => !prev);
  };

  const handlePassMatch = async (data) => {
    try {
      const result = await global.firebaseState.createFbUser(
        data.email,
        data.password
      );
      if (result === "User Created") {
        const verifyRes = await global.firebaseState.sendVerification(email);
        if (verifyRes && alert?.type !== "error") {
          setIsOpen(true);
          setIsDisabled(false);
          setIsLoading(false);
          return;
        }
        setAlert({
          type: "error",
          msg: "Error creating account. Request new invite",
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const handlePassNotMatch = () => {
    setIsLoading(false);
    setError("repassword", { message: constants.SIGN_UP_PASS_NOT_MATCH });
    setIsDisabled(false);
  };

  const handleClick = async (data) => {
    setIsDisabled(true);
    setIsLoading(true);
    getValues("password") !== getValues("repassword")
      ? handlePassNotMatch()
      : await handlePassMatch(data);
  };

  const handleIconClick = (type) => {
    type === "password" ? setTextType("text") : setTextType("password");
  };

  const handleOkClick = () => {
    setIsOpen(false);
    history.push(constants.SIGNIN_LINK);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ email: "", password: "", repassword: "" });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    const verify = async () => {
      const valid = await global.firebaseState.verifyInvite(email, inviteId);
      !valid && setInvalid(true);
      setVerifying(false);
    };
    verify();
  }, []);

  return (
    <Container>
      <LoginGraphic />
      <Typography color="primary" variant="h2" sx={titleStyle}>
        {constants.APP_NAME}
      </Typography>
      <Box sx={container}>
        {invalid ? (
          <>
            <Typography variant="body1" color="primary">
              {constants.SIGN_UP_INVALID_INV}
            </Typography>
            <Button
              onClick={handleOkClick}
              sx={buttonStyle}
              color="info"
              variant="contained"
            >
              {constants.BACK_TO_HOME}
            </Button>
          </>
        ) : verifying ? (
          <Box sx={titleBoxStyle}>
            <Typography color="primary" variant="body1" mb={3}>
              {constants.VERIFYING_INVITE}
            </Typography>
            <LoadingWheel width={4} />
          </Box>
        ) : (
          <>
            <Box sx={inputBoxStyle}>
              <Typography color="primary" variant="body1" fontWeight="bold">
                {constants.SIGN_UP_CREATE}
              </Typography>
              <Typography color="primary" variant="body1" mb={3}>
                {constants.SIGN_UP_TEXT}
              </Typography>
            </Box>
            {isLoading ? (
              <LoadingWheel width={4} />
            ) : (
              <form style={{ width: "100%" }}>
                <Box sx={inputBoxStyle}>
                  <Box sx={inputBoxStyle}>
                    <TextField
                      fullWidth
                      label="Email"
                      sx={inputStyle}
                      defaultValue={email}
                      {...register("email", {
                        required: constants.FRM_EMAIL_REQUIRED,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: constants.FRM_EMAIL_INVALID,
                        },
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.email && (
                      <Typography variant="body2" color="#CE0C14" mt={1}>
                        {errors.email?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={inputBoxStyle}>
                    <TextField
                      fullWidth
                      type={textType}
                      label={
                        <>
                          Password
                          <IconButton onClick={handleHelpClick}>
                            <HelpOutlineIcon sx={helpIconStyle} />
                          </IconButton>
                        </>
                      }
                      sx={inputStyle}
                      {...register("password", {
                        required: constants.SIGN_UP_PROVIDE_PASS,
                        pattern: {
                          value:
                            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                          message: constants.SET_PASS_FORMAT_MSG,
                        },
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment>
                            <IconButton
                              onClick={() => handleIconClick(textType)}
                            >
                              {textType === "password" ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.password && (
                      <Typography variant="body2" color="#CE0C14" mt={1}>
                        {errors.password?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={inputBoxStyle}>
                    <TextField
                      fullWidth
                      type={textType}
                      label="Confirm Password"
                      sx={inputStyle}
                      {...register("repassword", {
                        required: constants.SIGN_UP_CONFIRM_PASS,
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.repassword && (
                      <Typography variant="body2" color="#CE0C14" mt={1}>
                        {errors.repassword?.message}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    color="info"
                    sx={buttonStyle}
                    variant="contained"
                    disabled={isDisabled}
                    onClick={handleSubmit(handleClick)}
                  >
                    {constants.SIGN_UP_CREATE}
                  </Button>
                </Box>
              </form>
            )}
          </>
        )}
      </Box>
      <PassReqDialog isOpen={isDOpen} setIsOpen={setIsDOpen} />
      <Dialog open={isOpen}>
        <DialogContent sx={modalBoxStyle}>
          <Typography sx={modalTitleStyle} color="primary" variant="h3">
            {constants.SIGN_UP_MODAL_TITLE}
          </Typography>
          <Typography color="primary" variant="body1">
            {constants.SIGN_UP_MODAL_TEXT}
          </Typography>
          <Button
            onClick={handleOkClick}
            sx={buttonStyle}
            color="info"
            variant="contained"
          >
            {constants.SIGN_UP_MODAL_BTN}
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateAccount;
