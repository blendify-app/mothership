import Ionicons from "@expo/vector-icons/Ionicons";
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
import Auth0 from "react-native-auth0"

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
// const {authorize, clearSession, user, error, getCredentials, isLoading} = useAuth0();
// const authendpoint = "https://dev-pb2l7ig8ecavkase.us.auth0.com/authorize"

// const useProxy = Platform.select({ web: false, default: true });
// const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const auth0 = new Auth0(auth0config);

// const handleLogin = async () => {
//   try {
//     await authorize();
//     let credentials = await getCredentials();
//     Alert.alert("Access Token: "+ credentials?.accessToken)
//   } catch (e) {
//     console.log(e)
//   }
// };


const handleLogin = async () => {
  try {
    const credentials = await auth0.webAuth.authorize({
      scope: "openid email profile",
      connection: "google-oauth2"
    });
    console.log(credentials)
    const accesstoken = credentials.accessTokens;
    console.log(accesstoken);
  } catch (error) {
    alert("Error: " + error);
  }
}

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
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
          <AppTouchableOpacity text="Sign In with Google" dark onPress={handleLogin}/>
        </View>
      </View>
    </SafeAreaView>
    </Auth0Provider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
