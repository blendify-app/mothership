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
// import jwt from "jsonwebtoken";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const auth0 = new Auth0(auth0config);


const handleLogin = async ( navigation: any) => {
  try {
    const credentials = await auth0.webAuth.authorize({
      scope: "openid email profile",
      connection: "google-oauth2"
    });
    const idToken = credentials.idToken;
    console.log(idToken);
    sendIdTokenToBackend(idToken, navigation)
  } catch (error) {
    alert("Error: " + error);
  }
}

const sendIdTokenToBackend = async (idToken: string, navigation: any) => {
  try {
    const response = await fetch('http://192.168.0.164:8080/users/authorize', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result)

      if (result.success) {
        console.log('Authorization successful. Message:', result.message);
        navigation.navigate("Basic")
        
      } else {
        console.warn('Authorization failed. Message:', result.message);
        Alert.alert('Authorization Failed', result.message);
      }
    } else {
      console.error('Error in backend response:', response.statusText);
      Alert.alert('Server Error', 'Please try again later.');
    }
  } catch (error) {
    console.error('Error sending IdToken to backend:', error);
    Alert.alert('Network Error', 'Please check your internet connection.');
  }
};



const LoginScreen: React.FC<Props> = ({ navigation }) => {
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
          <AppTouchableOpacity text="Sign In with Google" dark onPress={() => handleLogin(navigation)}/>
        </View>
      </View>
    </SafeAreaView>
    </Auth0Provider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
