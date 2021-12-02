import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb5b5a" />
      ) : (
        <FlatList
          columnWrapperStyle={styles.columnWrapper}
          data={data}
          numColumns={2}
          contentContainerStyle={styles.petList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PetThumbnail petData={item} navigation={navigation} />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate(Constants.PET_FORM_VIEW, { pet: null });
        }}
      >
        <MaterialCommunityIcons
          name="plus-circle"
          color={"#fb5b5a"}
          size={60}
          style={{ elevation: 3 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2e9e9",
    alignItems: "stretch",
    justifyContent: "center",
    elevation: 1,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    height: 200,
    width: "100%",
  },
  addButton: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    elevation: 3,
  },
});
