import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Auth0Provider } from 'react-native-auth0';
import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { RootStackParamList } from "../types";
import { auth0config } from "../config/auth0";
import Auth0 from "react-native-auth0";
import { MMKV } from "react-native-mmkv";
import { useMutation } from "@tanstack/react-query";
import { mmkvStorage } from "../lib/mmkv";
import { useAuthUser } from "../api";
// import jwt from "jsonwebtoken";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const auth0 = new Auth0(auth0config);


const LoginScreen: React.FC<Props> = ({ navigation }) => {

  const authUser = useAuthUser()

  const handleLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: "openid email profile offline_access",
        connection: "google-oauth2"
      });
      const idToken = credentials.idToken;
      const refToken = credentials.refreshToken || "";
      const expiry = credentials.expiresAt;
  
  
      console.log(credentials);
      
      mmkvStorage.set("authToken", idToken);
      mmkvStorage.set("refreshToken", refToken);
      mmkvStorage.set("expiry", expiry);
  
  
      sendIdTokenToBackend()
    } catch (error) {
      alert("Error: " + error);
    }
  }

  const sendIdTokenToBackend = async () => {
    try {
      await authUser.mutateAsync();
      navigation.navigate("Basic");
      
    } catch (error) {
      console.error('Error sending IdToken to backend:', error);
      Alert.alert('Network Error', 'Please check your internet connection.');
    }
  };

  return (
    <Auth0Provider domain={auth0config.domain} clientId={auth0config.clientId}>
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
          Create an account to get started!
        </Text>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTouchableOpacity text="Sign In with Google" dark onPress={() => handleLogin()}/>
        </View>
      </View>
    </SafeAreaView>
    </Auth0Provider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
