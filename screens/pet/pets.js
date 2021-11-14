import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import petsMock from "../../mock/petsMock.js";
import PetThumbnail from "./PetThumbnail.js";

export default function Pets({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPets = () => {
    const petId = route.params.petId;
    const pet = petsMock.filter((pet) => {
      return pet._id == petId;
    });
    setData(petsMock);
    setLoading(false);
  };

  useEffect(() => {
    getPets();
  }, []);

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
    justifyContent: "flex-end",
  },
});
