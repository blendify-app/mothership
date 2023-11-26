import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import BasicDetailsScreen from "../screens/BasicDetailsScreen";
import FillProfileScreen from "../screens/FillProfileScreen";
import MoreDetailsScreen from "../screens/MoreDetailsScreen";
import { RootStackParamList } from "../types";

const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        background: Colors.background
    },
};

export default function Navigation() {
    return (
        <NavigationContainer theme = {theme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Basic" component={BasicDetailsScreen}/>
            <Stack.Screen name="FillProfile" component={FillProfileScreen}/>
            <Stack.Screen name="MoreDetails" component={MoreDetailsScreen}/>
        </Stack.Navigator>
    );
}