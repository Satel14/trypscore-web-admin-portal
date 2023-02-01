import { useState } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import LoadingCircle from "./Assets/LoadingCircle";
import SteeringWheel from "./Assets/SteeringWheel";
import GenerateId from "../Utils/GenerateUniqueId";

const LoadingWheel = ({ width, style }) => {
  const [uniqueId] = useState(`loadwheel_grad_${GenerateId()}`);

  const boxStyle = {
    position: "relative",
    width: `${width}rem`,
    height: `${width}rem`,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;
  const spinnerStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    animation: `${rotate} 1s infinite linear`,
  };
  const wheelStyle = {
    position: "absolute",
    width: "80%",
    height: "80%",
  };

  return (
    <Box sx={{ ...boxStyle, ...style }}>
      <Box sx={spinnerStyle}>
        <LoadingCircle id={uniqueId} />
      </Box>
      <Box sx={wheelStyle}>
        <SteeringWheel />
      </Box>
    </Box>
  );
};

export default LoadingWheel;
