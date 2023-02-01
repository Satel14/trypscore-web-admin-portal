import { React, useRef, useState, useContext } from "react";
import { Flippy, FrontSide, BackSide } from "react-flippy";
import { Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CircleIcon from "@mui/icons-material/Circle";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingWheel from "../LoadingWheel";
import GlobalContext from "../Context";

const FlippyCard = ({
  isLoading,
  iconSrc,
  title,
  frontDesc,
  backDesc,
  statLine,
  colorMsg,
  color,
  isMapCard,
}) => {
  const global = useContext(GlobalContext);

  const ref = useRef();
  const [colorFlip, setColorFlip] = useState(false);

  const flippyStyle = {
    width: colorMsg
      ? global.mobileView
        ? "94%"
        : global.tabletView
        ? "92%"
        : "32%"
      : "320px",
  };

  const cardStyle = {
    boxShadow: "none",
    height: isMapCard ? "86px" : "77px",
    display: "flex",
  };
  const cardStyleFF = {
    width: global.mobileView ? "94%" : global.tabletView ? "92%" : "32%",
    boxShadow: "none",
    padding: global.mobileView || global.tabletView ? "5%" : "2% 2% 1%",
    position: "relative",
  };
  const background = {
    width: "100%",
    position: "absolute",
    top: isMapCard ? "-18px" : "-25px",
    left: 0,
    right: 0,
    borderRadius: "1rem",
    transform: isMapCard ? "scaleY(0.70)" : "scaleY(0.60)",
    zIndex: -2,
  };
  const backgroundFF = {
    width: "100%",
    position: "absolute",
    left: 0,
    borderRadius: "1rem",
    transform: isMapCard ? "scaleY(0.70)" : "scaleY(0.60)",
    zIndex: -2,
  };
  const frontCardDetails = {
    display: "flex",
    alignItems: "center",
  };
  const backCardDetails = {
    display: "flex",
    alignItems: "center",
  };
  const infoIcon = {
    mt: !isMapCard && "-10%",
    ml: !isMapCard && "-2%",
    color: "#1a7dff",
    position: isMapCard && "absolute",
    top: isMapCard && "8px",
    left: isMapCard && "8px",
  };
  const icon = {
    width: "16%",
    padding: "2%",
    borderRadius: "50%",
    background: "#ffffff",
    boxShadow: "inset 0px 2px 3px 1px #dac7fe",
  };
  const descBox = {
    display: "flex",
    flexDirection: "column",
    mx: !isMapCard && "5%",
    ml: isMapCard && "90px",
    position: isMapCard && "absolute",
    bottom: isMapCard && "8px",
  };
  const backDescBox = {
    display: "flex",
    flexDirection: "column",
    mx: "5%",
  };
  const circleIcon = {
    position: "absolute",
    top: "15%",
    right: "-3%",
    color: color,
    transform: "scale(1)",
  };
  const colorBox = {
    position: "absolute",
    top: "25%",
    left: "0%",
    width: "100%",
    height: "73%",
    borderRadius: "1rem",
    backgroundColor: color,
    zIndex: "-1",
  };
  const colorText = {
    position: "absolute",
    left: "0",
    m: "5%",
    textAlign: "center",
  };
  const cancelIcon = {
    position: "absolute",
    top: "30%",
    right: "2%",
    transform: "scale(0.75)",
    color: "#ffffff",
  };
  const backBackground = {
    transform: isMapCard ? "scaleY(-0.70)" : "scaleY(-0.60)",
  };
  const statLineStyle = {
    ml: isMapCard ? "90px" : "auto",
    fontSize: "2.44125rem",
    fontWeight: 700,
    position: isMapCard && "absolute",
    top: isMapCard && "4px",
  };
  const loadBox = { height: "100%" };

  const handleFlip = () => {
    ref.current.toggle();
    setTimeout(() => {
      setColorFlip(false);
    }, 250);
  };

  const handleColorFlip = () => {
    setColorFlip(true);
    ref.current.toggle();
  };

  return (
    <>
      {global.userBrowserName !== "Firefox" ? (
        <Flippy
          flipOnClick={false}
          flipDirection="vertical"
          ref={ref}
          style={flippyStyle}
        >
          <FrontSide style={cardStyle}>
            <Box
              sx={background}
              component="img"
              src="images/flippys/FlippyCard-BG-01.svg"
              alt="background"
            />
            <Box sx={frontCardDetails}>
              <InfoIcon sx={infoIcon} onClick={handleFlip} />
              <Box sx={icon} component="img" src={iconSrc} alt="events" />
              <Box sx={descBox}>
                <Typography variant="body3" color="primary">
                  {title}
                </Typography>
                <Typography variant="body2" color="primary">
                  {frontDesc}
                </Typography>
              </Box>
              {isLoading ? (
                <Box sx={loadBox}>
                  <LoadingWheel width={2} />
                </Box>
              ) : (
                <Typography sx={statLineStyle} variant="body1" color="primary">
                  {statLine}
                </Typography>
              )}
            </Box>
            {!isLoading && color && (
              <CircleIcon sx={circleIcon} onClick={handleColorFlip} />
            )}
          </FrontSide>
          <BackSide style={cardStyle}>
            {colorFlip ? (
              <>
                <Box sx={colorBox} />
                {isLoading ? (
                  <Box sx={loadBox}>
                    <LoadingWheel width={2} />
                  </Box>
                ) : (
                  <Typography sx={colorText} variant="body2" color="primary">
                    {colorMsg}
                  </Typography>
                )}
                <CancelIcon sx={cancelIcon} onClick={handleFlip} />
              </>
            ) : (
              <>
                <Box
                  sx={{ ...background, ...backBackground }}
                  component="img"
                  src="images/flippys/FlippyCard-BG-01.svg"
                  alt="background"
                />
                <Box sx={backCardDetails}>
                  <InfoIcon sx={infoIcon} onClick={handleFlip} />
                  <Box sx={icon} component="img" src={iconSrc} alt="events" />
                  <Box sx={backDescBox}>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontSize="0.6rem"
                    >
                      {backDesc}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </BackSide>
        </Flippy>
      ) : (
        !isMapCard && (
          <Box sx={cardStyleFF}>
            <Box sx={frontCardDetails}>
              <Box
                sx={backgroundFF}
                component="img"
                src="images/flippys/FlippyCard-BG-01.svg"
                alt="background"
              />
              <Box sx={icon} component="img" src={iconSrc} alt="events" />
              <Box sx={descBox}>
                <Typography variant="body1" color="primary">
                  {title}
                </Typography>
                <Typography variant="body2" color="primary">
                  {frontDesc}
                </Typography>
              </Box>
              {isLoading ? (
                <Box sx={loadBox}>
                  <LoadingWheel width={2} />
                </Box>
              ) : (
                <Typography variant="h2" color="primary">
                  {statLine}
                </Typography>
              )}
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default FlippyCard;
