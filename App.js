import React, { useReducer, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "react-native-popup-menu";
import Constants from "./lib/Constants.js";
import LoginScreen from "./screens/user/LoginScreen.js";
import Main from "./screens/mainScreens/Main.js";
import ProfileScreen from "./screens/user/Profile.js";
import UserForm from "./screens/user/UserForm.js";
import { Datos, reducer } from "./Reducer";
import GlobalContext from "./context";
import { getStoredToken } from "./utils/tokenStorage.js";
import LogOutButton from "./screens/dropdownMenu/LogOutButton.js";
import Colors from "./lib/Colors.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, Datos);

  useEffect(() => {
    getStoredToken().then((token) => {
      if (token) {
        dispatch({
          type: "LOGIN",
          payload: { token: token },
        });
      }
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
                headerStyle: {
                  backgroundColor: Colors.PRIMARY_BLUE,
                },
                headerTitleStyle: {
                  color: Colors.PRIMARY_WHITE,
                },
              }}
            />
            <Stack.Screen
              name={Constants.MAIN_VIEW}
              component={Main}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: Colors.PRIMARY_BLUE,
                },
                headerTitleStyle: {
                  color: Colors.PRIMARY_WHITE,
                },
              }}
            />
            <Stack.Screen
              name={Constants.PROFILE_VIEW}
              component={ProfileScreen}
              options={{
                headerRight: () => <LogOutButton />,
                title: state.userData.username,
                headerStyle: {
                  backgroundColor: Colors.PRIMARY_BLUE,
                },
                headerTitleStyle: {
                  color: Colors.PRIMARY_WHITE,
                },
              }}
            />
            <Stack.Screen
              name={Constants.USER_FORM_VIEW}
              component={UserForm}
              options={{
                headerStyle: {
                  backgroundColor: Colors.PRIMARY_BLUE,
                },
                headerTitleStyle: {
                  color: Colors.PRIMARY_WHITE,
                },
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
