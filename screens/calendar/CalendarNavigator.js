import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Constants from "../../lib/Constants.js";
import Calendar from "./Calendar.js";
import CalendarForm from "./CalendarForm.js";
import DropdownMenu from "../dropdownMenu/DropdownMenu.js";
import Colors from "../../lib/Colors.js";

const Stack = createNativeStackNavigator();

export default function CalendarNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constants.CALENDAR_VIEW}
        component={Calendar}
        initialParams={{ reload: true }}
        options={{
          title: "Calendar",
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
        name={Constants.CALENDAR_FORM_VIEW}
        component={CalendarForm}
        options={{
          title: "Calendar",
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
