import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface PermissionCheckProps {
  hasCameraPermission: boolean | null;
  hasMediaLibraryPermission: boolean | null;
  children: ReactNode;
}

const PermissionCheck: React.FC<PermissionCheckProps> = ({
  hasCameraPermission,
  hasMediaLibraryPermission,
  children,
}) => {
  if (hasCameraPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          카메라 접근 권한이 없습니다. 설정에서 카메라 접근 권한을 허용한 후
          다시 시도해주세요.
        </Text>
      </View>
    );
  }

  if (hasMediaLibraryPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          갤러리 접근 권한이 없습니다. 설정에서 갤러리 접근 권한을 허용한 후
          다시 시도해주세요.
        </Text>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PermissionCheck;
