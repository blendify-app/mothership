import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import CheckboxGroup from "../components/CheckboxGroup";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Layout from "../constants/Layout";

type Props = NativeStackScreenProps<RootStackParamList, "DetailedProfile">;

const DetailedProfileScreen: React.FC<Props> = ({
  navigation: { navigate },
}) => {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.itemContainer}>
      <View style={styles.circle} />
      <Text style={styles.text}>{item}</Text>
    </View>
  );

  const about = [
    "Male",
    "He/Him",
    "Hindu",
    "Straight",
    "Libra",
    "BigSlayyyyyy",
  ];
  const workLang = ["Actor/Model", "Film Studies", "English, Spanish, Hebrew"];
  const selectedInterests = ["Clubbing", "Videos", "Coffee"];
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Blend</Text>
          <Text style={styles.subtitle}>View your Profile</Text>
          <Text style={styles.description}>Check out your own profile.</Text>

          <Image
            style={styles.avatar}
            source={require("../assets/images/johnnydepp.jpg")}
          />

          <View style={styles.details}>
            <Text style={styles.detailsname}>Johnny Depp</Text>
            <Text style={styles.detailsage}>33</Text>
          </View>

          <Text style={styles.pronouns}>(he/him)</Text>

          <View style={styles.profstyle}>
            <Text style={styles.rely}>
              Rely on me for{"\n"}
              <Text style={styles.relysubtext}>Weed</Text>
            </Text>
            <Text style={styles.rely}>
              Favorite Traits{"\n"}
              <Text style={styles.relysubtext}>Shit on my bed</Text>
            </Text>
          </View>

          <Text style={styles.profdesc}>About Me</Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.about}
            data={about}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            horizontal
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <View style={styles.summary}>
            {workLang.map((trait, index) => (
              <View key={index}>
                <Text style={styles.summarytext}>{trait}</Text>
                {index < workLang.length - 1 && (
                  <View style={styles.summaryseparator} />
                )}
              </View>
            ))}
          </View>

          <Image
            style={styles.picture}
            source={require("../assets/images/jdep2.jpg")}
          />

          <Text style={styles.selectedInterestsTitle}>Interests</Text>
          <View style={styles.selectedInterestsContainer}>
            {selectedInterests.map((interest, index) => (
              <View key={index}>
                <TouchableOpacity disabled style={styles.interestButton}>
                  <Text style={styles.interestButtonText}>{interest}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Image
            style={styles.picture}
            source={require("../assets/images/jdep3.jpg")}
          />
        </View>
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
  profdesc: {
    marginVertical: Spacing,
    fontFamily: Font["inter-bold"],
    fontSize: FontSize.small,
    color: Colors.textDark,
  },
  profstyle: {
    flexDirection: "row",
    borderRadius: Spacing,
    alignSelf: "center",
    marginVertical: Spacing,
  },
  rely: {
    fontFamily: Font["inter-bold"],
    fontSize: FontSize.small,
    borderWidth: 1,
    borderRadius: Spacing,
    marginHorizontal: Spacing * 2,
    paddingVertical: Spacing,
    paddingRight: Spacing * 4,
    paddingLeft: Spacing,
    textAlign: "left",
  },
  relysubtext: {
    fontFamily: Font["inter-regular"],
  },
  avatar: {
    marginTop: Spacing,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: Spacing,
  },
  details: {
    flexDirection: "row",
    marginTop: Spacing,
    alignSelf: "center",
  },
  detailsname: {
    fontFamily: Font["inter-bold"],
    paddingHorizontal: Spacing * 0.5,
  },
  detailsage: {
    paddingTop: 1,
    fontFamily: Font["inter-bold"],
    color: "#818181",
  },
  pronouns: {
    paddingTop: 3,
    fontFamily: Font["inter-regular"],
    alignSelf: "center",
    color: "#878787",
    marginBottom: Spacing,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4A4A4A",
    marginRight: 5,
  },
  text: {
    fontSize: FontSize.small,
  },
  separator: {
    width: 10,
  },
  about: {
    backgroundColor: "#D9D9D9",
    padding: Spacing,
    marginBottom: Spacing,
    borderRadius: Spacing,
  },
  summary: {
    marginTop: Spacing,
    borderWidth: 1,
    borderRadius: Spacing,
    padding: Spacing,
  },
  summaryseparator: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
  },
  summarytext: {
    padding: Spacing / 2,
    fontSize: FontSize.small,
  },
  picture: {
    marginTop: Spacing * 2,
    width: Spacing * 31,
    height: Spacing * 31,
    alignSelf: "center",
    borderRadius: Spacing,
  },
  selectedInterestsTitle: {
    paddingTop: Spacing * 2,
    fontFamily: Font["inter-bold"],
    fontSize: FontSize.small,
    color: Colors.textDark,
    marginBottom: Spacing,
  },

  selectedInterestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: Colors.buttonDark,
    borderRadius: Spacing,
    marginBottom: Spacing,
    padding: Spacing,
  },

  interestButton: {
    backgroundColor: Colors.buttonDark,
    borderRadius: Spacing,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing / 1.5,
    flexBasis: "30%",
    marginVertical: Spacing / 2,
    marginHorizontal: Spacing / 2,
  },
  interestButtonText: {
    color: Colors.background,
    fontFamily: Font["inter-regular"],
    fontSize: FontSize.small,
    textAlign: "center",
  },
});

export default DetailedProfileScreen;
