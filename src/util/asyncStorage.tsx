import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadSettings = async () => {
  try {
    const savedTextLocation =
      (await AsyncStorage.getItem("textLocation")) ?? "5";
    const savedFontColor = (await AsyncStorage.getItem("fontColor")) ?? "white";
    const savedVersion = (await AsyncStorage.getItem("version")) ?? "ver1";
    const savedSliderValue =
      (await AsyncStorage.getItem("sliderValue")) ?? "23";
    const savedToggleString = await AsyncStorage.getItem("toggle");
    const savedToggle = savedToggleString
      ? JSON.parse(savedToggleString)
      : false;

    return {
      textLocation: savedTextLocation,
      fontColor: savedFontColor,
      version: savedVersion,
      sliderValue: parseInt(savedSliderValue, 10),
      toggle: savedToggle,
    };
  } catch (error) {
    console.log("Error loading settings:", error);
    return null;
  }
};

export const saveSettings = async (settings: {
  textLocation: string;
  fontColor: string;
  version: string;
  sliderValue: number;
  toggle: boolean;
}) => {
  try {
    await AsyncStorage.setItem("textLocation", settings.textLocation);
    await AsyncStorage.setItem("fontColor", settings.fontColor);
    await AsyncStorage.setItem("version", settings.version);
    await AsyncStorage.setItem("sliderValue", settings.sliderValue.toString());
    await AsyncStorage.setItem("toggle", JSON.stringify(settings.toggle));
  } catch (error) {
    console.log("Error saving settings:", error);
  }
};
