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
import { auth0config } from "../config/auth0";
import Auth0 from "react-native-auth0";

const auth0 = new Auth0(auth0config);

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const handleLogin = () => {
  auth0.webAuth
  .authorize ({
    scope: "openid email profile",
    connection: "Username-Password-Authentication"
  })

  .then (credentials => {
    const accesstoken = credentials.accessToken
  })
  .catch (error => {
    alert("Error: " + error);
  })
}

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
          Log in to pick up where you left off!
        </Text>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="E-Mail" />

          <AppTextInput placeholder="Password" secureTextEntry />
        </View>

        <View
          style={{
            marginVertical: Spacing * 0.5,
          }}
        >
          <AppTouchableOpacity text="Sign In" dark />
          <AppTouchableOpacity
            style={{ marginVertical: Spacing }}
            text="Create New Account"
            dark={false}
            onPress={() => navigate("Register")}
          />
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
              marginTop: Spacing,
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
