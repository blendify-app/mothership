import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
    namespace ReactNavigatiom {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Basic: undefined;
    FillProfile: undefined;
    MoreDetails: undefined;
    Education: undefined;
    Interests: undefined;
    Languages: undefined;
    FinalDetails: undefined;
    Integrations: undefined;
    Modes: undefined;
    Profile: undefined;
    Chats: undefined;
    Main: undefined;
    DetailedProfile: undefined;
    Safety: undefined;
    Privacy: undefined;
    Settings: undefined;

};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
