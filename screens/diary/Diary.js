import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import DiaryThumbnail from "./DiaryThumbnail.js";
import Constants from "../../lib/Constants.js";
import GlobalContext from "../../context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getUserDiaryEntry } from "../../services/diaryApi.js";
import Styles from "../../lib/Styles.js";
import Colors from "../../lib/Colors.js";

export default function DiaryEntries({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getEntries = async () => {
    try {
      const diary = await getUserDiaryEntry();
      const diaryData = diary.data;
      setData(diaryData);
      dispatch({
        type: "STORE_DIARY_ENTRIES",
        payload: { diary: diaryData },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params.reload == true) {
      getEntries();
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
            <DiaryThumbnail diaryData={item} navigation={navigation} />
          )}
        />
      )}
      <TouchableOpacity
        style={Styles.petListAddButton}
        onPress={() => {
          navigation.navigate(Constants.DIARY_FORM_VIEW, { diary: null });
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
