import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Constants from "../../lib/Constants.js";
import Pets from "./Pets.js";
import petDetail from "./PetDetail.js";
import petForm from "./PetForm.js";
import DropdownMenu from "../dropdownMenu/DropdownMenu.js";
import Colors from "../../lib/Colors.js";

const Stack = createNativeStackNavigator();

export default function petNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constants.PETS_VIEW}
        component={Pets}
        initialParams={{ reload: true }}
        options={{
          title: "Pets",
          headerBackVisible: false,
          headerLeft: () => <Text></Text>,
          headerRight: () => <DropdownMenu />,
          headerStyle: {
            backgroundColor: Colors.PRIMARY_BLUE,
          },
          headerTitleStyle: {
            color: Colors.PRIMARY_WHITE,
          },
        }}
      />
      <Stack.Screen
        name={Constants.PET_DETAIL_VIEW}
        component={petDetail}
        options={{
          title: "Details",
          headerBackVisible: true,
          headerRight: () => <DropdownMenu />,
          headerStyle: {
            backgroundColor: Colors.PRIMARY_BLUE,
          },
          headerTitleStyle: {
            color: Colors.PRIMARY_WHITE,
          },
          headerTintColor: Colors.PRIMARY_WHITE,
        }}
      />
      <Stack.Screen
        name={Constants.PET_FORM_VIEW}
        component={petForm}
        options={{
          title: "Pets",
          headerBackVisible: true,
          headerRight: () => <DropdownMenu />,
          headerStyle: {
            backgroundColor: Colors.PRIMARY_BLUE,
          },
          headerTitleStyle: {
            color: Colors.PRIMARY_WHITE,
          },
          headerTintColor: Colors.PRIMARY_WHITE,
        }}
      />
    </Stack.Navigator>
  );
}
