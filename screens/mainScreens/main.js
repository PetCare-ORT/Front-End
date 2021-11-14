import React from "react";
import Constants from "../../lib/Constants";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import petNavigator from "../Pet/petNavigator.js";
import Diary from "../Diary/Diary.js";
import Calendar from "../Calendar/Calendar.js";
import Reminders from "../Reminders/Reminders.js";

const MaterialTab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <MaterialTab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <MaterialTab.Screen
        name={Constants.PETS_NAVIGATOR}
        component={petNavigator}
        options={{
          tabBarLabel: "Pets",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="paw" color={color} size={26} />
          ),
        }}
      />
      <MaterialTab.Screen
        name={Constants.DIARY_VIEW}
        component={Diary}
        options={{
          tabBarLabel: "Diary",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={26} />
          ),
        }}
      />
      <MaterialTab.Screen
        name={Constants.CALENDAR_VIEW}
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <MaterialTab.Screen
        name={Constants.REMINDERS_VIEW}
        component={Reminders}
        options={{
          tabBarLabel: "Reminders",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alarm" color={color} size={26} />
          ),
        }}
      />
    </MaterialTab.Navigator>
  );
}
