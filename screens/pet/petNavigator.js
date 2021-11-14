import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "../../lib/Constants.js";
import Pets from "./pets.js";
import petDetail from "./petDetail.js";
import DropdownMenu from "../DropdownMenu/DropdownMenu.js";

const Stack = createNativeStackNavigator();

export default function petNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constants.PETS_VIEW}
        component={Pets}
        initialParams={{ petId: "6186a3926791ce99c2915a41" }}
        options={{
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
    </Stack.Navigator>
  );
}
