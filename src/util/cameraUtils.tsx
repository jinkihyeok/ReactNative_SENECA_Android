import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { RefObject } from "react";
import ViewShot from "react-native-view-shot";

export async function takePicture(cameraRef: RefObject<Camera>) {
  if (cameraRef.current) {
    const data = await cameraRef.current.takePictureAsync();
    return data.uri;
  }
  return null;
}

export async function saveImage(snapshotRef: RefObject<ViewShot>) {
  if (snapshotRef.current?.capture) {
    const result = await snapshotRef.current.capture();
    const asset = await MediaLibrary.createAssetAsync(result);
    await MediaLibrary.createAlbumAsync("SENECA", asset, false);
    Alert.alert("알림", "사진이 저장되었습니다.", [{ text: "확인" }]);
    return true;
  }
  return false;
}

export async function shareImage(snapshotRef: RefObject<ViewShot>) {
  if (snapshotRef.current?.capture) {
    const result = await snapshotRef.current.capture();
    await Sharing.shareAsync(result, { dialogTitle: "공유하기" });
    return true;
  }
  return false;
}

export async function pickImage(
  setPickedDateTime: (date: string) => void,
  setImage: (uri: string) => void,
  setToggle: (toggle: boolean) => void,
  toggle: boolean
) {
  try {
    if (toggle) {
      Alert.alert("자동 저장 모드가 해제됩니다.");
      setToggle(false);
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [5, 4],
      quality: 1,
      exif: true,
    });

    if (result.assets !== null && !result.canceled) {
      const pickedDateTime = result.assets[0].exif?.DateTimeOriginal;
      if (pickedDateTime !== undefined) {
        setPickedDateTime(pickedDateTime);
        setImage(result.assets[0].uri);
      } else {
        Alert.alert(
          "이미 적용된 사진이거나,\n시간 데이터가 존재하지 않는 사진입니다."
        );
      }
    }
  } catch (e) {
    console.error(e);
  }
}
