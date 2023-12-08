import React, { useState } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "FinalDetails">;

const FinalDetailsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

    const initialValues = {
        rely: [],
        favTraits: [],
    };

    interface FormValues {
        rely: string[];
        favTraits: string[];
    };

    const onSubmit = (values: FormValues) => {
        console.log(values);
        navigate("Integrations");
    };

    const validationSchema = Yup.object().shape({
        rely: Yup.array()
        .min(1, "At least one thing people can rely on you for, it's more fun this way!")
        .required('Required'),

        favTraits: Yup.array()
        .min(1, "Mention at least one trait you like in others, show some love!")
        .required('Required'),
    });

    return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, submitForm }) => {
            const [relyText, setRelyText] = useState('');
            const [favTraitsText, setFavTraitsText] = useState('');

            return (
              <View style={styles.container}>
                <Text style={styles.title}>Blend</Text>
                <Text style={styles.subtitle}>"Rely on me for"</Text>

                <AppTextInput
                  style={styles.searchbar}
                  value={relyText}
                  onChangeText={setRelyText}
                  onSubmitEditing={() => {
                    setFieldValue('rely', [...values.rely, relyText]);
                    setRelyText('');
                  }}
                  placeholder="What can people rely on you for?"
                />

                <View style={styles.selectedInterestsContainer}>
                  {values.rely.map((relyItem, index) => (
                    <View key={index}>
                      <TouchableOpacity disabled style={styles.interestButton}>
                        <Text style={styles.interestButtonText}>{relyItem}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                {errors.rely && touched.rely && <Text style={{ color: 'red' }}>{errors.rely}</Text>}

                <Text style={styles.subtitle}>Favourite Traits</Text>

                <AppTextInput
                  style={styles.searchbar}
                  value={favTraitsText}
                  onChangeText={setFavTraitsText}
                  onSubmitEditing={() => {
                    setFieldValue('favTraits', [...values.favTraits, favTraitsText]);
                    setFavTraitsText('');
                  }}
                  placeholder="What are your favourite traits in others?"
                />

                <View style={styles.selectedInterestsContainer}>
                  {values.favTraits.map((favTrait, index) => (
                    <View key={index}>
                      <TouchableOpacity disabled style={styles.interestButton}>
                        <Text style={styles.interestButtonText}>{favTrait}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                {errors.favTraits && touched.favTraits && <Text style={{ color: 'red' }}>{errors.favTraits}</Text>}

                <AppTouchableOpacity text="Next" onPress={submitForm} dark/>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
    );
}

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

export default FinalDetailsScreen;