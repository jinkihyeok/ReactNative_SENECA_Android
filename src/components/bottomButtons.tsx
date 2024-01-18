import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

interface CameraButtonsProps {
  pickImage: () => void;
  handleTakePicture: () => void;
  onClickFlipBtn: () => void;
}

export const CameraButtons: React.FC<CameraButtonsProps> = ({
  pickImage,
  handleTakePicture,
  onClickFlipBtn,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <Ionicons name="ios-albums-outline" size={30} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTakePicture} style={styles.cameraButton}>
        <Ionicons name="ios-radio-button-on" size={60} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickFlipBtn}>
        <EvilIcons name="refresh" size={40} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

interface ImageButtonsProps {
  toggle: boolean;
  reTake: () => void;
  handleShareImage: () => void;
  handleSaveImage: () => void;
}

export const ImageButtons: React.FC<ImageButtonsProps> = ({
  toggle,
  reTake,
  handleShareImage,
  handleSaveImage,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={toggle}
        onPress={() => !toggle && reTake()}
        style={styles.imagePickerButton}
      >
        <Ionicons
          name="return-down-back-outline"
          size={35}
          color={toggle ? "black" : "white"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={toggle}
        onPress={() => !toggle && handleShareImage()}
        style={styles.shareButton}
      >
        <Entypo name="share" size={35} color={toggle ? "black" : "white"} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={toggle}
        onPress={() => !toggle && handleSaveImage()}
        style={styles.saveButton}
      >
        <MaterialIcons
          name="save-alt"
          size={35}
          color={toggle ? "black" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  imagePickerButton: {
    marginRight: 20,
  },
  cameraButton: {
    marginHorizontal: 20,
  },
  shareButton: {
    marginVertical: 14,
  },
  saveButton: {
    marginLeft: 20,
  },
});
