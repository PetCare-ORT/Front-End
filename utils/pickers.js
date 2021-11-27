import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export const SpeciesPicker = ({ onChange, style, defaultValue }) => {
  return (
    <View>
      <RNPickerSelect
        value={defaultValue}
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

export const GenderPicker = ({ onChange, style, defaultValue }) => {
  return (
    <RNPickerSelect
      value={defaultValue}
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
