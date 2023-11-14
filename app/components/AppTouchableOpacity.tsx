import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

interface AppTouchableOpacityProps extends TouchableOpacityProps {
  text: string;
  dark: boolean;
  style?: any;
}

const AppTouchableOpacity: React.FC<AppTouchableOpacityProps> = ({
  text,
  dark,
  style,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          padding: Spacing * 2,
          backgroundColor: Colors.buttonLight,
          borderRadius: Spacing,
        },
        style,
        dark && { backgroundColor: Colors.buttonDark },
      ]}
      {...otherProps}
    >
      <Text
        style={[
          {
            color: Colors.textDark,
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            textAlign: "center",
          },
          dark && { color: Colors.background },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AppTouchableOpacity;

const styles = StyleSheet.create({});
