import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import CheckboxGroup from "../components/CheckboxGroup";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import OptionButton from "../components/OptionButton";


type Props = NativeStackScreenProps<RootStackParamList, "Modes">;

const ModesScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Blend</Text>
              <Text style={styles.subtitle}>Pick a mode and match!</Text>
              <Text style={styles.description}>Select how a friend is found by choosing a mode. Once you’re matched, your friend will be in one of your Chats!</Text>

              <TouchableOpacity style={styles.mode}>
                <Text style={styles.modetext}>
                  Blendify
                </Text>
                <Text style={styles.modesubtext}>
                  Find who you’re looking for.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mode}>
                <Text style={styles.modetext}>
                  Roulette
                </Text>
                <Text style={styles.modesubtext}>
                  Hit it off with someone from a sea of strangers.
                </Text>
              </TouchableOpacity>
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
      marginBottom: Spacing * 2,
    },
    mode: {
      marginBottom: Spacing,
      paddingTop: Spacing * 6,
      paddingBottom: Spacing * 1.5,
      paddingHorizontal: Spacing * 1.5,
      backgroundColor: Colors.buttonLight,
      borderRadius: Spacing,
    },
    modetext: {
      color: Colors.textDark,
      fontFamily: Font["inter-bold"],
      fontSize: FontSize.medium,
    },
    modesubtext: {
      color: Colors.textDark,
      fontFamily: Font["inter-regular"],
      fontSize: FontSize.small
    },

});

export default ModesScreen;