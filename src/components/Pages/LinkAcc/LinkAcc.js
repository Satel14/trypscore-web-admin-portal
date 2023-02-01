import React, { useContext } from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import GlobalContext from "../../common/Context";
import * as constants from "../../../constants";
import { useHistory } from "react-router-dom";
import LoginGraphic from "../../common/LoginGraphic";

const LinkAcc = () => {
  const global = useContext(GlobalContext);
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { e, i: inviteId } = Object.fromEntries(urlSearchParams.entries());
  let email;
  e && (email = Buffer.from(e, "base64").toString("utf-8"));

  const colBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3,
    width: global.mobileView ? "100%" : "40rem",
  };
  const titleStyle = {
    mb: 4,
    mt: 2,
    textAlign: "center",
  };
  const rowBoxStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: global.mobileView ? "100%" : "40rem",
  };
  const buttonContainer = {
    width: global.mobileView ? "100%" : "50%",
    px: 3,
    mb: 2,
  };

  if (email) {
    global.setSignUp(true);
    global.firebaseState.doSignOut();
  } else {
    history.push(constants.SIGNIN_LINK);
  }

  const handleClick = async () => {
    global.setLinkClaim(true);
    history.push(constants.SIGNIN_LINK, { email: email, inviteId: inviteId });
  };

  const handleCreateClick = () => {
    history.push(constants.CREATE_ACC_LINK, {
      email: email,
      inviteId: inviteId,
    });
  };

  return (
    <Container>
      <LoginGraphic />
      <Box sx={colBoxStyle}>
        <Typography variant="h2" color="primary" sx={titleStyle}>
          {constants.APP_NAME}
        </Typography>
        <Typography variant="body1" color="primary" fontWeight="bold" mb={2}>
          {constants.LN_SUB_TITLE}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          textAlign={global.mobileView ? "center" : null}
        >
          {constants.LN_BODY_TEXT}
        </Typography>
      </Box>
      <Box sx={rowBoxStyle}>
        <Box sx={buttonContainer}>
          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={handleClick}
          >
            {constants.LN_BTN_YES}
          </Button>
        </Box>
        <Box sx={buttonContainer}>
          <Button
            variant="outlined"
            color="info"
            fullWidth
            onClick={handleCreateClick}
          >
            {constants.LN_BTN_NO}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LinkAcc;
