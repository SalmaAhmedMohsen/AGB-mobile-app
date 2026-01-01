import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "@/screens/SplashScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import LoginScreen from "@/screens/LoginScreen";
import SignupScreenOne from "@/screens/SignupScreenOne";
import SignupScreenTwo from "@/screens/SignupScreenTwo";
import SuccessMsgScreen from "@/screens/SuccessMsgScreen";
import BottomTabs from "@/app/BottomTabs";
import HomeScreen from "@/screens/HomeScreen";

import React from "react";

const Stack = createStackNavigator();

function Navigation() {
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
                  Skip
                </Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity style={styles.icon}>
                <Text style={styles.iconText}>ع</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="SignupScreenOne"
          component={SignupScreenOne}
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
