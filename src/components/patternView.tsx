import { View, Text, StyleSheet } from "react-native";

function PatternView() {
  return (
    <>
      <View style={styles.verticalContainer}></View>
      <View style={styles.horizontalContainer}></View>
    </>
  );
}

export default PatternView;

const styles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    width: "34%",
    height: "100%",
    position: "absolute",
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: "white",
  },
  horizontalContainer: {
    flex: 1,
    width: "100%",
    height: "34%",
    position: "absolute",
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: "white",
  },
});
