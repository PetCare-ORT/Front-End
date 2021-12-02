import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";

export default function PetThumbnail(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(Constants.PET_DETAIL_VIEW, {
            pet: props.petData,
          });
        }}
        style={styles.button}
      >
        <MaterialCommunityIcons name="dog" color={"#f2e9e9"} size={30} />
        <Text style={{ color: "#f2e9e9", fontWeight: "bold" }}>
          {props.petData.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fb5b5a",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    minWidth: Platform.OS === "web" ? "45vw" : "45%",
    minHeight: "95%",
    elevation: 3,
  },
});
