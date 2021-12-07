import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ReminderThumbnail from "./ReminderThumbnail.js";
import Constants from "../../lib/Constants.js";
import GlobalContext from "../../context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getUserReminder } from "../../services/remindersApi.js";
import Styles from "../../lib/Styles.js";
import Colors from "../../lib/Colors.js";

export default function Reminders({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getReminders = async () => {
    try {
      const reminders = await getUserReminder();
      const remindersData = reminders.data;
      setData(remindersData);
      dispatch({
        type: "STORE_REMINDERS",
        payload: { reminders: remindersData },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params.reload == true) {
      getReminders();
      route.params.reload = undefined;
    }
  }, [route.params.reload]);

  return (
    <View style={Styles.petListContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY_PINK} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ReminderThumbnail remindersData={item} navigation={navigation} />
          )}
        />
      )}
      <TouchableOpacity
        style={Styles.petListAddButton}
        onPress={() => {
          navigation.navigate(Constants.REMINDERS_FORM_VIEW, {
            reminder: null,
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
