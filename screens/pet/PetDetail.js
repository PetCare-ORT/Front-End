import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";
import GlobalContext from "../../context";

export default function petDetail({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const { pet } = route.params;

  const deletePet = async () => {
    try {
      const headers = new Headers();
      headers.append("Content-type", "application/json");
      headers.append("Token", state.token);
      const requestOptions = {
        method: "DELETE",
        headers: headers,
      };
      fetch(Constants.HOST + "/api/pets/" + pet._id, requestOptions)
        .then((resp) => {
          if (!resp.ok) {
            throw Error("Delete Error:" + resp.statusText);
          } else {
            alert("Pet deleted successfully!");
            navigation.navigate(Constants.PETS_VIEW, { reload: true });
          }
        })
        .catch((error) => {
          alert("Error coso: " + error);
        });
    } catch (error) {
      alert("Error: " + error);
    }
  };

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
          Birth Date: {pet.birthDate}
          {"\n"}
        </Text>
        <Text>Gender {pet.gender}</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deletePet();
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
          alert("edit");
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
