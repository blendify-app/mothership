import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Spacing from "../constants/Spacing";

type ChatMessage = {
  content: string;
  timeSent: string;
  sender: string;
};

const allChatMessages: ChatMessage[] = [
  {
    content: "What did you say about my mother?",
    timeSent: "9:26 PM",
    sender: "other",
  },
  {
    content: "That's some insane stuff boss.",
    timeSent: "9:27 PM",
    sender: "other",
  },
  {
    content: "How much milk you need?",
    timeSent: "9:28 PM",
    sender: "other",
  },
  {
    content: "Sir only 1 roll available.",
    timeSent: "9:29 PM",
    sender: "other",
  },
];

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const ChatMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const { content, timeSent } = message;

  return (
    <View style={[styles.messageContainer, styles.otherMessageContainer]}>
      <Text numberOfLines={1} style={styles.otherMessageText}>
        {content}
      </Text>
      <Text style={styles.timeText}>{timeSent}</Text>
    </View>
  );
};

const MyMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const { content, timeSent } = message;

  return (
    <View style={[styles.messageContainer, styles.myMessageContainer]}>
      <Text numberOfLines={1} style={styles.myMessageText}>
        {content}
      </Text>
      <Text style={styles.timeText}>{timeSent}</Text>
    </View>
  );
};

const ChatScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [messageText, setMessageText] = useState("");
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);

  const sendMessage = () => {
    if (messageText.length > 0) {
      const newMessage: ChatMessage = {
        content: messageText,
        timeSent: "Now",
        sender: "me",
      };
      allChatMessages.push(newMessage);
      setMessageText("");
      setIsTextInputEmpty(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate("Chats")}>
          <AntDesign name="arrowleft" size={24} color="#4A4A4A" />
        </TouchableOpacity>
        <View style={styles.chatInfo}>
          <Image
            source={require("../assets/images/johnnydepp.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Samhita</Text>
        </View>
        <FontAwesome name="ellipsis-v" size={20} color="#4A4A4A" />
      </View>
      <View style={styles.chatArea}>
        {allChatMessages.map((message, index) =>
          message.sender === "me" ? (
            <MyMessage key={index} message={message}/>
          ) : (
            <ChatMessage key={index} message={message} />
          )
        )}
      </View>
      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={messageText}
            onChangeText={(text) => {
              setMessageText(text);
              setIsTextInputEmpty(text.length === 0);
            }}
            onSubmitEditing={sendMessage}
          />
        </View>
        {isTextInputEmpty ? (
          <TouchableOpacity style={styles.micButton}>
            <FontAwesome name="microphone" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={sendMessage}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatInfo: {
    flexBasis: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  chatArea: {
    flex: 1,
    padding: 16,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  addButton: {
    padding: 8,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  micButton: {
    padding: 8,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "gray",
  },
  name: {
    paddingLeft: 6,
    fontSize: 17,
    fontWeight: "bold",
  },
  messageContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginBottom: Spacing,
  },
  myMessageText: {
    lineHeight: 18,
    fontSize: 16,
    color: "white"
  },
  otherMessageText: {
    lineHeight: 18,
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: "#BDBDBD",
  },
  otherMessageContainer: {
    alignSelf: "flex-end",
  },
  myMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#272727",
  },
  send:{
    color: "white"
  }
});

export default ChatScreen;