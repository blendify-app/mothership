import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import BasicDetailsScreen from "../screens/BasicDetailsScreen";
import FillProfileScreen from "../screens/FillProfileScreen";
import MoreDetailsScreen from "../screens/MoreDetailsScreen";
import EducationScreen from "../screens/EducationScreen"
import { RootStackParamList } from "../types";
import InterestsScreen from "../screens/InterestsScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import FinalDetailsScreen from "../screens/FinalDetailsScreen";
import IntegrationsScreen from "../screens/IntegrationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ModesScreen from "../screens/ModesScreen";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import DetailedProfileScreen from "../screens/DetailedProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import DigitalSafetyScreen from "../screens/DigitalSafetyScreen";

const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        background: Colors.background
    },
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: {backgroundColor: Colors.buttonDark, borderTopLeftRadius: Spacing, borderTopRightRadius: Spacing,}, tabBarActiveTintColor:Colors.background, tabBarIcon: () => null, tabBarLabelStyle: {fontSize: FontSize.medium, fontFamily: Font["inter-bold"], paddingBottom: Spacing} }}>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title:'', headerShown: false, tabBarLabel:"Profile" }}/>
      <Tab.Screen name="Modes" component={ModesScreen} options={{ title:'', headerShown: false, tabBarLabel:"Modes"}}/>
      <Tab.Screen name="Chats" component={ChatsScreen} options={{ title:'', headerShown: false, tabBarLabel:"Chats" }}/>
    </Tab.Navigator>
  );
}

export default function Navigation() {
    return (
        <NavigationContainer theme={theme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Basic" component={BasicDetailsScreen}/>
            <Stack.Screen name="FillProfile" component={FillProfileScreen}/>
            <Stack.Screen name="MoreDetails" component={MoreDetailsScreen}/>
            <Stack.Screen name="Education" component={EducationScreen}/>
            <Stack.Screen name="Interests" component={InterestsScreen}/>
            <Stack.Screen name="Languages" component={LanguagesScreen}/>
            <Stack.Screen name="FinalDetails" component={FinalDetailsScreen}/>
            <Stack.Screen name="Integrations" component={IntegrationsScreen}/>
            <Stack.Screen name="Main" component={BottomTabNavigator}/>
            <Stack.Screen name="DetailedProfile" component={DetailedProfileScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
            <Stack.Screen name="Privacy" component={PrivacyPolicyScreen}/>
            <Stack.Screen name="Safety" component={DigitalSafetyScreen}/>
        </Stack.Navigator>
    );
}
