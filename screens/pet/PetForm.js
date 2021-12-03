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
import { addPet, editPet } from "../../services/petsApi";
import { SpeciesPicker, GenderPicker } from "../../utils/pickers.js";
import { DatePicker } from "../../utils/datePicker.js";
import { openImagePickerAsync } from "../../utils/imagePicker.js";
import Styles from "../../lib/Styles.js";

export default function PetForm({ navigation, route }) {
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
            photoUri: route.params.pet.photoUri,
          }
        : {
            name: "",
            species: "",
            race: "",
            birthDate: new Date().toLocaleDateString("en-US"),
            gender: "",
            photoUri: Constants.GENERIC_PETS,
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

        <Text style={Styles.formLabel}>Species</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <SpeciesPicker
              onChange={onChange}
              style={Styles.formInput}
              defaultValue={value}
            />
          )}
          name="species"
          rules={{ required: true }}
        />
        <Text style={Styles.formLabel}>Race</Text>
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
          name="race"
          rules={{ required: true }}
        />
        <Text style={Styles.formLabel}>Date of birth</Text>
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
          name="birthDate"
          rules={{ required: true }}
        />

        <Text style={Styles.formLabel}>Gender</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <GenderPicker
              onChange={onChange}
              style={Styles.formInput}
              defaultValue={value}
            />
          )}
          name="gender"
          rules={{ required: true }}
        />
        <Text style={Styles.formLabel}>Photo</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TouchableOpacity
                style={Styles.formButton}
                onPress={() => {
                  openImagePickerAsync().then((image) => onChange(image));
                }}
              >
                <Text style={Styles.fromButtonText}>CHOOSE PHOTO...</Text>
              </TouchableOpacity>
              <Image
                source={{
                  uri: value,
                }}
                style={Styles.formPhoto}
              />
            </View>
          )}
          name="photoUri"
          rules={{ required: false }}
        />
        <TouchableOpacity
          style={Styles.formButton}
          onPress={() => {
            route.params.pet !== null
              ? handleSubmit(onSubmitEdit)()
              : handleSubmit(onSubmitCreate)();
          }}
        >
          <Text style={Styles.fromButtonText}>
            {route.params.pet !== null ? "UPDATE" : "CREATE"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
