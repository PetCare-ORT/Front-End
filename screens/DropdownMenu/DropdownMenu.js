// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import React from "react";

import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/constants";
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";

//onSelect={(value) => alert(`Selected number: ${value}`)}

export default function DropdownMenu({ props }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="account-circle"
            color={"#767676"}
            size={26}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{ marginTop: 40 }}
          customStyles={{ optionWrapper: { padding: 5 } }}
        >
          <MenuOption text="Account" onSelect={() => alert("Profile!")} />
          <MenuOption
            onSelect={
              () =>
                navigation.navigate(
                  Constants.LOGIN_VIEW
                ) /*Aca se debería hacer todo el metodo de logout*/
            }
          >
            <Text style={{ color: "red" }}>Logout</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
