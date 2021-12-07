import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Constants from "../../lib/Constants.js";
import Reminders from "./Reminders.js";
import reminderDetail from "./ReminderDetail.js";
import RemindersForm from "./ReminderForm.js";
import DropdownMenu from "../dropdownMenu/DropdownMenu.js";
import Colors from "../../lib/Colors.js";

const Stack = createNativeStackNavigator();

export default function remindersNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constants.REMINDERS_VIEW}
        component={Reminders}
        initialParams={{ reload: true }}
        options={{
          title: "Reminders",
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
        name={Constants.REMINDERS_DETAIL_VIEW}
        component={reminderDetail}
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
        name={Constants.REMINDERS_FORM_VIEW}
        component={RemindersForm}
        options={{
          title: "Reminders",
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
