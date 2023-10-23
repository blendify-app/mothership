import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View
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
          Welcome to Blend.
        </Text>

        <Text
          style={{
            fontFamily: Font["inter-regular"],
            fontSize: FontSize.small,
            color: Colors.textDark,
          }}
        >
          Log in to pick up where you left off!
        </Text>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <TextInput
            placeholder="E-Mail"
            placeholderTextColor={"#969696"}
            style={{
              fontFamily: Font["inter-regular"],
              backgroundColor: Colors.background,
              borderColor: "#EBEBEB",
              borderWidth: 1,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={"#969696"}
            secureTextEntry
            style={{
              fontFamily: Font["inter-regular"],
              backgroundColor: Colors.background,
              borderColor: "#EBEBEB",
              borderWidth: 1,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
            }}
          />
        </View>

        <View
          style={{
            marginVertical: Spacing * 0.5,
          }}
        >
          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.buttonDark,
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.buttonLight,
                fontFamily: Font["inter-bold"],
                fontSize: FontSize.medium,
                textAlign: "center",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.buttonLight,
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.textDark,
                fontFamily: Font["inter-bold"],
                fontSize: FontSize.medium,
                textAlign: "center",
              }}
            >
              Create New Account
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              color: Colors.textDark,
              fontFamily: Font["inter-bold"],
              fontSize: FontSize.medium,
              textAlign: "center",
              marginVertical: Spacing,
            }}
          >
            OR
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.buttonLight,
                borderRadius: Spacing,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.textDark}
                size={Spacing * 2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.buttonLight,
                borderRadius: Spacing,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.textDark}
                size={Spacing * 2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.buttonLight,
                borderRadius: Spacing,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.textDark}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
