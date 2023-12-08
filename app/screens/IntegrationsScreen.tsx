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

type Props = NativeStackScreenProps<RootStackParamList, "Integrations">;

const IntegrationsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

    const integrations = ["Spotify", "Letterboxd", "YouTube", "Steam", "MyAnimeList"]


    return (
    <SafeAreaView>
      <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Blend</Text>
              <Text style={styles.subtitle}>Link some Accounts</Text>
              <Text style={styles.description}>Show off your personality through your account recommendations!</Text>

              {
                Object.entries(integrations).map(([key, options]) => {
                  return (
                    <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                    key={key}
                  >
                    <AppTouchableOpacity text={options} dark={false} style={styles.integrationButton}/>
                  </View>

                  )
                })
              }

              <AppTouchableOpacity style={styles.next} text="Next" dark onPress={() => navigate("Main")}/>              

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

    integrationButton: {
        borderRadius: Spacing,
        paddingVertical: Spacing,
        paddingHorizontal: Spacing/1.5,
        flexBasis: "98%",
        marginVertical: Spacing/2,
        marginHorizontal: Spacing/2,
    },

    next: {
      marginVertical: Spacing * 4,
    }
  });

export default IntegrationsScreen;