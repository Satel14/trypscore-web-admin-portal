import React from "react";
import { Dialog, DialogContent, Typography, Box, Button } from "@mui/material";
import * as constants from "../../../constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PassReqDialog = ({ isOpen, setIsOpen }) => {
  const dialogStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const checkStyle = {
    fontSize: "1rem",
    mr: ".5rem",
  };
  const buttonStyle = {
    width: "10rem",
  };
  const dialogTextStyle = {
    mb: "1rem",
  };
  const textStyle = {
    mb: "2rem",
  };
  const handleHelpClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent sx={dialogStyle}>
        <Typography sx={textStyle} variant="h3">
          {constants.SET_DLG_TITLE}
        </Typography>
        <Box>
          <Typography sx={dialogTextStyle} variant="body1">
            <CheckCircleOutlineIcon sx={checkStyle} />
            {constants.SET_DLG_REQ1}
          </Typography>
          <Typography sx={dialogTextStyle} variant="body1">
            <CheckCircleOutlineIcon sx={checkStyle} />
            {constants.SET_DLG_REQ2}
          </Typography>
          <Typography sx={dialogTextStyle} variant="body1">
            <CheckCircleOutlineIcon sx={checkStyle} />
            {constants.SET_DLG_REQ3}
          </Typography>
          <Typography sx={dialogTextStyle} variant="body1">
            <CheckCircleOutlineIcon sx={checkStyle} />
            {constants.SET_DLG_REQ4}
          </Typography>
        </Box>
        <Button
          sx={buttonStyle}
          variant="contained"
          color="info"
          onClick={handleHelpClick}
        >
          {constants.SIGN_UP_MODAL_BTN}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PassReqDialog;
