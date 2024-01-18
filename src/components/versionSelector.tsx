// VersionSelector.js

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface VersionSelectorProps {
  version: string;
  setVersion: (version: string) => void;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({
  version,
  setVersion,
}) => {
  return (
    <View style={styles.versionContainer}>
      {[1, 2, 3, 4, 5].map((ver) => (
        <TouchableOpacity
          key={ver}
          style={styles.versionButton}
          onPress={() => setVersion(`ver${ver}`)}
        >
          <Text
            style={[
              styles.versionButtonText,
              version === `ver${ver}` && styles.selectedVersion,
            ]}
          >
            #{ver}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  versionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  versionButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  versionButtonText: {
    color: "grey",
    fontSize: 18,
  },
  selectedVersion: {
    color: "red",
  },
});

export default VersionSelector;
