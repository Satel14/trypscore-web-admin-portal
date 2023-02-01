import { Button } from "@mui/material";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GlobalContext from "../Context";
import * as constants from "../../../constants";

const Header = () => {
  const global = useContext(GlobalContext);
  const history = useHistory();
  const location = useLocation();

  const headerStyle = {
    alignItems: "center",
    background:
      "transparent linear-gradient(77deg, #2E117F 0%, #9B57EC 100%) 0% 0% no-repeat padding-box",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: global.mobileView ? 0 : "48px",
    zIndex: 2200,
  };
  const imgStyle = {
    maxWidth: "10rem",
    objectFit: "cover",
  };

  const clickHandler = () => {
    location.pathname === constants.DB_LINK
      ? global.setOptionState({ nav: "dashboard" })
      : history.push(constants.SIGNIN_LINK);
  };

  return (
    <header style={headerStyle}>
      <Button onClick={clickHandler}>
        <img
          alt="Data Dashboard"
          src={"/images/logo/trypscore_white.png"}
          style={imgStyle}
        />
      </Button>
    </header>
  );
};

export default Header;
