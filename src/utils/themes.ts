export const lightTheme = {
  accentColor: "#ECECEC", // Inputs
  bodyColor: "#fff",
  inputColorLight: "#ececec",
  overlayColor: "#FBFBFB",
  headingColor: "#373737",
  subHeading: "#696969",
  textColor: "rgba(15,15,15,.7)",
  shadow: "0px 4px 7px 2px rgb(213,213,213)",
  highlightColor: "#b11e29",
  highlightColorText: "#fff",
  btnPrimaryLight: "#b11e29",
  btnPrimaryDark: "#b11e29",
  btnBorder: "none",
  green: "#0B9B23",
  btnText: "#fff",
  dangerRed: "#b72b2b",
  border: "1px solid rgba(0,0,0,0.1)",
  seperator: "rgba(0,0,0,0.1)",
  borderHovered: "rgba(0,0,0,0.3)",
  // New Color
  textPrimary: "#252525",
  textPrimaryContrast: "#fff",
  textSecondary: "#737373",
  textSecondaryContrast: "#fbfbfb",
  // New Accents
  accent1: "#fafafa",
  // accent2: "#eaeaea",
  accent2: "#f1f1f1",
  // accent3: "#999",
  accent3: "#eaeaea",
  blue: "#2e87fc",
};

export const darkTheme = {
  mainColor: "#3B3B3B",
  accentColor: "#5B5B5B",
  inputColorLight: "#505050",
  btnBorder: "1px solid #FFF",
  bodyColor: "#fff",
  overlayColor:
    "linear-gradient(128deg,rgba(102, 102, 102, 1) 0%,rgba(91, 91, 91, 1) 100%)",
  headingColor: "#FFF",
  subHeading: "#D8D8D8",
  textColor: "#FFF",
  shadow: "none",
  highlightColor: "#2d2d2d",
  highlightColorText: "#fff",
  btnPrimaryLight: "#797979",
  btnPrimaryDark: "#3B3B3B",
  green: "#1AD439",
  btnText: "#fff",
  dangerRed: "hsl(0, 100%, 69.6%)",
  border: "1px solid #D8D8D8",
  seperator: "rgba(250,250,250,0.3)",
  borderHovered: "rgba(0,0,0,0.3)",
  // New Color
  textPrimary: "#fff",
  textPrimaryContrast: "#252525",
  textSecondary: "#ececec",
  textSecondaryContrast: "#fbfbfb",
  // New Accents
  accent1: "#111",
  accent2: "#333",
  accent3: "#444",
  blue: "#2e87fc",
};
export const up = (breakpoint: string) => `@media (min-width: ${breakpoint})`;
export const down = (breakpoint: string) => `@media (max-width: ${breakpoint})`;
