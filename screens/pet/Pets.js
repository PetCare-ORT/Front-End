import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PetThumbnail from "./PetThumbnail.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";
import GlobalContext from "../../context";
import { getUserPets } from "../../services/petsApi.js";
import Styles from "../../lib/Styles.js";
import Colors from "../../lib/Colors.js";

export default function Pets({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPets = async () => {
    try {
      const pets = await getUserPets();
      const petsData = pets.data;
      setData(petsData);
      dispatch({
        type: "STORE_PETS",
        payload: { pets: petsData },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params.reload == true) {
      getPets();
      route.params.reload = undefined;
    }
  }, [route.params.reload]);

  return (
    <View style={Styles.petListContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY_PINK} />
      ) : (
        <FlatList
          columnWrapperStyle={Styles.petListColumnWrapper}
          data={data}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PetThumbnail petData={item} navigation={navigation} />
          )}
        />
      )}
      <TouchableOpacity
        style={Styles.petListAddButton}
        onPress={() => {
          navigation.navigate(Constants.PET_FORM_VIEW, { pet: null });
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
