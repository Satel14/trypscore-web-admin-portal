import GlobalContext from "../Context";
import { useContext } from "react";

const LoginGraphic = () => {
  const global = useContext(GlobalContext);
  return (
    <img
      src="images\admin-portal-graphic.png"
      alt="Admin Portal Login"
      width={global.mobileView ? 150 : 200}
      style={{ marginTop: global.mobileView ? "16px" : "24px" }}
    />
  );
};

export default LoginGraphic;
