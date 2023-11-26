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
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
