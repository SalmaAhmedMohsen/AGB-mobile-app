import "react-native-reanimated";
import Toast from "react-native-toast-message";
import Navigation from "./navigation";
import "@/i18n";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
