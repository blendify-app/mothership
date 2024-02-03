import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Chats">;

type Chat = {
  name: string;
  lastMessage: string;
  timeSent: string;
};

const allChats: Chat[] = [
  {
    name: "Samhita",
    lastMessage: "What did you say about my mother?",
    timeSent: "9:26 PM",
  },
  {
    name: "Arjun",
    lastMessage: "That's some insane stuff boss.",
    timeSent: "9:26 PM",
  },
  {
    name: "Gopal",
    lastMessage: "How much milk you need?",
    timeSent: "9:26 PM",
  },
  {
    name: "Raju",
    lastMessage: "Sir only 1 roll available.",
    timeSent: "9:26 PM",
  },
];

const ChatsScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigate("Chat")}
    >
      <Image source={require("../assets/images/johnnydepp.jpg")} style={styles.profileImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.timeSent}>{item.timeSent}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Chats</Text>

          <View style={styles.chatsContainer}>
            <FlatList
              data={allChats}
              renderItem={renderChatItem}
              keyExtractor={(item) => item.name}
            />
          </View>
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
    fontSize: FontSize.large,
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
  chatsContainer: {
    marginTop: Spacing * 3,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "gray", // Fallback color if no image is available
  },
  chatDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#666",
  },
  timeSent: {
    fontSize: 12,
    color: "#666",
  },
});

export default ChatsScreen;
