import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, StyleSheet, Image } from "react-native";

import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import CheckboxGroup from "../components/CheckboxGroup";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { useGetProfile } from "../api/users/useGetUserProfile";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export function calculateAge(dob: string) {
  const [day, month, year] = dob.split("-");
  const dateObject = new Date(`${year}-${month}-${day}`);

  const today = new Date();
  const birthDate = new Date(dateObject);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const ProfileScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

    const buttons = ["View your Profile", "Settings", "Digital Safety & Wellbeing", "Privacy Policy & Code of Conduct"]

    const handleButtonPress = (key: string) => {
        switch (key) {
          case "0":
           navigate("DetailedProfile");
            break;
          case "1":
            navigate("Settings")
            break;
          case "2":
            navigate("Safety")
            break;
          case "3":
            navigate("Privacy")
            break;
        }
      };

      const getProf = useGetProfile();
      const data = getProf.data
      console.log(data)

      



    return (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Blend</Text>
              <Text style={styles.subtitle}>Your Profile</Text>
              <Text style={styles.description}>All your information. Matches from Blendify and Roulette can view your profile. Hide details that you don’t want them to see.</Text>
              <Image style={styles.avatar} source={require('../assets/images/johnnydepp.jpg')}/>
              
              <View style={styles.details}>
                <Text style={styles.detailsname}>{data?.basic?.name}</Text>
                <Text style={styles.detailsage}>{calculateAge(data?.demographics?.dateOfBirth || "")}</Text>
              </View>

              <Text style={styles.pronouns}>{data?.demographics?.pronouns}</Text>

              {
                Object.entries(buttons).map(([index, options]) => {
                  return (
                    <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                    key={index}
                  >
                    <AppTouchableOpacity text={options} dark={false} style={styles.integrationButton} onPress={() => handleButtonPress(index)}/>
                  </View>

                  )
                })
              }

            
            </View>
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
    avatar: {
        marginTop: Spacing * 2,
        width: 150, 
        height: 150,
        alignSelf:"center",
        borderRadius: Spacing   
    },
    details: {
        flexDirection: "row",
        marginTop: Spacing,
        alignSelf: "center",
    },
    detailsname: {
        fontFamily: Font["inter-bold"],
        paddingHorizontal: Spacing*0.5,
    },
    detailsage: {
        paddingTop: 1,
        fontFamily: Font["inter-bold"],
        color: "#818181"
    },
    pronouns: {
        paddingTop: 3,
        fontFamily: Font["inter-regular"],
        alignSelf: "center",
        color: "#878787",
        marginBottom: Spacing * 2
    },
    integrationButton: {
        borderRadius: Spacing,
        paddingVertical: Spacing * 2,
        paddingHorizontal: Spacing/1.5,
        flexBasis: "98%",
        marginVertical: Spacing/2,
        marginHorizontal: Spacing/2,
    },

});

export default ProfileScreen;