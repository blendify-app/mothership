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
import RadioButtonGroup from "../components/RadioButtonGroup";

type Props = NativeStackScreenProps<RootStackParamList, "FillProfile">;

const FillProfileScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  // const handleSelect = (selectedOption: string) => {
  //   console.log("Selected Gender: ", selectedOption);
  // };
  // const genderOptions = ["Male", "Female", "Non-binary", "Monkey", "Ehsaan"];  
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
          Fill out the rest of your profile now?
        </Text>

        <Text style={{
          marginVertical: Spacing,
          fontFamily: Font["inter-regular"],
          fontSize: FontSize.small,
          color: Colors.textDark
        }}>
          Blend’s world-class matching system looks for great matches from what it learns about you. Leaving your account incomplete can result in bad matches.
        </Text>

        <Text style={{
          paddingTop: Spacing,
          fontFamily: Font["inter-regular"],
          fontSize: FontSize.small,
          color: Colors.textDark
        }}>
          However, you can still have fun with our other matching modes that don’t use the Blend system!
        </Text>

        <Text style={{
          paddingTop: Spacing * 3,
          fontFamily: Font["inter-bold"],
          fontSize: FontSize.medium,
          color: Colors.textDark
        }}>
          96% of users find long-lasting matches through the Blend Matching System!
        </Text>

        </View>

        <View style={{
          marginVertical: Spacing * 6,
          paddingHorizontal: Spacing * 4,
        }}>
          <AppTouchableOpacity text="Fill my Profile" dark style={{ padding: Spacing, marginBottom: Spacing }} onPress={() => navigate("MoreDetails")}/>
          <AppTouchableOpacity text="Fill it Later" dark={false} style={{ padding: Spacing }} onPress={() => navigate("Main")}/>
        </View>

        {/* <RadioButtonGroup options={genderOptions} onSelect={handleSelect}/> */}
      </SafeAreaView>
    )
  }

export default FillProfileScreen;