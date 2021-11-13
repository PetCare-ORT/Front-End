import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../lib/Constants.js";

export default function LoginScreen({ navigation }) {
  function login() {
    navigation.navigate(Constants.MAIN_VIEW);
  }

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={() => login()}>
        <Text> LOGIN </Text>
      </TouchableOpacity>
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
});
