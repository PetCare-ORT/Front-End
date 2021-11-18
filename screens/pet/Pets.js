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
import GlobalContext from "../../Context";

export default function Pets({ navigation, route }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPets = async () => {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Token", state.token);
    const requestOptions = {
      headers: headers,
    };
    try {
      const response = await fetch(
        Constants.HOST + "/api/pets/",
        requestOptions
      );
      const json = await response.json();
      setData(json);
      dispatch({
        type: "STORE_PETS",
        payload: { pets: json },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.pets.length == 0) {
      getPets();
    } else {
      setData(state.pets);
    }
  }, []);

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
          console.log("RELOAD STATE" + route.params.reload);
          navigation.navigate(Constants.PET_CREATION_VIEW);
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
