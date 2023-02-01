import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import * as constants from "../../../constants";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import GlobalContext from "../../common/Context";
import LoadingWheel from "../../common/LoadingWheel";
import LoginGraphic from "../../common/LoginGraphic";

const Verify = () => {
  const global = useContext(GlobalContext);

  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const { e } = Object.fromEntries(urlSearchParams.entries());
  let email;
  e && (email = Buffer.from(e, "base64").toString("utf-8"));

  const iconStyle = {
    my: 3,
    fontSize: "3rem",
  };
  
  const buttonStyles = {
    width: "50%",
    mt: 3,
  };
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: global.mobileView ? "100%" : "40rem",
  };

  if (email) {
    global.setSignUp(true);
    global.firebaseState.doSignOut();
  } else {
    history.push(constants.SIGNIN_LINK);
  }

  const handleClick = () => {
    global.setLinkClaim(true);
    history.push(constants.SIGNIN_LINK);
  };

  const handleErrorClick = async () => {
    const verifyRes = await global.firebaseState.sendVerification(email);
    verifyRes && history.push(constants.SIGNIN_LINK);
  };

  useEffect(() => {
    const verifyAndSet = async () => {
      try {
        const result = await global.firebaseState.verifyUser(email);
        result
          ? setAlert({ msg: "Verified", type: "success" })
          : setAlert({ msg: "Not Verified", type: "error" });
      } catch (e) {
        console.error(e);
        setAlert({ msg: `Error: ${e.message}`, type: "error" });
      }
      setIsLoading(false);
    };
    verifyAndSet();
  }, []);

  return (
    <Container>
      <LoginGraphic />
      <Box sx={boxStyle}>
        {isLoading ? (
          <>
            <Typography variant="body1" color="primary" mt={2} mb={3}>
              {constants.VERIFY_LOADING}
            </Typography>
            <LoadingWheel width={4} />
          </>
        ) : alert?.type === "error" ? (
          <>
            <GppBadIcon sx={iconStyle} color="error" />
            <Typography color="primary" variant="h3">
              {constants.VERIFY_ERROR_TITLE}
            </Typography>
            <Typography variant="body1" color="primary">
              {alert?.msg}
            </Typography>
            <Button
              sx={buttonStyles}
              variant="contained"
              color="info"
              onClick={handleErrorClick}
            >
              {constants.VERIFY_RESEND_VERIFICATION}
            </Button>
          </>
        ) : (
          <>
            <VerifiedUserIcon sx={iconStyle} color="success" />
            <Typography color="primary" variant="h3">
              {constants.VERIFY_CONFIRMATION_TITLE}
            </Typography>
            <Typography color="primary" variant="body1">
              {constants.VERIFY_CONFIRMATION_LOGIN}
            </Typography>
            <Button
              sx={buttonStyles}
              variant="contained"
              color="info"
              onClick={handleClick}
            >
              {constants.SIGNIN_BTN}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Verify;
