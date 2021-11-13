import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PetThumbnail(props) {
  function showPetDetails() {
    alert(
      `Nombre: ${props.petData.name}\r\nEspecie: ${props.petData.species}\r\nRaza: ${props.petData.race}\r\nNacimiento: ${props.petData.birthDate}`
    );
  }
  return (
    <View>
      <TouchableOpacity onPress={() => showPetDetails()} style={styles.button}>
        <MaterialCommunityIcons name="dog" color={"#767676"} size={26} />
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
    padding: 20,
  },
});
