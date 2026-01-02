import "react-native-reanimated";
import Toast from "react-native-toast-message";
import Navigation from "./navigation";

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
