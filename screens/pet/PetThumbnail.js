import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";

export default function PetThumbnail(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Constants.PET_DETAIL_VIEW, {
            pet: props.petData,
          })
        }
        style={styles.button}
      >
        <MaterialCommunityIcons name="dog" color={"#767676"} size={30} />
        <Text>{props.petData.name}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#77c8ed",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 50,
  },
});
