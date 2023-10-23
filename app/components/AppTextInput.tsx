import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="E-Mail"
      placeholderTextColor={"#969696"}
      style={[
        {
          fontFamily: Font["inter-regular"],
          backgroundColor: Colors.background,
          borderColor: "#EBEBEB",
          borderWidth: 1,
          borderRadius: Spacing,
          padding: Spacing * 2,
          marginVertical: Spacing,
        },
        focused && { borderWidth: 2, borderColor: Colors.buttonDark },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
