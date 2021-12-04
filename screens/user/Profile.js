import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import GlobalContext from "../../context";
import Constants from "../../lib/Constants.js";
import Styles from "../../lib/Styles";

export default function Profile({ navigation }) {
  const { state, dispatch } = useContext(GlobalContext);

  const userData = state.userData;

  return (
    <View style={Styles.detailContainer}>
      <Image
        source={{
          uri: userData.photoUrl
            ? userData.photoUrl
            : Constants.GENERIC_PROFILE,
        }}
        style={Styles.detailPhoto}
      />
      <Text style={Styles.profileDetailTextContainer}>
        Username: {userData.username}
        {"\n"}
        Email: {userData.email}
      </Text>
      <View style={Styles.detailButtonsContainer}>
        <TouchableOpacity
          style={Styles.profileDetailEditButton}
          onPress={() => {
            navigation.navigate(Constants.USER_FORM_VIEW, { user: userData });
          }}
        >
          <Text style={Styles.detailButtonsText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
