import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";

import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import CheckboxGroup from "../components/CheckboxGroup";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Safety">;

const DigitalSafetyScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Blend</Text>
              <Text style={styles.subtitle}></Text>
              <Text style={styles.description}></Text>
            </View>
      </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: Spacing * 4,
      paddingTop: Spacing * 8,
    },
    title: {
      fontFamily: Font["inter-bold"],
      fontSize: FontSize.medium,
      color: Colors.textDark,
    },
    subtitle: {
      paddingTop: Spacing * 3,
      fontFamily: Font["inter-bold"],
      fontSize: FontSize.medium,
      color: Colors.textDark,
    },
    description: {
      marginVertical: Spacing,
      fontFamily: Font["inter-regular"],
      fontSize: FontSize.small,
      color: Colors.textDark,
    },

});

export default DigitalSafetyScreen;