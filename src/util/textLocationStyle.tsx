import { ViewStyle } from "react-native";

export const textLocationStyle = (textLocation: string): ViewStyle => {
  switch (textLocation) {
    case "1":
      return { justifyContent: "flex-start", alignItems: "flex-start" };
    case "2":
      return { justifyContent: "flex-start", alignItems: "center" };
    case "3":
      return { justifyContent: "flex-start", alignItems: "flex-end" };
    case "4":
      return { justifyContent: "center", alignItems: "flex-start" };
    case "5":
      return { justifyContent: "center", alignItems: "center" };
    case "6":
      return { justifyContent: "center", alignItems: "flex-end" };
    case "7":
      return { justifyContent: "flex-end", alignItems: "flex-start" };
    case "8":
      return { justifyContent: "flex-end", alignItems: "center" };
    case "9":
      return { justifyContent: "flex-end", alignItems: "flex-end" };
    default:
      return { justifyContent: "center", alignItems: "center" };
  }
};
