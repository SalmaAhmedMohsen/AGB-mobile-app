import BottomTabs from "@/app/BottomTabs";
import LoginScreen from "@/screens/LoginScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import SignupScreenOne from "@/screens/SignupScreenOne";
import SignupScreenTwo from "@/screens/SignupScreenTwo";
import SplashScreen from "@/screens/SplashScreen";
import SuccessMsgScreen from "@/screens/SuccessMsgScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

function Navigation() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const changeLanguage = async (language) => {
    await AsyncStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };
  return (
    <>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="OnBoarding"
          component={OnboardingScreen}
          key={i18n.language}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: () => (
              <Image
                source={require("@/assets/images/Logo1.png")}
                style={styles.logo}
              />
            ),
            headerStyle: {
              height: 150,
              shadowOpacity: 0,
              elevation: 0,
              borderBottomWidth: 0,
            },
            headerTitleAlign: "center",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: "#1D5CF3",
                    fontWeight: "bold",
                    paddingRight: 30,
                  }}
                >
                  {t("navigation.skip")}
                </Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    changeLanguage(isAr ? "en" : "ar");
                  }}
                >
                  <Text style={styles.iconText}>{isAr ? "En" : "ع"}</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="SignupScreenOne"
          component={SignupScreenOne}
          options={{
            headerShown: true,
            headerBackTitle: t("navigation.login"),
            headerTitle: "",
            headerStyle: {
              height: 80,
              shadowOpacity: 0,
              elevation: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="SignupScreenTwo"
          component={SignupScreenTwo}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: {
              height: 80,
              shadowOpacity: 0,
              elevation: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen name="SuccessMsgScreen" component={SuccessMsgScreen} />
        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </>
  );
}

export default Navigation;
const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
  icon: {
    backgroundColor: "#0A3DAE",
    marginLeft: 20,
    borderRadius: 8,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 18,
  },
});
