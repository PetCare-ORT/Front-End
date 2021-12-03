import React, { useContext } from "react";
import { View, Button, Alert, Platform } from "react-native";
import Constants from "../../lib/Constants";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../context";

export default function LogOutButton() {
  const { state, dispatch } = useContext(GlobalContext);
  const navigation = useNavigation();

  function logout() {
    try {
      dispatch({ type: "LOGOUT" });
      navigation.navigate(Constants.LOGIN_VIEW);
    } catch (error) {
      console.log(error);
    }
  }

  function logoutWeb() {
    if (confirm(Constants.LOGOUT_QUESTION)) {
      logout();
    }
  }

  function logoutMobile() {
    Alert.alert("Logout", Constants.LOGOUT_QUESTION, [
      {
        text: "Cancel",
        onPress: () => null,
      },
      {
        text: "Confirm",
        onPress: () => logout(),
      },
    ]);
  }

  return (
    <View>
      <Button
        onPress={() => {
          Platform.OS === "web" ? logoutWeb() : logoutMobile();
        }}
        title="Logout"
        color="#eb4034"
      />
    </View>
  );
}
