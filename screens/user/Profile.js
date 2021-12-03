import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalContext from "../../context";
import Constants from "../../lib/Constants.js";
import Icons from "../../lib/Icons";

export default function Profile({ navigation }) {
  const { state, dispatch } = useContext(GlobalContext);

  const userData = state.userData;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: userData.photoUrl
            ? userData.photoUrl
            : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        }}
        style={styles.photo}
      />
      <Text style={styles.title}>
        Username: {userData.username}
        {"\n"}
        Email: {userData.email}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          navigation.navigate(Constants.USER_FORM_VIEW, { user: userData });
        }}
      >
        <MaterialCommunityIcons
          name={Icons.PROFILE_EDIT}
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
