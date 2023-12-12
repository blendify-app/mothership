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
import { useQueryClient, QueryKey } from '@tanstack/react-query';
import { mmkvStorage } from "../lib/mmkv";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetProfile } from "../api/users/useGetUserProfile";
import { usePostProfile } from "../api/users/usePostUserProfile";
import { Profile, Basic, Demographics, Personality, Life, Additional } from "../api/types/profiletypes"

interface details {
  email: string,
  id: string,
  name: string,
  object: string,
  profile: string,
};

type Props = NativeStackScreenProps<RootStackParamList, "Basic">;

// Define validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  nationality: Yup.string().required('Nationality is required'),
});

const BasicDetailsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const userid = mmkvStorage.getString("userid")
  const queryClient = useQueryClient();
  const userdetails = queryClient.getQueryData<{ data: details }>(['user', userid])

  const postProfileMutation = usePostProfile();

  const username = userdetails?.data.name;
  const mongoid = mmkvStorage.set("mongoid", userdetails?.data.profile||"");

  return (
    <Formik
      initialValues={{ name: username, dateOfBirth: '', nationality: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        postProfileMutation.mutate({
          demographics: {
            nationality: values.nationality,
            dateOfBirth: values.dateOfBirth,
          },
        });
        navigate("FillProfile");
      }}>
      {({ handleChange, handleBlur, submitForm, values, errors, touched }) => (
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
            <AppTextInput 
              placeholder="Name" 
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={{width:"100%"}}
            />
            {errors.name && touched.name && <Text>{errors.name}</Text>}

            <View style={{
            }}>
              <AppTextInput 
                placeholder="Date of Birth" 
                onChangeText={handleChange('dateOfBirth')}
                onBlur={handleBlur('dateOfBirth')}
                value={values.dateOfBirth}
              />
              {errors.dateOfBirth && touched.dateOfBirth && <Text style={{marginVertical: Spacing}}>{errors.dateOfBirth}</Text>}

              <AppTextInput 
                placeholder="Nationality" 
                onChangeText={handleChange('nationality')}
                onBlur={handleBlur('nationality')}
                value={values.nationality}
              />
              {errors.nationality && touched.nationality && <Text>{errors.nationality}</Text>}
            </View>
          </View>

          <View style={{
            marginVertical: Spacing,
            paddingHorizontal: Spacing * 4,
          }}>
            <AppTouchableOpacity text="Next" dark style={{padding: Spacing}} onPress={submitForm}>
            </AppTouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  )
}

export default BasicDetailsScreen;