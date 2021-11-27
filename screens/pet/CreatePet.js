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
import { addPet, editPet } from "../../services/petsApi";
import { SpeciesPicker, GenderPicker } from "../../utils/pickers.js";
import { DatePicker } from "../../utils/datePicker.js";

export default function CreatePet({ navigation, route }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      route.params.pet !== null
        ? {
            name: route.params.pet.name,
            species: route.params.pet.species,
            race: route.params.pet.race,
            birthDate: new Date(route.params.pet.birthDate).toLocaleDateString(
              "en-US"
            ),
            gender: route.params.pet.gender,
          }
        : {
            name: "",
            species: "",
            race: "",
            birthDate: new Date().toLocaleDateString("en-US"),
            gender: "",
          },
  });
  const onSubmitCreate = async (pet) => {
    try {
      pet.birthDate = Date.parse(pet.birthDate);
      await addPet(pet).then(() => {
        alert("Pet added successfully!");
        navigation.navigate(Constants.PETS_VIEW, { reload: true });
      });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitEdit = async (pet) => {
    try {
      const petId = route.params.pet._id;
      pet.birthDate = Date.parse(pet.birthDate);
      await editPet(petId, pet).then(() => {
        alert(`${pet.name} was successfully updated!`);
        navigation.navigate(Constants.PETS_VIEW, { reload: true });
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

        <Text style={styles.label}>Species</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <SpeciesPicker
              onChange={onChange}
              style={styles.input}
              defaultValue={value}
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
          name="birthDate"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Gender</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <GenderPicker
              onChange={onChange}
              style={styles.input}
              defaultValue={value}
            />
          )}
          name="gender"
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
