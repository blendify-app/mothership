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
import Layout from "../constants/Layout";
import { storage } from "./LoginScreen";


type Props = NativeStackScreenProps<RootStackParamList, "Basic">;

const BasicDetailsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView>
        <View
        style={{
          paddingHorizontal: Spacing * 4,
          paddingTop: Spacing * 8
        }}>
          <Text style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
          }}>
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
          Let's get to know you a little better.
        </Text>

        <Text style={{
          fontFamily: Font["inter-regular"],
          fontSize: FontSize.small,
          color: Colors.textDark
        }}>
          Tell us your basics.
        </Text>

        </View>

        <View style={{
          marginVertical: Spacing * 3,
          paddingHorizontal: Spacing * 4,
        }}>
          <AppTextInput placeholder="Name" style={{width:"100%"}}/>
          
          <View style={{
            flexDirection: "row",
          }}>
            <AppTextInput placeholder="Date of Birth" style={{width:"40%"}}/>
            <AppTextInput placeholder="Nationality" style={{marginHorizontal: Spacing, width:"57%"}}/>
          </View>
          

        </View>

        <View style={{
          marginVertical: Spacing,
          paddingHorizontal: Spacing * 4,
        }}>
            <AppTouchableOpacity text="Next" dark style={{padding: Spacing}} onPress={() => navigate("FillProfile")}>

            </AppTouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

export default BasicDetailsScreen;