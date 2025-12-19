import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("OnBoarding");
    }, 1000);
  }, []);
  return (
    <ImageBackground
      style={styles.background}
      source={require("@/assets/images/Splash.png")}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default SplashScreen;
