import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import GlobalContext from "../../context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  getUserCalendarEntries,
  deleteCalendarEntry,
} from "../../services/calendarApi.js";
import Styles from "../../lib/Styles.js";
import Colors from "../../lib/Colors.js";
import Constants from "../../lib/Constants.js";
import { useToast } from "react-native-toast-notifications";

export default function CalendarScreen({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [items, setItems] = useState({});
  const toast = useToast();

  const calendarDelete = async (calendarEntry) => {
    try {
      await deleteCalendarEntry(calendarEntry._id).then(() => {
        toast.show("Calendar Entry deleted successfully!");
        navigation.navigate(Constants.CALENDAR_VIEW, { reload: true });
      });
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
    console.log(calendarEntry),
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

            onPress: () => calendarDelete(calendarEntry),
          },
        ]
      );
  }

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const getCalendarEntries = async () => {
    try {
      const calendarEntries = await getUserCalendarEntries();
      const calendarData = calendarEntries.data;
      setData(calendarData);
      dispatch({
        type: "STORE_CALENDAR_ENTRIES",
        payload: { calendarEntries: calendarData },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadItems = () => {
    getCalendarEntries();
    data.forEach((element) => {
      let time = new Date(element.date).getTime();
      let strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        items[strTime].push({
          _id: element._id,
          name: element.name,
          description: element.description,
          date: element.date,
          height: 200,
        });
      }
    });

    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  const renderItem = (item) => {
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
                    console.log(item);
                    navigation.navigate(Constants.CALENDAR_FORM_VIEW, {
                      calendar: item,
                    });
                  }}
                />
                <MaterialCommunityIcons
                  name="delete"
                  color={Colors.PRIMARY_BLUE}
                  size={25}
                  onPress={() => {
                    Platform.OS === "web" ? deleteWeb() : deleteMobile(item);
                  }}
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
        items={items}
        loadItemsForMonth={loadItems}
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
