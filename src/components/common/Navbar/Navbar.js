import { React, useState, useContext, useEffect, useRef } from "react";
import GlobalContext from "../Context";
import {
  Box,
  Button,
  ClickAwayListener,
  Link,
  MenuItem,
  Paper,
  Popper,
  Skeleton,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import * as constants from "../../../constants";

const Navbar = ({ isLoggedIn }) => {
  const {
    mobileView,
    tabletView,
    optionState,
    firebaseState,
    setOptionState,
    authUser,
    companyState,
    notFound,
  } = useContext(GlobalContext);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);
  const [openIcon, setOpenIcon] = useState("▼");
  const containerRef = useRef(null);

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "nowrap row",
    width: "100%",
    backgroundColor: "#d7d5dd",
    boxShadow: "0px 2px 5px #bfbcc3",
    pl: mobileView ? 0 : tabletView ? 6 : 10,
    zIndex: 900,
  };
  const navButtonsStyle = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  };
  const userButtonContainer = {
    width: mobileView ? "50%" : tabletView ? "40%" : "25%",
  };
  const userButtonStyle = {
    width: "100%",
    justifyContent: "space-evenly",
  };
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    width: mobileView ? "50%" : tabletView ? "40%" : "25%",
    p: 1,
    borderRadius: "0px",
    boxShadow: "0px 0px 3px 0px #bfbcc3",
    color: "rgb(46, 17, 127)",
    textTransform: "uppercase",
    animation: "none",
    "&: hover": {
      cursor: "pointer",
      backgroundColor: "#9687be",
      color: "#fefffe",
      filter: "drop-shadow(1px 2px 3px #c6c4cb)",
    },
  };
  const dashboardBoxStyle = {
    ...(optionState.nav === "dashboard" && {
      backgroundColor: "#9687be",
      color: "#fefffe",
    }),
  };
  const userAdminBoxStyle = {
    ...(optionState.nav === "useradmin" && {
      backgroundColor: "#9687be",
      color: "#fefffe",
    }),
  };
  const userIconStyle = {
    borderRadius: "50%",
    height: "2.5rem",
    width: "2.5rem",
  };
  const popperStyle = {
    width: mobileView
      ? "calc(100% / 3)"
      : tabletView
      ? `calc(28.5714% - 22.8571px)`
      : "calc(20% - 16px)",
    boxShadow: "0px 4px 4px #c6c4cb",
    zIndex: 900,
  };
  const paperStyle = {
    backgroundColor: "#d7d5dd",
    borderRadius: "0px",
  };
  const menuItemStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 2,
    "&: hover": {
      cursor: "pointer",
      backgroundColor: "#9687be",
      color: "#fefffe",
      filter: "drop-shadow(1px 2px 3px #c6c4cb)",
      "& .MuiTypography-root": { color: "#fefffe" },
      "& .MuiSvgIcon-root": { color: "#fefffe" },
    },
  };
  const linkStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const textStyle = {
    mr: 2,
  };
  const iconStyle = {
    fontSize: "inherit",
  };

  const buttonVariant = mobileView ? "h5" : "h4";

  const handleNavClick = (type) => {
    setOptionState({ nav: type });
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    setMenuAnchor(null);
    firebaseState.doSignOut();
  };

  useEffect(() => {
    menuOpen ? setOpenIcon("▲") : setOpenIcon("▼");
  }, [menuOpen]);

  return isLoggedIn && !notFound ? (
    <Box sx={containerStyle}>
      <Box sx={navButtonsStyle}>
        <Button
          onClick={() => handleNavClick("dashboard")}
          sx={{
            ...buttonStyle,
            ...dashboardBoxStyle,
          }}
        >
          <Typography variant={buttonVariant}>{constants.NB_DB}</Typography>
        </Button>
          <Button
            onClick={() => handleNavClick("useradmin")}
            sx={{
              ...buttonStyle,
              ...userAdminBoxStyle,
            }}
          >
            <Typography variant={buttonVariant}>{constants.NB_UA}</Typography>
          </Button>
      </Box>
      <Box sx={userButtonContainer} ref={containerRef}>
        <Button
          onClick={handleMenuClick}
          sx={{ ...buttonStyle, ...userButtonStyle }}
        >
          {!mobileView && (
            <Typography variant={buttonVariant}>
              {authUser?.profile ? (
                `${authUser?.profile?.firstName} ${openIcon}`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
          )}
          {companyState?.iconUrl ? (
            <Box
              component="img"
              sx={userIconStyle}
              src={companyState?.iconUrl}
              alt="USER"
            />
          ) : (
            <Skeleton variant="circular" sx={userIconStyle} />
          )}
        </Button>
        <Popper
          style={popperStyle}
          open={menuOpen}
          anchorEl={menuAnchor}
          placement="bottom-start"
          disablePortal={false}
          container={containerRef.current}
        >
          <Paper sx={paperStyle}>
            <ClickAwayListener onClickAway={handleMenuClose}>
              <MenuItem onClick={handleLogout} sx={menuItemStyle}>
                <Link
                  href={constants.SIGNIN_LINK}
                  underline="none"
                  sx={linkStyle}
                >
                  <Typography sx={textStyle} variant="h5">
                    {constants.NB_LOGOUT}
                  </Typography>
                  <ExitToAppIcon sx={iconStyle} />
                </Link>
              </MenuItem>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Box>
    </Box>
  ) : null;
};

export default Navbar;
