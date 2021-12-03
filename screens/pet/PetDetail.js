import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";
import { deletePet } from "../../services/petsApi.js";
import Icons from "../../lib/Icons.js";
import Colors from "../../lib/Colors.js";
import Styles from "../../lib/Styles.js";

export default function petDetail({ navigation, route }) {
  const { pet } = route.params;

  const petDelete = async () => {
    try {
      await deletePet(pet._id).then(() => {
        alert("Pet deleted successfully!");
        navigation.navigate(Constants.PETS_VIEW, { reload: true });
      });
    } catch (error) {
      alert(error);
    }
  };

  function deleteWeb() {
    if (confirm(Constants.ACTION_CANNOT_BE_REVERSED)) {
      logout();
    }
  }

  function deleteMobile() {
    Alert.alert(
      Constants.DELETE_CONFIRM(pet.name),
      Constants.ACTION_CANNOT_BE_REVERSED,
      [
        {
          text: "Cancel",
          onPress: () => null,
        },
        {
          text: "Confirm",
          onPress: () => petDelete(),
        },
      ]
    );
  }

  return (
    <View style={Styles.petListContainer}>
      <Image
        source={{
          uri: pet.photoUri ? pet.photoUri : Constants.GENERIC_PETS,
        }}
        style={Styles.petDetailPhoto}
      />
      <Text style={Styles.petDetailTextContainer}>
        <Text>
          Name: {pet.name}
          {"\n"}
          Species: {pet.species}
          {"\n"}
          Race: {pet.race}
          {"\n"}
          Birth Date: {new Date(pet.birthDate).toLocaleDateString()}
          {"\n"}
          Gender: {pet.gender}
        </Text>
      </Text>
      <View style={Styles.petDetailButtonsContainer}>
        <TouchableOpacity
          style={Styles.petDetailEditButton}
          onPress={() => {
            navigation.navigate(Constants.PET_FORM_VIEW, { pet: pet });
          }}
        >
          <Text style={Styles.petDetailButtonText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.petDetailDeleteButton}
          onPress={() => {
            Platform.OS === "web" ? deleteWeb() : deleteMobile();
          }}
        >
          <Text style={Styles.petDetailButtonText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 10,
    right: 5,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 80,
    right: 5,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
