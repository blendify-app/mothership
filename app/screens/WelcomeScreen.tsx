import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const tm = String.fromCodePoint(0x02122);

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: Spacing * 4,
        }}
      >
        <ImageBackground
          style={{
            height: Layout.height / 4,
            width: Layout.width / 2,
            alignSelf: "center",
          }}
          resizeMode="contain"
          source={require("../assets/images/Placeholder.png")}
        />

        <View
          style={{
            paddingHorizontal: Spacing * 4,
            //paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.textDark,
              fontFamily: Font["inter-bold"],
              textAlign: "center",
            }}
          >
            Let us work our Blendify&trade; Magic and find your match!
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.textDark,
              fontFamily: Font["inter-regular"],
              textAlign: "center",
              marginTop: Spacing * 3,
            }}
          >
            Solving loneliness — one match at a time.
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: Spacing * 1.5,
            paddingVertical: Spacing * 7,
            // alignSelf: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: Colors.buttonDark,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: Layout.width/1.5,
              borderRadius: Spacing,
              shadowColor: Colors.textDark,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              alignSelf:"center",
              shadowOpacity: 0.6,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.buttonLight,
                fontFamily: Font["inter-bold"],
                fontSize: FontSize.large,
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
