import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
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

type Props = NativeStackScreenProps<RootStackParamList, "MoreDetails">;

const MoreDetailsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const handleGenderSelect = (selectedOption: string) => {
    console.log("Selected Gender: ", selectedOption);
  };

  const handlePronounSelect = (selectedOption: string) => {
    console.log("Selected Pronoun: ", selectedOption)
  };

  const handleSexualitySelect = (selectedOption: string) => {
    console.log("Selected Sexuality: ", selectedOption)
  };

  const handleReligionSelect = (selectedOption: string) => {
    console.log("Selected Religion: ", selectedOption)
  };

  const handleZodiacSelect = (selectedOption: string) => {
    console.log("Selected Star Sign: ", selectedOption)
  };

  const genderOptions = ["Male", "Female", "Non-binary"];  
  const pronounOptions = ["He/Him", "She/Her", "They/Them", "Prefer not to Say"];
  const sexualityOptions = ["Straight", "Bisexual", "Gay", "Prefer not to Say"];
  const religionOptions = ["Hindu", "Muslim", "Christian", "Jain", "Sikh", "Prefer not to Say"];
  const zodiacOptions = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Prefer not to Say"];
  return (
      <SafeAreaView>
        <ScrollView
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
          Start filling out your account!
        </Text>

        <Text style={{
          marginVertical: Spacing,
          fontFamily: Font["inter-regular"],
          fontSize: FontSize.small,
          color: Colors.textDark
        }}>
          Adding more about yourself allows others to see more of what makes you, you. Don’t worry about writing too much, or being too talkative. We’ve got your back.
        </Text>

        <View style={{
            marginVertical: Spacing * 2,
        }}>
            <Text style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
            marginBottom: Spacing,
          }}>
            Gender
            </Text>

            <RadioButtonGroup options={genderOptions} onSelect={handleGenderSelect} />
            <AppTextInput placeholder="Other" style={{padding: Spacing}}/>    
        </View>
        

        <View style={{
            marginVertical: Spacing * 2,
        }}>
          <Text style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
            marginBottom: Spacing,
          }}>
            Pronouns
            </Text>
                <RadioButtonGroup options={pronounOptions} onSelect={handlePronounSelect}/>
                <AppTextInput placeholder="Other" style={{padding: Spacing,}}/>
          
          </View>

          <View style={{
            marginVertical: Spacing * 2,
        }}>
          <Text style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
            marginBottom: Spacing,
          }}>
            Sexuality
            </Text>
                <RadioButtonGroup options={sexualityOptions} onSelect={handleSexualitySelect}/>
                <AppTextInput placeholder="Other" style={{padding: Spacing}}/>
          
          </View>

          <View style={{
            marginVertical: Spacing * 2,
        }}>
          <Text style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
            marginBottom: Spacing,
          }}>
            Religion
            </Text>
                <RadioButtonGroup options={religionOptions} onSelect={handleReligionSelect}/>
                <AppTextInput placeholder="Other" style={{padding: Spacing}}/>
          
          </View>

          <View style={{
            marginVertical: Spacing * 2,
        }}>
          <Text style={{
            fontFamily: Font["inter-bold"],
            fontSize: FontSize.medium,
            color: Colors.textDark,
            marginBottom: Spacing,
          }}>
            Zodiac
            </Text>
                <RadioButtonGroup options={zodiacOptions} onSelect={handleZodiacSelect}/>
          
          </View>

          <View style={{
            marginVertical: Spacing * 2
          }}>
            <AppTouchableOpacity text="Next" dark/>
          </View>

          <View style={{
            marginVertical: Spacing * 6,
          }}>

          </View>

        </ScrollView>
      </SafeAreaView>
    )
  }

export default MoreDetailsScreen;