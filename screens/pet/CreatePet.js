import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "../../lib/Constants.js";
import { addPet } from "../../services/petsApi";

export default function CreatePet({ navigation }) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      species: "",
      race: "",
      birthDate: "",
      gender: "",
    },
  });
  const onSubmit = async (pet) => {
    try {
      await addPet(pet).then(() => {
        alert("Pet added successfully!");
        navigation.navigate(Constants.PETS_VIEW, { reload: true });
      });
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>Species</Text>
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
        name="species"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Race</Text>
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
        name="race"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Date of birth</Text>
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
        name="birthDate"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Gender</Text>
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
        name="gender"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Create"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
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
