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

type Props = NativeStackScreenProps<RootStackParamList, "Languages">;

const LanguagesScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const languages = ["English", "Hindi", "Malayalam", "Arabic"];

  const validationSchema = Yup.object().shape({
    selectedLanguages: Yup.array()
    .min(1, 'Select at least 1 language')
    .required('Required'),
  })
  
  const initialValues = {
    selectedLanguages: [],
  };

  interface FormValues {
    selectedLanguages: string[];
  }

  const onSubmit = (values: FormValues) => {
    console.log(values);
    navigate("FinalDetails");
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
              <Text style={styles.subtitle}>What Languages do you speak?</Text>

              <AppTextInput style={styles.searchbar} placeholder="Find your language"/>

              <Text style={styles.description}>Languages</Text>              

              <CheckboxGroup
                options={languages}
                onSelect={(selectedLanguages) => {
                  setFieldValue('selectedLanguages', selectedLanguages);
                }}
              />
              {errors.selectedLanguages && touched.selectedLanguages && <Text style={{ color: 'red' }}>{errors.selectedLanguages}</Text>}
              <Text style={styles.selectedInterestsTitle}>Selected Languages</Text>
              <View style={styles.selectedInterestsContainer}>
                {values.selectedLanguages.map((language, index) => (
                  <View key={index}>
                    <TouchableOpacity disabled style={styles.interestButton}>
                      <Text style={styles.interestButtonText}>{language}</Text>
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

export default LanguagesScreen;