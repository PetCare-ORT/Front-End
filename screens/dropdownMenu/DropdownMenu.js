import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, NativeBaseProvider } from "native-base";
import Constants from "../../lib/Constants";
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../context";
import Colors from "../../lib/Colors.js";
import Styles from "../../lib/Styles.js";

export default function DropdownMenu() {
  const { state, dispatch } = useContext(GlobalContext);
  const navigation = useNavigation();

  return (
    <View style={Styles.dropDownContainer}>
      <Menu>
        <MenuTrigger>
          <NativeBaseProvider>
            <Avatar
              bg="green.500"
              size="sm"
              source={{
                uri: state.userData.photoUrl,
              }}
            >
              SS
            </Avatar>
          </NativeBaseProvider>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            marginTop: 35,
          }}
          customStyles={optionsStyles}
        >
          <MenuOption
            text="Profile"
            onSelect={() => navigation.navigate(Constants.PROFILE_VIEW)}
          />
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

const optionsStyles = {
  optionsContainer: {
    backgroundColor: Colors.BLACK,
    padding: 1,
  },
  optionWrapper: {
    backgroundColor: Colors.PRIMARY_BLUE,
    padding: 10,
  },
  optionText: {
    color: Colors.PRIMARY_WHITE,
  },
};
