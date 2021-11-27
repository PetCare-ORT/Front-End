import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const SpeciesPicker = ({ onChange, style }) => {
  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => onChange(value)}
        items={[
          { label: "Dog", value: "Dog" },
          { label: "Cat", value: "Cat" },
          { label: "Lizard", value: "Lizard" },
        ]}
        style={{ inputAndroid: { color: "black", ...style } }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export const GenderPicker = ({ onChange, style }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => onChange(value)}
      items={[
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ]}
      style={{ inputAndroid: { color: "black", ...style } }}
      useNativeAndroidPickerStyle={false}
    />
  );
};
