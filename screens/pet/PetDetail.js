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
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
        }}
        style={styles.photo}
      />
      <Text style={styles.title}>
        <Text>
          Name: {pet.name}
          {"\n"}
        </Text>
        <Text>
          Species: {pet.species}
          {"\n"}
        </Text>
        <Text>
          Race: {pet.race}
          {"\n"}
        </Text>
        <Text>
          Birth Date: {new Date(pet.birthDate).toLocaleDateString()}
          {"\n"}
        </Text>
        <Text>Gender {pet.gender}</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Platform.OS === "web" ? deleteWeb() : deleteMobile();
        }}
      >
        <MaterialCommunityIcons
          name="delete-circle"
          color={"#d11515"}
          size={60}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          navigation.navigate(Constants.PET_FORM_VIEW, { pet: pet });
        }}
      >
        <MaterialCommunityIcons
          name="circle-edit-outline"
          color={"#d11515"}
          size={60}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    flex: 3,
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  photo: {
    flex: 2,
    height: 200,
    resizeMode: "center",
    margin: 5,
  },
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
