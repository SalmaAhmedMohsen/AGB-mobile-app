import Navigation from "./navigation";

import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
      <Toast />
    </>
  );
}
