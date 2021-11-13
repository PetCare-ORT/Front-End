import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import Constants from "../../lib/Constants.js";
import * as Google from "expo-auth-session/providers/google";

export default function LoginScreen({ navigation }) {
  function login() {
    navigation.navigate(Constants.MAIN_VIEW);
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "27396392572-bio472p3pmkg4b2icr7qnovq7rbaq5a3.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Autenticando data:", authentication);

      //llamar API de google para traerme info de usuario

      //fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${authentication.accessToken}`)
      //.then(res => res.json())
      //.then(data => {
      //  console.log("User data:", data)
      // });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={() => login()}>
        <Text> LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync().then(() => login());
        }}
      >
        <Text> LOGIN CON GOOGLE </Text>
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
