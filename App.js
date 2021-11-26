import React, { useReducer, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "react-native-popup-menu";
import Constants from "./lib/Constants.js";
import LoginScreen from "./screens/login/LoginScreen.js";
import Main from "./screens/mainScreens/Main.js";
import { Datos, reducer } from "./Reducer";
import GlobalContext from "./context";
import { getStoredToken } from "./utils/tokenStorage.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, Datos);

  useEffect(() => {
    getStoredToken().then((token) => {
      dispatch({
        type: "LOGIN",
        payload: { token: token },
      });
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <MenuProvider>
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
      </MenuProvider>
    </GlobalContext.Provider>
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
