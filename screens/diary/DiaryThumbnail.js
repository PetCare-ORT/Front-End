import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../lib/Constants.js";

export default function DiaryThumbnail(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(Constants.DIARY_DETAIL_VIEW, {
            diary: props.diaryData,
          });
        }}
        style={styles.button}
      >
        <Text>{props.diaryData.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#77c8ed",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 50,
  },
});
