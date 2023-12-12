import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import CheckboxGroup from "../components/CheckboxGroup";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { usePostProfile } from "../api/users/usePostUserProfile";
import { mmkvStorage } from "../lib/mmkv";

type Props = NativeStackScreenProps<RootStackParamList, "Interests">;

const InterestsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const validationSchema = Yup.object().shape({
    selectedInterests: Yup.array()
    .min(3, 'Select at least 3 interests')
    .required('Required'),
  })

  const interests = ["Clubbing", "Eating Out", "Football", "Night Owl", "Dark Humor", "Smoking", "Drinking", "Drugs"];
  
  const initialValues = {
    selectedInterests: [],
  };

  interface FormValues {
    selectedInterests: string[];
  }

  const postProfileMutation = usePostProfile();
  const userid = mmkvStorage.getString("userid");

  const onSubmit = (values: FormValues) => {
    console.log(values);

    postProfileMutation.mutate({
      life:{
        interests: values.selectedInterests,
      }
      
    });

    navigate("Languages");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, submitForm }) => (
            <View style={styles.container}>
              <Text style={styles.title}>Blend</Text>
              <Text style={styles.subtitle}>What are your interests?</Text>
              <Text style={styles.description}>Let others know what you’re into!</Text>

              <AppTextInput style={styles.searchbar} placeholder="Find your interest"/>

              <Text style={styles.description}>Popular Interests</Text>              

              <CheckboxGroup
                options={interests}
                onSelect={(selectedInterests) => {
                  setFieldValue('selectedInterests', selectedInterests);
                }}
              />
              {errors.selectedInterests && touched.selectedInterests && <Text style={{ color: 'red' }}>{errors.selectedInterests}</Text>}
              <Text style={styles.selectedInterestsTitle}>Selected Interests</Text>
              <View style={styles.selectedInterestsContainer}>
                {values.selectedInterests.map((interest, index) => (
                  <View key={index}>
                    <TouchableOpacity disabled style={styles.interestButton}>
                      <Text style={styles.interestButtonText}>{interest}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <AppTouchableOpacity text="Next" onPress={submitForm} dark/>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing * 4,
    paddingTop: Spacing * 8,
  },
  title: {
    fontFamily: Font["inter-bold"],
    fontSize: FontSize.medium,
    color: Colors.textDark,
  },
  subtitle: {
    paddingTop: Spacing * 3,
    fontFamily: Font["inter-bold"],
    fontSize: FontSize.medium,
    color: Colors.textDark,
  },
  description: {
    marginVertical: Spacing,
    fontFamily: Font["inter-regular"],
    fontSize: FontSize.small,
    color: Colors.textDark,
  },

  searchbar: {
    marginBottom: Spacing,
  },

  selectedInterestsTitle: {
    paddingTop: Spacing * 3,
    fontFamily: Font["inter-regular"],
    fontSize: FontSize.small,
    color: Colors.textDark,
    marginBottom: Spacing,
  },

  selectedInterestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: Colors.buttonDark,
    borderRadius: Spacing,
    marginBottom: Spacing * 2,
    padding: Spacing,
  },

  interestButton: {
    backgroundColor: Colors.buttonDark,
    borderRadius: Spacing,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing/1.5,
    flexBasis: "30%",
    marginVertical: Spacing/2,
    marginHorizontal: Spacing/2,
  },
  interestButtonText: {
    color: Colors.background,
    fontFamily: Font["inter-regular"],
    fontSize: FontSize.small,
    textAlign: "center",
  },
});

export default InterestsScreen;