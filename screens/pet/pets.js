import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Pets() {
  return (
    <View style={styles.container}>
      <Text>Pets</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "flex-end",
  },
});
