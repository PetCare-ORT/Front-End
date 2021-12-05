import React from "react";
import Constants from "../../lib/Constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import petNavigator from "../pet/PetNavigator.js";
import CalendarNavigator from "../calendar/CalendarNavigator";
import Diary from "../diary/Diary.js";
import Reminders from "../reminders/Reminders.js";
import Colors from "../../lib/Colors";
import Icons from "../../lib/Icons";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.SECONDARY_BLUE,
        tabBarInactiveBackgroundColor: Colors.PRIMARY_BLUE,
        tabBarActiveTintColor: Colors.PRIMARY_PINK,
        tabBarInactiveTintColor: Colors.PRIMARY_WHITE,
      }}
    >
      <Tab.Screen
        name={Constants.PETS_NAVIGATOR}
        component={petNavigator}
        options={{
          tabBarLabel: "Pets",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={Icons.PET_SCREEN}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Constants.DIARY_VIEW}
        component={Diary}
        options={{
          tabBarLabel: "Diary",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={Icons.DIARY_SCREEN}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Constants.CALENDAR_NAVIGATOR}
        component={CalendarNavigator}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={Icons.CALENDAR_SCREEN}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Constants.REMINDERS_VIEW}
        component={Reminders}
        options={{
          tabBarLabel: "Reminders",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={Icons.REMINDERS_SCREEN}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
