import GlobalContext from "../Context";
import { useContext } from "react";

const LoginGraphic = () => {
  const { mobileView, tabletView, largeView } = useContext(GlobalContext);

  const imageHeight = mobileView
    ? "30%"
    : tabletView
    ? "35%"
    : largeView
    ? "450"
    : "350";

  return (
    <img
      alt="404"
      width="auto"
      height={imageHeight}
      src={"/images/404-graphic.png"}
    />
  );
};

export default LoginGraphic;
