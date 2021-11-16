import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function petDetail({ route }) {
  const { pet } = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
        }}
        style={styles.photo}
      />
      <Text style={styles.title}>
        <Text>
          Name: {pet.name}
          {"\n"}
        </Text>
        <Text>
          Species: {pet.species}
          {"\n"}
        </Text>
        <Text>Race: {pet.race}</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    flex: 3,
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  photo: {
    flex: 2,
    height: 200,
    resizeMode: "center",
    margin: 5,
  },
});
