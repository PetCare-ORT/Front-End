import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Constants from "../../lib/Constants.js";
import DiaryEntries from "./Diary.js";
import diaryDetail from "./DiaryDetails.js";
import DiaryForm from "./DiaryForm.js";
import DropdownMenu from "../dropdownMenu/DropdownMenu.js";
import Colors from "../../lib/Colors.js";

const Stack = createNativeStackNavigator();

export default function diaryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constants.DIARY_VIEW}
        component={DiaryEntries}
        initialParams={{ reload: true }}
        options={{
          title: "Diary Entries",
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
        name={Constants.DIARY_DETAIL_VIEW}
        component={diaryDetail}
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
        name={Constants.DIARY_FORM_VIEW}
        component={DiaryForm}
        options={{
          title: "Diary entries",
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
