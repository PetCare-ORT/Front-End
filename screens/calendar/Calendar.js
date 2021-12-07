import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "react-native-toast-notifications";

import { deleteCalendarEntry } from "../../services/calendarApi.js";
import Styles from "../../lib/Styles.js";
import Colors from "../../lib/Colors.js";
import Constants from "../../lib/Constants.js";
import useCalendarEntries from "../../hooks/useCalendarEntries";

export default function CalendarScreen({ navigation, route }) {
  const toast = useToast();

  const { getCalendarEntries, entries } = useCalendarEntries();

  const calendarDelete = async (calendarEntry) => {
    try {
      await deleteCalendarEntry(calendarEntry._id);
      toast.show("Calendar Entry deleted successfully!");
      navigation.navigate(Constants.CALENDAR_VIEW, { reload: true });
      getCalendarEntries();
    } catch (error) {
      alert(error);
    }
  };

  function deleteWeb() {
    if (confirm(Constants.ACTION_CANNOT_BE_REVERSED)) {
      logout();
    }
  }

  function deleteMobile(calendarEntry) {
    Alert.alert(
      Constants.DELETE_CONFIRM(calendarEntry.name),
      Constants.ACTION_CANNOT_BE_REVERSED,
      [
        {
          text: "Cancel",
          onPress: () => null,
        },

        {
          text: "Confirm",

          onPress: () => {
            calendarDelete(calendarEntry);
          },
        },
      ]
    );
  }

  const deleteEntry = (item) => {
    // console.log(item, Platform.OS);

    if (Platform.OS === "web") {
      deleteWeb();
    } else {
      deleteMobile(item);
    }
  };

  const renderItem = (item) => {
    const deleteThisEntry = () => {
      console.log("ESTE ITEM", item);
      deleteEntry(item);
    };
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <TouchableOpacity style={Styles.calendarButtons}>
                <MaterialCommunityIcons
                  name="pencil"
                  color={Colors.PRIMARY_BLUE}
                  size={25}
                  onPress={() => {
                    navigation.navigate(Constants.CALENDAR_FORM_VIEW, {
                      calendar: item,
                    });
                  }}
                />
                <MaterialCommunityIcons
                  name="delete"
                  color={Colors.PRIMARY_BLUE}
                  size={25}
                  onPress={deleteThisEntry}
                />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={entries}
        loadItemsForMonth={getCalendarEntries}
        selected={new Date()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={Styles.petListAddButton}
        onPress={() => {
          navigation.navigate(Constants.CALENDAR_FORM_VIEW, {
            calendar: null,
          });
        }}
      >
        <MaterialCommunityIcons
          name="plus-circle"
          color={Colors.PRIMARY_BLUE}
          size={60}
        />
      </TouchableOpacity>
    </View>
  );
}
