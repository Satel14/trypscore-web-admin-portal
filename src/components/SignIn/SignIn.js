import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Container,
  IconButton,
} from "@mui/material";
import LoadingModal from "../common/LoadingModal";
import LoadingWheel from "../common/LoadingWheel";
import ReBox from "../common/ReBox";
import GlobalContext from "../common/Context";
import * as constants from "../../constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginGraphic from "../common/LoginGraphic";

const SignIn = () => {
  const global = useContext(GlobalContext);

  const [falert, setFalert] = useState(null);
  const [linkMsg, setLinkMsg] = useState(constants.LINK_LIST[0]);
  const [textType, setTextType] = useState("password");
  const history = useHistory();
  const location = useLocation();
  const inviteId = location.state?.inviteId;
  const email = location.state?.email;

  const messageBoxContainer = {
    display: "flex",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  };
  const messageBox = {
    position: "relative",
    m: "auto",
    p: 4,
    background: "#ffffff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: global.mobileView ? "100%" : "40rem",
  };
  const titleStyle = {
    mb: 4,
    mt: 2,
    textAlign: "center",
  };
  const button = {
    mb: 2,
    width: global.mobileView ? "100%" : "50%",
  };
  const inputContainer = {
    display: "flex",
    flexDirection: "column",
    mb: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };
  const buttonsContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    mt: 3,
    width: "100%",
  };

  const onSubmit = async ({ email, password }) => {
    try {
      global.setSignError("");
      global.setSignLoad(true);
      await global.firebaseState.doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      global.setSignLoad(false);
      global.setSignError(constants.SIGNIN_BAD_CREDS);
      console.error(error);
    }
  };

  const onSubmitGoogle = async () => {
    let response;
    global.mobileView
      ? (response = await global.firebaseState.signInWithGoogleRedirect())
      : (response = await global.firebaseState.signInWithGooglePopUp());
    let tokenResult;
    response &&
      (tokenResult = await global.firebaseState.firebase
        .auth()
        .currentUser.getIdTokenResult());
    if (!tokenResult.claims.tlc) {
      global.firebaseState.doSignOut();
      history.push(constants.SIGNIN_LINK);
    }
  };

  const forgotPassClick = () => {
    history.push(constants.FORGOT_PATH);
  };

  const handleIconClick = (type) => {
    type === "password" ? setTextType("text") : setTextType("password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    global.setOptionState({ nav: "dashboard" });
    global.setSignUp(false);
  }, []);

  useEffect(() => {
    global.firebaseState.firebase.auth().onAuthStateChanged((user) => {
      user ? global.setSignLoad(true) : global.setSignLoad(false);
    });
  }, []);

  useEffect(() => {
    var i = 0;
    const changeMsg = () => {
      setTimeout(() => {
        setLinkMsg(constants.LINK_LIST[i + 1]);
        if (i < constants.LINK_LIST.length - 2) {
          i++;
          changeMsg();
        }
      }, 5000);
    };
    global.linking && changeMsg();
  }, [global.linking]);

  useEffect(() => {
    window.localStorage.setItem("linkClaim", global.linkClaim);
    const verify = async () => {
      const valid = await global.firebaseState.verifyInvite(email, inviteId);
      !valid && global.setSignError(constants.SIGN_UP_INVALID_INV);
      !valid && global.setLinking(false);
    };
    inviteId && verify();
  }, [global.linkClaim]);

  return global.linking ? (
    <Box sx={messageBoxContainer}>
      <ReBox style={messageBox}>
        <LoadingWheel width={4} />
        <Typography variant="h4" color="primary" my={1}>
          {constants.LINK_HANG}
        </Typography>
        <Typography variant="body1" color="primary">
          {linkMsg}..
        </Typography>
      </ReBox>
    </Box>
  ) : (
    <Container>
      {global.signLoad && <LoadingModal width={6} />}
      <LoginGraphic />
      <Typography variant="h2" color="primary" sx={titleStyle}>
        {constants.APP_NAME}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: global.mobileView ? "100%" : null }}
      >
        <Box sx={container}>
          <Box sx={inputContainer}>
            <TextField
              fullWidth
              label="Email"
              id="email"
              {...register("email", {
                required: constants.FRM_EMAIL_REQUIRED,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: constants.SIGNIN_BAD_EMAIL,
                },
              })}
              type="email"
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
                {errors.email.message}
              </Typography>
            )}
          </Box>
          <Box sx={inputContainer}>
            <TextField
              fullWidth
              label="Password"
              id="password"
              {...register("password", {
                required: constants.FRM_PW_REQUIRED,
              })}
              type={textType}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={() => handleIconClick(textType)}>
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
                {errors.password.message}
              </Typography>
            )}
            {global.signError && (
              <Typography variant="body2" color="#CE0C14" mt={1}>
                {global.signError}
              </Typography>
            )}
          </Box>
          <Box sx={buttonsContainer}>
            <Button sx={button} color="info" variant="contained" type="submit">
              {constants.SIGNIN_BTN}
            </Button>
            <Button
              sx={button}
              color="info"
              variant="outlined"
              onClick={onSubmitGoogle}
              startIcon={<GoogleIcon color="info" />}
            >
              {constants.SIGNIN_GOOGLE_BTN}
            </Button>
            <Button onClick={forgotPassClick}>
              {constants.SIGNIN_FORGOT_PASSWORD}
            </Button>
            <Typography variant="body2" color="#CE0C14">
              {falert}
            </Typography>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default SignIn;
