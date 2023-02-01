import { Icon, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ToggleStore } from "../EventsStore";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFF",
    position: "absolute",
    marginTop: theme.spacing(30),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    right: "0",
  },
  imageIcon: {
    height: "50px",
    width: "50px",
  },
}));

const LayerToggle = () => {
  const classes = useStyles();
  const [curLayer, setLayer] = useState("clusters");

  const toggleLayer = (event, layer) => {
    setLayer(layer);
    ToggleStore.sendMessage({
      layer: layer,
    });
  };

  return (
    <ToggleButtonGroup
      exclusive
      onChange={toggleLayer}
      value={curLayer}
      className={classes.root}
      aria-label="text alignment"
    >
      <ToggleButton value="clusters" aria-label="clusters">
        <Icon>
          <img
            src="images/Map_Icon.png"
            alt="clusters"
            className={classes.imageIcon}
          />
        </Icon>
      </ToggleButton>

      <ToggleButton value="heat" aria-label="heat">
        <Icon>
          <img
            src="images/Heatmap_Icon.png"
            alt="heat"
            className={classes.imageIcon}
          />
        </Icon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LayerToggle;
