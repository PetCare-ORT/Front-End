import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Constants from "../../lib/Constants.js";
import { deleteReminder } from "../../services/remindersApi.js";
import Styles from "../../lib/Styles.js";
import { useToast } from "react-native-toast-notifications";

export default function reminderDetail({ navigation, route }) {
  const { reminder } = route.params;
  const toast = useToast();

  const deleteReminder = async () => {
    try {
      await deleteReminder(reminder._id).then(() => {
        toast.show("Reminder deleted successfully!");
        navigation.navigate(Constants.REMINDERS_VIEW, { reload: true });
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
      Constants.DELETE_CONFIRM(reminder.name),
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
      <Text style={Styles.petDetailTextContainer}>
        <Text>
          Name: {reminder.name}
          {"\n"}
          Alarm Date: {new Date(reminder.alarmDate).toLocaleTimeString()}
        </Text>
      </Text>
      <View style={Styles.detailButtonsContainer}>
        <TouchableOpacity
          style={Styles.petDetailEditButton}
          onPress={() => {
            navigation.navigate(Constants.REMINDERS_FORM_VIEW, {
              reminder: reminder,
            });
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
