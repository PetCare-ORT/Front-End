import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { View } from "react-native";
import Constants from "../lib/Constants";

export const SpeciesPicker = ({ onChange, style, defaultValue }) => {
  return (
    <View>
      <RNPickerSelect
        value={defaultValue}
        onValueChange={(value) => onChange(value)}
        items={[
          { label: Constants.DOG, value: Constants.DOG },
          { label: Constants.CAT, value: Constants.CAT },
          { label: Constants.HAMSTER, value: Constants.HAMSTER },
          { label: Constants.TORTOISE, value: Constants.TORTOISE },
          { label: Constants.HORSE, value: Constants.HORSE },
          { label: Constants.FISH, value: Constants.FISH },
          { label: Constants.RABBIT, value: Constants.RABBIT },
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
