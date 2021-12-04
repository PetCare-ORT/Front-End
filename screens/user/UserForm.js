import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "../../lib/Constants.js";
import { registerUser, updateUser } from "../../services/usersApi.js";
import GlobalContext from "../../context";
import Styles from "../../lib/Styles.js";
import { useToast } from "react-native-toast-notifications";

export default function UserForm({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      route.params.user !== null
        ? {
            username: route.params.user.username,
            photoUrl: route.params.user.photoUrl,
          }
        : {
            username: "",
            email: "",
            password: "",
          },
  });

  const onSubmitCreate = async (user) => {
    try {
      await registerUser(user).then(() => {
        toast.show("User was sucessfully created");
        navigation.navigate(Constants.LOGIN_VIEW);
      });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitEdit = async (user) => {
    try {
      const userId = route.params.user._id;
      await updateUser(userId, user).then(() => {
        toast.show("Profile successfully updated");
        dispatch({
          type: "UPDATE_USER",
          payload: { username: user.username, photoUrl: user.photoUrl },
        });
        navigation.navigate(Constants.PROFILE_VIEW);
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={Styles.formContainer}>
      <ScrollView>
        <Text style={Styles.formLabel}>Username</Text>
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
          name="username"
          rules={{ required: true }}
        />
        {route.params.user !== null ? (
          <View>
            <Text style={Styles.formLabel}>Photo Url</Text>
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
              name="photoUrl"
              rules={{ required: false }}
            />
          </View>
        ) : (
          <View>
            <Text style={Styles.formLabel}>Email</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  style={Styles.formInput}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: false }}
            />

            <Text style={Styles.formLabel}>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry={true}
                  style={Styles.formInput}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: false }}
            />
          </View>
        )}
        <TouchableOpacity
          style={Styles.userFormButton}
          onPress={() => {
            route.params.user !== null
              ? handleSubmit(onSubmitEdit)()
              : handleSubmit(onSubmitCreate)();
          }}
        >
          <Text style={Styles.fromButtonText}>
            {route.params.user !== null ? "UPDATE" : "REGISTER"}
          </Text>
        </TouchableOpacity>
        {/* <View style={{ marginTop: 40 }}>
          <Button
            color={Colors.PRIMARY_PINK}
            title={route.params.user !== null ? "Update" : "Register"}
            onPress={
              route.params.user !== null
                ? handleSubmit(onSubmitEdit)
                : handleSubmit(onSubmitCreate)
            }
          />
        </View> */}
      </ScrollView>
    </View>
  );
}
