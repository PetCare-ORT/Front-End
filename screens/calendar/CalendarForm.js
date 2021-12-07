import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "../../lib/Constants.js";
import {
  addCalendarEntry,
  editCalendarEntry,
  getUserCalendarEntries,
} from "../../services/calendarApi";
import { DatePicker } from "../../utils/datePicker.js";
import Styles from "../../lib/Styles.js";
import { useToast } from "react-native-toast-notifications";
import useCalendarEntries from "../../hooks/useCalendarEntries.js";

export default function CalendarForm({ navigation, route }) {
  const toast = useToast();

  const { getCalendarEntries } = useCalendarEntries();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      route.params.calendar !== null
        ? {
            name: route.params.calendar.name,
            description: route.params.calendar.description,
            date: new Date(route.params.calendar.date).toLocaleDateString(
              "en-US"
            ),
          }
        : {
            name: "",
            description: "",
            date: new Date().toLocaleDateString("en-US"),
          },
  });

  const onSubmitCreate = async (calendarEntry) => {
    try {
      await addCalendarEntry(calendarEntry).then(() => {
        toast.show("Calendar Entry added successfully!");
        navigation.navigate(Constants.CALENDAR_VIEW, { reload: true });
      });
      getCalendarEntries();
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitEdit = async (calendarEntry) => {
    try {
      const calendarEntryId = route.params.calendar._id;
      calendarEntry.date = Date.parse(calendarEntry.date);
      await editCalendarEntry(calendarEntryId, calendarEntry).then(() => {
        toast.show(`${calendarEntry.name} was successfully updated!`);
        navigation.navigate(Constants.CALENDAR_VIEW, { reload: true });
      });
      getCalendarEntries();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={Styles.formContainer}>
      <ScrollView style={{ height: 2000 }}>
        <Text style={Styles.formLabel}>Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={Styles.formInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
        />

        <Text style={Styles.formLabel}>Description</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={Styles.formInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="description"
          rules={{ required: true }}
        />
        <Text style={Styles.formLabel}>Date</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) =>
            Platform.OS === "web" ? (
              <TextInput
                style={Styles.formInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            ) : (
              <DatePicker formOnChange={onChange} defaultValue={value} />
            )
          }
          name="date"
          rules={{ required: true }}
        />

        <Image
          source={{
            uri: Constants.GENERIC_CALENDAR_ENTRY,
          }}
          style={Styles.calendarPhoto}
        />

        <TouchableOpacity
          style={Styles.formButton}
          onPress={() => {
            route.params.calendar !== null
              ? handleSubmit(onSubmitEdit)()
              : handleSubmit(onSubmitCreate)();
          }}
        >
          <Text style={Styles.fromButtonText}>
            {route.params.calendar !== null ? "UPDATE" : "CREATE"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
