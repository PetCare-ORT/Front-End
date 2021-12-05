import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "../../lib/Constants.js";
import { addDiary, editDiary } from "../../services/diaryApi";
import { DatePicker } from "../../utils/datePicker.js";

export default function DiaryForm({ navigation, route }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      route.params.diary !== null
        ? {
            title: route.params.diary.title,
            description: route.params.diary.description,
            date: new Date(route.params.diary.date).toLocaleDateString("en-US"),
            attatchment: route.params.diary.attatchment,
          }
        : {
            title: "",
            description: "",
            date: new Date().toLocaleDateString("en-US"),
            attatchment: "",
          },
  });
  const onSubmitCreate = async (diary) => {
    try {
      diary.date = Date.parse(diary.date);
      await addDiary(diary).then(() => {
        alert("Diary entry added successfully!");
        navigation.navigate(Constants.DIARY_VIEW, { reload: true });
      });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitEdit = async (diary) => {
    try {
      const diaryId = route.params.diary._id;
      diary.date = Date.parse(diary.date);
      await editDiary(diaryId, diary).then(() => {
        alert(`${diary.title} was successfully updated!`);
        navigation.navigate(Constants.DIARY_VIEW, { reload: true });
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Title</Text>
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
          name="title"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Description</Text>
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
          name="description"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Date</Text>
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
          name="date"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Attatchment</Text>
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
          name="attatchment"
          rules={{ required: true }}
        />

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title={route.params.pet !== null ? "Edit" : "Create"}
            onPress={
              route.params.pet !== null
                ? handleSubmit(onSubmitEdit)
                : handleSubmit(onSubmitCreate)
            }
          />
        </View>
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
