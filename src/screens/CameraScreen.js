import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import DateVersion from "../components/DateVersion";
import ViewShot from "react-native-view-shot";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
Text.defaultProps.allowFontScaling = false;

function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [textLocation, setTextLocation] = useState("2");
  const [sliderValue, setSliderValue] = useState(25);
  const [fontColor, setFontColor] = useState("white");
  const [version, setVersion] = useState("ver1");
  const [pickedDateTime, setPickedDateTime] = useState(null);
  const snapShotRef = useRef();
  const [isCameraReady, setIsCameraReady] = useState(false);

  function onCameraReady() {
    setTimeout(() => {
      setIsCameraReady(true);
    }, 500);
  }

  useEffect(() => {
    (async () => {
      try {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const MediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(
          MediaLibraryPermission.status === "granted"
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const options = { quality: 1 };
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  async function saveImage() {
    try {
      const result = await snapShotRef.current.capture();
      const asset = await MediaLibrary.createAssetAsync(result);
      const album = await MediaLibrary.getAlbumAsync("Seneca");
      if (album === null) {
        await MediaLibrary.createAlbumAsync("Seneca", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      Alert.alert(
        "저장",
        "사진이 저장되었습니다.",
        [
          {
            text: "확인",
            onPress: () => {
              reTake();
            },
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  function reTake() {
    setImage(null);
    setPickedDateTime(null);
    setIsCameraReady(false);
    setTimeout(() => {
      setIsCameraReady(true);
    }, 500);
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [5, 4],
        quality: 1,
        exif: true,
      });

      const pickedDateTime = result.assets[0].exif.DateTimeOriginal;
      if (!result.canceled && pickedDateTime !== undefined) {
        setPickedDateTime(pickedDateTime);
        setImage(result.assets[0].uri);
      } else if (pickedDateTime === undefined) {
        Alert.alert(
          "이미 적용된 사진이거나,\n시간 데이터가 존재하지 않는 사진입니다."
        );
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const textLocationStyle = () => {
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
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          카메라 접근 권한이 없습니다. {"\n"} 설정에서 카메라 접근 권한을 허용한
          후 {"\n"} 다시 시도해주세요.
        </Text>
      </View>
    );
  }

  if (hasMediaLibraryPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          사진 저장 권한이 없습니다. {"\n"} 설정에서 사진 저장 권한을 허용한 후
          {"\n"}
          다시 시도해주세요.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingBottom: 10,
              }}
            >
              Color
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: 40,
              backgroundColor: "#343434",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={() => setFontColor("white")}>
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  lineHeight: 44,
                }}
              >
                ●
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFontColor("black")}>
              <Text
                style={{
                  color: "black",
                  fontSize: 40,
                  lineHeight: 44,
                }}
              >
                ●
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topContainer}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingBottom: 10,
              }}
            >
              Size
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={14}
              maximumValue={36}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="grey"
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value)}
              step={1}
            />
          </View>
        </View>
      </View>
      {!image ? (
        <View style={{ flex: 1 }}>
          <Camera
            style={styles.camera}
            type={cameraType}
            ref={cameraRef}
            onCameraReady={onCameraReady}
          >
            {isCameraReady && (
              <View style={[styles.camera, textLocationStyle()]}>
                <View>
                  <DateVersion
                    version={version}
                    sliderValue={sliderValue}
                    pickedDateTime={pickedDateTime}
                    fontColor={fontColor}
                  />
                </View>
                <View style={styles.locationBtnContainer2}>
                  <View style={styles.topLocationBtn}>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("1")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("2")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("3")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                  </View>
                  <View style={styles.midLocationBtn}>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("4")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("5")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("6")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                  </View>
                  <View style={styles.botLocationBtn}>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("7")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("8")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                    <Pressable
                      style={styles.locationBtn}
                      onPress={() => setTextLocation("9")}
                    >
                      <Text>Touch</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </Camera>
        </View>
      ) : (
        <ViewShot
          style={{ flex: 1 }}
          ref={snapShotRef}
          options={{ quality: 1 }}
        >
          <ImageBackground
            source={{ uri: image }}
            style={[styles.camera, textLocationStyle()]}
          >
            <DateVersion
              version={version}
              sliderValue={sliderValue}
              pickedDateTime={pickedDateTime}
              fontColor={fontColor}
            />
            <View style={styles.locationBtnContainer2}>
              <View style={styles.topLocationBtn}>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("1")}
                >
                  <Text>Touch</Text>
                </Pressable>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("2")}
                >
                  <Text>Touch</Text>
                </Pressable>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("3")}
                >
                  <Text>Touch</Text>
                </Pressable>
              </View>
              <View style={styles.midLocationBtn}>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("4")}
                >
                  <Text>Touch</Text>
                </Pressable>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("5")}
                >
                  <Text>Touch</Text>
                </Pressable>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("6")}
                >
                  <Text>Touch</Text>
                </Pressable>
              </View>
              <View style={styles.botLocationBtn}>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("7")}
                >
                  <Text>Touch</Text>
                </Pressable>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("8")}
                >
                  <Text>Touch</Text>
                </Pressable>
                <Pressable
                  style={styles.locationBtn}
                  onPress={() => setTextLocation("9")}
                >
                  <Text>Touch</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </ViewShot>
      )}
      <View style={styles.versionContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setVersion("ver1")}
        >
          <Text
            style={[
              { color: "grey", fontSize: 18 },
              version === "ver1" && { color: "red" },
            ]}
          >
            #1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setVersion("ver2")}
        >
          <Text
            style={[
              { color: "grey", fontSize: 18 },
              version === "ver2" && { color: "red" },
            ]}
          >
            #2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setVersion("ver3")}
        >
          <Text
            style={[
              { color: "grey", fontSize: 18 },
              version === "ver3" && { color: "red" },
            ]}
          >
            #3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setVersion("ver4")}
        >
          <Text
            style={[
              { color: "grey", fontSize: 18 },
              version === "ver4" && { color: "red" },
            ]}
          >
            #4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setVersion("ver5")}
        >
          <Text
            style={[
              { color: "grey", fontSize: 18 },
              version === "ver5" && { color: "red" },
            ]}
          >
            #5
          </Text>
        </TouchableOpacity>
      </View>
      {!image ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.takePictureBtn}>
            <Ionicons name="ios-albums-outline" size={30} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.takePictureBtn}>
            <MaterialIcons name="camera" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCameraType(
                cameraType === CameraType.back
                  ? CameraType.front
                  : CameraType.back
              );
            }}
          >
            <EvilIcons name="refresh" size={40} color="grey" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer2}>
          <TouchableOpacity onPress={reTake} style={styles.reTakeBtn}>
            <Ionicons name="return-down-back-outline" size={35} color="white" />
          </TouchableOpacity>
          <View style={styles.takePictureBtn}>
            <MaterialIcons name="camera" size={60} color="black" />
          </View>
          <TouchableOpacity onPress={saveImage} style={styles.saveBtn}>
            <MaterialIcons name="save-alt" size={35} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  topContainer: {
    paddingVertical: 20,
    width: "75%",
  },
  sliderContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  locationBtnContainer2: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
  },
  topLocationBtn: {
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  midLocationBtn: {
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  botLocationBtn: {
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  locationBtn: {
    width: "30%",
    height: "100%",
    opacity: 0,
  },
  versionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  camera: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  btnStyle: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    paddingVertical: 30,
  },
});
