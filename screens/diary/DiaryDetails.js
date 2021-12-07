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
import { useToast } from "react-native-toast-notifications";
import { deleteDiary } from "../../services/diaryApi.js";

export default function diaryDetail({ navigation, route }) {
  const { diary } = route.params;
  const toast = useToast();

  const deleteDiary = async () => {
    try {
      await deleteDiary(diary._id).then(() => {
        toast.show("Entry deleted successfully!");
        navigation.navigate(Constants.DIARY_VIEW, { reload: true });
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
      Constants.DELETE_CONFIRM(diary.title),
      Constants.ACTION_CANNOT_BE_REVERSED,
      [
        {
          text: "Cancel",
          onPress: () => null,
        },
        {
          text: "Confirm",
          onPress: () => deleteDiary(),
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
          Title: {diary.title}
          {"\n"}
        </Text>
        <Text>
          Description: {diary.description}
          {"\n"}
        </Text>
        <Text>
          Date: {new Date(diary.date).toLocaleDateString()}
          {"\n"}
        </Text>
        <Text> {diary.attatchment}</Text>
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
          navigation.navigate(Constants.DIARY_FORM_VIEW, { diary: diary });
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
