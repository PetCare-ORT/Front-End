import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";
import Styles from "../../lib/Styles.js";
import Colors from "../../lib/Colors.js";
import Icons from "../../lib/Icons.js";

export default function PetThumbnail(props) {
  function getIconFromSpecies() {
    const species = props.petData.species;
    switch (species) {
      case Constants.DOG:
        return Icons.DOG_THUMBNAIL;
      case Constants.CAT:
        return Icons.CAT_THUMBNAIL;
      case Constants.HAMSTER:
        return Icons.HAMSTER_THUMBNAIL;
      case Constants.TORTOISE:
        return Icons.TORTOISE_THUMBNAIL;
      case Constants.HORSE:
        return Icons.HORSE_THUMBNAIL;
      case Constants.FISH:
        return Icons.FISH_THUMBNAIL;
      case Constants.RABBIT:
        return Icons.RABBIT_THUMBNAIL;
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(Constants.PET_DETAIL_VIEW, {
            pet: props.petData,
          });
        }}
        style={Styles.petThumbnail}
      >
        <MaterialCommunityIcons
          name={getIconFromSpecies()}
          color={Colors.PRIMARY_WHITE}
          size={30}
        />
        <Text style={Styles.petThumnailText}>{props.petData.name}</Text>
      </TouchableOpacity>
    </View>
  );
}
