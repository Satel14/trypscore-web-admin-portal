import { createTheme } from "@mui/material/styles";

const mobileView = "@media (max-width:743px) and (min-width:300px)";
const tabletView = "@media (max-width:1280px) and (min-width:744px)";
const largeView = "@media (min-width:2000px)";

/**
 * Custom styles to be apply to all components within the app
 * @returns mui theme object to be reference in MUI ThemeProvider component
 */

const getCustomMuiTheme = () => {
  const customTheme = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            marginBottom: "1rem",
            width: "100%",
            color: "#2E117F",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "-5px 5px 6px 1px #E6E6E6",
            width: "92%",
          },
          option: {
            color: "#2E117F",
            fontSize: "1.2rem",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Montserrat",
            fontWeight: 700,
            padding: "10px 32px",
            minWidth: 0,
            borderRadius: "5px",
            fontSize: "1rem",
            textTransform: "none",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: "0 5%",
            [mobileView]: {
              padding: "0 24px",
            },
            [tabletView]: {
              padding: "0 40px",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            color: "#2E117F",
            fontWeight: 500,
            "& .MuiSvgIcon-root": {
              fontSize: "1.5rem",
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "32px",
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: "#2E117F",
            fontSize: "1rem",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            fontSize: "inherit",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: "#2E117F",
            fontSize: "1rem",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          adornedStart: {
            "& .MuiInputAdornment-root:first-child": {
              marginRight: "14px",
              fontSize: "1.25rem",
            },
          },
          adornedEnd: {
            "& .MuiInputAdornment-root:not(:first-child)": {
              marginLeft: "14px",
              fontSize: "1.25rem",
            },
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            color: "#2E117F",
            fontSize: "1rem",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            "&:hover:not(.Mui-disabled)": {
              cursor: "pointer",
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            display: "flex",
            flexDirection: "column",
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          notched: true,
        },
        styleOverrides: {
          root: {
            color: "#2E117F",
            fontSize: "1rem",
          },
          notchedOutline: {
            borderColor: "#2E117F",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            color: "#2E117F",
          },
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          color: "primary",
          fontSize: "inherit",
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            color: "#2E117F",
            fontSize: "2rem",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#FFFFFF",
            color: "#2E117F",
            borderRadius: "5px",
            textWrap: "wrap",
            maxWidth: "245px",
            padding: "10px",
          },
        },
      },
    },
    palette: {
      //darkest purple
      primary: {
        main: "#2E117F",
      },
      //dark purple
      primaryLight: {
        main: "#5315BC",
      },
      //pink
      secondary: {
        main: "#C31CF3",
      },
      //purple
      focused: {
        main: "#9B57EC",
      },
      //blue
      info: {
        main: "#1E7DFF",
      },
      //grey
      slate: {
        main: "#747474",
      },
      //light grey
      grain: {
        main: "#EAEAEA",
      },
      //green
      success: {
        main: "#028931",
      },
      //red
      error: {
        main: "#CE0C14",
      },
    },
    typography: {
      // We are keeping the base font size at 16px rather than the style guide's 20px.
      // Mobile has a font size of 90% as indicated in the style guide (18/20 = 90%) specified in index.css
      // To convert to rem, do style size / 16px. ex: 25px/16px = 1.5625rem
      // The commented fontSizes are the pixel sizes in the style guide (or on the mockup)
      fontFamily: "Montserrat",
      h1: {
        // SECTION HEADER
        fontFamily: "Montserrat",
        fontSize: "2.44125rem", // 39.06px
        fontWeight: 800, // Extrabold
        lineHeight: 1.5,
        textTransform: "uppercase",
      },
      h2: {
        // SUBHEADER
        fontFamily: "Montserrat",
        fontSize: "1.953125rem", // 31.25px
        fontWeight: 800, // Extrabold
        lineHeight: 1.5,
        textTransform: "uppercase",
      },
      h3: {
        // Additional Text
        fontFamily: "Montserrat",
        fontSize: "1.5625rem", // 25px
        fontWeight: 700, // Bold
        lineHeight: 1.5,
        textTransform: "uppercase",
      },
      h4: {
        // (approximation, not in style guide)
        fontFamily: "Montserrat",
        fontSize: "1.25rem", // 20px
        fontWeight: 800, // Extrabold
        lineHeight: 1.5,
      },
      h5: {
        // (approximation, not in style guide)
        fontFamily: "Montserrat",
        fontSize: "1rem", // 16px
        fontWeight: 800, // Extrabold
        lineHeight: 1.5,
      },
      body1: {
        // Body Text, Button, Placeholder Text (use <em> for italics)
        fontSize: "1.25rem", // 20px
        fontWeight: 400, // Regular
        lineHeight: 1.5,
      },
      body2: {
        // (approximation, not in style guide)
        fontSize: "0.875rem", // 14px
        fontWeight: 400, // Regular
        lineHeight: 1.5,
      },
      body3: {
        // (approximation, not in style guide)
        fontFamily: "Montserrat",
        fontSize: "1rem", // 16px
        fontWeight: 400, // Regular
        lineHeight: 1.5,
      },
      subtitle1: {
        // (approximation, not in style guide)
        fontFamily: "Montserrat",
        fontSize: "1.5rem", // 24px
        fontWeight: 800, // Extrabold
        lineHeight: 1.5,
        textTransform: "uppercase",
      },
    },
  });

  return customTheme;
};

export default getCustomMuiTheme;
