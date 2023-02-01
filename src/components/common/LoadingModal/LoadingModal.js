import { Box } from "@mui/material";
import LoadingWheel from "../LoadingWheel";

const LoadingModal = ({ width }) => {
  const loadBox = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2000,
    display: "flex",
  };
  const overlay = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#f4f2f8",
    opacity: 0.5,
  };

  return (
    <Box sx={loadBox}>
      <Box sx={overlay} />
      <LoadingWheel width={width} />
    </Box>
  );
};

export default LoadingModal;
