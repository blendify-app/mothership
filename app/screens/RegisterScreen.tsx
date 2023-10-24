import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
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
import Ionicons from "@expo/vector-icons/Ionicons";
import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: Spacing * 4,
          paddingTop: Spacing * 8,
        }}
      >
        <Text
          style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
          }}
        >
          Blend
        </Text>

        <Text
          style={{
            paddingTop: Spacing * 3,
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
          }}
        >
          Welcome to Blend.
        </Text>

        <Text
          style={{
            fontFamily: Font["inter-regular"],
            fontSize: FontSize.small,
            color: Colors.textDark,
          }}
        >
          Fill out your details so we can get to know you better!
        </Text>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="E-Mail" />

          <AppTextInput placeholder="Password" secureTextEntry />

          <AppTextInput placeholder="Confirm Password" secureTextEntry />
        </View>

        <View
          style={{
            marginVertical: Spacing * 0.5,
          }}
        >
          <AppTouchableOpacity text="Sign Up" dark />

          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              padding: Spacing * 2,
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.textDark,
                fontFamily: Font["inter-bold"],
                fontSize: FontSize.medium,
                textAlign: "center",
              }}
            >
              Already have an account? Log in.
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              color: Colors.textDark,
              fontFamily: Font["inter-bold"],
              fontSize: FontSize.medium,
              textAlign: "center",
              marginVertical: Spacing,
            }}
          >
            OR
          </Text>

          <View
            style={{
              marginTop: Spacing * 2,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.buttonLight,
                borderRadius: Spacing,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.textDark}
                size={Spacing * 2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.buttonLight,
                borderRadius: Spacing,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.textDark}
                size={Spacing * 2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.buttonLight,
                borderRadius: Spacing,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.textDark}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
