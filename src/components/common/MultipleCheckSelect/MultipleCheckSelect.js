import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Utils from "../Utils/Utils";

const utils = Utils();
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const MultipleCheckSelect = ({ desc, data, sx, onChange }) => {
  const [sel, setSel] = useState(data);

  const textStyle = {
    fontWeight: 500,
    m: "0 0 0.1rem 0",
  };
  const formStyle = {
    width: "100%",
    backgroundColor: "white",
  };
  const selectStyle = {
    "& .MuiOutlinedInput-input": {
      padding: 0,
      margin: "7.5px 0 7.5px 14px",
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
  const chipBoxParent = {
    height: "1.4375em",
    overflow: "hidden",
  };
  const chipBoxStyle = {
    display: "flex",
    gap: 0.5,
    overflowX: "scroll",
    height: `calc(100% + ${utils.getScrollbarWidth()}`,
  };
  const chipStyle = {
    height: "auto",
    "& .MuiChip-deleteIcon": {
      fontSize: "1.25rem",
    },
  };

  const handleChange = (event) => {
    let value = event?.target?.value;
    value = typeof value === "string" ? value.split(", ") : value;
    setSel(value);
  };

  const handleDelete = (index) => {
    const copy = sel.slice();
    copy.splice(index, 1);
    setSel(copy);
  };

  const handleClose = () => {
    sel.length === 0 && setSel(data);
  };

  useEffect(() => {
    onChange(sel);
  }, [sel, onChange]);

  return (
    <Box sx={sx}>
      <Typography variant="body3" sx={textStyle} color="primary">
        {desc}
      </Typography>
      <FormControl sx={formStyle}>
        <Select
          multiple
          displayEmpty
          sx={selectStyle}
          value={sel}
          onChange={handleChange}
          onClose={handleClose}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select here</em>;
            }
            return (
              <Box sx={chipBoxParent}>
                <Box sx={chipBoxStyle}>
                  {selected.map((value, index) => (
                    <Chip
                      sx={chipStyle}
                      color="primary"
                      key={index}
                      label={value.label}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      onDelete={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                    />
                  ))}
                </Box>
              </Box>
            );
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item}>
              <Checkbox checked={sel.indexOf(item) > -1} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultipleCheckSelect;
