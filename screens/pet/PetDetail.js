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
import Constants from "../../lib/Constants.js";
import { deletePet } from "../../services/petsApi.js";

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
    <View style={Styles.detailContainer}>
      <Image
        source={{
          uri: pet.photoUri ? pet.photoUri : Constants.GENERIC_PETS,
        }}
        style={Styles.detailPhoto}
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
      <View style={Styles.detailButtonsContainer}>
        <TouchableOpacity
          style={Styles.petDetailEditButton}
          onPress={() => {
            navigation.navigate(Constants.PET_FORM_VIEW, { pet: pet });
          }}
        >
          <Text style={Styles.detailButtonsText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.petDetailDeleteButton}
          onPress={() => {
            Platform.OS === "web" ? deleteWeb() : deleteMobile();
          }}
        >
          <Text style={Styles.detailButtonsText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
