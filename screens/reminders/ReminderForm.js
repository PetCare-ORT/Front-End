import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "../../lib/Constants.js";
import { addReminder, editReminder } from "../../services/remindersApi";
import Styles from "../../lib/Styles.js";
import { DatePicker } from "../../utils/datePicker.js";

export default function RemindersForm({ navigation, route }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      route.params.reminder !== null
        ? {
            name: route.params.reminder.name,
            alarmDate: new Date(
              route.params.reminder.alarmDate
            ).toLocaleTimeString("en-US"),
          }
        : {
            name: "",
            alarmDate: new Date().toLocaleTimeString("en-US"),
          },
  });
  const onSubmitCreate = async (reminder) => {
    try {
      reminder.alarmDate = Date.parse(reminder.alarmDate);
      await addReminder(reminder).then(() => {
        alert("Reminder added successfully!");
        navigation.navigate(Constants.REMINDERS_VIEW, { reload: true });
      });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitEdit = async (reminder) => {
    try {
      const reminderId = route.params.reminder._id;
      reminder.alarmDate = Date.parse(reminder.alarmDate);
      await editReminder(reminderId, reminder).then(() => {
        alert(`${reminder.name} was successfully updated!`);
        navigation.navigate(Constants.REMINDERS_VIEW, { reload: true });
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Alarm date</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) =>
            Platform.OS === "web" ? (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            ) : (
              <DatePicker formOnChange={onChange} defaultValue={value} />
            )
          }
          name="alarmDate"
          rules={{ required: true }}
        />

        <TouchableOpacity
          style={Styles.formButton}
          onPress={() => {
            route.params.reminder !== null
              ? handleSubmit(onSubmitEdit)()
              : handleSubmit(onSubmitCreate)();
          }}
        >
          <Text style={Styles.fromButtonText}>
            {route.params.pet !== null ? "EDIT" : "CREATE"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "black",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    padding: 8,
    backgroundColor: "#ffffff",
  },
  input: {
    backgroundColor: "#ffe3a1",
    borderColor: "transparent",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
