import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { MMKV } from "react-native-mmkv";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import Navigation from "./navigation";

const queryClient = new QueryClient();


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <StatusBar />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
