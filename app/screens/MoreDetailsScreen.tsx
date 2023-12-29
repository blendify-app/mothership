import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Auth0Provider } from "react-native-auth0";
import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { RootStackParamList } from "../types";
import Layout from "../constants/Layout";
import RadioButtonGroup from "../components/RadioButtonGroup";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePostProfile } from "../api/users/usePostUserProfile";
import { mmkvStorage } from "../lib/mmkv";

type Props = NativeStackScreenProps<RootStackParamList, "MoreDetails">;

const validationSchema = Yup.object().shape({
  Gender: Yup.string().required('Gender is a required option'),
  Pronoun: Yup.string().required('Pronoun is a required option'),
  Sexuality: Yup.string().required('Sexuality is a required option'),
  Religion: Yup.string().required('Religion is a required option'),
  Zodiac: Yup.string().required('Zodiac is a required option'),
});

const MoreDetailsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to Say"];
  const pronounOptions = [
    "He/Him",
    "She/Her",
    "They/Them",
    "Prefer not to Say",
  ];
  const sexualityOptions = ["Straight", "Bisexual", "Gay", "Prefer not to Say"];
  const religionOptions = [
    "Hindu",
    "Muslim",
    "Christian",
    "Jain",
    "Sikh",
    "Prefer not to Say",
  ];
  const zodiacOptions = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Prefer not to Say",
  ];

  const initialValues = {
    Gender: "",
    Pronoun: "",
    Sexuality: "",
    Religion: "",
    Zodiac: "",
  };

  interface FormValues {
    Gender: string;
    Pronoun: string;
    Sexuality: string;
    Religion: string;
    Zodiac: string;
  }

  const fields = {
    Gender: genderOptions,
    Pronoun: pronounOptions,
    Sexuality: sexualityOptions,
    Religion: religionOptions,
    Zodiac: zodiacOptions,
  };

  const postProfileMutation = usePostProfile();
  const userid = mmkvStorage.getString("userid")

  const onSubmit = (values: FormValues) => {
    console.log(values);
    postProfileMutation.mutate({
      demographics: {
        gender: values.Gender,
        pronouns: values.Pronoun,
        sexuality: values.Sexuality,
        religion: values.Religion,
        starsign: values.Zodiac,
      }

    });
    navigate("Education")
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleChange, handleBlur, submitForm, values, errors, touched }) => (
        <SafeAreaView>
          <ScrollView
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
              Start filling out your account!
            </Text>

            <Text
              style={{
                marginVertical: Spacing,
                fontFamily: Font["inter-regular"],
                fontSize: FontSize.small,
                color: Colors.textDark,
              }}
            >
              Adding more about yourself allows others to see more of what makes
              you, you. Don’t worry about writing too much, or being too
              talkative. We’ve got your back.
            </Text>
        
              {
                Object.entries(fields).map(([key, options]) => {
                  return (
                    <View
                    style={{
                      marginVertical: Spacing * 2,
                    }}
                    key={key}
                  >
                    <Text
                      style={{
                        fontFamily: Font["inter-bold"],
                        fontSize: FontSize.medium,
                        color: Colors.textDark,
                        marginBottom: Spacing,
                      }}
                    >
                      {key}
                    </Text>
      
                    <RadioButtonGroup
                      options={options}
                      onSelect={handleChange(key)}
                    />
                    {(errors as any)[key] && (touched as any)[key] && <Text style={{ color: 'red' }}>{(errors as any)[key]}</Text>}
                  </View>

                  )
                })
              }

            <View
              style={{
                marginVertical: Spacing * 2,
              }}
            >
              <AppTouchableOpacity text="Next" dark onPress={submitForm}/>
            </View>

            <View
              style={{
                marginVertical: Spacing * 6,
              }}
            ></View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default MoreDetailsScreen;
