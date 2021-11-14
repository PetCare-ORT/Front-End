import React from "react";
import { StyleSheet, Button, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuContext } from "react-native-popup-menu";

import Constants from "./lib/constants.js";
import LoginScreen from "./screens/Login/LoginScreen.js";
import Main from "./screens/mainScreens/main.js";
import DropdownMenu from "./screens/dropdownMenu/dropdownMenu.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Constants.LOGIN_VIEW}
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Constants.MAIN_VIEW}
            component={Main}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuContext>
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
