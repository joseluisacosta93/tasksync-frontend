const light = {
  primary: "#007FFF",
  secondary: "rgba(0, 0, 0, 0.5)",
  background: "#F9FAF9",
  text: "#171A2A",
  success: "#6bb178",
  error: "#f44336",
  shadow: "#dfdfe0",
  card: "#FFFFFF",
  textButton: "#F9FAF9",
  textOnCard: "#171A2A",
  input: "#FFFFFF",
  inputDisabled: "#D9D9D9",
  placeHolder: "#D3D3D3",
};

const dark = {
  primary: "#007FFF",
  secondary: "rgba(255, 255, 255,0.5)",
  background: "#171A2A",
  text: "#F9FAF9",
  success: "#6bb178",
  error: "#f44336",
  shadow: "rgba(0, 0, 0, 0.1)",
  card: "#64667D",
  textButton: "#F9FAF9",
  textOnCard: "#171A2A",
  input: "#FFFFFF",
  inputDisabled: "#D9D9D9",
  placeHolder: "#D3D3D3",
};

const themeColor = Object.assign({ dark, light });

export type IThemeColor = typeof light;
export { themeColor };
