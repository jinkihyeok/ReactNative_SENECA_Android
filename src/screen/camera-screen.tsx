import { AutoFocus, Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";
import { useEffect, useRef, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
import PatternView from "../components/patternView";
import DateVersion from "../components/dateVersion";
import ColorSelector from "../components/colorSelector";
import SizeSlider from "../components/sizeSlider";
import AutoSaveToggle from "../components/autoSaveToggle";
import {
  pickImage,
  saveImage,
  shareImage,
  takePicture,
} from "../util/cameraUtils";
import LocationButtons from "../components/textLocation";
import VersionSelector from "../components/versionSelector";
import { loadSettings, saveSettings } from "../util/asyncStorage";
import PermissionCheck from "../components/permissionCheck";
import { textLocationStyle } from "../util/textLocationStyle";
import { CameraButtons, ImageButtons } from "../components/bottomButtons";

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const snapshotRef = useRef<ViewShot | null>(null);
  const [onCameraReady, setOnCameraReady] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [pickedDateTime, setPickedDateTime] = useState<string | null>(null);
  const [textLocation, setTextLocation] = useState<string>("5");
  const [fontColor, setFontColor] = useState<string>("white");
  const [version, setVersion] = useState<string>("ver1");
  const [sliderValue, setSliderValue] = useState<number>(23);
  const [toggle, setToggle] = useState<boolean>(false);
  const [showDateVersion, setShowDateVersion] = useState(false);
  const [isViewShotReady, setIsViewShotReady] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await loadSettings();
      if (settings) {
        setTextLocation(settings.textLocation);
        setFontColor(settings.fontColor);
        setVersion(settings.version);
        setSliderValue(settings.sliderValue);
        setToggle(settings.toggle);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    saveSettings({ textLocation, fontColor, version, sliderValue, toggle });
  }, [textLocation, fontColor, version, sliderValue, toggle]);

  async function requestPermissions() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    setHasCameraPermission(cameraPermission.granted);
    setHasMediaLibraryPermission(mediaLibraryPermission.granted);
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  async function handleTakePicture() {
    const uri = await takePicture(cameraRef);
    setImage(uri);
  }

  useEffect(() => {
    if (image && toggle && isViewShotReady) {
      setTimeout(handleSaveImage, 1000);
    }
  }, [image, toggle, isViewShotReady]);

  async function handleSaveImage() {
    if (snapshotRef.current?.capture) {
      const success = await saveImage(snapshotRef);
      if (success) {
        setImage(null);
        setPickedDateTime(null);
        setShowDateVersion(false);
        if (toggle === false) {
          Alert.alert("사진이 저장되었습니다.");
        }
      }
    }
  }

  async function handleShareImage() {
    if (snapshotRef.current?.capture) {
      await shareImage(snapshotRef);
    }
  }

  async function handlePickImage() {
    await pickImage(setPickedDateTime, setImage, setToggle, toggle);
  }

  function onClickFlipBtn() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function reTake() {
    setImage(null);
    setPickedDateTime(null);
    setShowDateVersion(false);
  }

  useEffect(() => {
    if (image === null && onCameraReady) {
      const timer = setTimeout(() => {
        setShowDateVersion(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [image, onCameraReady]);

  return (
    <PermissionCheck
      hasCameraPermission={hasCameraPermission}
      hasMediaLibraryPermission={hasMediaLibraryPermission}
    >
      {hasCameraPermission && hasMediaLibraryPermission && (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <ColorSelector setFontColor={setFontColor} />
            <SizeSlider
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
            <AutoSaveToggle
              toggle={toggle}
              setToggle={setToggle}
              image={image}
            />
          </View>
          {!image ? (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={type}
              autoFocus={AutoFocus.on}
              onCameraReady={() => setOnCameraReady(true)}
            >
              <View style={[styles.bgImage, textLocationStyle(textLocation)]}>
                <LocationButtons setTextLocation={setTextLocation} />
                {showDateVersion && (
                  <View style={styles.dateContainer}>
                    <DateVersion
                      version={version}
                      sliderValue={sliderValue}
                      pickedDateTime={pickedDateTime}
                      fontColor={fontColor}
                    />
                  </View>
                )}
                <View style={styles.PatternViewContainer}>
                  <PatternView />
                </View>
              </View>
            </Camera>
          ) : (
            <ViewShot
              style={{ flex: 1 }}
              ref={snapshotRef}
              onLayout={() => setIsViewShotReady(true)}
            >
              <ImageBackground
                source={{ uri: image }}
                style={[styles.camera, textLocationStyle(textLocation)]}
              >
                <LocationButtons setTextLocation={setTextLocation} />
                <View style={styles.dateContainer}>
                  <DateVersion
                    version={version}
                    sliderValue={sliderValue}
                    pickedDateTime={pickedDateTime}
                    fontColor={fontColor}
                  />
                </View>
              </ImageBackground>
            </ViewShot>
          )}
          <VersionSelector version={version} setVersion={setVersion} />
          {!image ? (
            <CameraButtons
              pickImage={handlePickImage}
              handleTakePicture={handleTakePicture}
              onClickFlipBtn={onClickFlipBtn}
            />
          ) : (
            <ImageButtons
              toggle={toggle}
              reTake={reTake}
              handleShareImage={handleShareImage}
              handleSaveImage={handleSaveImage}
            />
          )}
        </View>
      )}
    </PermissionCheck>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  topContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  PatternViewContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    flex: 1,
    position: "absolute",
  },
});
