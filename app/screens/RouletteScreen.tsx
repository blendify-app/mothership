import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import AppTextInput from "../components/AppTextInput";
import AppTouchableOpacity from "../components/AppTouchableOpacity";
import CheckboxGroup from "../components/CheckboxGroup";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Roulette">;

type Category = "Sports" | "Politics" | "Moms" | "Racing";

const RouletteScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const categories: Category[] = ["Sports", "Politics", "Moms", "Racing"];

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedBeacon, setSelectedBeacon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions: Record<Category, string[]> = {
    Sports: ["Football", "Basketball", "Tennis"],
    Politics: ["BJP", "Congress", "AAP", "LDF", "UDF"],
    Moms: ["Soccer Mom", "Pastry Mom", "Dexter's Mom"],
    Racing: ["Verstappen", "Hamilton", "Vettel", "Leclerc"],
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.beaconCategoryButton}
        onPress={() => setSelectedCategory(item)}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBeacons = ({ item }: { item: string }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={
          item === selectedBeacon
            ? styles.selectedBeaconButtons
            : styles.beaconButtons
        }
        onPress={() => setSelectedBeacon(item)}
      >
        <Text
          style={
            item === selectedBeacon
              ? styles.selectedBeacontext
              : styles.beacontext
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Roulette</Text>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>{selectedBeacon ? `Searching under ${selectedBeacon}` : `Searching randomly`}</Text>
          <AppTouchableOpacity dark text="Cancel" onPress={() => setIsLoading(false)} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Roulette</Text>
            <Text style={styles.description}>
              Select a Beacon from the list below to find someone looking for the
              same thing as you, or find someone random by leaving it blank!
            </Text>

            <View style={styles.beaconContainer}>
              <View style={styles.beaconCategoryContainer}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  style={styles.about}
                  data={categories}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                  horizontal
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>

              <View style={styles.beaconOptionsContainer}>
                {selectedCategory && (
                  <FlatList
                    data={categoryOptions[selectedCategory] as Category[]}
                    renderItem={renderBeacons}
                    keyExtractor={(item) => item}
                  />
                )}
              </View>
            </View>

            {selectedBeacon ? (
              <AppTouchableOpacity
                dark
                text={`Search with "${selectedBeacon}"`}
                onPress={() => setIsLoading(true)}
              />
            ) : (
              <AppTouchableOpacity
                dark
                text="Start Random Search"
                onPress={() => setIsLoading(true)}
              />
            )}
          </View>
        </ScrollView>
      )}
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
    fontSize: FontSize.large,
    color: Colors.textDark,
  },
  description: {
    marginVertical: Spacing,
    fontFamily: Font["inter-regular"],
    fontSize: FontSize.medium,
    color: Colors.textDark,
  },
  beaconContainer: {
    marginVertical: Spacing * 2,
    backgroundColor: "#D9D9D9",
    height: Spacing * 36,
    padding: Spacing,
    borderRadius: Spacing,
  },
  about: {},
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
  },
  separator: {
    padding: Spacing / 2,
  },
  beaconCategoryButton: {
    backgroundColor: Colors.background,
    padding: Spacing / 2,
    borderRadius: Spacing / 1.5,
    width: Spacing * 12,
    height: Spacing * 3,
  },
  beaconCategoryContainer: {
    marginVertical: Spacing,
  },
  beaconOptionsContainer: {
    marginTop: Spacing,
    alignSelf: "center",
  },
  beaconButtons: {
    backgroundColor: Colors.background,
    padding: Spacing,
    borderRadius: Spacing / 1.5,
    width: Spacing * 26,
    height: Spacing * 4,
    marginVertical: Spacing / 2,
  },
  beacontext: {
    alignSelf: "flex-start",
  },
  selectedBeaconButtons: {
    backgroundColor: Colors.textDark,
    padding: Spacing,
    borderRadius: Spacing / 1.5,
    width: Spacing * 26,
    height: Spacing * 4,
    marginVertical: Spacing / 2,
  },
  selectedBeacontext: {
    color: "white",
    alignSelf: "flex-start",
  },
  loadingContainer: {
    paddingHorizontal: Spacing * 4,
    paddingTop: Spacing * 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#D9D9D9",
  },
  loadingText: {
    fontSize: FontSize.large,
    color: Colors.textDark,
    marginVertical: Spacing,
  },
});

export default RouletteScreen;