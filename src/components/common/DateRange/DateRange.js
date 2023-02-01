import React, { useState, useEffect, useContext } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./calendarStyle.css";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { Box, FormControl, Select, Typography } from "@mui/material";
import Utils from "../Utils";
import GlobalContext from "../Context";

const DateRange = ({ range, setRange, setIsSame, label, width, sx }) => {
  const global = useContext(GlobalContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const boxStyle = {
    width: width || "100%",
  };
  const formStyle = {
    width: "100%",
    backgroundColor: "white",
  };
  const selectStyle = {
    height: "100%",
    "& .MuiOutlinedInput-input": {
      padding: "7.5px 14px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "solid 2px #2E117F",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "solid 2px #C31CF3",
    },
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": { border: "solid 2px #2E117F" },
    },
  };
  const labelStyle = {
    fontWeight: 500,
    m: "0 0 0.1rem 0",
  };

  const utils = Utils();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollOverride, setScrollOverride] = useState(false);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    if (!selection) {
      return;
    }
    setIsSame &&
      setIsSame(selection.startDate.getTime() === selection.endDate.getTime());
    setRange(selection);
  };

  const handleClose = () => {
    if (scrollOverride) {
      setScrollOverride(false);
    }
    setIsOpen(false);
  };
  const handleOpen = () => {
    const element = document.getElementById("drp");
    if (
      element?.getBoundingClientRect().bottom < 825 &&
      element?.getBoundingClientRect().bottom > 600 &&
      !scrollOverride &&
      !global.mobileView
    ) {
      window.scrollBy(0, 300);
      setScrollOverride(true);
    }
    setIsOpen(true);
  };
  const handleScroll = () => {
    if (!scrollOverride) {
      setIsOpen(false);
    }
    setScrollOverride(false);
  };
  return (
    <Box sx={{ ...boxStyle, ...sx }}>
      <Typography variant="body3" sx={labelStyle} color="primary">
        {label}
      </Typography>
      <FormControl sx={formStyle}>
        <Select
          id="drp"
          sx={selectStyle}
          displayEmpty
          value={range}
          open={isOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          renderValue={() => {
            return utils.formatDateDisplay(range);
          }}
        >
          {global.mobileView ? (
            <DefinedRange
              onChange={handleOnChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={[range]}
              direction="horizontal"
              className="dateRangePicker"
            />
          ) : (
            <DateRangePicker
              onChange={handleOnChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={[range]}
              direction="horizontal"
              className="dateRangePicker"
            />
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateRange;
