import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PetThumbnail from "./PetThumbnail.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../../lib/Constants.js";
import GlobalContext from "../../context";
import { getUserPets } from "../../services/petsApi.js";

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
    <View style={styles.container}>
      <Text>Pets</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <PetThumbnail petData={item} navigation={navigation} />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(Constants.PET_CREATION_VIEW, { pet: null });
        }}
      >
        <MaterialCommunityIcons
          name="plus-circle"
          color={"#767676"}
          size={60}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
