import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import * as constants from "../../../constants";
import GlobalContext from "../../common/Context";
import { useHistory, useLocation } from "react-router-dom";
import ErrorGraphic from "../../common/ErrorGraphic";

const ErrorPage = ({ pageNotFound }) => {
  const {
    mobileView,
    tabletView,
    headerNavHeight,
    headerHeight,
    desktopView,
    largeView,
    optionState,
    setOptionState,
    setNotFound,
  } = useContext(GlobalContext);
  const history = useHistory();
  const location = useLocation();
  setNotFound(pageNotFound);

  if (!(location.state?.error || optionState.error || pageNotFound)) {
    history.push(constants.SIGNIN_LINK);
  }

  const buttonStyle = {
    width: "100%",
    maxWidth: mobileView ? "100%" : "20rem",
  };
  const leftStyle = {
    display: "flex",
    flexDirection: "column",
    mr: (desktopView || largeView) && 6,
    alignItems: !(desktopView || largeView) && "center",
  };
  const descTextStyle = {
    mb: mobileView ? 2 : 4,
  };
  const mainTextStyle = {
    fontSize: mobileView ? "2.5rem" : tabletView ? "3.5" : "5.5rem",
    mb: 1,
  };
  const titleTextStyle = {
    mb: 1,
  };
  const boxStyle = {
    display: "flex",
    flexDirection: !(desktopView || largeView) ? "column-reverse" : "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginTop:
      (desktopView || largeView) &&
      (location.pathname === constants.ERROR_PATH || pageNotFound
        ? headerHeight
        : headerNavHeight),
    px: 4,
    zIndex: -1,
  };
  const buttonVariant = mobileView ? "h5" : "h4";
  const wrongVariant = mobileView ? "h3" : "h2";

  const clickHandler = () => {
    // If the user is on error page or not found page, use history to go back to signin,
    // otherwise use optionstate. signin will redirect to home if logged in
    location.pathname === constants.ERROR_PATH || pageNotFound
      ? history.push(constants.SIGNIN_LINK)
      : setOptionState({ nav: "dashboard" });
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={leftStyle}>
        <Typography color="#C31CF3" variant="h1" sx={mainTextStyle}>
          {constants.ERROR_OOPS}
        </Typography>
        <Typography color="primary" variant={wrongVariant} sx={titleTextStyle}>
          {pageNotFound ? constants.NOT_FOUND : constants.ERROR_WRONG}
        </Typography>
        <Typography color="primary" variant="body1" sx={descTextStyle}>
          {constants.ERROR_DESC}
        </Typography>
        <Button
          variant="contained"
          color="info"
          sx={buttonStyle}
          onClick={clickHandler}
        >
          <Typography color="#fff" variant={buttonVariant} textTransform="none">
            {constants.ERROR_DASH_BTN}
          </Typography>
        </Button>
      </Box>
      <ErrorGraphic />
    </Box>
  );
};

export default ErrorPage;
