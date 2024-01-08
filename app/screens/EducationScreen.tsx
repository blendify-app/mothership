import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useState } from "react";
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
import OptionButton from "../components/OptionButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { mmkvStorage } from "../lib/mmkv";
import { usePostProfile } from "../api/users/usePostUserProfile";

const validationSchema = Yup.object().shape({
  education: Yup.string().required("Education is a required field"),
  work: Yup.object().shape({
    job: Yup.string(),
    company: Yup.string(),
  }),
  workPreferNotToSay: Yup.boolean().test(
    "work-or-preferNotToSay",
    "Please fill out the work section or check the 'Prefer not to say' button.",
    function (value) {
      const { work } = this.parent;
      return value || (work.job && work.company);
    }
  ),
});

type Props = NativeStackScreenProps<RootStackParamList, "Education">;

const EducationScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    const educationOptions = ["Primary", "Secondary", "Undergrad", "Postgrad", "Doctorate", "Prefer not to say"];
    
    const initialValues = {
        education: "",
        work: {
            job: "",
            company: "",

        },
        workPreferNotToSay: false,
      };
    
    interface FormValues {
        education: string,
        work: {
            job: string,
            company: string,
        },
        workPreferNotToSay: boolean,
    }

    const postProfileMutation = usePostProfile();
    const userid = mmkvStorage.getString("userid");

    const onSubmit = (values: FormValues) => {
        console.log(values);
        postProfileMutation.mutate({
          life: {
            education: values.education,
            job: values.work.job,
            company: values.work.company,
          }
        })
        navigate("Interests");
      };

    const [preferNotToSay, setPreferNotToSay] = useState(false);
    
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleChange, handleBlur, submitForm, values, errors, touched, setFieldValue }) => (
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
              We just need a couple more details!
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
        
            <View
                style={{
                      marginVertical: Spacing * 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: Font["inter-bold"],
                        fontSize: FontSize.medium,
                        color: Colors.textDark,
                        marginBottom: Spacing,
                      }}
                    >
                      Education
                    </Text>
      
                    <RadioButtonGroup
                      options={educationOptions}
                      onSelect={handleChange('education')}
                    />
                    {errors['education'] && touched['education'] && <Text style={{ color: 'red' }}>{errors['education']}</Text>}
            </View>

            <View
              style={{
                marginVertical: Spacing * 2,
              }}
            >
                <AppTextInput placeholder="What do you do?" onChangeText={handleChange('work.job')} value={preferNotToSay ? 'Prefer not to say' : values.work.job} style={{ padding: Spacing }}/>
                <AppTextInput placeholder="Where do you work?" onChangeText={handleChange('work.company')} value={preferNotToSay ? 'Prefer not to say' : values.work.company} style={{ padding: Spacing }}/>
                <OptionButton text="Prefer not to say" style={{padding: Spacing,}} onPress={() => {
                  setFieldValue("work.job", "");
                  setFieldValue("work.company", "");
                  setFieldValue("workPreferNotToSay", !values.workPreferNotToSay);
                }}/>
                {errors['workPreferNotToSay'] && touched['workPreferNotToSay'] && (<Text style={{ color: 'red' }}>{errors['workPreferNotToSay']}</Text>
)}


            </View>

            <View
              style={{
                marginVertical: Spacing * 2,
              }}
            >
              <AppTouchableOpacity text="Next" dark onPress={submitForm} />
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


export default EducationScreen;