import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Constants from "../../lib/Constants.js";
import Pets from "./Pets.js";
import petDetail from "./PetDetail.js";
import petForm from "./PetForm.js";
import DropdownMenu from "../dropdownMenu/DropdownMenu.js";

const Stack = createNativeStackNavigator();

export default function petNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constants.PETS_VIEW}
        component={Pets}
        initialParams={{ reload: true }}
        options={{
          headerLeft: () => <Text></Text>,
          headerRight: () => <DropdownMenu />,
        }}
      />
      <Stack.Screen
        name={Constants.PET_DETAIL_VIEW}
        component={petDetail}
        options={{
          headerRight: () => <DropdownMenu />,
        }}
      />
      <Stack.Screen
        name={Constants.PET_FORM_VIEW}
        component={petForm}
        options={{
          headerRight: () => <DropdownMenu />,
        }}
      />
    </Stack.Navigator>
  );
}
