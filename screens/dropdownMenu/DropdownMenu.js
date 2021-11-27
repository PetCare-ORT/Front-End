import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, HStack, Center, NativeBaseProvider } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants";
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../context";

//onSelect={(value) => alert(`Selected number: ${value}`)}

export default function DropdownMenu({ props }) {
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

  return (
    <View style={styles.container}>
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
          optionsContainerStyle={{ marginTop: 40 }}
          customStyles={{ optionWrapper: { padding: 5 } }}
        >
          <MenuOption
            text="Account"
            onSelect={() => navigation.navigate(Constants.PROFILE_VIEW)}
          />
          <MenuOption onSelect={() => logout()}>
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
