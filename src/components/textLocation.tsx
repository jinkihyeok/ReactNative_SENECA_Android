// LocationButtons.js

import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

interface LocationButtonsProps {
  setTextLocation: React.Dispatch<React.SetStateAction<string>>;
}

const LocationButtons: React.FC<LocationButtonsProps> = ({
  setTextLocation,
}) => {
  return (
    <View style={styles.locationButtonContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((location) => (
        <Pressable
          key={location}
          style={styles.locationButton}
          onPress={() => setTextLocation(location.toString())}
        >
          <Text style={styles.locationButtonText}>{location}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  locationButtonContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  locationButton: {
    width: `${100 / 3}%`,
    height: `${100 / 3}%`,
    justifyContent: "center",
    alignItems: "center",
  },
  locationButtonText: {
    color: "white",
    opacity: 0,
  },
});

export default LocationButtons;
