import { IThemeColor, themeColor } from "../theme-color";
import { useColorScheme } from "./useColorScheme";

export const useColor = () => {
  const scheme = useColorScheme();
  if (scheme === "dark") {
    return themeColor.dark as IThemeColor;
  }
  return themeColor.light as IThemeColor;
};
