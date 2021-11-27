import React, { useContext } from "react";
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
import { registerUser, updateUser } from "../../services/usersApi.js";
import GlobalContext from "../../context";

export default function UserForm({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);

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
      console.log(user);
      await registerUser(user).then(() => {
        alert("User was sucessfully created");
        navigation.navigate(Constants.LOGIN_VIEW);
      });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitEdit = async (user) => {
    try {
      const userId = route.params.user._id;
      console.log("USERID: " + userId);
      await updateUser(userId, user).then(() => {
        alert("Profile successfully updated");
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
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Username</Text>
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
          name="username"
          rules={{ required: true }}
        />
        {route.params.user !== null ? (
          <View>
            <Text style={styles.label}>Photo Url</Text>
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
              name="photoUrl"
              rules={{ required: false }}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: false }}
            />

            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
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
        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title={route.params.user !== null ? "Update" : "Register"}
            onPress={
              route.params.user !== null
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
